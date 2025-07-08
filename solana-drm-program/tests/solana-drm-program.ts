import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { SolanaDrmProgram } from "../target/types/solana_drm_program";
import {
  PublicKey,
  Keypair,
  SystemProgram,
  SYSVAR_RENT_PUBKEY,
} from "@solana/web3.js";
import {
  TOKEN_PROGRAM_ID,
  createMint,
  createAccount,
  mintTo,
} from "@solana/spl-token";
import { assert } from "chai";

describe("solana-drm-program", () => {
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);

  const program = anchor.workspace
    .SolanaDrmProgram as Program<SolanaDrmProgram>;

  // Test accounts
  const authority = Keypair.generate();
  const buyer = Keypair.generate();
  const contentId = "test-content-123";
  const licenseId = "test-license-456";
  const contentHash = "QmTestHash123456789";

  // PDAs
  let drmStatePda: PublicKey;
  let contentPda: PublicKey;
  let licensePda: PublicKey;

  // Token accounts
  let mint: PublicKey;
  let authorityTokenAccount: PublicKey;
  let buyerTokenAccount: PublicKey;

  before(async () => {
    // Airdrop SOL to test accounts
    await provider.connection.requestAirdrop(
      authority.publicKey,
      10 * anchor.web3.LAMPORTS_PER_SOL
    );
    await provider.connection.requestAirdrop(
      buyer.publicKey,
      10 * anchor.web3.LAMPORTS_PER_SOL
    );

    // Create token mint
    mint = await createMint(
      provider.connection,
      authority,
      authority.publicKey,
      null,
      9
    );

    // Create token accounts
    authorityTokenAccount = await createAccount(
      provider.connection,
      authority,
      mint,
      authority.publicKey
    );

    buyerTokenAccount = await createAccount(
      provider.connection,
      buyer,
      mint,
      buyer.publicKey
    );

    // Mint tokens to buyer
    await mintTo(
      provider.connection,
      authority,
      mint,
      buyerTokenAccount,
      authority,
      1000000000 // 1 token with 9 decimals
    );

    // Find PDAs
    [drmStatePda] = PublicKey.findProgramAddressSync(
      [Buffer.from("drm_state")],
      program.programId
    );

    [contentPda] = PublicKey.findProgramAddressSync(
      [Buffer.from("content"), Buffer.from(contentId)],
      program.programId
    );

    [licensePda] = PublicKey.findProgramAddressSync(
      [Buffer.from("license"), Buffer.from(licenseId)],
      program.programId
    );
  });

  it("Initializes the DRM program", async () => {
    await program.methods
      .initialize()
      .accounts({
        drmState: drmStatePda,
        authority: authority.publicKey,
        systemProgram: SystemProgram.programId,
      })
      .signers([authority])
      .rpc();

    const drmState = await program.account.drmState.fetch(drmStatePda);
    assert.equal(drmState.authority.toString(), authority.publicKey.toString());
    assert.equal(drmState.totalContent.toNumber(), 0);
    assert.equal(drmState.totalLicenses.toNumber(), 0);
  });

  it("Creates content", async () => {
    const price = new anchor.BN(100000000); // 0.1 tokens
    const maxLicenses = 100;

    await program.methods
      .createContent(contentId, contentHash, price, maxLicenses)
      .accounts({
        content: contentPda,
        drmState: drmStatePda,
        authority: authority.publicKey,
        systemProgram: SystemProgram.programId,
        contentId: contentPda, // Using PDA as content ID for simplicity
      })
      .signers([authority])
      .rpc();

    const content = await program.account.content.fetch(contentPda);
    assert.equal(content.authority.toString(), authority.publicKey.toString());
    assert.equal(content.contentId, contentId);
    assert.equal(content.contentHash, contentHash);
    assert.equal(content.price.toNumber(), price.toNumber());
    assert.equal(content.maxLicenses, maxLicenses);
    assert.equal(content.currentLicenses, 0);
    assert.equal(content.isActive, true);

    // Check DRM state updated
    const drmState = await program.account.drmState.fetch(drmStatePda);
    assert.equal(drmState.totalContent.toNumber(), 1);
  });

  it("Purchases a license", async () => {
    const price = new anchor.BN(100000000); // 0.1 tokens

    await program.methods
      .purchaseLicense(licenseId)
      .accounts({
        license: licensePda,
        content: contentPda,
        drmState: drmStatePda,
        buyer: buyer.publicKey,
        buyerTokenAccount: buyerTokenAccount,
        authorityTokenAccount: authorityTokenAccount,
        authority: contentPda, // Using content PDA as authority
        tokenProgram: TOKEN_PROGRAM_ID,
        systemProgram: SystemProgram.programId,
        licenseId: licensePda, // Using PDA as license ID for simplicity
      })
      .signers([buyer])
      .rpc();

    const license = await program.account.license.fetch(licensePda);
    assert.equal(license.authority.toString(), authority.publicKey.toString());
    assert.equal(license.owner.toString(), buyer.publicKey.toString());
    assert.equal(license.content.toString(), contentPda.toString());
    assert.equal(license.licenseId, licenseId);
    assert.equal(license.isActive, true);

    // Check content updated
    const content = await program.account.content.fetch(contentPda);
    assert.equal(content.currentLicenses, 1);

    // Check DRM state updated
    const drmState = await program.account.drmState.fetch(drmStatePda);
    assert.equal(drmState.totalLicenses.toNumber(), 1);
  });

  it("Verifies access to content", async () => {
    await program.methods
      .verifyAccess()
      .accounts({
        license: licensePda,
        content: contentPda,
        user: buyer.publicKey,
      })
      .signers([buyer])
      .rpc();

    // If we reach here, access was verified successfully
    assert(true);
  });

  it("Fails to verify access with wrong user", async () => {
    const wrongUser = Keypair.generate();
    await provider.connection.requestAirdrop(
      wrongUser.publicKey,
      1 * anchor.web3.LAMPORTS_PER_SOL
    );

    try {
      await program.methods
        .verifyAccess()
        .accounts({
          license: licensePda,
          content: contentPda,
          user: wrongUser.publicKey,
        })
        .signers([wrongUser])
        .rpc();
      assert.fail("Should have failed with unauthorized access");
    } catch (error) {
      assert.include(error.message, "Unauthorized access");
    }
  });

  it("Updates content details", async () => {
    const newPrice = new anchor.BN(200000000); // 0.2 tokens
    const newMaxLicenses = 200;

    await program.methods
      .updateContent(newPrice, newMaxLicenses, null)
      .accounts({
        content: contentPda,
        authority: authority.publicKey,
      })
      .signers([authority])
      .rpc();

    const content = await program.account.content.fetch(contentPda);
    assert.equal(content.price.toNumber(), newPrice.toNumber());
    assert.equal(content.maxLicenses, newMaxLicenses);
  });

  it("Revokes a license", async () => {
    await program.methods
      .revokeLicense()
      .accounts({
        license: licensePda,
        content: contentPda,
        authority: authority.publicKey,
      })
      .signers([authority])
      .rpc();

    const license = await program.account.license.fetch(licensePda);
    assert.equal(license.isActive, false);

    const content = await program.account.content.fetch(contentPda);
    assert.equal(content.currentLicenses, 0);
  });
});
