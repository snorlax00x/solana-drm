declare module "@solana-drm/core" {
  import { Connection, PublicKey } from "@solana/web3.js";

  export interface DRMConfig {
    nftMintAddresses?: string[];
    tokenMintAddress?: string;
    minTokenAmount?: number;
  }

  export function hasNft(
    connection: Connection,
    ownerPublicKey: PublicKey,
    nftMintAddress: string
  ): Promise<boolean>;

  export function hasTokenAmount(
    connection: Connection,
    ownerPublicKey: PublicKey,
    tokenMintAddress: string,
    minAmount: number
  ): Promise<boolean>;

  export function hasAnyNft(
    connection: Connection,
    ownerPublicKey: PublicKey,
    nftMintAddresses: string[]
  ): Promise<boolean>;

  export function checkDrmAccess(
    connection: Connection,
    ownerPublicKey: PublicKey,
    drmConfig: DRMConfig
  ): Promise<boolean>;
}
