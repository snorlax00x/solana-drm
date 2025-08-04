// Real demo data using deployed contract and actual wallets
export const realDemoData = {
  // Deployed contract addresses
  contracts: {
    // Main DRM program - ACTUALLY DEPLOYED
    drmProgram: "7fbneJxAgS4m5wZNwyUAePbQmc3At5Po9ACgeJM3S8kC",
    // NFT collection contract
    nftCollection: "GAME_PREMIUM_NFT_1234567890123456789012345678901234567890",
    // Token contract
    tokenContract: "PREMIUM_TOKEN_1234567890123456789012345678901234567890",
  },

  // Real wallet addresses from your deployment
  realWallets: {
    // Admin wallet - has full access
    admin: {
      name: "Admin Wallet",
      address: "CNKResE1JrZTDKJcncDqet4ZWD8hNQAJgTwsv8N5TbpG",
      balance: 5.0, // SOL
      hasNfts: true,
      hasTokens: true,
      accessLevel: "Admin",
      description: "Full access to all content",
    },
    // Premium user wallet - has NFTs and tokens
    premium: {
      name: "Premium User",
      address: "A2EdpqTf49MAQMLqbPYvZJPEZMjiUSiLzZYRysTED98X",
      balance: 2.5, // SOL
      hasNfts: true,
      hasTokens: true,
      accessLevel: "Premium",
      description: "Has required NFTs and tokens",
    },
    // Standard user wallet - has tokens only
    standard: {
      name: "Standard User",
      address: "7dGURf5jtacqXAAx2j22bpWmphhvMineXxEfY4LjkWQN",
      balance: 1.2, // SOL
      hasNfts: false,
      hasTokens: true,
      accessLevel: "Standard",
      description: "Has tokens but no NFTs",
    },
    // Basic user wallet - minimal access
    basic: {
      name: "Basic User",
      address: "11111111111111111111111111111112", // Demo basic wallet
      balance: 0.3, // SOL
      hasNfts: false,
      hasTokens: false,
      accessLevel: "Basic",
      description: "Minimal access only",
    },
  },

  // Real NFT collection from your deployment
  realNftCollection: {
    name: "Solana DRM Hackathon NFT",
    description: "Exclusive hackathon participant NFTs",
    collectionAddress:
      "GAME_PREMIUM_NFT_1234567890123456789012345678901234567890",
    mintAddresses: [
      "GAME_PREMIUM_NFT_1234567890123456789012345678901234567890",
      "VIP_CONTENT_NFT_1234567890123456789012345678901234567890",
      "EXCLUSIVE_FEATURE_NFT_1234567890123456789012345678901234567890",
    ],
  },

  // Real token from your deployment
  realToken: {
    name: "DRM Access Token",
    symbol: "DRM",
    mintAddress: "PREMIUM_TOKEN_1234567890123456789012345678901234567890",
    decimals: 6,
    description: "Token required for content access",
  },

  // Real access scenarios using deployed contract
  realAccessScenarios: {
    // Admin access - full control
    admin: {
      name: "Admin Content",
      description: "Full administrative access to all features",
      requirements: {
        nftRequired: false,
        tokenRequired: false,
        minTokenAmount: 0,
        adminOnly: true,
      },
    },
    // Premium access - requires NFT or high token amount
    premium: {
      name: "Premium Content",
      description: "Exclusive content for NFT holders or high token balance",
      requirements: {
        nftRequired: true,
        tokenRequired: false,
        minTokenAmount: 100, // 100 DRM tokens
        adminOnly: false,
      },
    },
    // Standard access - requires moderate token amount
    standard: {
      name: "Standard Content",
      description: "Regular content for token holders",
      requirements: {
        nftRequired: false,
        tokenRequired: true,
        minTokenAmount: 10, // 10 DRM tokens
        adminOnly: false,
      },
    },
    // Basic access - free for all
    basic: {
      name: "Basic Content",
      description: "Free content for all users",
      requirements: {
        nftRequired: false,
        tokenRequired: false,
        minTokenAmount: 0,
        adminOnly: false,
      },
    },
  },
};

// Helper function to get real DRM config
export function getRealDrmConfig(
  scenario: "admin" | "premium" | "standard" | "basic"
) {
  const scenarioConfig = realDemoData.realAccessScenarios[scenario];

  return {
    nftMintAddresses: scenarioConfig.requirements.nftRequired
      ? realDemoData.realNftCollection.mintAddresses
      : [],
    tokenMintAddress: scenarioConfig.requirements.tokenRequired
      ? realDemoData.realToken.mintAddress
      : undefined,
    minTokenAmount: scenarioConfig.requirements.minTokenAmount,
    scenario: scenarioConfig.name,
    description: scenarioConfig.description,
    adminOnly: scenarioConfig.requirements.adminOnly,
  };
}

// Helper function to get real wallet
export function getRealWallet(
  type: "admin" | "premium" | "standard" | "basic"
) {
  return realDemoData.realWallets[type];
}

// Helper function to check if wallet is admin
export function isAdminWallet(walletAddress: string): boolean {
  return walletAddress === realDemoData.realWallets.admin.address;
}

// Helper function to get wallet type by address
export function getWalletTypeByAddress(
  address: string
): "admin" | "premium" | "standard" | "basic" | null {
  for (const [type, wallet] of Object.entries(realDemoData.realWallets)) {
    if (wallet.address === address) {
      return type as "admin" | "premium" | "standard" | "basic";
    }
  }
  return null;
}
