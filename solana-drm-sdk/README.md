# Solana DRM SDK

A Solana blockchain-based DRM (Digital Rights Management) SDK designed for easy integration by developers.

## Installation

```bash
npm install @solana-drm/sdk
```

## Basic Usage

### 1. Initialize SDK

```typescript
import { SolanaDRM } from "@solana-drm/sdk";

// Default configuration (devnet)
const drm = new SolanaDRM();

// Custom configuration
const drm = new SolanaDRM({
  network: "mainnet-beta",
  rpcUrl: "https://api.mainnet-beta.solana.com",
});
```

### 2. Check DRM Access

```typescript
// NFT-based access check
const result = await drm.checkAccess(walletAddress, {
  nftMintAddresses: ["NFT_MINT_ADDRESS_1", "NFT_MINT_ADDRESS_2"],
});

// Token-based access check
const result = await drm.checkAccess(walletAddress, {
  tokenMintAddress: "TOKEN_MINT_ADDRESS",
  minTokenAmount: 10,
});

// Mixed access check
const result = await drm.checkAccess(walletAddress, {
  nftMintAddresses: ["VIP_NFT_ADDRESS"],
  tokenMintAddress: "ACCESS_TOKEN_ADDRESS",
  minTokenAmount: 5,
});

console.log(result.hasAccess); // true/false
console.log(result.reason); // access reason
```

### 3. Get Wallet Information

```typescript
const walletInfo = await drm.getWalletInfo(walletAddress);
console.log(walletInfo.balance); // SOL balance
console.log(walletInfo.publicKey); // wallet address
```

### 4. Protect Content

```typescript
drm.protectContent({
  contentId: "premium-video-001",
  requirements: {
    nftMintAddresses: ["VIP_NFT_ADDRESS"],
    tokenMintAddress: "ACCESS_TOKEN_ADDRESS",
    minTokenAmount: 1,
  },
  metadata: {
    title: "Premium Video",
    description: "VIP members only",
  },
});
```

### 5. Check Connection Status

```typescript
const isConnected = await drm.isConnected();
const networkInfo = drm.getNetworkInfo();

console.log("Connected:", isConnected);
console.log("Network:", networkInfo.endpoint);
```

## React Native Example

```typescript
import React, { useState, useEffect } from "react";
import { SolanaDRM } from "@solana-drm/sdk";

const DRMComponent = () => {
  const [drm] = useState(() => new SolanaDRM());
  const [hasAccess, setHasAccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const checkAccess = async (walletAddress: string) => {
    setLoading(true);
    try {
      const result = await drm.checkAccess(walletAddress, {
        nftMintAddresses: ["YOUR_NFT_ADDRESS"],
      });
      setHasAccess(result.hasAccess);
    } catch (error) {
      console.error("DRM check failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {loading ? (
        <p>Checking...</p>
      ) : hasAccess ? (
        <p>Access Granted</p>
      ) : (
        <p>Access Denied</p>
      )}
    </div>
  );
};
```

## API Reference

### SolanaDRM Class

#### Constructor

```typescript
new SolanaDRM(config?: SDKConfig)
```

#### Methods

##### checkAccess(walletAddress: string, drmConfig: DRMConfig): Promise<AccessResult>

Check DRM access permissions for a wallet.

##### getWalletInfo(walletAddress: string): Promise<WalletInfo>

Get wallet information.

##### protectContent(config: ContentProtectionConfig): void

Set up content protection.

##### isConnected(): Promise<boolean>

Check connection status.

##### getNetworkInfo(): NetworkInfo

Get network information.

### Type Definitions

```typescript
interface DRMConfig {
  nftMintAddresses?: string[];
  tokenMintAddress?: string;
  minTokenAmount?: number;
}

interface AccessResult {
  hasAccess: boolean;
  reason?: string;
  details?: {
    nftOwned?: string[];
    tokenBalance?: number;
  };
}

interface WalletInfo {
  publicKey: string;
  balance?: number;
  nftCount?: number;
  tokenBalances?: Record<string, number>;
}
```

## License

MIT License
