# 🎬 Solana DRM Demo Setup Guide

## 📋 Demo Wallets Information

### Admin Wallet (Package Registration)

- **Public Key**: `CNKResE1JrZTDKJcncDqet4ZWD8hNQAJgTwsv8N5TbpG`
- **Balance**: ~1 SOL
- **Purpose**: Package registration in admin dashboard
- **Keypair File**: `demo-wallets/admin-wallet.json`

### User1 Wallet (With NFT Access)

- **Public Key**: `A2EdpqTf49MAQMLqbPYvZJPEZMjiUSiLzZYRysTED98X`
- **Balance**: 2 SOL
- **Purpose**: Simulate user with NFT ownership
- **Keypair File**: `demo-wallets/user1-wallet.json`

### User2 Wallet (Without NFT Access)

- **Public Key**: `7dGURf5jtacqXAAx2j22bpWmphhvMineXxEfY4LjkWQN`
- **Balance**: 1 SOL
- **Purpose**: Simulate user without NFT ownership
- **Keypair File**: `demo-wallets/user2-wallet.json`

## 🎮 Demo NFT Addresses

### Premium Game Access NFT

- **Name**: Premium Game Access NFT
- **Mint Address**: `GAME_PREMIUM_NFT_1234567890123456789012345678901234567890`
- **Description**: NFT required for premium game access

### VIP Content NFT

- **Name**: VIP Content NFT
- **Mint Address**: `VIP_CONTENT_NFT_1234567890123456789012345678901234567890`
- **Description**: NFT required for VIP content access

### Exclusive Feature NFT

- **Name**: Exclusive Feature NFT
- **Mint Address**: `EXCLUSIVE_FEATURE_NFT_1234567890123456789012345678901234567890`
- **Description**: NFT required for exclusive features

## 💰 Demo Token Addresses

### Premium Token

- **Name**: Premium Token
- **Mint Address**: `PREMIUM_TOKEN_1234567890123456789012345678901234567890`
- **Description**: Token required for premium access

### VIP Token

- **Name**: VIP Token
- **Mint Address**: `VIP_TOKEN_1234567890123456789012345678901234567890`
- **Description**: Token required for VIP access

## 📦 Demo Packages

### 1. Premium Game Package

- **Package Name**: `com.example.premiumgame`
- **DRM Type**: NFT-based
- **Required NFT**: Premium Game Access NFT
- **Description**: Premium game requiring NFT ownership

### 2. VIP App Package

- **Package Name**: `com.example.vipapp`
- **DRM Type**: Token-based
- **Required Token**: Premium Token
- **Min Amount**: 100
- **Description**: VIP app requiring minimum token balance

### 3. Exclusive Content Package

- **Package Name**: `com.example.exclusivecontent`
- **DRM Type**: Mixed (NFT + Token)
- **Required NFT**: VIP Content NFT
- **Required Token**: VIP Token
- **Min Amount**: 50
- **Description**: Exclusive content requiring both NFT and token

## 🎬 Demo Video Scenarios

### Scenario 1: NFT-based Access Control (Recommended)

1. **Admin Dashboard Setup**

   - Package Name: `com.example.premiumgame`
   - DRM Type: NFT
   - Required NFT: `GAME_PREMIUM_NFT_1234567890123456789012345678901234567890`

2. **User Testing**
   - User1 (with NFT): Access Granted ✅
   - User2 (without NFT): Access Denied ❌

### Scenario 2: Token-based Access Control

1. **Admin Dashboard Setup**

   - Package Name: `com.example.vipapp`
   - DRM Type: Token
   - Required Token: `PREMIUM_TOKEN_1234567890123456789012345678901234567890`
   - Min Amount: 100

2. **User Testing**
   - User with sufficient tokens: Access Granted ✅
   - User with insufficient tokens: Access Denied ❌

### Scenario 3: Mixed Access Control

1. **Admin Dashboard Setup**

   - Package Name: `com.example.exclusivecontent`
   - DRM Type: Mixed
   - Required NFT: `VIP_CONTENT_NFT_1234567890123456789012345678901234567890`
   - Required Token: `VIP_TOKEN_1234567890123456789012345678901234567890`
   - Min Amount: 50

2. **User Testing**
   - User with both NFT and tokens: Access Granted ✅
   - User missing either: Access Denied ❌

## 🚀 Demo Setup Commands

### 1. Admin Dashboard

```bash
cd solana-drm-admin
npm install
npm run dev
```

### 2. Mobile App

```bash
cd solana-drm-example
npm install
npx react-native run-ios  # iOS
# or
npx react-native run-android  # Android
```

### 3. Solana Network

```bash
solana config set --url devnet
```

## 📝 Demo Script

### Intro (30 seconds)

- "Solana DRM System - Blockchain-based Digital Rights Management"
- System architecture introduction

### Admin Setup (1 minute)

1. Access Admin Dashboard
2. "Register Package" tab
3. Package registration demo
4. Real-time statistics check

### User Experience (1.5 minutes)

1. Mobile app launch
2. Wallet connection
3. DRM verification process
4. Access granted/denied demo

### Real-time Monitoring (30 seconds)

1. Dashboard real-time logs
2. Statistics update check

## 🔧 Troubleshooting

### Check Wallet Balance

```bash
solana balance [WALLET_ADDRESS] --keypair [KEYPAIR_FILE]
```

### Create New Wallet

```bash
solana-keygen new --outfile [FILENAME].json --no-bip39-passphrase
```

### SOL Airdrop

```bash
solana airdrop 2 [WALLET_ADDRESS] --keypair [KEYPAIR_FILE]
```

## 📊 Expected Results

### NFT-based Test

- User1 (with NFT): ✅ Access granted
- User2 (without NFT): ❌ Access denied

### Token-based Test

- User with 100+ tokens: ✅ Access granted
- User with <100 tokens: ❌ Access denied

### Mixed Test

- User with both NFT and tokens: ✅ Access granted
- User missing either: ❌ Access denied

---

**Demo Data File**: `demo-data.json`
**Wallet Directory**: `demo-wallets/`
