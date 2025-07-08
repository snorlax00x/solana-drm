"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkDrmAccess = exports.hasAnyNft = exports.hasTokenAmount = exports.hasNft = void 0;
const web3_js_1 = require("@solana/web3.js");
/**
 * Check if a specific NFT is owned
 * @param connection Solana connection object
 * @param ownerPublicKey Owner wallet address
 * @param nftMintAddress NFT mint address to check
 * @returns NFT ownership status
 */
function hasNft(connection, ownerPublicKey, nftMintAddress) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const tokenAccounts = yield connection.getParsedTokenAccountsByOwner(ownerPublicKey, { programId: new web3_js_1.PublicKey('TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA') });
            for (const { account } of tokenAccounts.value) {
                const info = account.data.parsed.info;
                if (info.mint === nftMintAddress &&
                    info.tokenAmount.uiAmount === 1 &&
                    info.tokenAmount.decimals === 0) {
                    return true;
                }
            }
            return false;
        }
        catch (error) {
            console.error('Error checking NFT ownership:', error);
            return false;
        }
    });
}
exports.hasNft = hasNft;
/**
 * Check if a specific SPL token is owned above minimum amount
 * @param connection Solana connection object
 * @param ownerPublicKey Owner wallet address
 * @param tokenMintAddress Token mint address to check
 * @param minAmount Minimum amount to own
 * @returns Token ownership status
 */
function hasTokenAmount(connection, ownerPublicKey, tokenMintAddress, minAmount) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const tokenAccounts = yield connection.getParsedTokenAccountsByOwner(ownerPublicKey, { programId: new web3_js_1.PublicKey('TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA') });
            for (const { account } of tokenAccounts.value) {
                const info = account.data.parsed.info;
                if (info.mint === tokenMintAddress &&
                    Number(info.tokenAmount.uiAmount) >= minAmount) {
                    return true;
                }
            }
            return false;
        }
        catch (error) {
            console.error('Error checking token ownership:', error);
            return false;
        }
    });
}
exports.hasTokenAmount = hasTokenAmount;
/**
 * Check if any NFT from a list is owned
 * @param connection Solana connection object
 * @param ownerPublicKey Owner wallet address
 * @param nftMintAddresses Array of NFT mint addresses to check
 * @returns NFT ownership status
 */
function hasAnyNft(connection, ownerPublicKey, nftMintAddresses) {
    return __awaiter(this, void 0, void 0, function* () {
        for (const mintAddress of nftMintAddresses) {
            if (yield hasNft(connection, ownerPublicKey, mintAddress)) {
                return true;
            }
        }
        return false;
    });
}
exports.hasAnyNft = hasAnyNft;
/**
 * DRM access permission check (NFT or token)
 * @param connection Solana connection object
 * @param ownerPublicKey Owner wallet address
 * @param drmConfig DRM configuration object
 * @returns Access permission status
 */
function checkDrmAccess(connection, ownerPublicKey, drmConfig) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // NFT check
            if (drmConfig.nftMintAddresses && drmConfig.nftMintAddresses.length > 0) {
                if (yield hasAnyNft(connection, ownerPublicKey, drmConfig.nftMintAddresses)) {
                    return true;
                }
            }
            // Token check
            if (drmConfig.tokenMintAddress && drmConfig.minTokenAmount) {
                if (yield hasTokenAmount(connection, ownerPublicKey, drmConfig.tokenMintAddress, drmConfig.minTokenAmount)) {
                    return true;
                }
            }
            return false;
        }
        catch (error) {
            console.error('Error checking DRM access:', error);
            return false;
        }
    });
}
exports.checkDrmAccess = checkDrmAccess;
