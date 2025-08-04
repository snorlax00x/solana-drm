import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Alert,
  StatusBar,
} from "react-native";
import { Connection, PublicKey, clusterApiUrl } from "@solana/web3.js";
import { checkDrmAccess } from "./src/utils/drmUtils";
import {
  getRealDrmConfig,
  getRealWallet,
  realDemoData,
} from "./src/utils/realDemoData";
import "react-native-get-random-values";

export default function AppReal() {
  const [connection, setConnection] = useState<Connection | null>(null);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [balance, setBalance] = useState<number | null>(null);
  const [hasDrmAccess, setHasDrmAccess] = useState<boolean | null>(null);
  const [isCheckingDrm, setIsCheckingDrm] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [selectedScenario, setSelectedScenario] = useState<
    "admin" | "premium" | "standard" | "basic"
  >("premium");
  const [selectedWallet, setSelectedWallet] = useState<
    "admin" | "premium" | "standard" | "basic"
  >("premium");

  useEffect(() => {
    // Initialize Solana connection to devnet
    const conn = new Connection(clusterApiUrl("devnet"), "confirmed");
    setConnection(conn);
  }, []);

  const connectWallet = async (
    walletType: "admin" | "premium" | "standard" | "basic"
  ) => {
    try {
      const realWallet = getRealWallet(walletType);
      setWalletAddress(realWallet.address);
      setSelectedWallet(walletType);
      setIsConnected(true);

      // Set balance from real wallet data
      setBalance(realWallet.balance * 1e9); // Convert to lamports

      // Check DRM access
      await checkDrmAccessForWallet(new PublicKey(realWallet.address));
    } catch (error) {
      console.error("Error connecting wallet:", error);
      Alert.alert("Error", "Failed to connect wallet");
    }
  };

  const checkDrmAccessForWallet = async (publicKey: PublicKey) => {
    if (!connection) return;

    setIsCheckingDrm(true);
    try {
      const drmConfig = getRealDrmConfig(selectedScenario);

      // Special handling for admin access
      if (drmConfig.adminOnly) {
        const isAdmin =
          realDemoData.realWallets.admin.address === publicKey.toString();
        setHasDrmAccess(isAdmin);
        return;
      }

      const hasAccess = await checkDrmAccess(connection, publicKey, drmConfig);
      setHasDrmAccess(hasAccess);
    } catch (error) {
      console.error("Error checking DRM access:", error);
      setHasDrmAccess(false);
    } finally {
      setIsCheckingDrm(false);
    }
  };

  const disconnectWallet = () => {
    setWalletAddress(null);
    setBalance(null);
    setHasDrmAccess(null);
    setIsConnected(false);
    setSelectedWallet("premium");
  };

  const changeScenario = (
    scenario: "admin" | "premium" | "standard" | "basic"
  ) => {
    setSelectedScenario(scenario);
    if (isConnected && walletAddress) {
      checkDrmAccessForWallet(new PublicKey(walletAddress));
    }
  };

  const getCurrentDrmConfig = () => {
    return getRealDrmConfig(selectedScenario);
  };

  const getCurrentWallet = () => {
    return getRealWallet(selectedWallet);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f5f5f5" />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.title}>Solana DRM Hackathon</Text>
          <Text style={styles.subtitle}>Real Contract Demo</Text>
          <Text style={styles.deployedBadge}>🚀 Deployed Contract</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Content Access Level</Text>
          <View style={styles.buttonGroup}>
            <TouchableOpacity
              style={[
                styles.scenarioButton,
                selectedScenario === "admin" && styles.selectedButton,
              ]}
              onPress={() => changeScenario("admin")}
            >
              <Text
                style={[
                  styles.scenarioButtonText,
                  selectedScenario === "admin" && styles.selectedButtonText,
                ]}
              >
                Admin
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.scenarioButton,
                selectedScenario === "premium" && styles.selectedButton,
              ]}
              onPress={() => changeScenario("premium")}
            >
              <Text
                style={[
                  styles.scenarioButtonText,
                  selectedScenario === "premium" && styles.selectedButtonText,
                ]}
              >
                Premium
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.scenarioButton,
                selectedScenario === "standard" && styles.selectedButton,
              ]}
              onPress={() => changeScenario("standard")}
            >
              <Text
                style={[
                  styles.scenarioButtonText,
                  selectedScenario === "standard" && styles.selectedButtonText,
                ]}
              >
                Standard
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.scenarioButton,
                selectedScenario === "basic" && styles.selectedButton,
              ]}
              onPress={() => changeScenario("basic")}
            >
              <Text
                style={[
                  styles.scenarioButtonText,
                  selectedScenario === "basic" && styles.selectedButtonText,
                ]}
              >
                Basic
              </Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.description}>
            {getCurrentDrmConfig().description}
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Real Wallet Connection</Text>
          {!isConnected ? (
            <View>
              <Text style={styles.description}>Choose a real wallet:</Text>
              <View style={styles.walletOptions}>
                <TouchableOpacity
                  style={styles.walletButton}
                  onPress={() => connectWallet("admin")}
                >
                  <Text style={styles.walletButtonText}>Admin Wallet</Text>
                  <Text style={styles.walletButtonSubtext}>
                    Full access control
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.walletButton}
                  onPress={() => connectWallet("premium")}
                >
                  <Text style={styles.walletButtonText}>Premium Wallet</Text>
                  <Text style={styles.walletButtonSubtext}>
                    Has NFTs + Tokens
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.walletButton}
                  onPress={() => connectWallet("standard")}
                >
                  <Text style={styles.walletButtonText}>Standard Wallet</Text>
                  <Text style={styles.walletButtonSubtext}>
                    Has Tokens Only
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.walletButton}
                  onPress={() => connectWallet("basic")}
                >
                  <Text style={styles.walletButtonText}>Basic Wallet</Text>
                  <Text style={styles.walletButtonSubtext}>Minimal Access</Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <View>
              <TouchableOpacity
                style={styles.button}
                onPress={disconnectWallet}
              >
                <Text style={styles.buttonText}>Disconnect</Text>
              </TouchableOpacity>
              <View style={styles.walletInfo}>
                <Text style={styles.text}>
                  <Text style={styles.label}>Wallet:</Text>{" "}
                  {getCurrentWallet().name}
                </Text>
                <Text style={styles.text}>
                  <Text style={styles.label}>Address:</Text> {walletAddress}
                </Text>
                <Text style={styles.text}>
                  <Text style={styles.label}>Balance:</Text>{" "}
                  {balance !== null
                    ? `${(balance / 1e9).toFixed(4)} SOL`
                    : "Loading..."}
                </Text>
                <Text style={styles.text}>
                  <Text style={styles.label}>Access Level:</Text>{" "}
                  {getCurrentWallet().accessLevel}
                </Text>
                <Text style={styles.text}>
                  <Text style={styles.label}>Description:</Text>{" "}
                  {getCurrentWallet().description}
                </Text>
              </View>
            </View>
          )}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>DRM Status</Text>
          <Text style={styles.text}>
            <Text style={styles.label}>Content:</Text>{" "}
            {getCurrentDrmConfig().scenario}
          </Text>
          <Text style={styles.text}>
            <Text style={styles.label}>Contract:</Text>{" "}
            {realDemoData.contracts.drmProgram}
          </Text>
          {isCheckingDrm ? (
            <Text style={styles.text}>Checking DRM access...</Text>
          ) : hasDrmAccess !== null ? (
            <View style={styles.drmResult}>
              <Text
                style={[
                  styles.drmStatus,
                  hasDrmAccess ? styles.accessGranted : styles.accessDenied,
                ]}
              >
                {hasDrmAccess ? "✓ Access Granted" : "✗ Access Denied"}
              </Text>
              <Text style={styles.drmDescription}>
                {hasDrmAccess
                  ? "You have permission to access this content."
                  : "You need to meet the requirements to access this content."}
              </Text>
            </View>
          ) : (
            <Text style={styles.text}>Connect wallet to check DRM access</Text>
          )}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Deployed Assets</Text>
          <Text style={styles.description}>
            <Text style={styles.bold}>NFT Collection:</Text>{" "}
            {realDemoData.realNftCollection.name}
          </Text>
          <Text style={styles.description}>
            <Text style={styles.bold}>Token:</Text>{" "}
            {realDemoData.realToken.name} ({realDemoData.realToken.symbol})
          </Text>
          <Text style={styles.description}>
            <Text style={styles.bold}>Program:</Text> Solana DRM Contract
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Real Demo Features</Text>
          <Text style={styles.description}>
            ✅ Deployed Solana smart contract
          </Text>
          <Text style={styles.description}>
            ✅ Real NFT collection verification
          </Text>
          <Text style={styles.description}>✅ Live token balance checking</Text>
          <Text style={styles.description}>✅ Admin access control</Text>
          <Text style={styles.description}>
            ✅ Real-time blockchain verification
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Demo Scenarios</Text>
          <Text style={styles.description}>
            <Text style={styles.bold}>Admin:</Text> Full administrative access
          </Text>
          <Text style={styles.description}>
            <Text style={styles.bold}>Premium:</Text> Requires NFT ownership
          </Text>
          <Text style={styles.description}>
            <Text style={styles.bold}>Standard:</Text> Requires token balance
          </Text>
          <Text style={styles.description}>
            <Text style={styles.bold}>Basic:</Text> Free access for all
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  scrollContent: {
    padding: 20,
  },
  header: {
    alignItems: "center",
    marginBottom: 30,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    color: "#333",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    textAlign: "center",
    color: "#666",
    marginBottom: 8,
  },
  deployedBadge: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#28a745",
    backgroundColor: "#d4edda",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  section: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#333",
  },
  buttonGroup: {
    flexDirection: "row",
    marginBottom: 15,
  },
  scenarioButton: {
    flex: 1,
    padding: 10,
    marginHorizontal: 2,
    borderRadius: 8,
    backgroundColor: "#f8f9fa",
    borderWidth: 2,
    borderColor: "#e9ecef",
  },
  selectedButton: {
    backgroundColor: "#007bff",
    borderColor: "#007bff",
  },
  scenarioButtonText: {
    textAlign: "center",
    fontSize: 12,
    fontWeight: "600",
    color: "#666",
  },
  selectedButtonText: {
    color: "white",
  },
  walletOptions: {
    marginTop: 10,
  },
  walletButton: {
    backgroundColor: "#f8f9fa",
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#e9ecef",
  },
  walletButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  walletButtonSubtext: {
    fontSize: 12,
    color: "#666",
    marginTop: 2,
  },
  button: {
    backgroundColor: "#007bff",
    padding: 16,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  walletInfo: {
    backgroundColor: "#f8f9fa",
    padding: 15,
    borderRadius: 8,
    marginTop: 10,
  },
  text: {
    fontSize: 14,
    color: "#666",
    marginBottom: 8,
    lineHeight: 20,
  },
  label: {
    fontWeight: "bold",
    color: "#333",
  },
  drmResult: {
    marginTop: 15,
  },
  drmStatus: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  accessGranted: {
    color: "#28a745",
  },
  accessDenied: {
    color: "#dc3545",
  },
  drmDescription: {
    fontSize: 14,
    color: "#666",
    lineHeight: 20,
  },
  description: {
    fontSize: 14,
    color: "#666",
    lineHeight: 20,
    marginBottom: 5,
  },
  bold: {
    fontWeight: "bold",
    color: "#333",
  },
});
