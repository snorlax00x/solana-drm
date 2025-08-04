# 🎬 Solana DRM Demo Setup Guide

## 📋 Demo Wallets Information

### Admin Wallet (Package Registration)

- **Public Key**: `CNKResE1JrZTDKJcncDqet4ZWD8hNQAJgTwsv8N5TbpG`
- **Balance**: ~1 SOL
- **Purpose**: Admin dashboard에서 패키지 등록용
- **Keypair File**: `demo-wallets/admin-wallet.json`

### User1 Wallet (With NFT Access)

- **Public Key**: `A2EdpqTf49MAQMLqbPYvZJPEZMjiUSiLzZYRysTED98X`
- **Balance**: 2 SOL
- **Purpose**: NFT를 소유한 사용자 시뮬레이션
- **Keypair File**: `demo-wallets/user1-wallet.json`

### User2 Wallet (Without NFT Access)

- **Public Key**: `7dGURf5jtacqXAAx2j22bpWmphhvMineXxEfY4LjkWQN`
- **Balance**: 1 SOL
- **Purpose**: NFT를 소유하지 않은 사용자 시뮬레이션
- **Keypair File**: `demo-wallets/user2-wallet.json`

## 🎮 Demo NFT Addresses

### Premium Game Access NFT

- **Name**: Premium Game Access NFT
- **Mint Address**: `GAME_PREMIUM_NFT_1234567890123456789012345678901234567890`
- **Description**: 프리미엄 게임 접근에 필요한 NFT

### VIP Content NFT

- **Name**: VIP Content NFT
- **Mint Address**: `VIP_CONTENT_NFT_1234567890123456789012345678901234567890`
- **Description**: VIP 콘텐츠 접근에 필요한 NFT

### Exclusive Feature NFT

- **Name**: Exclusive Feature NFT
- **Mint Address**: `EXCLUSIVE_FEATURE_NFT_1234567890123456789012345678901234567890`
- **Description**: 독점 기능 접근에 필요한 NFT

## 💰 Demo Token Addresses

### Premium Token

- **Name**: Premium Token
- **Mint Address**: `PREMIUM_TOKEN_1234567890123456789012345678901234567890`
- **Description**: 프리미엄 접근에 필요한 토큰

### VIP Token

- **Name**: VIP Token
- **Mint Address**: `VIP_TOKEN_1234567890123456789012345678901234567890`
- **Description**: VIP 접근에 필요한 토큰

## 📦 Demo Packages

### 1. Premium Game Package

- **Package Name**: `com.example.premiumgame`
- **DRM Type**: NFT-based
- **Required NFT**: Premium Game Access NFT
- **Description**: NFT 소유권이 필요한 프리미엄 게임

### 2. VIP App Package

- **Package Name**: `com.example.vipapp`
- **DRM Type**: Token-based
- **Required Token**: Premium Token
- **Min Amount**: 100
- **Description**: 최소 토큰 잔액이 필요한 VIP 앱

### 3. Exclusive Content Package

- **Package Name**: `com.example.exclusivecontent`
- **DRM Type**: Mixed (NFT + Token)
- **Required NFT**: VIP Content NFT
- **Required Token**: VIP Token
- **Min Amount**: 50
- **Description**: NFT와 토큰 모두 필요한 독점 콘텐츠

## 🎬 Demo Video Scenarios

### Scenario 1: NFT-based Access Control (추천)

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

### 1. Admin Dashboard 실행

```bash
cd solana-drm-admin
npm install
npm run dev
```

### 2. Mobile App 실행

```bash
cd solana-drm-example
npm install
npx react-native run-ios  # iOS
# 또는
npx react-native run-android  # Android
```

### 3. Solana Network 설정

```bash
solana config set --url devnet
```

## 📝 Demo Script

### 인트로 (30초)

- "Solana DRM System - 블록체인 기반 디지털 권한 관리"
- 시스템 아키텍처 소개

### 관리자 설정 (1분)

1. Admin Dashboard 접속
2. "Register Package" 탭
3. Package 등록 시연
4. 실시간 통계 확인

### 사용자 경험 (1.5분)

1. 모바일 앱 실행
2. 지갑 연결
3. DRM 검증 과정
4. 접근 허용/거부 시연

### 실시간 모니터링 (30초)

1. Dashboard에서 실시간 로그 확인
2. 통계 업데이트 확인

## 🔧 Troubleshooting

### 지갑 잔액 확인

```bash
solana balance [WALLET_ADDRESS] --keypair [KEYPAIR_FILE]
```

### 새로운 지갑 생성

```bash
solana-keygen new --outfile [FILENAME].json --no-bip39-passphrase
```

### SOL 에어드롭

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
