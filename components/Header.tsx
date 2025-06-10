// components/Header.tsx
import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useCart } from '../context/CartContext';

export default function Header() {
  const { cartItems } = useCart();
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* App name with gradient-like effect */}
      <View style={styles.titleContainer}>
        <Text style={styles.title}>ShopHub</Text>
        <Text style={styles.subtitle}>Premium Store</Text>
      </View>

      {/* Modern cart icon */}
      <TouchableOpacity
        style={styles.cartContainer}
        onPress={() => router.push('/tabs/cart')}
      >
        <View style={styles.cartIconWrapper}>
          <Text style={styles.cartIcon}>🛒</Text>
          {cartItems.length > 0 && (
            <View style={styles.cartBadge}>
              <Text style={styles.cartCount}>{cartItems.length}</Text>
            </View>
          )}
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#6366f1', // Modern indigo color
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  titleContainer: {
    alignItems: 'flex-start',
  },
  title: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  subtitle: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 12,
    fontWeight: '500',
    marginTop: -2,
  },
  cartContainer: {
    position: 'relative',
  },
  cartIconWrapper: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 12,
    padding: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  cartIcon: {
    fontSize: 24,
  },
  cartBadge: {
    position: 'absolute',
    top: -6,
    right: -6,
    backgroundColor: '#ef4444',
    borderRadius: 12,
    paddingHorizontal: 6,
    paddingVertical: 2,
    minWidth: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  cartCount: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 11,
  },
});