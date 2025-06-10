import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useCart } from '../context/CartContext';

export default function Header() {
  const { cartItems } = useCart();
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* App Branding */}
      <View style={styles.titleContainer}>
        <Text style={styles.title}>QuickBasket</Text>
        <Text style={styles.subtitle}>Premium Store</Text>
      </View>

      {/* Cart Button */}
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => router.push('/tabs/cart')}
        style={styles.cartButton}
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
    backgroundColor: '#6366f1', // Indigo-500
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
  },
  titleContainer: {
    alignItems: 'flex-start',
  },
  title: {
    color: '#fff',
    fontSize: 22,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  subtitle: {
    color: 'rgba(255,255,255,0.75)',
    fontSize: 12,
    fontWeight: '500',
    marginTop: -2,
  },
  cartButton: {
    borderRadius: 50,
    overflow: 'hidden',
  },
  cartIconWrapper: {
    backgroundColor: 'rgba(255,255,255,0.15)',
    padding: 8,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
    position: 'relative',
  },
  cartIcon: {
    fontSize: 24,
    color: '#fff',
  },
  cartBadge: {
    position: 'absolute',
    top: -6,
    right: -6,
    backgroundColor: '#ef4444', // Red-500
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
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 11,
  },
});
