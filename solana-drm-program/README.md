# Solana DRM Program

A decentralized Digital Rights Management (DRM) program built on Solana using the Anchor framework. This program provides secure, on-chain content licensing and access control for digital assets.

## Features

- **Content Management**: Create and manage digital content with metadata
- **License Management**: Purchase, verify, and revoke content licenses
- **Access Control**: Secure verification of user access to protected content
- **Token Payments**: Integrated SPL token payments for license purchases
- **Expiration Management**: Automatic license expiration handling
- **Authority Control**: Content creators maintain control over their assets

## Architecture

### Program State

The program maintains three main account types:

1. **DrmState**: Global program state tracking total content and licenses
2. **Content**: Individual content items with metadata and licensing info
3. **License**: User licenses for accessing specific content

### Key Functions

- `initialize()`: Initialize the DRM program
- `create_content()`: Create new content with pricing and license limits
- `purchase_license()`: Purchase a license for content using SPL tokens
- `verify_access()`: Verify user access to protected content
- `revoke_license()`: Revoke a user's license
- `update_content()`: Update content details (price, max licenses, etc.)

## Installation

### Prerequisites

- Rust 1.88.0 or later
- Node.js 20.18.0 or later
- Anchor CLI 0.31.1 or later
- Solana CLI tools

### Setup

1. Install Anchor:

```bash
cargo install --git https://github.com/coral-xyz/anchor avm --locked --force
avm install latest
```

2. Install dependencies:

```bash
npm install
```

3. Build the program:

```bash
anchor build
```

## Usage

### Development

1. Start a local validator:

```bash
solana-test-validator
```

2. Deploy the program:

```bash
anchor deploy
```

3. Run tests:

```bash
anchor test
```

### Program Interaction

#### Initialize Program

```typescript
await program.methods
  .initialize()
  .accounts({
    drmState: drmStatePda,
    authority: authority.publicKey,
    systemProgram: SystemProgram.programId,
  })
  .signers([authority])
  .rpc();
```

#### Create Content

```typescript
await program.methods
  .createContent(contentId, contentHash, price, maxLicenses)
  .accounts({
    content: contentPda,
    drmState: drmStatePda,
    authority: authority.publicKey,
    systemProgram: SystemProgram.programId,
    contentId: contentPda,
  })
  .signers([authority])
  .rpc();
```

#### Purchase License

```typescript
await program.methods
  .purchaseLicense(licenseId)
  .accounts({
    license: licensePda,
    content: contentPda,
    drmState: drmStatePda,
    buyer: buyer.publicKey,
    buyerTokenAccount: buyerTokenAccount,
    authorityTokenAccount: authorityTokenAccount,
    authority: contentPda,
    tokenProgram: TOKEN_PROGRAM_ID,
    systemProgram: SystemProgram.programId,
    licenseId: licensePda,
  })
  .signers([buyer])
  .rpc();
```

#### Verify Access

```typescript
await program.methods
  .verifyAccess()
  .accounts({
    license: licensePda,
    content: contentPda,
    user: user.publicKey,
  })
  .signers([user])
  .rpc();
```

## Security Features

- **PDA-based Accounts**: All accounts use Program Derived Addresses for security
- **Authority Verification**: Strict checks ensure only authorized users can perform actions
- **Token Integration**: Secure SPL token transfers for payments
- **Expiration Handling**: Automatic license expiration checks
- **Access Control**: Comprehensive verification of user permissions

## Error Handling

The program includes comprehensive error handling for:

- Content inactivity
- License unavailability
- License expiration
- Unauthorized access
- Invalid parameters

## Testing

The test suite covers:

- Program initialization
- Content creation and management
- License purchase and verification
- Access control validation
- Error condition handling

Run tests with:

```bash
anchor test
```

## Integration

This program is designed to integrate with:

- **solana-drm-sdk**: Developer-friendly SDK for program interaction
- **solana-drm-admin**: Admin interface for content management
- **solana-drm-example**: Example mobile application

## License

This project is licensed under the MIT License.
