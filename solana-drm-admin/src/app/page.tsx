"use client";

import { useState, useEffect } from "react";
import { Connection, clusterApiUrl, PublicKey } from "@solana/web3.js";
import { checkDrmAccess } from "@solana-drm/core";

type DrmType = "nft" | "token" | "mixed";

interface DashboardStats {
  totalPackages: number;
  totalDrmChecks: number;
  successRate: number;
  activeUsers: number;
  recentChecks: Array<{
    id: string;
    walletAddress: string;
    result: boolean;
    timestamp: Date;
    drmType: DrmType;
  }>;
  recentPackages: Array<{
    id: string;
    packageName: string;
    drmType: DrmType;
    timestamp: Date;
  }>;
}

export default function Home() {
  const [activeTab, setActiveTab] = useState<
    "dashboard" | "check" | "register" | "analytics"
  >("dashboard");
  const [stats, setStats] = useState<DashboardStats>({
    totalPackages: 0,
    totalDrmChecks: 0,
    successRate: 0,
    activeUsers: 0,
    recentChecks: [],
    recentPackages: [],
  });

  // DRM Check related state
  const [walletAddress, setWalletAddress] = useState("");
  const [drmType, setDrmType] = useState<DrmType>("nft");
  const [nftMintAddresses, setNftMintAddresses] = useState<string[]>([""]);
  const [tokenMintAddress, setTokenMintAddress] = useState("");
  const [minTokenAmount, setMinTokenAmount] = useState(1);
  const [drmResult, setDrmResult] = useState<boolean | null>(null);
  const [isChecking, setIsChecking] = useState(false);

  // Package Registration related state
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

  // Mock data for dashboard
  useEffect(() => {
    // In reality, data should be fetched from API
    setStats({
      totalPackages: 24,
      totalDrmChecks: 1250,
      successRate: 87.5,
      activeUsers: 156,
      recentChecks: [
        {
          id: "1",
          walletAddress: "7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU",
          result: true,
          timestamp: new Date(Date.now() - 5 * 60 * 1000),
          drmType: "nft",
        },
        {
          id: "2",
          walletAddress: "9WzDXwBbmkg8ZTbNMqUxvQRAyrZzDsGYdLVL9zYtAWWM",
          result: false,
          timestamp: new Date(Date.now() - 12 * 60 * 1000),
          drmType: "token",
        },
        {
          id: "3",
          walletAddress: "3xJ8LcBMSCVqdpkR3robCLsWroqArNgE4vu5Vof2yuQ",
          result: true,
          timestamp: new Date(Date.now() - 25 * 60 * 1000),
          drmType: "mixed",
        },
      ],
      recentPackages: [
        {
          id: "1",
          packageName: "com.example.game",
          drmType: "nft",
          timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
        },
        {
          id: "2",
          packageName: "com.premium.app",
          drmType: "token",
          timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
        },
      ],
    });
  }, []);

  const handleCheckDrm = async () => {
    if (!walletAddress) {
      alert("Please enter a wallet address.");
      return;
    }

    // DRM type validation
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

      // Update stats
      setStats((prev) => ({
        ...prev,
        totalDrmChecks: prev.totalDrmChecks + 1,
        recentChecks: [
          {
            id: Date.now().toString(),
            walletAddress,
            result: hasAccess,
            timestamp: new Date(),
            drmType,
          },
          ...prev.recentChecks.slice(0, 4),
        ],
      }));
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

    // DRM type validation
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
      // TODO: Actual Solana program call
      // const result = await registerPackage({
      //   packageName: packageName.trim(),
      //   drmType: packageDrmType,
      //   nftMintAddresses: packageNftAddresses.filter(addr => addr.trim() !== ""),
      //   tokenMintAddress: packageTokenAddress.trim() || undefined,
      //   minTokenAmount: packageMinTokenAmount,
      // });

      // Temporarily show success message
      setRegistrationResult("Package registered successfully!");

      // Update stats
      setStats((prev) => ({
        ...prev,
        totalPackages: prev.totalPackages + 1,
        recentPackages: [
          {
            id: Date.now().toString(),
            packageName: packageName.trim(),
            drmType: packageDrmType,
            timestamp: new Date(),
          },
          ...prev.recentPackages.slice(0, 4),
        ],
      }));

      // Reset form
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

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInMinutes = Math.floor(
      (now.getTime() - date.getTime()) / (1000 * 60)
    );

    if (diffInMinutes < 1) return "Just now";
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;

    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours}h ago`;

    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays}d ago`;
  };

  const shortenAddress = (address: string) => {
    return `${address.slice(0, 4)}...${address.slice(-4)}`;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <h1 className="text-2xl font-bold text-gray-900">
              Solana DRM Admin Dashboard
            </h1>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm text-gray-600">System Online</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8">
            {[
              { id: "dashboard", label: "Dashboard", icon: "📊" },
              { id: "check", label: "DRM Check", icon: "🔍" },
              { id: "register", label: "Register Package", icon: "📦" },
              { id: "analytics", label: "Analytics", icon: "📈" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === "dashboard" && (
          <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-blue-500 rounded-md flex items-center justify-center">
                      <span className="text-white text-sm font-medium">📦</span>
                    </div>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">
                      Total Packages
                    </p>
                    <p className="text-2xl font-semibold text-gray-900">
                      {stats.totalPackages}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-green-500 rounded-md flex items-center justify-center">
                      <span className="text-white text-sm font-medium">🔍</span>
                    </div>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">
                      DRM Checks
                    </p>
                    <p className="text-2xl font-semibold text-gray-900">
                      {stats.totalDrmChecks.toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-yellow-500 rounded-md flex items-center justify-center">
                      <span className="text-white text-sm font-medium">📈</span>
                    </div>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">
                      Success Rate
                    </p>
                    <p className="text-2xl font-semibold text-gray-900">
                      {stats.successRate}%
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-purple-500 rounded-md flex items-center justify-center">
                      <span className="text-white text-sm font-medium">👥</span>
                    </div>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">
                      Active Users
                    </p>
                    <p className="text-2xl font-semibold text-gray-900">
                      {stats.activeUsers}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">
                  Quick Actions
                </h3>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <button
                    onClick={() => setActiveTab("check")}
                    className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                      <span className="text-blue-600 text-lg">🔍</span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">
                        Check DRM Access
                      </p>
                      <p className="text-sm text-gray-500">
                        Verify wallet permissions
                      </p>
                    </div>
                  </button>

                  <button
                    onClick={() => setActiveTab("register")}
                    className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mr-4">
                      <span className="text-green-600 text-lg">📦</span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">
                        Register Package
                      </p>
                      <p className="text-sm text-gray-500">
                        Add new app package
                      </p>
                    </div>
                  </button>

                  <button
                    onClick={() => setActiveTab("analytics")}
                    className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mr-4">
                      <span className="text-purple-600 text-lg">📊</span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">
                        View Analytics
                      </p>
                      <p className="text-sm text-gray-500">
                        Detailed statistics
                      </p>
                    </div>
                  </button>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent DRM Checks */}
              <div className="bg-white rounded-lg shadow">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h3 className="text-lg font-medium text-gray-900">
                    Recent DRM Checks
                  </h3>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    {stats.recentChecks.map((check) => (
                      <div
                        key={check.id}
                        className="flex items-center justify-between"
                      >
                        <div className="flex items-center">
                          <div
                            className={`w-3 h-3 rounded-full mr-3 ${
                              check.result ? "bg-green-500" : "bg-red-500"
                            }`}
                          ></div>
                          <div>
                            <p className="text-sm font-medium text-gray-900">
                              {shortenAddress(check.walletAddress)}
                            </p>
                            <p className="text-xs text-gray-500">
                              {check.drmType.toUpperCase()} •{" "}
                              {formatTimeAgo(check.timestamp)}
                            </p>
                          </div>
                        </div>
                        <span
                          className={`text-sm font-medium ${
                            check.result ? "text-green-600" : "text-red-600"
                          }`}
                        >
                          {check.result ? "Granted" : "Denied"}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Recent Package Registrations */}
              <div className="bg-white rounded-lg shadow">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h3 className="text-lg font-medium text-gray-900">
                    Recent Package Registrations
                  </h3>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    {stats.recentPackages.map((pkg) => (
                      <div
                        key={pkg.id}
                        className="flex items-center justify-between"
                      >
                        <div className="flex items-center">
                          <div className="w-3 h-3 bg-blue-500 rounded-full mr-3"></div>
                          <div>
                            <p className="text-sm font-medium text-gray-900">
                              {pkg.packageName}
                            </p>
                            <p className="text-xs text-gray-500">
                              {pkg.drmType.toUpperCase()} •{" "}
                              {formatTimeAgo(pkg.timestamp)}
                            </p>
                          </div>
                        </div>
                        <span className="text-sm text-gray-500">
                          Registered
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* System Status */}
            <div className="bg-white rounded-lg shadow">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">
                  System Status
                </h3>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        Solana Network
                      </p>
                      <p className="text-xs text-gray-500">
                        Devnet - Operational
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        DRM Program
                      </p>
                      <p className="text-xs text-gray-500">
                        Active - All functions working
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        API Services
                      </p>
                      <p className="text-xs text-gray-500">
                        Healthy - 99.9% uptime
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "check" && (
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900">
                DRM Access Check
              </h2>
            </div>
            <div className="p-6">
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
            </div>
          </div>
        )}

        {activeTab === "register" && (
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900">
                Register New Package
              </h2>
            </div>
            <div className="p-6">
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
            </div>
          </div>
        )}

        {activeTab === "analytics" && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">
                Analytics Dashboard
              </h2>
              <p className="text-gray-600">
                Detailed analytics and reporting features will be implemented
                here.
              </p>
              <div className="mt-4 p-4 bg-gray-50 rounded-md">
                <p className="text-sm text-gray-500">
                  📊 Charts and graphs showing DRM usage patterns
                  <br />
                  📈 Package registration trends
                  <br />
                  🔍 User access patterns
                  <br />
                  💰 Revenue analytics (if applicable)
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
