const fs = require("fs");

// Generate demo NFT addresses for testing
const demoNfts = [
  {
    name: "Premium Game Access NFT",
    mintAddress: "GAME_PREMIUM_NFT_1234567890123456789012345678901234567890",
    description: "Required NFT for premium game access",
  },
  {
    name: "VIP Content NFT",
    mintAddress: "VIP_CONTENT_NFT_1234567890123456789012345678901234567890",
    description: "Required NFT for VIP content access",
  },
  {
    name: "Exclusive Feature NFT",
    mintAddress:
      "EXCLUSIVE_FEATURE_NFT_1234567890123456789012345678901234567890",
    description: "Required NFT for exclusive features",
  },
];

// Generate demo token addresses
const demoTokens = [
  {
    name: "Premium Token",
    mintAddress: "PREMIUM_TOKEN_1234567890123456789012345678901234567890",
    description: "Required token for premium access",
  },
  {
    name: "VIP Token",
    mintAddress: "VIP_TOKEN_1234567890123456789012345678901234567890",
    description: "Required token for VIP access",
  },
];

// Create demo data
const demoData = {
  wallets: {
    admin: {
      publicKey: "CNKResE1JrZTDKJcncDqet4ZWD8hNQAJgTwsv8N5TbpG",
      description: "Admin wallet for package registration",
    },
    user1: {
      publicKey: "A2EdpqTf49MAQMLqbPYvZJPEZMjiUSiLzZYRysTED98X",
      description: "User wallet with NFT access",
    },
    user2: {
      publicKey: "7dGURf5jtacqXAAx2j22bpWmphhvMineXxEfY4LjkWQN",
      description: "User wallet without NFT access",
    },
  },
  nfts: demoNfts,
  tokens: demoTokens,
  packages: [
    {
      name: "com.example.premiumgame",
      drmType: "nft",
      requiredNft: demoNfts[0].mintAddress,
      description: "Premium game requiring NFT access",
    },
    {
      name: "com.example.vipapp",
      drmType: "token",
      requiredToken: demoTokens[0].mintAddress,
      minAmount: 100,
      description: "VIP app requiring token balance",
    },
    {
      name: "com.example.exclusivecontent",
      drmType: "mixed",
      requiredNft: demoNfts[1].mintAddress,
      requiredToken: demoTokens[1].mintAddress,
      minAmount: 50,
      description: "Exclusive content requiring both NFT and token",
    },
  ],
};

// Save demo data
fs.writeFileSync("demo-data.json", JSON.stringify(demoData, null, 2));

console.log("Demo data generated successfully!");
console.log("\n=== Demo Wallets ===");
Object.entries(demoData.wallets).forEach(([name, wallet]) => {
  console.log(`${name}: ${wallet.publicKey}`);
});

console.log("\n=== Demo NFTs ===");
demoData.nfts.forEach((nft) => {
  console.log(`${nft.name}: ${nft.mintAddress}`);
});

console.log("\n=== Demo Packages ===");
demoData.packages.forEach((pkg) => {
  console.log(`${pkg.name}: ${pkg.drmType} - ${pkg.description}`);
});

console.log("\nDemo data saved to demo-data.json");
