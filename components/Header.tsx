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
      {/* App name in the center */}
      <Text style={styles.title}>E-Commerce App</Text>

      {/* Cart icon in top-right corner */}
      <TouchableOpacity
        style={styles.cartContainer}
        onPress={() => router.push('/tabs/cart')}
      >
        <Text style={styles.cartIcon}>🛒</Text>
        {cartItems.length > 0 && (
          <View style={styles.cartBadge}>
            <Text style={styles.cartCount}>{cartItems.length}</Text>
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: 'blue',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  title: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  cartContainer: {
    position: 'absolute',
    right: 16,
    top: 16,
  },
  cartIcon: {
    fontSize: 24,
  },
  cartBadge: {
    position: 'absolute',
    top: -8,
    right: -12,
    backgroundColor: 'red',
    borderRadius: 12,
    paddingHorizontal: 6,
    paddingVertical: 2,
    minWidth: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cartCount: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 12,
  },
});
