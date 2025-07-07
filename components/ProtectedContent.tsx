import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {Colors} from './Colors';

interface ProtectedContentProps {
  hasAccess: boolean | null;
  isChecking: boolean;
}

export default function ProtectedContent({
  hasAccess,
  isChecking,
}: ProtectedContentProps) {
  if (isChecking) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Loading content...</Text>
      </View>
    );
  }

  if (hasAccess !== true) {
    return (
      <View style={styles.container}>
        <Text style={styles.noAccessText}>
          Permission required to access this content
        </Text>
        <Text style={styles.hintText}>
          • Own specific NFT or{'\n'}• Own specific token above minimum amount
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🎉 Access to protected content granted!</Text>

      <View style={styles.contentBox}>
        <Text style={styles.contentTitle}>Premium Content</Text>
        <Text style={styles.contentText}>
          This content is protected by DRM and{'\n'}
          only accessible to users who own required assets.
        </Text>
      </View>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Use Content</Text>
      </TouchableOpacity>

      <View style={styles.infoBox}>
        <Text style={styles.infoTitle}>DRM Information</Text>
        <Text style={styles.infoText}>
          • NFT ownership check: Complete{'\n'}• Token ownership check: Complete
          {'\n'}• Access permission: Approved
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    color: Colors.primary,
  },
  noAccessText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#F44336',
    textAlign: 'center',
    marginBottom: 16,
  },
  hintText: {
    fontSize: 14,
    color: Colors.dark,
    textAlign: 'center',
    lineHeight: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4CAF50',
    textAlign: 'center',
    marginBottom: 20,
  },
  contentBox: {
    backgroundColor: Colors.lighter,
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    width: '100%',
  },
  contentTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.dark,
    marginBottom: 8,
  },
  contentText: {
    fontSize: 14,
    color: Colors.dark,
    lineHeight: 20,
  },
  button: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 6,
    marginBottom: 16,
  },
  buttonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  infoBox: {
    backgroundColor: '#E8F5E8',
    padding: 12,
    borderRadius: 6,
    width: '100%',
  },
  infoTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginBottom: 4,
  },
  infoText: {
    fontSize: 12,
    color: '#2E7D32',
    lineHeight: 16,
  },
});
