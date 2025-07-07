# Solana DRM

A Solana blockchain-based DRM (Digital Rights Management) library and demo app.

## 🚀 Features

- **Wallet Connection**: Solana wallet connection via Mobile Wallet Adapter
- **NFT Ownership Check**: Verify specific NFT ownership
- **SPL Token Balance Check**: Verify minimum token balance
- **DRM Access Control**: Content access control based on NFT/token ownership
- **Protected Content**: Premium content accessible only to authorized users

## 📱 Screenshots

<table>
  <tr>
    <td align="center">
      <img src="https://github.com/solana-mobile/solana-mobile-dapp-scaffold/assets/18451967/3d83d3dc-ab65-4a2c-881d-8a229f34e392" alt="Wallet Connection" width=300 />
    </td>
    <td align="center">
      <img src="https://github.com/solana-mobile/solana-mobile-dapp-scaffold/assets/18451967/2fd69bd4-834d-45e1-8c7a-f80b5b576c96" alt="DRM Status" width=300 />
    </td>
    <td align="center">
      <img src="https://github.com/solana-mobile/solana-mobile-dapp-scaffold/assets/18451967/cdd93c12-d9ff-4739-81af-92da5b90303a" alt="Protected Content" width=300 />
    </td>
  </tr>
</table>

## 🛠️ Tech Stack

- **React Native 0.71.4**: Mobile app development
- **Solana Web3.js**: Blockchain interaction
- **Mobile Wallet Adapter**: Wallet connection
- **TypeScript**: Type safety
- **Android**: Primary supported platform

## 📁 Project Structure

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

## 🚀 Getting Started

### Prerequisites

- Android development environment setup
- Android emulator or physical device
- MWA-compatible wallet app (Phantom, Solflare, etc.)

### Installation & Running

1. **Install Dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```

2. **Run Android App**

   ```bash
   npx react-native run-android
   ```

3. **Connect Wallet & Test**
   - Click "Connect wallet" button
   - Verify DRM permissions
   - Test protected content access

## 📚 DRM API

### `hasNft(connection, ownerPublicKey, nftMintAddress)`

Check if a specific NFT is owned.

### `hasTokenAmount(connection, ownerPublicKey, tokenMintAddress, minAmount)`

Check if a specific SPL token is owned above minimum amount.

### `hasAnyNft(connection, ownerPublicKey, nftMintAddresses)`

Check if any NFT from a list is owned.

### `checkDrmAccess(connection, ownerPublicKey, drmConfig)`

Check access permissions based on DRM configuration.

## ⚙️ Configuration

### DRM Configuration

Modify the `drmConfig` object in `MainScreen.tsx` to set actual NFT/token addresses:

```typescript
const drmConfig = {
  nftMintAddresses: ['YOUR_ACTUAL_NFT_MINT_ADDRESS_HERE'],
  tokenMintAddress: 'YOUR_ACTUAL_TOKEN_MINT_ADDRESS_HERE',
  minTokenAmount: 1,
};
```

## 🔒 Security Considerations

- **Client-side Validation**: Current implementation only validates on client-side, can be bypassed
- **Server Validation**: Server-side validation required for production
- **Signature Verification**: Additional security with wallet signature verification recommended

## 🎯 Hackathon Usage

- **Library Distribution**: Extract `util/drmUtils.ts` as separate package
- **Various DRM Rules**: Access control by NFT tiers, token amounts
- **Real NFT/Token Integration**: Test on Devnet, then apply to Mainnet

## 📖 Additional Documentation

- [DRM Detailed Guide](README_DRM.md): API documentation and usage
- [Solana Mobile React Native Docs](https://docs.solanamobile.com/react-native/overview)
- [Solana Web3.js](https://solana-labs.github.io/solana-web3.js/)

## 🤝 Contributing

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is distributed under the MIT License.

## 🙏 Acknowledgments

- [Solana Mobile](https://docs.solanamobile.com/) - Mobile development tools
- [React Native](https://reactnative.dev/) - Cross-platform development framework
