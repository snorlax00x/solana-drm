# Solana DRM Hackathon Demo Scenarios

## 🎬 Demo Video Recording Guide

### 📱 App Overview

This Solana Mobile DRM app demonstrates blockchain-based content access control using NFT and token ownership verification.

---

## 🎯 Demo Scenarios

### Scenario 1: Premium Content Access

**Duration: 30-45 seconds**

**Setup:**

1. Select "Premium" content level
2. Connect "Premium Wallet" (has NFTs + tokens)
3. Show "Access Granted" result

**Demo Flow:**

```
1. Open app → Premium content selected
2. Connect Premium Wallet → Shows wallet info
3. DRM check → ✓ Access Granted (green)
4. Explain: "Premium wallet has required NFTs/tokens"
```

**Key Points:**

- Premium wallet has SMB NFTs and high token balance
- Access granted immediately
- Shows real Solana addresses

---

### Scenario 2: Standard Content Access

**Duration: 30-45 seconds**

**Setup:**

1. Select "Standard" content level
2. Connect "Standard Wallet" (has tokens only)
3. Show "Access Granted" result

**Demo Flow:**

```
1. Change to Standard content → Requirements update
2. Connect Standard Wallet → Shows token balance
3. DRM check → ✓ Access Granted (green)
4. Explain: "Standard wallet meets token requirements"
```

**Key Points:**

- Standard wallet has USDC/SOL tokens
- Lower requirements than Premium
- Still gets access

---

### Scenario 3: Access Denied

**Duration: 30-45 seconds**

**Setup:**

1. Keep "Premium" content level
2. Connect "Basic Wallet" (no special access)
3. Show "Access Denied" result

**Demo Flow:**

```
1. Premium content selected → High requirements
2. Connect Basic Wallet → Low balance shown
3. DRM check → ✗ Access Denied (red)
4. Explain: "Basic wallet doesn't meet requirements"
```

**Key Points:**

- Basic wallet has minimal SOL
- No NFTs or required tokens
- Clear access denial

---

### Scenario 4: Content Level Switching

**Duration: 45-60 seconds**

**Setup:**

1. Connect "Standard Wallet"
2. Switch between content levels
3. Show different access results

**Demo Flow:**

```
1. Connect Standard Wallet
2. Premium content → ✗ Access Denied
3. Switch to Standard → ✓ Access Granted
4. Switch to Basic → ✓ Access Granted
5. Explain: "Same wallet, different access levels"
```

**Key Points:**

- Same wallet, different results
- Real-time DRM verification
- Dynamic access control

---

## 🎥 Recording Tips

### Camera Setup

- **Device**: Use actual mobile device (not simulator)
- **Orientation**: Portrait mode
- **Quality**: 1080p or higher
- **Stability**: Use tripod or stable surface

### Screen Recording

- **App**: Use built-in screen recorder
- **Audio**: Record voice-over explaining each step
- **Duration**: Keep each scenario under 1 minute
- **Transitions**: Smooth transitions between scenarios

### Voice-Over Script

#### Introduction (15 seconds)

"Welcome to the Solana Mobile DRM Hackathon demo. This app shows how blockchain-based content access control works using NFT and token ownership verification."

#### Scenario Transitions

- "Let's test Premium content access..."
- "Now let's try Standard content..."
- "Here's what happens with insufficient access..."
- "Watch how the same wallet gets different access levels..."

#### Conclusion (15 seconds)

"This demonstrates real-time DRM verification on Solana blockchain, enabling secure content access control for mobile applications."

---

## 🔧 Technical Features to Highlight

### Real Solana Integration

- ✅ Actual Solana devnet connection
- ✅ Real NFT collection addresses (SMB, Degen Ape)
- ✅ Popular token addresses (USDC, SOL)
- ✅ Live blockchain verification

### Mobile Optimization

- ✅ React Native performance
- ✅ Touch-friendly UI
- ✅ Responsive design
- ✅ Native mobile experience

### DRM Features

- ✅ NFT ownership verification
- ✅ Token balance checking
- ✅ Multiple access levels
- ✅ Real-time status updates

---

## 📊 Demo Data Reference

### NFT Collections

- **SMB**: Solana Monkey Business (popular collection)
- **Degen Ape**: Degen Ape Academy (exclusive collection)
- **Hackathon**: Custom hackathon participant NFTs

### Tokens

- **USDC**: USD Coin stablecoin
- **SOL**: Native Solana token
- **HACK**: Custom hackathon token

### Wallet Types

- **Premium**: 2.5 SOL, has NFTs + tokens
- **Standard**: 0.8 SOL, has tokens only
- **Basic**: 0.1 SOL, minimal access

---

## 🎬 Final Demo Structure

1. **Intro** (15s) - App overview
2. **Premium Access** (30s) - Successful premium access
3. **Standard Access** (30s) - Successful standard access
4. **Access Denied** (30s) - Failed access attempt
5. **Dynamic Switching** (45s) - Same wallet, different levels
6. **Conclusion** (15s) - Key benefits and features

**Total Duration: ~2.5 minutes**

Perfect for hackathon presentations and social media sharing! 🚀
