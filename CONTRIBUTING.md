# Contributing to Solana DRM System

Thank you for contributing to the Solana DRM System! This document provides guidance on how to contribute to the project.

## 📋 Table of Contents

- [How to Contribute](#-how-to-contribute)
- [Development Environment Setup](#-development-environment-setup)
- [Code Style Guide](#-code-style-guide)
- [Testing Guide](#-testing-guide)
- [Commit Message Rules](#-commit-message-rules)
- [Pull Request Guide](#-pull-request-guide)
- [Issue Reporting](#-issue-reporting)

## 🤝 How to Contribute

### 1. Fork & Clone

```bash
# Fork the repository and clone
git clone https://github.com/your-username/solana-drm.git
cd solana-drm

# Add the original repository as upstream
git remote add upstream https://github.com/original-owner/solana-drm.git
```

### 2. Create Development Branch

```bash
# Update to latest state from main branch
git checkout main
git pull upstream main

# Create new feature branch
git checkout -b feature/your-feature-name
# Or bug fix branch
git checkout -b fix/your-bug-fix
```

### 3. Development and Testing

```bash
# Install all dependencies
npm run install:all

# Start development server
npm run dev:admin  # Admin dashboard
npm run dev:example  # Mobile app

# Run tests
npm run test:all

# Lint check
npm run lint:all
```

### 4. Commit and Push

```bash
# Stage changes
git add .

# Commit (follow commit message rules)
git commit -m "feat: add new dashboard feature"

# Push branch
git push origin feature/your-feature-name
```

### 5. Create Pull Request

Create a Pull Request on GitHub and include the following information:

- **Title**: Concise and clear description
- **Description**: Detailed explanation of changes
- **Related Issues**: `Fixes #123` or `Closes #123`
- **Testing**: Tests performed
- **Screenshots**: If UI changes are involved

## ⚙️ Development Environment Setup

### Prerequisites

- **Node.js** 18.0.0 or higher
- **npm** 8.0.0 or higher
- **Solana CLI** 1.16.0 or higher
- **Anchor Framework** 0.28.0 or higher
- **Git** 2.30.0 or higher

### Development Tools Setup

#### 1. Solana Development Environment

```bash
# Install Solana CLI
sh -c "$(curl -sSfL https://release.solana.com/v1.16.0/install)"

# Set development network
solana config set --url devnet

# Create wallet (if not exists)
solana-keygen new

# Get test SOL
solana airdrop 2
```

#### 2. Anchor Framework

```bash
# Install Anchor CLI
cargo install --git https://github.com/coral-xyz/anchor avm --locked --force

# Build project
cd solana-drm-program
anchor build
```

#### 3. Mobile Development Environment

```bash
# Install Android Studio (for Android development)
# Install Xcode (for iOS development, macOS only)

cd solana-drm-example

# Android setup
npm run android:setup

# iOS setup (macOS only)
cd ios && pod install && cd ..
```

## 📝 Code Style Guide

### TypeScript/JavaScript

- **Indentation**: 2 spaces
- **Semicolons**: Required
- **Quotes**: Use single quotes
- **Max line length**: 80 characters

```typescript
// Good example
import { SolanaDRM } from "@solana-drm/sdk";

interface DrmConfig {
  nftMintAddresses?: string[];
  tokenMintAddress?: string;
  minTokenAmount?: number;
}

export class DrmManager {
  private config: DrmConfig;

  constructor(config: DrmConfig) {
    this.config = config;
  }

  async checkAccess(walletAddress: string): Promise<boolean> {
    // Implementation
  }
}
```

### React/React Native

- Use **functional components**
- Utilize **Hooks**
- Define **Props interfaces**

```typescript
interface ButtonProps {
  title: string;
  onPress: () => void;
  disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  disabled = false,
}) => {
  return (
    <TouchableOpacity onPress={onPress} disabled={disabled}>
      <Text>{title}</Text>
    </TouchableOpacity>
  );
};
```

### Rust (Smart Contract)

- Use **snake_case**
- **4 spaces** indentation
- Add **documentation comments**

```rust
/// Structure to store DRM package information
#[account]
pub struct Package {
    /// Package authority
    pub authority: Pubkey,
    /// Package name
    pub package_name: String,
    /// DRM type
    pub drm_type: String,
    /// NFT mint addresses
    pub nft_mint_addresses: Vec<String>,
    /// Token mint address (optional)
    pub token_mint_address: Option<String>,
    /// Minimum token amount (optional)
    pub min_token_amount: Option<u64>,
    /// Active status
    pub is_active: bool,
    /// Creation time
    pub created_at: i64,
    /// PDA bump
    pub bump: u8,
}
```

## 🧪 Testing Guide

### Testing Principles

- **Unit Tests**: Test each function/method individually
- **Integration Tests**: Test component interactions
- **E2E Tests**: Test complete workflows

### TypeScript/JavaScript Testing

```typescript
// __tests__/drm-manager.test.ts
import { DrmManager } from "../src/drm-manager";

describe("DrmManager", () => {
  let drmManager: DrmManager;

  beforeEach(() => {
    drmManager = new DrmManager({
      nftMintAddresses: ["test-nft-1", "test-nft-2"],
    });
  });

  it("should check NFT access correctly", async () => {
    const result = await drmManager.checkAccess("test-wallet");
    expect(result).toBe(true);
  });

  it("should handle invalid wallet address", async () => {
    const result = await drmManager.checkAccess("invalid-address");
    expect(result).toBe(false);
  });
});
```

### React Component Testing

```typescript
// __tests__/Button.test.tsx
import { render, fireEvent } from "@testing-library/react-native";
import { Button } from "../src/components/Button";

describe("Button", () => {
  it("should call onPress when pressed", () => {
    const onPress = jest.fn();
    const { getByText } = render(
      <Button title="Test Button" onPress={onPress} />
    );

    fireEvent.press(getByText("Test Button"));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it("should be disabled when disabled prop is true", () => {
    const onPress = jest.fn();
    const { getByText } = render(
      <Button title="Test Button" onPress={onPress} disabled={true} />
    );

    fireEvent.press(getByText("Test Button"));
    expect(onPress).not.toHaveBeenCalled();
  });
});
```

### Rust Testing

```rust
#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_package_creation() {
        let package = Package {
            authority: Pubkey::new_unique(),
            package_name: "test.package".to_string(),
            drm_type: "nft".to_string(),
            nft_mint_addresses: vec!["nft1".to_string()],
            token_mint_address: None,
            min_token_amount: None,
            is_active: true,
            created_at: 1234567890,
            bump: 1,
        };

        assert_eq!(package.package_name, "test.package");
        assert_eq!(package.drm_type, "nft");
    }
}
```

## 📝 Commit Message Rules

Follow the [Conventional Commits](https://www.conventionalcommits.org/) format.

### Format

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

### Types

- **feat**: New feature
- **fix**: Bug fix
- **docs**: Documentation changes
- **style**: Code style changes (no functional impact)
- **refactor**: Code refactoring
- **test**: Test additions or modifications
- **chore**: Build process or auxiliary tool changes

### Examples

```bash
# New feature
git commit -m "feat: add dashboard analytics page"

# Bug fix
git commit -m "fix: resolve wallet connection issue on mobile"

# Documentation update
git commit -m "docs: update API documentation"

# Refactoring
git commit -m "refactor: improve DRM check performance"

# Test addition
git commit -m "test: add unit tests for DrmManager class"
```

## 🔄 Pull Request Guide

### PR Checklist

- [ ] Code follows project style guide
- [ ] Tests added for new features
- [ ] All existing tests pass
- [ ] Documentation updated (if needed)
- [ ] Commit messages follow Conventional Commits format
- [ ] PR description includes detailed explanation of changes

### PR Review Process

1. **Automated Checks**: CI/CD pipeline execution
2. **Code Review**: Minimum 1 reviewer approval required
3. **Test Pass**: All tests must pass
4. **Documentation Update**: Document API changes
5. **Final Approval**: Merge after maintainer approval

## 🐛 Issue Reporting

### Bug Report

If you find a bug, please include the following information:

- **Title**: Concise bug description
- **Description**: Detailed bug description
- **Reproduction Steps**: How to reproduce the bug
- **Expected Behavior**: Normal behavior
- **Actual Behavior**: Current behavior
- **Environment Info**: OS, browser, Node.js version, etc.
- **Screenshots**: If possible, include screenshots

### Feature Request

To suggest a new feature:

- **Title**: Requested feature name
- **Description**: Purpose and use cases of the feature
- **Implementation Ideas**: Suggestions for implementation
- **Priority**: Importance of the feature

### Issue Template

```markdown
## Bug Report

### Bug Description

[Concise description of the bug]

### Reproduction Steps

1. [First step]
2. [Second step]
3. [Third step]

### Expected Behavior

[Description of normal behavior]

### Actual Behavior

[Current behavior]

### Environment Information

- OS: [e.g., macOS 12.0]
- Node.js: [e.g., 18.0.0]
- Browser: [e.g., Chrome 96.0]

### Additional Information

[Other relevant information]
```

## 📞 Support and Contact

- **GitHub Issues**: [Issue Reporting](https://github.com/your-username/solana-drm/issues)
- **GitHub Discussions**: [Discussions](https://github.com/your-username/solana-drm/discussions)
- **Email**: [your.email@example.com](mailto:your.email@example.com)

## 🙏 Acknowledgments

Thank you to everyone who contributes to the project! Your contributions help advance the Solana DRM System.

---

**Note**: This document is continuously updated as the project evolves. Please always refer to this file for the latest information.
