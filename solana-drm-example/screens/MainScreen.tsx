import React, {useCallback, useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useConnection} from '../components/providers/ConnectionProvider';
import {
  useAuthorization,
  Account,
} from '../components/providers/AuthorizationProvider';
import {checkDrmAccess} from '@solana-drm/core';

export default function MainScreen() {
  const {connection} = useConnection();
  const {selectedAccount} = useAuthorization();
  const [balance, setBalance] = useState<number | null>(null);
  const [hasDrmAccess, setHasDrmAccess] = useState<boolean | null>(null);
  const [isCheckingDrm, setIsCheckingDrm] = useState(false);
  // Package name (in real app, set to the app's package name)
  const packageName = 'com.example.app';

  const fetchAndUpdateBalance = useCallback(
    async (account: Account) => {
      console.log('Fetching balance for: ' + account.publicKey);
      const fetchedBalance = await connection.getBalance(account.publicKey);
      console.log('Balance fetched: ' + fetchedBalance);
      setBalance(fetchedBalance);
    },
    [connection],
  );

  // DRM configuration (example - replace with actual NFT/token addresses)
  const drmConfig = {
    nftMintAddresses: [
      // 'YOUR_ACTUAL_NFT_MINT_ADDRESS_HERE',
    ],
    tokenMintAddress: 'YOUR_ACTUAL_TOKEN_MINT_ADDRESS_HERE',
    minTokenAmount: 1,
  };

  const checkDrmAccessForAccount = useCallback(
    async (account: Account) => {
      if (!account) return;

      setIsCheckingDrm(true);
      try {
        const hasAccess = await checkDrmAccess(
          connection,
          account.publicKey,
          drmConfig,
        );
        setHasDrmAccess(hasAccess);
      } catch (error) {
        console.error('Error checking DRM access:', error);
        setHasDrmAccess(false);
      } finally {
        setIsCheckingDrm(false);
      }
    },
    [connection, drmConfig],
  );

  useEffect(() => {
    if (!selectedAccount) {
      setHasDrmAccess(null);
      return;
    }
    fetchAndUpdateBalance(selectedAccount);
    checkDrmAccessForAccount(selectedAccount);
  }, [fetchAndUpdateBalance, checkDrmAccessForAccount, selectedAccount]);

  if (!selectedAccount) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Welcome to Solana DRM</Text>
        <Text style={styles.subtitle}>
          Please connect your wallet to continue
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Solana DRM Demo</Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Wallet Information</Text>
        <Text style={styles.text}>
          Address: {selectedAccount.publicKey.toString()}
        </Text>
        <Text style={styles.text}>
          Balance: {balance !== null ? `${balance / 1e9} SOL` : 'Loading...'}
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>DRM Status</Text>
        <Text style={styles.text}>Package: {packageName}</Text>
        {isCheckingDrm ? (
          <Text style={styles.text}>Checking DRM access...</Text>
        ) : hasDrmAccess !== null ? (
          <View style={styles.drmResult}>
            <Text
              style={[
                styles.drmStatus,
                hasDrmAccess ? styles.accessGranted : styles.accessDenied,
              ]}>
              {hasDrmAccess ? '✓ Access Granted' : '✗ Access Denied'}
            </Text>
            <Text style={styles.drmDescription}>
              {hasDrmAccess
                ? 'You have permission to access protected content.'
                : 'You need to own the required NFT or tokens to access this content.'}
            </Text>
          </View>
        ) : (
          <Text style={styles.text}>DRM status not available</Text>
        )}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>How it works</Text>
        <Text style={styles.description}>
          This app checks if your wallet owns specific NFTs or tokens that are
          required for access. The DRM configuration is stored on the Solana
          blockchain and associated with this app's package name.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    color: '#666',
    marginTop: 10,
  },
  section: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  text: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  drmResult: {
    marginTop: 10,
  },
  drmStatus: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  accessGranted: {
    color: '#28a745',
  },
  accessDenied: {
    color: '#dc3545',
  },
  drmDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  description: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
});
