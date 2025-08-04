# Solana DRM Contract Configuration

## 🚀 배포된 컨트랙트 설정 가이드

실제 배포된 Solana DRM 컨트랙트와 월렛들을 사용하기 위해 다음 정보들을 입력해주세요.

---

## 📝 설정해야 할 정보들

### 1. 컨트랙트 주소들

`src/utils/realDemoData.ts` 파일에서 다음 주소들을 실제 배포된 주소로 변경하세요:

```typescript
contracts: {
  // 메인 DRM 프로그램 ID
  drmProgram: "YOUR_DEPLOYED_DRM_PROGRAM_ID",
  // NFT 컬렉션 컨트랙트 ID
  nftCollection: "YOUR_DEPLOYED_NFT_COLLECTION_ID",
  // 토큰 컨트랙트 ID
  tokenContract: "YOUR_DEPLOYED_TOKEN_CONTRACT_ID",
}
```

### 2. 실제 월렛 주소들

```typescript
realWallets: {
  // 어드민 월렛
  admin: {
    address: "YOUR_ADMIN_WALLET_ADDRESS",
    // ...
  },
  // 프리미엄 사용자 월렛
  premium: {
    address: "YOUR_PREMIUM_WALLET_ADDRESS",
    // ...
  },
  // 스탠다드 사용자 월렛
  standard: {
    address: "YOUR_STANDARD_WALLET_ADDRESS",
    // ...
  },
  // 베이직 사용자 월렛
  basic: {
    address: "YOUR_BASIC_WALLET_ADDRESS",
    // ...
  }
}
```

### 3. NFT 컬렉션 정보

```typescript
realNftCollection: {
  collectionAddress: "YOUR_NFT_COLLECTION_ADDRESS",
  mintAddresses: [
    "YOUR_NFT_MINT_ADDRESS_1",
    "YOUR_NFT_MINT_ADDRESS_2",
    "YOUR_NFT_MINT_ADDRESS_3"
  ]
}
```

### 4. 토큰 정보

```typescript
realToken: {
  mintAddress: "YOUR_TOKEN_MINT_ADDRESS",
  // ...
}
```

---

## 🔧 설정 방법

### 1. 배포된 컨트랙트 정보 확인

```bash
# Solana 프로그램 배포 확인
solana program show YOUR_PROGRAM_ID

# NFT 컬렉션 확인
solana account YOUR_NFT_COLLECTION_ID

# 토큰 컨트랙트 확인
spl-token display YOUR_TOKEN_MINT_ADDRESS
```

### 2. 월렛 주소 확인

```bash
# 어드민 월렛 확인
solana address -k admin-wallet.json

# 사용자 월렛들 확인
solana address -k user1-wallet.json
solana address -k user2-wallet.json
solana address -k user3-wallet.json
```

### 3. NFT 민트 주소 확인

```bash
# NFT 민트 주소들 확인
spl-token accounts --owner YOUR_WALLET_ADDRESS
```

---

## 📱 데모 시나리오

### 시나리오 1: 어드민 액세스

1. **Admin** 콘텐츠 선택
2. **Admin Wallet** 연결
3. ✅ **Access Granted** (어드민 전용)

### 시나리오 2: 프리미엄 액세스

1. **Premium** 콘텐츠 선택
2. **Premium Wallet** 연결 (NFT 보유)
3. ✅ **Access Granted** (NFT 소유권 확인)

### 시나리오 3: 스탠다드 액세스

1. **Standard** 콘텐츠 선택
2. **Standard Wallet** 연결 (토큰 보유)
3. ✅ **Access Granted** (토큰 잔액 확인)

### 시나리오 4: 액세스 거부

1. **Premium** 콘텐츠 선택
2. **Basic Wallet** 연결 (최소 잔액)
3. ❌ **Access Denied** (요구사항 미충족)

---

## 🎬 데모 촬영 가이드

### 1. 어드민 데모 (30초)

```
"어드민 월렛으로 연결하면 모든 콘텐츠에 접근할 수 있습니다."
- Admin 콘텐츠 선택
- Admin Wallet 연결
- 모든 레벨에서 Access Granted 확인
```

### 2. 프리미엄 데모 (30초)

```
"프리미엄 사용자는 NFT를 소유하고 있어서 프리미엄 콘텐츠에 접근할 수 있습니다."
- Premium 콘텐츠 선택
- Premium Wallet 연결
- NFT 소유권 확인으로 Access Granted
```

### 3. 스탠다드 데모 (30초)

```
"스탠다드 사용자는 토큰을 보유하고 있어서 스탠다드 콘텐츠에 접근할 수 있습니다."
- Standard 콘텐츠 선택
- Standard Wallet 연결
- 토큰 잔액 확인으로 Access Granted
```

### 4. 액세스 거부 데모 (30초)

```
"베이직 사용자는 요구사항을 충족하지 못해 프리미엄 콘텐츠에 접근할 수 없습니다."
- Premium 콘텐츠 선택
- Basic Wallet 연결
- 요구사항 미충족으로 Access Denied
```

### 5. 동적 전환 데모 (45초)

```
"같은 월렛이지만 콘텐츠 레벨에 따라 다른 접근 권한을 가집니다."
- Standard Wallet 연결
- Premium 콘텐츠 → Access Denied
- Standard 콘텐츠 → Access Granted
- Basic 콘텐츠 → Access Granted
```

---

## ✅ 설정 완료 체크리스트

- [ ] DRM 프로그램 ID 입력
- [ ] NFT 컬렉션 주소 입력
- [ ] 토큰 민트 주소 입력
- [ ] 어드민 월렛 주소 입력
- [ ] 프리미엄 월렛 주소 입력
- [ ] 스탠다드 월렛 주소 입력
- [ ] 베이직 월렛 주소 입력
- [ ] NFT 민트 주소들 입력
- [ ] AppReal.tsx로 메인 앱 변경
- [ ] 테스트 실행 확인

---

## 🚀 실행 방법

설정 완료 후:

```bash
# AppReal.tsx를 메인 앱으로 사용
cp AppReal.tsx App.tsx

# 앱 실행
npx expo start

# 실제 디바이스에서 테스트
# QR 코드 스캔 또는 직접 연결
```

이제 실제 배포된 컨트랙트와 월렛들로 현실적인 데모를 촬영할 수 있습니다! 🎬
