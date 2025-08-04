# ⚡ Quick Demo Scenario (2-3 minutes)

## 🎯 Core Scenario: NFT-based Game Access Control

### **Prerequisites**

- Admin Dashboard: `http://localhost:3000`
- Mobile App: React Native simulator
- Test Wallets: User1 (NFT owner), User2 (Non-NFT owner)

---

## 📝 Step-by-Step Demo

### **1. Intro (20 seconds)**

```
"Solana DRM System - Blockchain-based Digital Rights Management"
- Problems with traditional DRM
- Advantages of blockchain DRM
```

### **2. Admin Dashboard (40 seconds)**

#### **Package Registration**

```
1. Access http://localhost:3000
2. Click "Register Package" tab
3. Package Name: com.example.premiumgame
4. DRM Type: NFT-based
5. Required NFT: GAME_PREMIUM_NFT_1234567890123456789012345678901234567890
6. Click "Register Package"
```

### **3. DRM Test (40 seconds)**

#### **NFT Owner Test**

```
1. Click "Check DRM" tab
2. Wallet: A2EdpqTf49MAQMLqbPYvZJPEZMjiUSiLzZYRysTED98X
3. Package: com.example.premiumgame
4. Click "Check Access"
5. Result: ✅ Access granted
```

#### **Non-NFT Owner Test**

```
1. Change Wallet: 7dGURf5jtacqXAAx2j22bpWmphhvMineXxEfY4LjkWQN
2. Click "Check Access"
3. Result: ❌ Access denied
```

### **4. Mobile App (40 seconds)**

#### **Wallet Connection**

```
1. Launch mobile app
2. Click "Connect Wallet"
3. Connect Phantom wallet
4. Confirm wallet address display
```

#### **DRM Status Check**

```
1. Check DRM Status section
2. "Checking DRM permissions..." loading
3. Display result (Access granted/denied)
```

### **5. Real-time Monitoring (20 seconds)**

```
1. Return to Dashboard tab
2. Check real-time statistics
3. Check Recent Activity logs
```

### **6. Conclusion (20 seconds)**

```
"Blockchain DRM advantages:
- Transparency: All access logs stored on blockchain
- Security: Distributed processing without centralized servers
- Efficiency: Real-time verification for instant access control"
```

---

## 🎬 Recording Tips

### **Screen Composition**

- **Main**: Admin Dashboard (browser)
- **Secondary**: Mobile App (simulator)
- **Overlay**: Explanation text, arrows, highlights

### **Key Points**

1. **NFT Owner**: ✅ Access granted
2. **Non-NFT Owner**: ❌ Access denied
3. **Real-time Verification**: Instant blockchain check
4. **Transparent Logs**: All activities recorded

### **Expected Results**

- Total 2-3 minutes duration
- Clear access granted/denied demonstration
- Highlight blockchain DRM advantages

---

## 🔧 Troubleshooting

### **Problem Solving**

- Admin Dashboard not opening: Check `npm run dev`
- Mobile App not opening: Check `npx react-native run-ios`
- Wallet connection not working: Check Phantom wallet installation

### **Backup Plan**

- Use test addresses instead of real wallets
- Use demo fake addresses for NFTs
- Use pre-prepared screenshots for results

---

**Total Time**: 2-3 minutes
**Difficulty**: Easy
**Success Rate**: High
