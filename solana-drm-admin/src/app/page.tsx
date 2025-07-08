"use client";

import { useState } from "react";
import { Connection, clusterApiUrl, PublicKey } from "@solana/web3.js";
import { checkDrmAccess } from "@solana-drm/core";

type DrmType = "nft" | "token" | "mixed";

export default function Home() {
  const [activeTab, setActiveTab] = useState<"check" | "register">("check");

  // DRM Check 관련 상태
  const [walletAddress, setWalletAddress] = useState("");
  const [drmType, setDrmType] = useState<DrmType>("nft");
  const [nftMintAddresses, setNftMintAddresses] = useState<string[]>([""]);
  const [tokenMintAddress, setTokenMintAddress] = useState("");
  const [minTokenAmount, setMinTokenAmount] = useState(1);
  const [drmResult, setDrmResult] = useState<boolean | null>(null);
  const [isChecking, setIsChecking] = useState(false);

  // Package Registration 관련 상태
  const [packageName, setPackageName] = useState("");
  const [packageDrmType, setPackageDrmType] = useState<DrmType>("nft");
  const [packageNftAddresses, setPackageNftAddresses] = useState<string[]>([
    "",
  ]);
  const [packageTokenAddress, setPackageTokenAddress] = useState("");
  const [packageMinTokenAmount, setPackageMinTokenAmount] = useState(1);
  const [isRegistering, setIsRegistering] = useState(false);
  const [registrationResult, setRegistrationResult] = useState<string | null>(
    null
  );

  const connection = new Connection(clusterApiUrl("devnet"));

  const handleCheckDrm = async () => {
    if (!walletAddress) {
      alert("Please enter a wallet address.");
      return;
    }

    // DRM 타입별 유효성 검사
    if (drmType === "nft") {
      const validNftAddresses = nftMintAddresses.filter(
        (addr) => addr.trim() !== ""
      );
      if (validNftAddresses.length === 0) {
        alert("Please enter at least one NFT mint address.");
        return;
      }
    } else if (drmType === "token") {
      if (!tokenMintAddress.trim()) {
        alert("Please enter a token mint address.");
        return;
      }
      if (minTokenAmount <= 0) {
        alert("Minimum token amount must be greater than 0.");
        return;
      }
    } else if (drmType === "mixed") {
      const validNftAddresses = nftMintAddresses.filter(
        (addr) => addr.trim() !== ""
      );
      if (validNftAddresses.length === 0 && !tokenMintAddress.trim()) {
        alert("Please enter at least one NFT address or token address.");
        return;
      }
    }

    setIsChecking(true);
    try {
      const drmConfig = {
        nftMintAddresses:
          drmType === "nft" || drmType === "mixed"
            ? nftMintAddresses.filter((addr) => addr.trim() !== "")
            : undefined,
        tokenMintAddress:
          drmType === "token" || drmType === "mixed"
            ? tokenMintAddress
            : undefined,
        minTokenAmount:
          drmType === "token" || drmType === "mixed"
            ? minTokenAmount
            : undefined,
      };

      const hasAccess = await checkDrmAccess(
        connection,
        new PublicKey(walletAddress),
        drmConfig
      );

      setDrmResult(hasAccess);
    } catch (error) {
      console.error("Error checking DRM access:", error);
      alert("An error occurred while checking DRM access.");
    } finally {
      setIsChecking(false);
    }
  };

  const handleRegisterPackage = async () => {
    if (!packageName.trim()) {
      alert("Please enter a package name.");
      return;
    }

    // DRM 타입별 유효성 검사
    if (packageDrmType === "nft") {
      const validNftAddresses = packageNftAddresses.filter(
        (addr) => addr.trim() !== ""
      );
      if (validNftAddresses.length === 0) {
        alert("Please enter at least one NFT mint address.");
        return;
      }
    } else if (packageDrmType === "token") {
      if (!packageTokenAddress.trim()) {
        alert("Please enter a token mint address.");
        return;
      }
      if (packageMinTokenAmount <= 0) {
        alert("Minimum token amount must be greater than 0.");
        return;
      }
    } else if (packageDrmType === "mixed") {
      const validNftAddresses = packageNftAddresses.filter(
        (addr) => addr.trim() !== ""
      );
      if (validNftAddresses.length === 0 && !packageTokenAddress.trim()) {
        alert("Please enter at least one NFT address or token address.");
        return;
      }
    }

    setIsRegistering(true);
    try {
      // TODO: 실제 솔라나 프로그램 호출
      // const result = await registerPackage({
      //   packageName: packageName.trim(),
      //   drmType: packageDrmType,
      //   nftMintAddresses: packageNftAddresses.filter(addr => addr.trim() !== ""),
      //   tokenMintAddress: packageTokenAddress.trim() || undefined,
      //   minTokenAmount: packageMinTokenAmount,
      // });

      // 임시로 성공 메시지 표시
      setRegistrationResult("Package registered successfully!");

      // 폼 초기화
      setPackageName("");
      setPackageDrmType("nft");
      setPackageNftAddresses([""]);
      setPackageTokenAddress("");
      setPackageMinTokenAmount(1);
    } catch (error) {
      console.error("Error registering package:", error);
      setRegistrationResult("Failed to register package. Please try again.");
    } finally {
      setIsRegistering(false);
    }
  };

  const addNftAddress = (
    addresses: string[],
    setAddresses: (addresses: string[]) => void
  ) => {
    setAddresses([...addresses, ""]);
  };

  const removeNftAddress = (
    index: number,
    addresses: string[],
    setAddresses: (addresses: string[]) => void
  ) => {
    setAddresses(addresses.filter((_, i) => i !== index));
  };

  const updateNftAddress = (
    index: number,
    value: string,
    addresses: string[],
    setAddresses: (addresses: string[]) => void
  ) => {
    const newAddresses = [...addresses];
    newAddresses[index] = value;
    setAddresses(newAddresses);
  };

  const handleDrmTypeChange = (type: DrmType) => {
    setDrmType(type);
    setDrmResult(null);
  };

  const handlePackageDrmTypeChange = (type: DrmType) => {
    setPackageDrmType(type);
    setRegistrationResult(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Solana DRM Management Tool
          </h1>

          {/* Tab Navigation */}
          <div className="flex border-b border-gray-200 mb-6">
            <button
              onClick={() => setActiveTab("check")}
              className={`px-4 py-2 font-medium ${
                activeTab === "check"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              DRM Check
            </button>
            <button
              onClick={() => setActiveTab("register")}
              className={`px-4 py-2 font-medium ${
                activeTab === "register"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Package Registration
            </button>
          </div>

          {activeTab === "check" && (
            <>
              {/* Wallet Address Input */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Wallet Address
                </label>
                <input
                  type="text"
                  value={walletAddress}
                  onChange={(e) => setWalletAddress(e.target.value)}
                  placeholder="Enter wallet address"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* DRM Type Selection */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  DRM Type
                </label>
                <div className="space-y-3">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="drmType"
                      value="nft"
                      checked={drmType === "nft"}
                      onChange={() => handleDrmTypeChange("nft")}
                      className="mr-3 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-gray-700">NFT Ownership Check</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="drmType"
                      value="token"
                      checked={drmType === "token"}
                      onChange={() => handleDrmTypeChange("token")}
                      className="mr-3 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-gray-700">Token Amount Check</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="drmType"
                      value="mixed"
                      checked={drmType === "mixed"}
                      onChange={() => handleDrmTypeChange("mixed")}
                      className="mr-3 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-gray-700">Mixed (NFT + Token)</span>
                  </label>
                </div>
              </div>

              {/* NFT Configuration */}
              {(drmType === "nft" || drmType === "mixed") && (
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    NFT Mint Addresses
                  </label>
                  <p className="text-sm text-gray-600 mb-2">
                    Check if the wallet owns any of these NFTs
                  </p>
                  {nftMintAddresses.map((address, index) => (
                    <div key={index} className="flex gap-2 mb-2">
                      <input
                        type="text"
                        value={address}
                        onChange={(e) =>
                          updateNftAddress(
                            index,
                            e.target.value,
                            nftMintAddresses,
                            setNftMintAddresses
                          )
                        }
                        placeholder="Enter NFT mint address"
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      {nftMintAddresses.length > 1 && (
                        <button
                          onClick={() =>
                            removeNftAddress(
                              index,
                              nftMintAddresses,
                              setNftMintAddresses
                            )
                          }
                          className="px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                        >
                          Remove
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    onClick={() =>
                      addNftAddress(nftMintAddresses, setNftMintAddresses)
                    }
                    className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                  >
                    Add NFT Address
                  </button>
                </div>
              )}

              {/* Token Configuration */}
              {(drmType === "token" || drmType === "mixed") && (
                <>
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Token Mint Address
                    </label>
                    <p className="text-sm text-gray-600 mb-2">
                      Check if the wallet holds the specified token
                    </p>
                    <input
                      type="text"
                      value={tokenMintAddress}
                      onChange={(e) => setTokenMintAddress(e.target.value)}
                      placeholder="Enter token mint address"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Minimum Token Amount
                    </label>
                    <p className="text-sm text-gray-600 mb-2">
                      Minimum amount of tokens required for access
                    </p>
                    <input
                      type="number"
                      value={minTokenAmount}
                      onChange={(e) =>
                        setMinTokenAmount(Number(e.target.value))
                      }
                      min="0"
                      step="0.000001"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </>
              )}

              {/* DRM Check Button */}
              <div className="mb-6">
                <button
                  onClick={handleCheckDrm}
                  disabled={isChecking}
                  className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400"
                >
                  {isChecking ? "Checking..." : "Check DRM Access"}
                </button>
              </div>

              {/* DRM Result */}
              {drmResult !== null && (
                <div
                  className={`p-4 rounded-md ${
                    drmResult
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  <p className="font-medium">
                    {drmResult ? "Access Granted" : "Access Denied"}
                  </p>
                </div>
              )}
            </>
          )}

          {activeTab === "register" && (
            <>
              {/* Package Name Input */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Package Name
                </label>
                <p className="text-sm text-gray-600 mb-2">
                  Enter the app package name (e.g., com.example.app)
                </p>
                <input
                  type="text"
                  value={packageName}
                  onChange={(e) => setPackageName(e.target.value)}
                  placeholder="com.example.app"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Package DRM Type Selection */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  DRM Type for Package
                </label>
                <div className="space-y-3">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="packageDrmType"
                      value="nft"
                      checked={packageDrmType === "nft"}
                      onChange={() => handlePackageDrmTypeChange("nft")}
                      className="mr-3 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-gray-700">NFT Ownership Check</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="packageDrmType"
                      value="token"
                      checked={packageDrmType === "token"}
                      onChange={() => handlePackageDrmTypeChange("token")}
                      className="mr-3 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-gray-700">Token Amount Check</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="packageDrmType"
                      value="mixed"
                      checked={packageDrmType === "mixed"}
                      onChange={() => handlePackageDrmTypeChange("mixed")}
                      className="mr-3 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-gray-700">Mixed (NFT + Token)</span>
                  </label>
                </div>
              </div>

              {/* Package NFT Configuration */}
              {(packageDrmType === "nft" || packageDrmType === "mixed") && (
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    NFT Mint Addresses
                  </label>
                  <p className="text-sm text-gray-600 mb-2">
                    NFTs required for this package
                  </p>
                  {packageNftAddresses.map((address, index) => (
                    <div key={index} className="flex gap-2 mb-2">
                      <input
                        type="text"
                        value={address}
                        onChange={(e) =>
                          updateNftAddress(
                            index,
                            e.target.value,
                            packageNftAddresses,
                            setPackageNftAddresses
                          )
                        }
                        placeholder="Enter NFT mint address"
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      {packageNftAddresses.length > 1 && (
                        <button
                          onClick={() =>
                            removeNftAddress(
                              index,
                              packageNftAddresses,
                              setPackageNftAddresses
                            )
                          }
                          className="px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                        >
                          Remove
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    onClick={() =>
                      addNftAddress(packageNftAddresses, setPackageNftAddresses)
                    }
                    className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                  >
                    Add NFT Address
                  </button>
                </div>
              )}

              {/* Package Token Configuration */}
              {(packageDrmType === "token" || packageDrmType === "mixed") && (
                <>
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Token Mint Address
                    </label>
                    <p className="text-sm text-gray-600 mb-2">
                      Token required for this package
                    </p>
                    <input
                      type="text"
                      value={packageTokenAddress}
                      onChange={(e) => setPackageTokenAddress(e.target.value)}
                      placeholder="Enter token mint address"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Minimum Token Amount
                    </label>
                    <p className="text-sm text-gray-600 mb-2">
                      Minimum amount of tokens required for access
                    </p>
                    <input
                      type="number"
                      value={packageMinTokenAmount}
                      onChange={(e) =>
                        setPackageMinTokenAmount(Number(e.target.value))
                      }
                      min="0"
                      step="0.000001"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </>
              )}

              {/* Package Registration Button */}
              <div className="mb-6">
                <button
                  onClick={handleRegisterPackage}
                  disabled={isRegistering}
                  className="w-full px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:bg-gray-400"
                >
                  {isRegistering ? "Registering..." : "Register Package"}
                </button>
              </div>

              {/* Registration Result */}
              {registrationResult && (
                <div
                  className={`p-4 rounded-md ${
                    registrationResult.includes("successfully")
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  <p className="font-medium">{registrationResult}</p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
