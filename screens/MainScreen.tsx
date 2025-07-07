import React, {useCallback, useEffect, useState} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';

import {Section} from '../components/Section';
import ConnectButton from '../components/ConnectButton';
import AccountInfo from '../components/AccountInfo';
import {
  useAuthorization,
  Account,
} from '../components/providers/AuthorizationProvider';
import {useConnection} from '../components/providers/ConnectionProvider';
import DisconnectButton from '../components/DisconnectButton';
import RequestAirdropButton from '../components/RequestAirdropButton';
import SignMessageButton from '../components/SignMessageButton';
import SignTransactionButton from '../components/SignTransactionButton';
import DrmStatus from '../components/DrmStatus';
import ProtectedContent from '../components/ProtectedContent';
import {checkDrmAccess} from '../util/drmUtils';

export default function MainScreen() {
  const {connection} = useConnection();
  const {selectedAccount} = useAuthorization();
  const [balance, setBalance] = useState<number | null>(null);
  const [hasDrmAccess, setHasDrmAccess] = useState<boolean | null>(null);
  const [isCheckingDrm, setIsCheckingDrm] = useState(false);

  // DRM configuration (example - replace with actual NFT/token addresses)
  const drmConfig = {
    nftMintAddresses: [
      // 'YOUR_ACTUAL_NFT_MINT_ADDRESS_HERE',
    ],
    tokenMintAddress: 'YOUR_ACTUAL_TOKEN_MINT_ADDRESS_HERE',
    minTokenAmount: 1,
  };

  const fetchAndUpdateBalance = useCallback(
    async (account: Account) => {
      console.log('Fetching balance for: ' + account.publicKey);
      const fetchedBalance = await connection.getBalance(account.publicKey);
      console.log('Balance fetched: ' + fetchedBalance);
      setBalance(fetchedBalance);
    },
    [connection],
  );

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

  return (
    <>
      <View style={styles.mainContainer}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          {selectedAccount ? (
            <>
              <Section title="DRM Access Control">
                <DrmStatus
                  hasAccess={hasDrmAccess}
                  isChecking={isCheckingDrm}
                  drmType="Mixed"
                />
              </Section>

              <Section title="Sign a transaction">
                <SignTransactionButton />
              </Section>

              <Section title="Sign a message">
                <SignMessageButton />
              </Section>

              <Section title="Protected Content">
                <ProtectedContent
                  hasAccess={hasDrmAccess}
                  isChecking={isCheckingDrm}
                />
              </Section>
            </>
          ) : null}
        </ScrollView>
        {selectedAccount ? (
          <AccountInfo
            selectedAccount={selectedAccount}
            balance={balance}
            fetchAndUpdateBalance={fetchAndUpdateBalance}
          />
        ) : (
          <ConnectButton title="Connect wallet" />
        )}
        <Text>Selected cluster: {connection.rpcEndpoint}</Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    height: '100%',
    padding: 16,
    flex: 1,
  },
  scrollContainer: {
    height: '100%',
  },
  buttonGroup: {
    flexDirection: 'column',
    paddingVertical: 4,
  },
});
