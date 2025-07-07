import React from 'react';
import {View, Text, StyleSheet, ActivityIndicator} from 'react-native';
import {Colors} from './Colors';

interface DrmStatusProps {
  hasAccess: boolean | null;
  isChecking: boolean;
  drmType: 'NFT' | 'Token' | 'Mixed';
}

export default function DrmStatus({
  hasAccess,
  isChecking,
  drmType,
}: DrmStatusProps) {
  if (isChecking) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="small" color={Colors.primary} />
        <Text style={styles.checkingText}>Checking DRM permissions...</Text>
      </View>
    );
  }

  if (hasAccess === null) {
    return (
      <View style={styles.container}>
        <Text style={styles.neutralText}>
          Connect wallet to check DRM permissions
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {hasAccess ? (
        <View style={styles.accessGranted}>
          <Text style={styles.accessText}>✅ Access granted!</Text>
          <Text style={styles.detailText}>
            {drmType === 'NFT' && 'Required NFT is owned'}
            {drmType === 'Token' && 'Required token is owned'}
            {drmType === 'Mixed' && 'Required assets are owned'}
          </Text>
        </View>
      ) : (
        <View style={styles.accessDenied}>
          <Text style={styles.noAccessText}>❌ Access denied</Text>
          <Text style={styles.detailText}>
            {drmType === 'NFT' && 'Purchase required NFT'}
            {drmType === 'Token' && 'Purchase required token'}
            {drmType === 'Mixed' && 'Purchase required assets'}
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderRadius: 8,
    marginVertical: 8,
    alignItems: 'center',
  },
  checkingText: {
    marginTop: 8,
    fontSize: 14,
    color: Colors.primary,
  },
  neutralText: {
    fontSize: 14,
    color: Colors.dark,
    textAlign: 'center',
  },
  accessGranted: {
    alignItems: 'center',
  },
  accessDenied: {
    alignItems: 'center',
  },
  accessText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  noAccessText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#F44336',
  },
  detailText: {
    fontSize: 12,
    color: Colors.dark,
    marginTop: 4,
    textAlign: 'center',
  },
});
