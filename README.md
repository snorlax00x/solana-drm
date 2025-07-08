# Solana DRM Monorepo

솔라나 블록체인 기반 DRM(Digital Rights Management) 시스템의 모노레포입니다.

## 프로젝트 구조

```
solana-drm/
├── solana-drm-core/      # 공유 라이브러리
│   ├── src/
│   │   ├── drmUtils.ts   # DRM 유틸리티 함수들
│   │   └── index.ts      # 엔트리포인트
│   ├── dist/             # 빌드된 JavaScript
│   └── package.json
├── solana-drm-example/   # React Native 모바일앱 (데모)
│   ├── screens/
│   │   └── MainScreen.tsx
│   └── package.json
├── solana-drm-admin/     # Next.js 운영툴
│   ├── src/app/
│   │   └── page.tsx      # DRM 관리 인터페이스
│   └── package.json
├── solana-drm-program/   # 솔라나 스마트 컨트랙트
│   ├── programs/
│   │   └── solana-drm-program/
│   │       └── src/
│   │           └── lib.rs
│   └── package.json
├── solana-drm-sdk/       # JavaScript SDK
│   ├── src/
│   │   ├── solana-drm.ts
│   │   ├── types.ts
│   │   └── index.ts
│   └── package.json
└── README.md
```

## 각 프로젝트 설명

### 1. solana-drm-core

- **목적**: DRM 관련 공통 로직과 유틸리티 함수
- **기능**:
  - NFT 소유권 확인
  - SPL 토큰 잔액 확인
  - DRM 접근 권한 검증
- **사용법**: `npm install @solana-drm/core`

### 2. solana-drm-example

- **목적**: React Native 모바일 앱 데모
- **기능**:
  - 지갑 연결
  - DRM 접근 권한 확인
  - 보호된 콘텐츠 표시
- **실행**: `cd solana-drm-example && npm run android`

### 3. solana-drm-admin

- **목적**: Next.js 기반 관리자 웹 인터페이스
- **기능**:
  - **패키지 등록**: 앱 패키지 이름과 DRM 타입 등록
  - **DRM 정책 설정**: NFT/토큰 기반 접근 권한 설정
  - **지갑별 접근 권한 확인**: 실시간 DRM 상태 체크
- **실행**: `cd solana-drm-admin && npm run dev`

### 4. solana-drm-program

- **목적**: 솔라나 블록체인 스마트 컨트랙트
- **기능**:
  - **패키지 등록**: 앱 패키지 정보를 블록체인에 저장
  - **DRM 설정 관리**: NFT/토큰 기반 접근 권한 관리
  - **라이센스 관리**: 콘텐츠 라이센스 발급 및 검증
- **배포**: `cd solana-drm-program && anchor deploy`

### 5. solana-drm-sdk

- **목적**: JavaScript/TypeScript SDK
- **기능**:
  - **패키지 기반 DRM 체크**: 앱 패키지 이름으로 DRM 정보 조회
  - **접근 권한 검증**: NFT/토큰 소유권 확인
  - **콘텐츠 보호**: DRM 설정 적용
- **사용법**: `npm install @solana-drm/sdk`

## DRM 시스템 작동 방식

### 1. 패키지 등록 (어드민)

1. **어드민 페이지 접속**: `http://localhost:3000`
2. **Package Registration 탭 선택**
3. **패키지 정보 입력**:
   - Package Name: `com.example.app`
   - DRM Type: NFT, Token, 또는 Mixed
   - NFT Mint Addresses: 필요한 NFT 주소들
   - Token Mint Address: 필요한 토큰 주소
   - Min Token Amount: 최소 토큰 수량
4. **Register Package 버튼 클릭**

### 2. 솔라나 블록체인 저장

등록된 패키지 정보는 솔라나 블록체인에 저장됩니다:

```rust
pub struct Package {
    pub authority: Pubkey,
    pub package_name: String,
    pub drm_type: String,
    pub nft_mint_addresses: Vec<String>,
    pub token_mint_address: Option<String>,
    pub min_token_amount: Option<u64>,
    pub is_active: bool,
    pub created_at: i64,
    pub bump: u8,
}
```

### 3. 앱에서 DRM 체크

앱이 실행될 때 패키지 이름으로 DRM 정보를 조회하고 검증합니다:

```typescript
import { SolanaDRM } from "@solana-drm/sdk";

const drm = new SolanaDRM();
const result = await drm.checkPackageAccess(walletAddress, "com.example.app");

if (result.hasAccess) {
  // 보호된 콘텐츠 표시
} else {
  // 접근 거부 메시지 표시
}
```

## DRM 타입

### 1. NFT 기반 접근 제어

특정 NFT를 소유한 지갑만 접근 가능:

```typescript
const drmConfig = {
  nftMintAddresses: ["NFT_MINT_ADDRESS_1", "NFT_MINT_ADDRESS_2"],
};
```

### 2. 토큰 기반 접근 제어

특정 토큰을 최소 수량 이상 보유한 지갑만 접근 가능:

```typescript
const drmConfig = {
  tokenMintAddress: "TOKEN_MINT_ADDRESS",
  minTokenAmount: 10,
};
```

### 3. 혼합 접근 제어

NFT와 토큰을 모두 요구하는 접근 제어:

```typescript
const drmConfig = {
  nftMintAddresses: ["VIP_NFT_ADDRESS"],
  tokenMintAddress: "ACCESS_TOKEN_ADDRESS",
  minTokenAmount: 5,
};
```

## 설치 및 실행

### 1. 전체 의존성 설치

```bash
# Core 라이브러리 빌드
cd solana-drm-core
npm install
npm run build

# SDK 빌드
cd ../solana-drm-sdk
npm install
npm run build

# Example 앱 설정
cd ../solana-drm-example
npm install

# Admin 툴 설정
cd ../solana-drm-admin
npm install

# Solana 프로그램 설정
cd ../solana-drm-program
npm install
```

### 2. 개발 서버 실행

```bash
# Admin 툴 실행 (웹)
cd solana-drm-admin
npm run dev

# Example 앱 실행 (모바일)
cd solana-drm-example
npm run android  # 또는 npm run ios

# Solana 프로그램 배포
cd solana-drm-program
anchor deploy
```

## 사용 시나리오

### 시나리오 1: 게임 앱 DRM

1. **게임 개발사**가 어드민에서 게임 패키지 등록:

   - Package: `com.gamedev.premiumgame`
   - DRM Type: NFT
   - NFT: 게임 구매 NFT 주소

2. **사용자**가 게임을 실행하면:
   - 앱이 `com.gamedev.premiumgame` 패키지로 DRM 체크
   - 사용자 지갑에 게임 구매 NFT가 있으면 접근 허용
   - 없으면 구매 안내 메시지 표시

### 시나리오 2: 프리미엄 콘텐츠 앱

1. **콘텐츠 제공자**가 어드미에서 앱 등록:

   - Package: `com.content.premiumapp`
   - DRM Type: Mixed
   - NFT: VIP 멤버십 NFT
   - Token: 프리미엄 토큰 (최소 10개)

2. **사용자**가 앱을 실행하면:
   - VIP NFT 소유 또는 프리미엄 토큰 10개 이상 보유 시 접근 허용
   - 둘 다 없으면 구독 안내 메시지 표시

## 기술 스택

- **Blockchain**: Solana
- **Smart Contract**: Anchor Framework (Rust)
- **Core Library**: TypeScript, @solana/web3.js
- **Mobile App**: React Native, Mobile Wallet Adapter
- **Admin Tool**: Next.js, Tailwind CSS
- **SDK**: TypeScript, @solana/web3.js
- **Package Manager**: npm

## 라이센스

MIT License
