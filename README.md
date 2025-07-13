# Solana DRM System

A complete DRM (Digital Rights Management) system based on the Solana blockchain. Provides NFT and token-based digital content protection solutions.

![Solana DRM](https://img.shields.io/badge/Solana-DRM%20System-purple?style=for-the-badge&logo=solana)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![React Native](https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white)

## 📋 Table of Contents

- [Overview](#-overview)
- [Key Features](#-key-features)
- [Project Structure](#-project-structure)
- [Quick Start](#-quick-start)
- [Installation & Setup](#-installation--setup)
- [Usage](#-usage)
- [API Reference](#-api-reference)
- [Scenario Examples](#-scenario-examples)
- [Tech Stack](#-tech-stack)
- [Contributing](#-contributing)
- [License](#-license)

## 🎯 Overview

Solana DRM System is a complete solution for managing digital content access rights using blockchain technology.

### Core Features

- 🔐 **NFT/Token-based Access Control**: Control content access through specific NFT ownership or token balance
- 📱 **Cross-platform Support**: React Native mobile app and web admin tools
- ⚡ **Real-time Verification**: Real-time permission verification through Solana blockchain
- 📊 **Comprehensive Dashboard**: Admin dashboard with statistics, monitoring, and analytics features
- 🔧 **Developer-friendly**: TypeScript SDK and simple API

## ✨ Key Features

### 🎮 Mobile App (React Native)

- Wallet connection and management
- Real-time DRM access permission verification
- Protected content display
- User-friendly interface

### 🖥️ Admin Dashboard (Next.js)

- **📊 Real-time Statistics**: Package count, DRM check count, success rate, active users
- **⚡ Quick Actions**: DRM check, package registration, analytics shortcuts
- **📈 Recent Activity**: Real-time DRM check and package registration logs
- **🔍 System Monitoring**: Solana network, DRM program, API service status
- **📦 Package Management**: App package registration and DRM policy settings
- **🔐 Permission Verification**: Real-time DRM status check by wallet

### ⛓️ Blockchain Program (Solana)

- Package information blockchain storage
- DRM policy management
- License issuance and verification
- Real-time access permission verification

### 📚 SDK & Core Library

- TypeScript-based SDK
- NFT/Token ownership verification
- Package-based DRM checking
- Developer-friendly API

## 🏗️ Project Structure

```
solana-drm/
├── 📱 solana-drm-example/     # React Native mobile app (demo)
│   ├── screens/
│   │   └── MainScreen.tsx     # Main screen
│   ├── components/            # Reusable components
│   └── package.json
├── 🖥️ solana-drm-admin/       # Next.js admin dashboard
│   ├── src/app/
│   │   └── page.tsx          # Dashboard main page
│   └── package.json
├── ⛓️ solana-drm-program/     # Solana smart contract
│   ├── programs/
│   │   └── solana-drm-program/
│   │       └── src/
│   │           └── lib.rs    # Main program logic
│   └── package.json
├── 📚 solana-drm-sdk/        # JavaScript/TypeScript SDK
│   ├── src/
│   │   ├── solana-drm.ts     # Main SDK class
│   │   ├── types.ts          # Type definitions
│   │   └── index.ts          # Entry point
│   └── package.json
├── 🔧 solana-drm-core/       # Shared library
│   ├── src/
│   │   ├── drmUtils.ts       # DRM utility functions
│   │   └── index.ts          # Entry point
│   └── package.json
└── 📖 README.md
```

## 🚀 Quick Start

### 1. Clone Repository

```bash
git clone https://github.com/your-username/solana-drm.git
cd solana-drm
```

### 2. Install Dependencies

```bash
# Install all project dependencies
npm run install:all

# Or install individually
cd solana-drm-core && npm install
cd ../solana-drm-sdk && npm install
cd ../solana-drm-admin && npm install
cd ../solana-drm-example && npm install
cd ../solana-drm-program && npm install
```

### 3. Start Development Server

```bash
# Start admin dashboard
cd solana-drm-admin
npm run dev
# Access at http://localhost:3000

# Run mobile app (Android)
cd solana-drm-example
npm run android

# Deploy Solana program
cd solana-drm-program
anchor deploy
```

## ⚙️ Installation & Setup

### Prerequisites

- **Node.js** 18.0.0 or higher
- **npm** 8.0.0 or higher
- **Solana CLI** 1.16.0 or higher
- **Anchor Framework** 0.28.0 or higher
- **Android Studio** (for mobile app development)
- **Xcode** (for iOS development, macOS only)

### Detailed Setup Guide

#### 1. Solana Development Environment Setup

```bash
# Install Solana CLI
sh -c "$(curl -sSfL https://release.solana.com/v1.16.0/install)"

# Set development network
solana config set --url devnet

# Create wallet
solana-keygen new

# Get test SOL
solana airdrop 2
```

#### 2. Anchor Framework Setup

```bash
# Install Anchor CLI
cargo install --git https://github.com/coral-xyz/anchor avm --locked --force

# Build project
cd solana-drm-program
anchor build
```

#### 3. Mobile App Setup

```bash
cd solana-drm-example

# Android setup
npm run android:setup

# iOS setup (macOS only)
cd ios && pod install && cd ..
npm run ios:setup
```

## 📖 Usage

### Admin Dashboard Usage

#### 1. Access Dashboard

```bash
cd solana-drm-admin
npm run dev
```

Access at `http://localhost:3000` in your browser

#### 2. Register Package

1. Select **Register Package** tab
2. Enter package information:
   - Package Name: `com.example.app`
   - DRM Type: NFT, Token, or Mixed
   - NFT Mint Addresses: Required NFT addresses
   - Token Mint Address: Required token address
   - Min Token Amount: Minimum token amount
3. Click **Register Package** button

#### 3. Check DRM Access Permissions

1. Select **DRM Check** tab
2. Enter wallet address
3. Configure DRM type and settings
4. Click **Check DRM Access** button

#### 4. Dashboard Monitoring

- **Statistics Cards**: Check real-time system statistics
- **Recent Activity**: Recent DRM check and package registration logs
- **System Status**: Monitor network and service status

### Mobile App Usage

#### 1. Run App

```bash
cd solana-drm-example
npm run android  # or npm run ios
```

#### 2. Connect Wallet

1. Click **Connect Wallet** button
2. Select supported wallet (Phantom, Solflare, etc.)
3. Approve connection in wallet

#### 3. Check DRM Status

- App automatically performs package-based DRM check
- Display or restrict content based on access permissions

### SDK Usage

#### 1. Install SDK

```bash
npm install @solana-drm/sdk
```

#### 2. Basic Usage

```typescript
import { SolanaDRM } from "@solana-drm/sdk";

const drm = new SolanaDRM();

// Check package-based access permissions
const result = await drm.checkPackageAccess(walletAddress, "com.example.app");

if (result.hasAccess) {
  console.log("Access granted");
} else {
  console.log("Access denied");
}
```

#### 3. Check with Direct DRM Configuration

```typescript
const drmConfig = {
  nftMintAddresses: ["NFT_MINT_ADDRESS_1", "NFT_MINT_ADDRESS_2"],
  tokenMintAddress: "TOKEN_MINT_ADDRESS",
  minTokenAmount: 10,
};

const hasAccess = await drm.checkDrmAccess(walletAddress, drmConfig);
```

## 🔌 API Reference

### SolanaDRM Class

#### Constructor

```typescript
new SolanaDRM(connection?: Connection)
```

#### Methods

##### `checkPackageAccess(walletAddress: string, packageName: string)`

Check DRM access permissions by package name

**Parameters:**

- `walletAddress`: Wallet address to check
- `packageName`: App package name

**Returns:**

```typescript
{
  hasAccess: boolean;
  packageInfo?: {
    drmType: string;
    nftMintAddresses: string[];
    tokenMintAddress?: string;
    minTokenAmount?: number;
  };
}
```

##### `checkDrmAccess(walletAddress: string, drmConfig: DrmConfig)`

Check access permissions with direct DRM configuration

**Parameters:**

- `walletAddress`: Wallet address to check
- `drmConfig`: DRM configuration object

**Returns:**

```typescript
boolean;
```

##### `registerPackage(packageInfo: PackageInfo)`

Register new package

**Parameters:**

```typescript
{
  packageName: string;
  drmType: "nft" | "token" | "mixed";
  nftMintAddresses?: string[];
  tokenMintAddress?: string;
  minTokenAmount?: number;
}
```

### DrmConfig Type

```typescript
interface DrmConfig {
  nftMintAddresses?: string[];
  tokenMintAddress?: string;
  minTokenAmount?: number;
}
```

## 🎮 Scenario Examples

### Scenario 1: Premium Game App

#### 1. Game Developer Setup

```typescript
// Register package in admin
const packageInfo = {
  packageName: "com.gamedev.premiumgame",
  drmType: "nft",
  nftMintAddresses: ["GAME_PURCHASE_NFT_ADDRESS"],
};

await drm.registerPackage(packageInfo);
```

#### 2. User App Execution

```typescript
// Automatically check DRM in app
const result = await drm.checkPackageAccess(
  userWalletAddress,
  "com.gamedev.premiumgame"
);

if (result.hasAccess) {
  showGame(); // Display game
} else {
  showPurchasePrompt(); // Show purchase prompt
}
```

### Scenario 2: VIP Membership App

#### 1. Content Provider Setup

```typescript
const packageInfo = {
  packageName: "com.content.vipapp",
  drmType: "mixed",
  nftMintAddresses: ["VIP_MEMBERSHIP_NFT"],
  tokenMintAddress: "PREMIUM_TOKEN",
  minTokenAmount: 10,
};

await drm.registerPackage(packageInfo);
```

#### 2. User Access Verification

```typescript
const result = await drm.checkPackageAccess(
  userWalletAddress,
  "com.content.vipapp"
);

if (result.hasAccess) {
  showVipContent(); // Display VIP content
} else {
  showMembershipPrompt(); // Show membership prompt
}
```

### Scenario 3: Token-based Service

#### 1. Service Provider Setup

```typescript
const packageInfo = {
  packageName: "com.service.tokenapp",
  drmType: "token",
  tokenMintAddress: "SERVICE_TOKEN",
  minTokenAmount: 100,
};

await drm.registerPackage(packageInfo);
```

#### 2. Usage-based Access

```typescript
const result = await drm.checkPackageAccess(
  userWalletAddress,
  "com.service.tokenapp"
);

if (result.hasAccess) {
  provideService(); // Provide service
} else {
  showTokenPurchase(); // Show token purchase prompt
}
```

## 🛠️ Tech Stack

### Frontend

- **React Native**: Mobile app development
- **Next.js**: Admin dashboard
- **TypeScript**: Type safety
- **Tailwind CSS**: Styling

### Backend & Blockchain

- **Solana**: Blockchain platform
- **Anchor Framework**: Smart contract development
- **Rust**: Smart contract language
- **@solana/web3.js**: Solana JavaScript API

### Development Tools

- **npm**: Package management
- **ESLint**: Code quality
- **Prettier**: Code formatting
- **TypeScript**: Static type checking

## 🤝 Contributing

If you want to contribute to the project, follow these steps:

### 1. Fork & Clone

```bash
git clone https://github.com/your-username/solana-drm.git
cd solana-drm
```

### 2. Create Development Branch

```bash
git checkout -b feature/your-feature-name
```

### 3. Commit Changes

```bash
git add .
git commit -m "feat: add your feature description"
```

### 4. Create Pull Request

Create a Pull Request on GitHub and describe your changes.

### Development Guidelines

- **Code Style**: Follow TypeScript, ESLint rules
- **Commit Messages**: Use Conventional Commits format
- **Testing**: Write test code for new features
- **Documentation**: Update API change documentation

## 📄 License

This project is distributed under the MIT License. See the [LICENSE](LICENSE) file for details.

## 📞 Support

- **Issue Reporting**: [GitHub Issues](https://github.com/your-username/solana-drm/issues)
- **Documentation**: [Wiki](https://github.com/your-username/solana-drm/wiki)
- **Discussions**: [GitHub Discussions](https://github.com/your-username/solana-drm/discussions)

## 🙏 Acknowledgments

- [Solana Labs](https://solana.com/) - Blockchain platform
- [Anchor Framework](https://www.anchor-lang.com/) - Smart contract development tools
- [React Native](https://reactnative.dev/) - Mobile app development
- [Next.js](https://nextjs.org/) - React framework

---

⭐ If this project helped you, please give it a star!
