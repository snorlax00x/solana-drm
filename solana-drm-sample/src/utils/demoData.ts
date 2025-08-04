// Demo data configuration for Solana DRM Hackathon
export const demoData = {
  // Real Solana NFT collections for demo
  nftCollections: {
    // Solana Monkey Business (SMB) - Popular NFT collection
    smb: {
      name: "Solana Monkey Business",
      description: "Popular Solana NFT collection",
      mintAddresses: [
        "7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU", // Example SMB NFT
        "9WzDXwBbmkg8ZTbNMqUxvQRAyrZzDsGYdLVL9zYtAWWM", // Another SMB NFT
      ],
    },
    // Degen Ape Academy - Another popular collection
    degenApe: {
      name: "Degen Ape Academy",
      description: "Exclusive Solana NFT collection",
      mintAddresses: [
        "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v", // Example Degen Ape
        "So11111111111111111111111111111111111111112", // Another Degen Ape
      ],
    },
    // Custom Hackathon NFT
    hackathon: {
      name: "Solana Mobile Hackathon NFT",
      description: "Exclusive hackathon participant NFT",
      mintAddresses: [
        "11111111111111111111111111111112", // Demo hackathon NFT
        "22222222222222222222222222222223", // Another hackathon NFT
      ],
    },
  },

  // Real Solana tokens for demo
  tokens: {
    // USDC - Most popular stablecoin
    usdc: {
      name: "USD Coin",
      symbol: "USDC",
      mintAddress: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
      decimals: 6,
      minAmount: 10, // 10 USDC minimum
      description: "Stablecoin for premium access",
    },
    // SOL - Native Solana token
    sol: {
      name: "Solana",
      symbol: "SOL",
      mintAddress: "So11111111111111111111111111111111111111112",
      decimals: 9,
      minAmount: 0.1, // 0.1 SOL minimum
      description: "Native Solana token for access",
    },
    // Custom hackathon token
    hackathonToken: {
      name: "Hackathon Token",
      symbol: "HACK",
      mintAddress: "33333333333333333333333333333334",
      decimals: 6,
      minAmount: 100, // 100 HACK tokens minimum
      description: "Exclusive hackathon access token",
    },
  },

  // Demo wallet addresses with different access levels
  demoWallets: {
    // Premium user - has NFTs and tokens
    premium: {
      name: "Premium User",
      address: "7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU",
      balance: 2.5, // SOL
      hasNfts: true,
      hasTokens: true,
      accessLevel: "Premium",
    },
    // Standard user - has some tokens but no NFTs
    standard: {
      name: "Standard User",
      address: "9WzDXwBbmkg8ZTbNMqUxvQRAyrZzDsGYdLVL9zYtAWWM",
      balance: 0.8, // SOL
      hasNfts: false,
      hasTokens: true,
      accessLevel: "Standard",
    },
    // Basic user - no special access
    basic: {
      name: "Basic User",
      address: "11111111111111111111111111111112",
      balance: 0.1, // SOL
      hasNfts: false,
      hasTokens: false,
      accessLevel: "Basic",
    },
  },

  // DRM access scenarios for demo
  accessScenarios: {
    // Premium content - requires NFT or high token amount
    premium: {
      name: "Premium Content",
      description: "Exclusive content for NFT holders or high token balance",
      requirements: {
        nftCollections: ["smb", "degenApe", "hackathon"],
        tokens: [
          { token: "usdc", minAmount: 100 }, // 100 USDC
          { token: "sol", minAmount: 1 }, // 1 SOL
          { token: "hackathonToken", minAmount: 500 }, // 500 HACK
        ],
      },
    },
    // Standard content - requires moderate token amount
    standard: {
      name: "Standard Content",
      description: "Regular content for token holders",
      requirements: {
        nftCollections: [],
        tokens: [
          { token: "usdc", minAmount: 10 }, // 10 USDC
          { token: "sol", minAmount: 0.1 }, // 0.1 SOL
          { token: "hackathonToken", minAmount: 50 }, // 50 HACK
        ],
      },
    },
    // Basic content - free for all
    basic: {
      name: "Basic Content",
      description: "Free content for all users",
      requirements: {
        nftCollections: [],
        tokens: [],
      },
    },
  },
};

// Helper function to get DRM config for specific scenario
export function getDrmConfig(scenario: "premium" | "standard" | "basic") {
  const scenarioConfig = demoData.accessScenarios[scenario];

  // Collect all NFT mint addresses from required collections
  const nftMintAddresses: string[] = [];
  scenarioConfig.requirements.nftCollections.forEach((collectionKey) => {
    const collection =
      demoData.nftCollections[
        collectionKey as keyof typeof demoData.nftCollections
      ];
    if (collection) {
      nftMintAddresses.push(...collection.mintAddresses);
    }
  });

  // Get first token requirement (for simplicity in demo)
  const firstToken = scenarioConfig.requirements.tokens[0];

  return {
    nftMintAddresses,
    tokenMintAddress: firstToken
      ? demoData.tokens[firstToken.token as keyof typeof demoData.tokens]
          .mintAddress
      : undefined,
    minTokenAmount: firstToken ? firstToken.minAmount : undefined,
    scenario: scenarioConfig.name,
    description: scenarioConfig.description,
  };
}

// Helper function to get demo wallet
export function getDemoWallet(type: "premium" | "standard" | "basic") {
  return demoData.demoWallets[type];
}
