# Solana DRM System

솔라나 블록체인 기반의 완전한 DRM(Digital Rights Management) 시스템입니다. NFT와 토큰 기반의 디지털 콘텐츠 보호 솔루션을 제공합니다.

![Solana DRM](https://img.shields.io/badge/Solana-DRM%20System-purple?style=for-the-badge&logo=solana)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![React Native](https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white)

## 📋 목차

- [개요](#-개요)
- [주요 기능](#-주요-기능)
- [프로젝트 구조](#-프로젝트-구조)
- [빠른 시작](#-빠른-시작)
- [설치 및 설정](#-설치-및-설정)
- [사용법](#-사용법)
- [API 참조](#-api-참조)
- [시나리오 예제](#-시나리오-예제)
- [기술 스택](#-기술-스택)
- [기여하기](#-기여하기)
- [라이선스](#-라이선스)

## 🎯 개요

Solana DRM System은 블록체인 기술을 활용하여 디지털 콘텐츠의 접근 권한을 관리하는 완전한 솔루션입니다.

### 핵심 특징

- 🔐 **NFT/토큰 기반 접근 제어**: 특정 NFT 소유권이나 토큰 잔액으로 콘텐츠 접근 제어
- 📱 **크로스 플랫폼 지원**: React Native 모바일 앱과 웹 관리자 도구
- ⚡ **실시간 검증**: 솔라나 블록체인을 통한 실시간 권한 검증
- 📊 **종합적인 대시보드**: 통계, 모니터링, 분석 기능이 포함된 관리자 대시보드
- 🔧 **개발자 친화적**: TypeScript SDK와 간단한 API 제공

## ✨ 주요 기능

### 🎮 모바일 앱 (React Native)

- 지갑 연결 및 관리
- 실시간 DRM 접근 권한 확인
- 보호된 콘텐츠 표시
- 사용자 친화적 인터페이스

### 🖥️ 관리자 대시보드 (Next.js)

- **📊 실시간 통계**: 패키지 수, DRM 체크 수, 성공률, 활성 사용자
- **⚡ 빠른 액션**: DRM 체크, 패키지 등록, 분석 바로가기
- **📈 최근 활동**: 실시간 DRM 체크 및 패키지 등록 기록
- **🔍 시스템 모니터링**: Solana 네트워크, DRM 프로그램, API 서비스 상태
- **📦 패키지 관리**: 앱 패키지 등록 및 DRM 정책 설정
- **🔐 권한 검증**: 지갑별 실시간 DRM 상태 체크

### ⛓️ 블록체인 프로그램 (Solana)

- 패키지 정보 블록체인 저장
- DRM 정책 관리
- 라이센스 발급 및 검증
- 접근 권한 실시간 확인

### 📚 SDK & Core Library

- TypeScript 기반 SDK
- NFT/토큰 소유권 확인
- 패키지 기반 DRM 체크
- 개발자 친화적 API

## 🏗️ 프로젝트 구조

```
solana-drm/
├── 📱 solana-drm-example/     # React Native 모바일 앱 (데모)
│   ├── screens/
│   │   └── MainScreen.tsx     # 메인 화면
│   ├── components/            # 재사용 가능한 컴포넌트들
│   └── package.json
├── 🖥️ solana-drm-admin/       # Next.js 관리자 대시보드
│   ├── src/app/
│   │   └── page.tsx          # 대시보드 메인 페이지
│   └── package.json
├── ⛓️ solana-drm-program/     # 솔라나 스마트 컨트랙트
│   ├── programs/
│   │   └── solana-drm-program/
│   │       └── src/
│   │           └── lib.rs    # 메인 프로그램 로직
│   └── package.json
├── 📚 solana-drm-sdk/        # JavaScript/TypeScript SDK
│   ├── src/
│   │   ├── solana-drm.ts     # 메인 SDK 클래스
│   │   ├── types.ts          # 타입 정의
│   │   └── index.ts          # 엔트리포인트
│   └── package.json
├── 🔧 solana-drm-core/       # 공유 라이브러리
│   ├── src/
│   │   ├── drmUtils.ts       # DRM 유틸리티 함수들
│   │   └── index.ts          # 엔트리포인트
│   └── package.json
└── 📖 README.md
```

## 🚀 빠른 시작

### 1. 저장소 클론

```bash
git clone https://github.com/your-username/solana-drm.git
cd solana-drm
```

### 2. 의존성 설치

```bash
# 전체 프로젝트 의존성 설치
npm run install:all

# 또는 개별 설치
cd solana-drm-core && npm install
cd ../solana-drm-sdk && npm install
cd ../solana-drm-admin && npm install
cd ../solana-drm-example && npm install
cd ../solana-drm-program && npm install
```

### 3. 개발 서버 실행

```bash
# 관리자 대시보드 실행
cd solana-drm-admin
npm run dev
# http://localhost:3000 접속

# 모바일 앱 실행 (Android)
cd solana-drm-example
npm run android

# 솔라나 프로그램 배포
cd solana-drm-program
anchor deploy
```

## ⚙️ 설치 및 설정

### 필수 요구사항

- **Node.js** 18.0.0 이상
- **npm** 8.0.0 이상
- **Solana CLI** 1.16.0 이상
- **Anchor Framework** 0.28.0 이상
- **Android Studio** (모바일 앱 개발용)
- **Xcode** (iOS 개발용, macOS만)

### 상세 설정 가이드

#### 1. Solana 개발 환경 설정

```bash
# Solana CLI 설치
sh -c "$(curl -sSfL https://release.solana.com/v1.16.0/install)"

# 개발 네트워크 설정
solana config set --url devnet

# 지갑 생성
solana-keygen new

# 테스트 SOL 받기
solana airdrop 2
```

#### 2. Anchor Framework 설정

```bash
# Anchor CLI 설치
cargo install --git https://github.com/coral-xyz/anchor avm --locked --force

# 프로젝트 빌드
cd solana-drm-program
anchor build
```

#### 3. 모바일 앱 설정

```bash
cd solana-drm-example

# Android 설정
npm run android:setup

# iOS 설정 (macOS만)
cd ios && pod install && cd ..
npm run ios:setup
```

## 📖 사용법

### 관리자 대시보드 사용법

#### 1. 대시보드 접속

```bash
cd solana-drm-admin
npm run dev
```

브라우저에서 `http://localhost:3000` 접속

#### 2. 패키지 등록

1. **Register Package** 탭 선택
2. 패키지 정보 입력:
   - Package Name: `com.example.app`
   - DRM Type: NFT, Token, 또는 Mixed
   - NFT Mint Addresses: 필요한 NFT 주소들
   - Token Mint Address: 필요한 토큰 주소
   - Min Token Amount: 최소 토큰 수량
3. **Register Package** 버튼 클릭

#### 3. DRM 접근 권한 확인

1. **DRM Check** 탭 선택
2. 지갑 주소 입력
3. DRM 타입 및 설정 구성
4. **Check DRM Access** 버튼 클릭

#### 4. 대시보드 모니터링

- **통계 카드**: 실시간 시스템 통계 확인
- **최근 활동**: 최근 DRM 체크 및 패키지 등록 기록
- **시스템 상태**: 네트워크 및 서비스 상태 모니터링

### 모바일 앱 사용법

#### 1. 앱 실행

```bash
cd solana-drm-example
npm run android  # 또는 npm run ios
```

#### 2. 지갑 연결

1. **Connect Wallet** 버튼 클릭
2. 지원되는 지갑 선택 (Phantom, Solflare 등)
3. 지갑에서 연결 승인

#### 3. DRM 상태 확인

- 앱이 자동으로 패키지 기반 DRM 체크 수행
- 접근 권한에 따라 콘텐츠 표시 또는 제한

### SDK 사용법

#### 1. SDK 설치

```bash
npm install @solana-drm/sdk
```

#### 2. 기본 사용법

```typescript
import { SolanaDRM } from "@solana-drm/sdk";

const drm = new SolanaDRM();

// 패키지 기반 접근 권한 확인
const result = await drm.checkPackageAccess(walletAddress, "com.example.app");

if (result.hasAccess) {
  console.log("접근 허용");
} else {
  console.log("접근 거부");
}
```

#### 3. 직접 DRM 설정으로 확인

```typescript
const drmConfig = {
  nftMintAddresses: ["NFT_MINT_ADDRESS_1", "NFT_MINT_ADDRESS_2"],
  tokenMintAddress: "TOKEN_MINT_ADDRESS",
  minTokenAmount: 10,
};

const hasAccess = await drm.checkDrmAccess(walletAddress, drmConfig);
```

## 🔌 API 참조

### SolanaDRM 클래스

#### 생성자

```typescript
new SolanaDRM(connection?: Connection)
```

#### 메서드

##### `checkPackageAccess(walletAddress: string, packageName: string)`

패키지 이름으로 DRM 접근 권한 확인

**매개변수:**

- `walletAddress`: 확인할 지갑 주소
- `packageName`: 앱 패키지 이름

**반환값:**

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

직접 DRM 설정으로 접근 권한 확인

**매개변수:**

- `walletAddress`: 확인할 지갑 주소
- `drmConfig`: DRM 설정 객체

**반환값:**

```typescript
boolean;
```

##### `registerPackage(packageInfo: PackageInfo)`

새로운 패키지 등록

**매개변수:**

```typescript
{
  packageName: string;
  drmType: "nft" | "token" | "mixed";
  nftMintAddresses?: string[];
  tokenMintAddress?: string;
  minTokenAmount?: number;
}
```

### DrmConfig 타입

```typescript
interface DrmConfig {
  nftMintAddresses?: string[];
  tokenMintAddress?: string;
  minTokenAmount?: number;
}
```

## 🎮 시나리오 예제

### 시나리오 1: 프리미엄 게임 앱

#### 1. 게임 개발사 설정

```typescript
// 어드민에서 패키지 등록
const packageInfo = {
  packageName: "com.gamedev.premiumgame",
  drmType: "nft",
  nftMintAddresses: ["GAME_PURCHASE_NFT_ADDRESS"],
};

await drm.registerPackage(packageInfo);
```

#### 2. 사용자 앱 실행

```typescript
// 앱에서 자동으로 DRM 체크
const result = await drm.checkPackageAccess(
  userWalletAddress,
  "com.gamedev.premiumgame"
);

if (result.hasAccess) {
  showGame(); // 게임 표시
} else {
  showPurchasePrompt(); // 구매 안내
}
```

### 시나리오 2: VIP 멤버십 앱

#### 1. 콘텐츠 제공자 설정

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

#### 2. 사용자 접근 확인

```typescript
const result = await drm.checkPackageAccess(
  userWalletAddress,
  "com.content.vipapp"
);

if (result.hasAccess) {
  showVipContent(); // VIP 콘텐츠 표시
} else {
  showMembershipPrompt(); // 멤버십 안내
}
```

### 시나리오 3: 토큰 기반 서비스

#### 1. 서비스 제공자 설정

```typescript
const packageInfo = {
  packageName: "com.service.tokenapp",
  drmType: "token",
  tokenMintAddress: "SERVICE_TOKEN",
  minTokenAmount: 100,
};

await drm.registerPackage(packageInfo);
```

#### 2. 사용량 기반 접근

```typescript
const result = await drm.checkPackageAccess(
  userWalletAddress,
  "com.service.tokenapp"
);

if (result.hasAccess) {
  provideService(); // 서비스 제공
} else {
  showTokenPurchase(); // 토큰 구매 안내
}
```

## 🛠️ 기술 스택

### Frontend

- **React Native**: 모바일 앱 개발
- **Next.js**: 관리자 대시보드
- **TypeScript**: 타입 안전성
- **Tailwind CSS**: 스타일링

### Backend & Blockchain

- **Solana**: 블록체인 플랫폼
- **Anchor Framework**: 스마트 컨트랙트 개발
- **Rust**: 스마트 컨트랙트 언어
- **@solana/web3.js**: Solana JavaScript API

### Development Tools

- **npm**: 패키지 관리
- **ESLint**: 코드 품질
- **Prettier**: 코드 포맷팅
- **TypeScript**: 정적 타입 검사

## 🤝 기여하기

프로젝트에 기여하고 싶으시다면 다음 단계를 따라주세요:

### 1. Fork & Clone

```bash
git clone https://github.com/your-username/solana-drm.git
cd solana-drm
```

### 2. 개발 브랜치 생성

```bash
git checkout -b feature/your-feature-name
```

### 3. 변경사항 커밋

```bash
git add .
git commit -m "feat: add your feature description"
```

### 4. Pull Request 생성

GitHub에서 Pull Request를 생성하고 변경사항을 설명해주세요.

### 개발 가이드라인

- **코드 스타일**: TypeScript, ESLint 규칙 준수
- **커밋 메시지**: Conventional Commits 형식 사용
- **테스트**: 새로운 기능에 대한 테스트 코드 작성
- **문서화**: API 변경사항 문서 업데이트

## 📄 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다. 자세한 내용은 [LICENSE](LICENSE) 파일을 참조하세요.

## 📞 지원

- **이슈 리포트**: [GitHub Issues](https://github.com/your-username/solana-drm/issues)
- **문서**: [Wiki](https://github.com/your-username/solana-drm/wiki)
- **토론**: [GitHub Discussions](https://github.com/your-username/solana-drm/discussions)

## 🙏 감사의 말

- [Solana Labs](https://solana.com/) - 블록체인 플랫폼
- [Anchor Framework](https://www.anchor-lang.com/) - 스마트 컨트랙트 개발 도구
- [React Native](https://reactnative.dev/) - 모바일 앱 개발
- [Next.js](https://nextjs.org/) - React 프레임워크

---

⭐ 이 프로젝트가 도움이 되었다면 스타를 눌러주세요!
