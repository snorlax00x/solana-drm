import {Connection, PublicKey} from '@solana/web3.js';

/**
 * Check if a specific NFT is owned
 * @param connection Solana connection object
 * @param ownerPublicKey Owner wallet address
 * @param nftMintAddress NFT mint address to check
 * @returns NFT ownership status
 */
export async function hasNft(
  connection: Connection,
  ownerPublicKey: PublicKey,
  nftMintAddress: string,
): Promise<boolean> {
  try {
    const tokenAccounts = await connection.getParsedTokenAccountsByOwner(
      ownerPublicKey,
      {programId: new PublicKey('TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA')},
    );

    for (const {account} of tokenAccounts.value) {
      const info = account.data.parsed.info;
      if (
        info.mint === nftMintAddress &&
        info.tokenAmount.uiAmount === 1 &&
        info.tokenAmount.decimals === 0
      ) {
        return true;
      }
    }
    return false;
  } catch (error) {
    console.error('Error checking NFT ownership:', error);
    return false;
  }
}

/**
 * Check if a specific SPL token is owned above minimum amount
 * @param connection Solana connection object
 * @param ownerPublicKey Owner wallet address
 * @param tokenMintAddress Token mint address to check
 * @param minAmount Minimum amount to own
 * @returns Token ownership status
 */
export async function hasTokenAmount(
  connection: Connection,
  ownerPublicKey: PublicKey,
  tokenMintAddress: string,
  minAmount: number,
): Promise<boolean> {
  try {
    const tokenAccounts = await connection.getParsedTokenAccountsByOwner(
      ownerPublicKey,
      {programId: new PublicKey('TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA')},
    );

    for (const {account} of tokenAccounts.value) {
      const info = account.data.parsed.info;
      if (
        info.mint === tokenMintAddress &&
        Number(info.tokenAmount.uiAmount) >= minAmount
      ) {
        return true;
      }
    }
    return false;
  } catch (error) {
    console.error('Error checking token ownership:', error);
    return false;
  }
}

/**
 * Check if any NFT from a list is owned
 * @param connection Solana connection object
 * @param ownerPublicKey Owner wallet address
 * @param nftMintAddresses Array of NFT mint addresses to check
 * @returns NFT ownership status
 */
export async function hasAnyNft(
  connection: Connection,
  ownerPublicKey: PublicKey,
  nftMintAddresses: string[],
): Promise<boolean> {
  for (const mintAddress of nftMintAddresses) {
    if (await hasNft(connection, ownerPublicKey, mintAddress)) {
      return true;
    }
  }
  return false;
}

/**
 * DRM access permission check (NFT or token)
 * @param connection Solana connection object
 * @param ownerPublicKey Owner wallet address
 * @param drmConfig DRM configuration object
 * @returns Access permission status
 */
export async function checkDrmAccess(
  connection: Connection,
  ownerPublicKey: PublicKey,
  drmConfig: {
    nftMintAddresses?: string[];
    tokenMintAddress?: string;
    minTokenAmount?: number;
  },
): Promise<boolean> {
  try {
    // NFT check
    if (drmConfig.nftMintAddresses && drmConfig.nftMintAddresses.length > 0) {
      if (
        await hasAnyNft(connection, ownerPublicKey, drmConfig.nftMintAddresses)
      ) {
        return true;
      }
    }

    // Token check
    if (drmConfig.tokenMintAddress && drmConfig.minTokenAmount) {
      if (
        await hasTokenAmount(
          connection,
          ownerPublicKey,
          drmConfig.tokenMintAddress,
          drmConfig.minTokenAmount,
        )
      ) {
        return true;
      }
    }

    return false;
  } catch (error) {
    console.error('Error checking DRM access:', error);
    return false;
  }
}
