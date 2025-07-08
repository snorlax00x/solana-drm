import { Connection, PublicKey } from "@solana/web3.js";

export interface DRMConfig {
  nftMintAddresses?: string[];
  tokenMintAddress?: string;
  minTokenAmount?: number;
}

export interface AccessResult {
  hasAccess: boolean;
  reason?: string;
  details?: {
    nftOwned?: string[];
    tokenBalance?: number;
  };
}

export interface ContentProtectionConfig {
  contentId: string;
  requirements: DRMConfig;
  metadata?: Record<string, any>;
}

export interface SDKConfig {
  network?: "mainnet-beta" | "testnet" | "devnet";
  rpcUrl?: string;
  connection?: Connection;
}

export interface WalletInfo {
  publicKey: string;
  balance?: number;
  nftCount?: number;
  tokenBalances?: Record<string, number>;
}

export interface NetworkInfo {
  endpoint: string;
  network: string;
}

// Package registration types
export interface PackageRegistration {
  packageName: string;
  drmType: "nft" | "token" | "mixed";
  nftMintAddresses?: string[];
  tokenMintAddress?: string;
  minTokenAmount?: number;
}

export interface PackageInfo {
  packageName: string;
  drmType: string;
  nftMintAddresses: string[];
  tokenMintAddress?: string;
  minTokenAmount?: number;
  isActive: boolean;
  createdAt: number;
  authority: string;
}
