# ⚡ Quick Demo Scenario (2-3분)

## 🎯 핵심 시나리오: NFT 기반 게임 접근 제어

### **준비사항**

- Admin Dashboard: `http://localhost:3000`
- Mobile App: React Native 시뮬레이터
- 테스트 지갑: User1 (NFT 소유), User2 (NFT 미소유)

---

## 📝 Step-by-Step Demo

### **1. 인트로 (20초)**

```
"Solana DRM System - 블록체인 기반 디지털 권한 관리"
- 기존 DRM의 문제점
- 블록체인 DRM의 장점
```

### **2. Admin Dashboard (40초)**

#### **Package 등록**

```
1. http://localhost:3000 접속
2. "Register Package" 탭 클릭
3. Package Name: com.example.premiumgame
4. DRM Type: NFT-based
5. Required NFT: GAME_PREMIUM_NFT_1234567890123456789012345678901234567890
6. "Register Package" 클릭
```

### **3. DRM 테스트 (40초)**

#### **NFT 소유자 테스트**

```
1. "Check DRM" 탭 클릭
2. Wallet: A2EdpqTf49MAQMLqbPYvZJPEZMjiUSiLzZYRysTED98X
3. Package: com.example.premiumgame
4. "Check Access" 클릭
5. 결과: ✅ Access granted
```

#### **NFT 미소유자 테스트**

```
1. Wallet 변경: 7dGURf5jtacqXAAx2j22bpWmphhvMineXxEfY4LjkWQN
2. "Check Access" 클릭
3. 결과: ❌ Access denied
```

### **4. Mobile App (40초)**

#### **지갑 연결**

```
1. 모바일 앱 실행
2. "Connect Wallet" 클릭
3. Phantom 지갑 연결
4. 지갑 주소 표시 확인
```

#### **DRM 상태 확인**

```
1. DRM Status 섹션 확인
2. "Checking DRM permissions..." 로딩
3. 결과 표시 (Access granted/denied)
```

### **5. 실시간 모니터링 (20초)**

```
1. Dashboard 탭으로 돌아가기
2. 실시간 통계 확인
3. Recent Activity 로그 확인
```

### **6. 마무리 (20초)**

```
"블록체인 기반 DRM의 장점:
- 투명성: 모든 접근 로그가 블록체인에 저장
- 보안성: 중앙화된 서버 없이 분산 처리
- 효율성: 실시간 검증으로 즉시 접근 제어"
```

---

## 🎬 촬영 팁

### **화면 구성**

- **메인**: Admin Dashboard (브라우저)
- **보조**: Mobile App (시뮬레이터)
- **오버레이**: 설명 텍스트, 화살표, 하이라이트

### **핵심 포인트**

1. **NFT 소유자**: ✅ 접근 허용
2. **NFT 미소유자**: ❌ 접근 거부
3. **실시간 검증**: 블록체인에서 즉시 확인
4. **투명한 로그**: 모든 활동이 기록됨

### **예상 결과**

- 총 2-3분 길이
- 명확한 접근 허용/거부 시연
- 블록체인 DRM의 장점 부각

---

## 🔧 Troubleshooting

### **문제 해결**

- Admin Dashboard 안 열림: `npm run dev` 확인
- Mobile App 안 열림: `npx react-native run-ios` 확인
- 지갑 연결 안 됨: Phantom 지갑 설치 확인

### **백업 계획**

- 실제 지갑 대신 테스트 주소 사용
- NFT 주소는 데모용 가짜 주소 사용
- 결과는 미리 준비된 스크린샷으로 대체

---

**총 시간**: 2-3분
**난이도**: 쉬움
**성공 확률**: 높음
