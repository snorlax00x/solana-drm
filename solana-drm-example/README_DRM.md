# Solana DRM App

A Solana blockchain-based DRM (Digital Rights Management) library and demo app.

## Features

- **Wallet Connection**: Solana wallet connection via Mobile Wallet Adapter
- **NFT Ownership Check**: Verify specific NFT ownership
- **SPL Token Balance Check**: Verify minimum token balance
- **DRM Access Control**: Content access control based on NFT/token ownership
- **Protected Content**: Premium content accessible only to authorized users

## Project Structure

```
solana-drm/
├── components/
│   ├── DrmStatus.tsx          # DRM status display component
│   ├── ProtectedContent.tsx   # Protected content component
│   └── ...                    # Original scaffold components
├── util/
│   └── drmUtils.ts            # DRM utility functions
├── screens/
│   └── MainScreen.tsx         # Main screen (DRM integration)
└── ...
```

## DRM Utility Functions

### `hasNft(connection, ownerPublicKey, nftMintAddress)`

Check if a specific NFT is owned.

### `hasTokenAmount(connection, ownerPublicKey, tokenMintAddress, minAmount)`

Check if a specific SPL token is owned above minimum amount.

### `hasAnyNft(connection, ownerPublicKey, nftMintAddresses)`

Check if any NFT from a list is owned.

### `checkDrmAccess(connection, ownerPublicKey, drmConfig)`

Check access permissions based on DRM configuration.

## Setup Instructions

### 1. DRM Configuration

Modify the `drmConfig` object in `MainScreen.tsx` to set actual NFT/token addresses:

```typescript
const drmConfig = {
  nftMintAddresses: ['YOUR_ACTUAL_NFT_MINT_ADDRESS_HERE'],
  tokenMintAddress: 'YOUR_ACTUAL_TOKEN_MINT_ADDRESS_HERE',
  minTokenAmount: 1,
};
```

### 2. Test NFT/Token Addresses

For development/testing, you can use:

- **Devnet NFT**: NFT addresses created on Solana Devnet
- **Devnet Token**: SPL token addresses created on Solana Devnet

## Usage

1. **Run App**: `npx react-native run-android`
2. **Connect Wallet**: Click "Connect wallet" button
3. **DRM Permission Check**: Automatically verify NFT/token ownership
4. **Content Access**: Access protected content if authorized

## Using as a Library

### 1. Import DRM Utility Functions

```typescript
import {checkDrmAccess, hasNft, hasTokenAmount} from './util/drmUtils';
```

### 2. Execute DRM Check

```typescript
const hasAccess = await checkDrmAccess(connection, walletPublicKey, {
  nftMintAddresses: ['NFT_MINT_ADDRESS'],
  tokenMintAddress: 'TOKEN_MINT_ADDRESS',
  minTokenAmount: 1,
});
```

### 3. Use in UI

```typescript
{
  hasAccess ? <YourProtectedComponent /> : <AccessDeniedMessage />;
}
```

## Security Considerations

- **Client-side Validation**: Current implementation only validates on client-side, can be bypassed
- **Server Validation**: Server-side validation required for production
- **Signature Verification**: Additional security with wallet signature verification recommended

## Development Environment

- React Native 0.71.4
- Solana Web3.js
- Mobile Wallet Adapter
- Android (recommended)

## Next Steps

1. **Set Real NFT/Token Addresses**
2. **Add Server Validation Logic**
3. **Implement More Complex DRM Rules**
4. **Add iOS Support**

## References

- [Solana Mobile React Native Docs](https://docs.solanamobile.com/react-native/overview)
- [Solana Web3.js](https://solana-labs.github.io/solana-web3.js/)
- [Mobile Wallet Adapter](https://docs.solanamobile.com/react-native/mobile-wallet-adapter)
