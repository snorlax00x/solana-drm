# Contributing to Solana DRM System

Solana DRM System에 기여해주셔서 감사합니다! 이 문서는 프로젝트에 기여하는 방법을 안내합니다.

## 📋 목차

- [기여 방법](#-기여-방법)
- [개발 환경 설정](#-개발-환경-설정)
- [코드 스타일 가이드](#-코드-스타일-가이드)
- [테스트 가이드](#-테스트-가이드)
- [커밋 메시지 규칙](#-커밋-메시지-규칙)
- [Pull Request 가이드](#-pull-request-가이드)
- [이슈 리포트](#-이슈-리포트)

## 🤝 기여 방법

### 1. Fork & Clone

```bash
# 저장소 포크 후 클론
git clone https://github.com/your-username/solana-drm.git
cd solana-drm

# 원본 저장소를 upstream으로 추가
git remote add upstream https://github.com/original-owner/solana-drm.git
```

### 2. 개발 브랜치 생성

```bash
# 메인 브랜치에서 최신 상태로 업데이트
git checkout main
git pull upstream main

# 새로운 기능 브랜치 생성
git checkout -b feature/your-feature-name
# 또는 버그 수정 브랜치
git checkout -b fix/your-bug-fix
```

### 3. 개발 및 테스트

```bash
# 전체 의존성 설치
npm run install:all

# 개발 서버 실행
npm run dev:admin  # 관리자 대시보드
npm run dev:example  # 모바일 앱

# 테스트 실행
npm run test:all

# 린트 검사
npm run lint:all
```

### 4. 커밋 및 푸시

```bash
# 변경사항 스테이징
git add .

# 커밋 (커밋 메시지 규칙 준수)
git commit -m "feat: add new dashboard feature"

# 브랜치 푸시
git push origin feature/your-feature-name
```

### 5. Pull Request 생성

GitHub에서 Pull Request를 생성하고 다음 정보를 포함해주세요:

- **제목**: 간결하고 명확한 설명
- **설명**: 변경사항의 상세한 설명
- **관련 이슈**: `Fixes #123` 또는 `Closes #123`
- **테스트**: 수행한 테스트 내용
- **스크린샷**: UI 변경사항이 있는 경우

## ⚙️ 개발 환경 설정

### 필수 요구사항

- **Node.js** 18.0.0 이상
- **npm** 8.0.0 이상
- **Solana CLI** 1.16.0 이상
- **Anchor Framework** 0.28.0 이상
- **Git** 2.30.0 이상

### 개발 도구 설정

#### 1. Solana 개발 환경

```bash
# Solana CLI 설치
sh -c "$(curl -sSfL https://release.solana.com/v1.16.0/install)"

# 개발 네트워크 설정
solana config set --url devnet

# 지갑 생성 (없는 경우)
solana-keygen new

# 테스트 SOL 받기
solana airdrop 2
```

#### 2. Anchor Framework

```bash
# Anchor CLI 설치
cargo install --git https://github.com/coral-xyz/anchor avm --locked --force

# 프로젝트 빌드
cd solana-drm-program
anchor build
```

#### 3. 모바일 개발 환경

```bash
# Android Studio 설치 (Android 개발용)
# Xcode 설치 (iOS 개발용, macOS만)

cd solana-drm-example

# Android 설정
npm run android:setup

# iOS 설정 (macOS만)
cd ios && pod install && cd ..
```

## 📝 코드 스타일 가이드

### TypeScript/JavaScript

- **들여쓰기**: 2칸 공백
- **세미콜론**: 필수
- **따옴표**: 작은따옴표 사용
- **최대 줄 길이**: 80자

```typescript
// 좋은 예
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
    // 구현
  }
}
```

### React/React Native

- **함수형 컴포넌트** 사용
- **Hooks** 활용
- **Props 인터페이스** 정의

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

- **snake_case** 사용
- **4칸 공백** 들여쓰기
- **문서화 주석** 추가

```rust
/// DRM 패키지 정보를 저장하는 구조체
#[account]
pub struct Package {
    /// 패키지 권한자
    pub authority: Pubkey,
    /// 패키지 이름
    pub package_name: String,
    /// DRM 타입
    pub drm_type: String,
    /// NFT 민트 주소들
    pub nft_mint_addresses: Vec<String>,
    /// 토큰 민트 주소 (선택사항)
    pub token_mint_address: Option<String>,
    /// 최소 토큰 수량 (선택사항)
    pub min_token_amount: Option<u64>,
    /// 활성 상태
    pub is_active: bool,
    /// 생성 시간
    pub created_at: i64,
    /// PDA bump
    pub bump: u8,
}
```

## 🧪 테스트 가이드

### 테스트 작성 원칙

- **단위 테스트**: 각 함수/메서드별 테스트
- **통합 테스트**: 컴포넌트 간 상호작용 테스트
- **E2E 테스트**: 전체 워크플로우 테스트

### TypeScript/JavaScript 테스트

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

### React 컴포넌트 테스트

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

### Rust 테스트

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

## 📝 커밋 메시지 규칙

[Conventional Commits](https://www.conventionalcommits.org/) 형식을 따릅니다.

### 형식

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

### 타입

- **feat**: 새로운 기능
- **fix**: 버그 수정
- **docs**: 문서 변경
- **style**: 코드 스타일 변경 (기능에 영향 없음)
- **refactor**: 코드 리팩토링
- **test**: 테스트 추가 또는 수정
- **chore**: 빌드 프로세스 또는 보조 도구 변경

### 예시

```bash
# 새로운 기능
git commit -m "feat: add dashboard analytics page"

# 버그 수정
git commit -m "fix: resolve wallet connection issue on mobile"

# 문서 업데이트
git commit -m "docs: update API documentation"

# 리팩토링
git commit -m "refactor: improve DRM check performance"

# 테스트 추가
git commit -m "test: add unit tests for DrmManager class"
```

## 🔄 Pull Request 가이드

### PR 체크리스트

- [ ] 코드가 프로젝트 스타일 가이드를 따름
- [ ] 새로운 기능에 대한 테스트 추가
- [ ] 기존 테스트가 모두 통과
- [ ] 문서 업데이트 (필요한 경우)
- [ ] 커밋 메시지가 Conventional Commits 형식 준수
- [ ] PR 설명에 변경사항 상세 설명 포함

### PR 리뷰 프로세스

1. **자동 검사**: CI/CD 파이프라인 실행
2. **코드 리뷰**: 최소 1명의 리뷰어 승인 필요
3. **테스트 통과**: 모든 테스트가 성공해야 함
4. **문서 업데이트**: API 변경사항 문서화
5. **최종 승인**: 메인테이너 승인 후 머지

## 🐛 이슈 리포트

### 버그 리포트

버그를 발견하셨다면 다음 정보를 포함해주세요:

- **제목**: 간결한 버그 설명
- **설명**: 상세한 버그 설명
- **재현 단계**: 버그 재현 방법
- **예상 동작**: 정상적인 동작
- **실제 동작**: 현재 발생하는 동작
- **환경 정보**: OS, 브라우저, Node.js 버전 등
- **스크린샷**: 가능한 경우 스크린샷 첨부

### 기능 요청

새로운 기능을 제안하시려면:

- **제목**: 요청하는 기능명
- **설명**: 기능의 목적과 사용 사례
- **구현 아이디어**: 구현 방법에 대한 제안
- **우선순위**: 기능의 중요도

### 이슈 템플릿

```markdown
## 버그 리포트

### 버그 설명

[버그에 대한 간결한 설명]

### 재현 단계

1. [첫 번째 단계]
2. [두 번째 단계]
3. [세 번째 단계]

### 예상 동작

[정상적인 동작 설명]

### 실제 동작

[현재 발생하는 동작]

### 환경 정보

- OS: [예: macOS 12.0]
- Node.js: [예: 18.0.0]
- 브라우저: [예: Chrome 96.0]

### 추가 정보

[기타 관련 정보]
```

## 📞 지원 및 문의

- **GitHub Issues**: [이슈 리포트](https://github.com/your-username/solana-drm/issues)
- **GitHub Discussions**: [토론](https://github.com/your-username/solana-drm/discussions)
- **이메일**: [your.email@example.com](mailto:your.email@example.com)

## 🙏 감사의 말

프로젝트에 기여해주시는 모든 분들께 감사드립니다! 여러분의 기여가 Solana DRM System을 더욱 발전시킵니다.

---

**참고**: 이 문서는 프로젝트의 발전에 따라 지속적으로 업데이트됩니다. 최신 정보는 항상 이 파일을 참조해주세요.
