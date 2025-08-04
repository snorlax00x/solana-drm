# 🎬 Solana DRM Demo Video Scenario

## 📋 Demo Overview

**제목**: "Solana DRM System - 블록체인 기반 디지털 권한 관리"
**길이**: 3-4분
**목표**: NFT 기반 프리미엄 게임 접근 제어 시연

---

## 🎯 Main Scenario: Premium Game Access Control

### **시나리오 개요**

- **게임**: "Crypto Warriors Premium Edition"
- **DRM 타입**: NFT-based access control
- **필요 NFT**: "Premium Game Access NFT"
- **테스트 사용자**: 2명 (NFT 소유자 vs 미소유자)

---

## 📝 Detailed Script

### **1. 인트로 (30초)**

**화면**: 프로젝트 제목 + 시스템 아키텍처 다이어그램

**내레이션**:

> "안녕하세요! 오늘은 Solana 블록체인을 활용한 혁신적인 DRM 시스템을 소개합니다.
> 기존의 중앙화된 DRM과 달리, 블록체인 기반으로 투명하고 안전한 디지털 권한 관리를 제공합니다."

**시연 포인트**:

- 시스템 아키텍처 다이어그램 표시
- Solana 네트워크 연결 상태 확인

---

### **2. Admin Dashboard 설정 (1분)**

**화면**: Admin Dashboard (solana-drm-admin)

**단계별 시연**:

#### **2.1 Dashboard 접속**

```
1. 브라우저에서 http://localhost:3000 접속
2. "Solana DRM Admin Dashboard" 화면 확인
3. 실시간 통계 확인 (Total Packages: 24, DRM Checks: 1,250+)
```

#### **2.2 Package 등록**

```
1. "Register Package" 탭 클릭
2. Package Name 입력: "com.example.premiumgame"
3. DRM Type 선택: "NFT-based"
4. Required NFT Address 입력:
   "GAME_PREMIUM_NFT_1234567890123456789012345678901234567890"
5. "Register Package" 버튼 클릭
6. 성공 메시지 확인: "Package registered successfully!"
```

**내레이션**:

> "먼저 관리자 대시보드에서 새로운 게임 패키지를 등록합니다.
> NFT 기반 접근 제어를 설정하여, 특정 NFT를 소유한 사용자만 게임에 접근할 수 있도록 합니다."

---

### **3. DRM 검증 테스트 (1분)**

**화면**: Admin Dashboard - Check DRM 탭

**단계별 시연**:

#### **3.1 NFT 소유자 테스트 (User1)**

```
1. "Check DRM" 탭 클릭
2. Wallet Address 입력: "A2EdpqTf49MAQMLqbPYvZJPEZMjiUSiLzZYRysTED98X"
3. Package Name 입력: "com.example.premiumgame"
4. "Check Access" 버튼 클릭
5. 결과 확인: ✅ "Access granted - Required NFT is owned"
```

#### **3.2 NFT 미소유자 테스트 (User2)**

```
1. Wallet Address 변경: "7dGURf5jtacqXAAx2j22bpWmphhvMineXxEfY4LjkWQN"
2. "Check Access" 버튼 클릭
3. 결과 확인: ❌ "Access denied - Purchase required NFT"
```

**내레이션**:

> "이제 실제 사용자 지갑으로 접근 권한을 테스트해보겠습니다.
> NFT를 소유한 사용자는 접근이 허용되고, 소유하지 않은 사용자는 접근이 거부됩니다."

---

### **4. 모바일 앱 시연 (1분)**

**화면**: React Native 앱 (solana-drm-example)

**단계별 시연**:

#### **4.1 앱 실행 및 지갑 연결**

```
1. 모바일 앱 실행
2. "Connect Wallet" 버튼 클릭
3. Phantom 지갑 연결 시연
4. 지갑 주소 표시 확인
```

#### **4.2 DRM 상태 확인**

```
1. "DRM Status" 섹션 확인
2. "Checking DRM permissions..." 로딩 표시
3. 결과 표시:
   - NFT 소유자: ✅ "Access granted! Required NFT is owned"
   - NFT 미소유자: ❌ "Access denied. Purchase required NFT"
```

#### **4.3 콘텐츠 표시**

```
1. 접근 허용 시: 프리미엄 게임 콘텐츠 표시
2. 접근 거부 시: "Purchase NFT to access premium content" 메시지
```

**내레이션**:

> "모바일 앱에서는 사용자가 지갑을 연결하면 자동으로 DRM 검증이 수행됩니다.
> 블록체인에서 실시간으로 NFT 소유권을 확인하여 적절한 콘텐츠를 제공합니다."

---

### **5. 실시간 모니터링 (30초)**

**화면**: Admin Dashboard - Dashboard 탭

**단계별 시연**:

#### **5.1 실시간 통계 확인**

```
1. Dashboard 탭으로 돌아가기
2. 실시간 통계 업데이트 확인:
   - Total Packages: 25 (증가)
   - DRM Checks: 1,252 (증가)
   - Success Rate: 87.5%
   - Active Users: 156
```

#### **5.2 Recent Activity 확인**

```
1. Recent Activity 섹션 확인
2. 방금 수행한 DRM 검증 로그 확인:
   - User1: ✅ Access granted (2분 전)
   - User2: ❌ Access denied (1분 전)
```

**내레이션**:

> "모든 DRM 검증은 실시간으로 대시보드에 기록됩니다.
> 블록체인에 저장되므로 투명하고 조작이 불가능합니다."

---

### **6. 마무리 (30초)**

**화면**: 시스템 요약 + 로고

**내레이션**:

> "Solana DRM System은 블록체인의 장점을 활용하여
> 안전하고 투명한 디지털 권한 관리를 제공합니다.
> 게임, 앱, 디지털 콘텐츠 등 다양한 분야에 적용할 수 있습니다."

**시연 포인트**:

- 시스템 장점 요약
- 적용 가능한 분야 소개
- 팀 정보 및 연락처

---

## 🎬 Production Notes

### **화면 구성**

1. **메인 화면**: Admin Dashboard (브라우저)
2. **보조 화면**: Mobile App (시뮬레이터/실제 기기)
3. **오버레이**: 시스템 아키텍처, 통계, 설명 텍스트

### **필요한 준비물**

- [ ] Admin Dashboard 실행 (`npm run dev`)
- [ ] Mobile App 실행 (`npx react-native run-ios`)
- [ ] 테스트 지갑 주소들 준비
- [ ] NFT 주소 준비
- [ ] 화면 녹화 소프트웨어

### **예상 결과**

- ✅ NFT 소유자: 접근 허용
- ❌ NFT 미소유자: 접근 거부
- 📊 실시간 통계 업데이트
- 🔗 블록체인 검증 로그

---

## 🎯 Alternative Scenarios

### **Scenario 2: Token-based Access**

- VIP 앱 기능 접근 제어
- 최소 토큰 잔액 요구
- 동적 가격 설정

### **Scenario 3: Mixed Access**

- NFT + 토큰 복합 요구
- 고급 콘텐츠 접근 제어
- 티어별 권한 관리

---

## 📞 Demo Preparation Checklist

- [ ] Solana Devnet 연결 확인
- [ ] 지갑 잔액 확인 (최소 1 SOL)
- [ ] Admin Dashboard 실행 테스트
- [ ] Mobile App 실행 테스트
- [ ] DRM 검증 기능 테스트
- [ ] 화면 녹화 설정
- [ ] 내레이션 스크립트 준비

---

**총 예상 시간**: 3-4분
**난이도**: 중간
**시연 포인트**: 3개 (Admin, Mobile, Monitoring)
