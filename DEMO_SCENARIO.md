# 🎬 Solana DRM Demo Video Scenario

## 📋 Demo Overview

**Title**: "Solana DRM System - Blockchain-based Digital Rights Management"
**Duration**: 3-4 minutes
**Goal**: NFT-based premium game access control demonstration

---

## 🎯 Main Scenario: Premium Game Access Control

### **Scenario Overview**

- **Game**: "Crypto Warriors Premium Edition"
- **DRM Type**: NFT-based access control
- **Required NFT**: "Premium Game Access NFT"
- **Test Users**: 2 users (NFT owner vs non-owner)

---

## 📝 Detailed Script

### **1. Intro (30 seconds)**

**Screen**: Project title + System architecture diagram

**Narration**:

> "Hello! Today we're introducing an innovative DRM system using Solana blockchain.
> Unlike traditional centralized DRM, we provide transparent and secure digital rights management based on blockchain technology."

**Demo Points**:

- Display system architecture diagram
- Check Solana network connection status

---

### **2. Admin Dashboard Setup (1 minute)**

**Screen**: Admin Dashboard (solana-drm-admin)

**Step-by-step Demo**:

#### **2.1 Dashboard Access**

```
1. Access http://localhost:3000 in browser
2. Confirm "Solana DRM Admin Dashboard" screen
3. Check real-time statistics (Total Packages: 24, DRM Checks: 1,250+)
```

#### **2.2 Package Registration**

```
1. Click "Register Package" tab
2. Enter Package Name: "com.example.premiumgame"
3. Select DRM Type: "NFT-based"
4. Enter Required NFT Address:
   "GAME_PREMIUM_NFT_1234567890123456789012345678901234567890"
5. Click "Register Package" button
6. Confirm success message: "Package registered successfully!"
```

**Narration**:

> "First, we register a new game package in the admin dashboard.
> We set up NFT-based access control so only users who own specific NFTs can access the game."

---

### **3. DRM Verification Test (1 minute)**

**Screen**: Admin Dashboard - Check DRM tab

**Step-by-step Demo**:

#### **3.1 NFT Owner Test (User1)**

```
1. Click "Check DRM" tab
2. Enter Wallet Address: "A2EdpqTf49MAQMLqbPYvZJPEZMjiUSiLzZYRysTED98X"
3. Enter Package Name: "com.example.premiumgame"
4. Click "Check Access" button
5. Confirm result: ✅ "Access granted - Required NFT is owned"
```

#### **3.2 Non-NFT Owner Test (User2)**

```
1. Change Wallet Address: "7dGURf5jtacqXAAx2j22bpWmphhvMineXxEfY4LjkWQN"
2. Click "Check Access" button
3. Confirm result: ❌ "Access denied - Purchase required NFT"
```

**Narration**:

> "Now let's test access permissions with actual user wallets.
> Users who own the NFT get access granted, while those without get access denied."

---

### **4. Mobile App Demo (1 minute)**

**Screen**: React Native app (solana-drm-example)

**Step-by-step Demo**:

#### **4.1 App Launch and Wallet Connection**

```
1. Launch mobile app
2. Click "Connect Wallet" button
3. Demo Phantom wallet connection
4. Confirm wallet address display
```

#### **4.2 DRM Status Check**

```
1. Check "DRM Status" section
2. Show "Checking DRM permissions..." loading
3. Display result:
   - NFT owner: ✅ "Access granted! Required NFT is owned"
   - Non-NFT owner: ❌ "Access denied. Purchase required NFT"
```

#### **4.3 Content Display**

```
1. Access granted: Show premium game content
2. Access denied: Show "Purchase NFT to access premium content" message
```

**Narration**:

> "In the mobile app, DRM verification happens automatically when users connect their wallet.
> The app checks NFT ownership in real-time on the blockchain and provides appropriate content."

---

### **5. Real-time Monitoring (30 seconds)**

**Screen**: Admin Dashboard - Dashboard tab

**Step-by-step Demo**:

#### **5.1 Real-time Statistics Check**

```
1. Return to Dashboard tab
2. Check real-time statistics update:
   - Total Packages: 25 (increased)
   - DRM Checks: 1,252 (increased)
   - Success Rate: 87.5%
   - Active Users: 156
```

#### **5.2 Recent Activity Check**

```
1. Check Recent Activity section
2. Confirm DRM verification logs from just performed:
   - User1: ✅ Access granted (2 minutes ago)
   - User2: ❌ Access denied (1 minute ago)
```

**Narration**:

> "All DRM verifications are recorded in real-time on the dashboard.
> Since they're stored on the blockchain, they're transparent and tamper-proof."

---

### **6. Conclusion (30 seconds)**

**Screen**: System summary + logo

**Narration**:

> "Solana DRM System leverages blockchain advantages to provide
> secure and transparent digital rights management.
> It can be applied to games, apps, digital content, and various other fields."

**Demo Points**:

- System advantages summary
- Applicable fields introduction
- Team information and contact

---

## 🎬 Production Notes

### **Screen Composition**

1. **Main Screen**: Admin Dashboard (browser)
2. **Secondary Screen**: Mobile App (simulator/actual device)
3. **Overlay**: System architecture, statistics, explanation text

### **Required Materials**

- [ ] Admin Dashboard running (`npm run dev`)
- [ ] Mobile App running (`npx react-native run-ios`)
- [ ] Test wallet addresses prepared
- [ ] NFT addresses prepared
- [ ] Screen recording software

### **Expected Results**

- ✅ NFT owner: Access granted
- ❌ Non-NFT owner: Access denied
- 📊 Real-time statistics update
- 🔗 Blockchain verification logs

---

## 🎯 Alternative Scenarios

### **Scenario 2: Token-based Access**

- VIP app feature access control
- Minimum token balance requirement
- Dynamic pricing

### **Scenario 3: Mixed Access**

- NFT + Token combined requirement
- Advanced content access control
- Tier-based permission management

---

## 📞 Demo Preparation Checklist

- [ ] Solana Devnet connection confirmed
- [ ] Wallet balance confirmed (minimum 1 SOL)
- [ ] Admin Dashboard running test
- [ ] Mobile App running test
- [ ] DRM verification function test
- [ ] Screen recording setup
- [ ] Narration script prepared

---

**Total Expected Time**: 3-4 minutes
**Difficulty**: Medium
**Demo Points**: 3 (Admin, Mobile, Monitoring)
