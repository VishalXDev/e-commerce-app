import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

import React from 'react';
import {
  Alert,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useCart } from '../context/CartContext';
export default function CartScreen() {
  const router = useRouter();
  const { cartItems, updateQuantity, removeFromCart } = useCart();

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const renderItem = ({ item }: { item: typeof cartItems[0] }) => (
    <View style={styles.cartItem}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.details}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.price}>${item.price.toFixed(2)}</Text>

        <View style={styles.quantityContainer}>
          <TouchableOpacity
            style={styles.qtyButton}
            onPress={() => updateQuantity(item.id, item.quantity - 1)}
          >
            <MaterialIcons name="remove" size={20} color="#1e88e5" />
          </TouchableOpacity>

          <Text style={styles.quantityText}>{item.quantity}</Text>

          <TouchableOpacity
            style={styles.qtyButton}
            onPress={() => updateQuantity(item.id, item.quantity + 1)}
          >
            <MaterialIcons name="add" size={20} color="#1e88e5" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.removeButton}
            onPress={() => removeFromCart(item.id)}
          >
            <MaterialIcons name="delete" size={20} color="#e53935" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  if (cartItems.length === 0) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <MaterialIcons name="arrow-back" size={24} color="#1e88e5" />
            <Text style={styles.backText}>Back</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>My Cart</Text>
          <View style={{ width: 60 }} />
        </View>

        <View style={styles.emptyContainer}>
          <MaterialIcons name="shopping-cart" size={80} color="#aaa" />
          <Text style={styles.emptyText}>Your cart is empty</Text>

          <TouchableOpacity
            style={styles.ctaButton}
            onPress={() => router.push('/tabs/explore')}
          >
            <Text style={styles.ctaButtonText}>Start Shopping</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <MaterialIcons name="arrow-back" size={24} color="#1e88e5" />
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Cart</Text>
        <View style={{ width: 60 }} />
      </View>

      <View style={{ flex: 1 }}>
        <FlatList
          data={cartItems}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={styles.listContent}
        />

        <View style={styles.footer}>
          <Text style={styles.totalText}>
            Total: <Text style={styles.totalPrice}>${totalPrice.toFixed(2)}</Text>
          </Text>

          <TouchableOpacity
            style={styles.checkoutButton}
            onPress={() =>
              Alert.alert(
                '✅ Order Placed!',
                'Your order has been placed successfully! 🎉🎊\nThank you for shopping with us.',
                [{ text: 'OK' }]
              )
            }
          >
            <Text style={styles.checkoutButtonText}>Proceed to Checkout</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

// Style updates:
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: {
    height: 56,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 80,
  },
  backText: {
    color: '#1e88e5',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
  },

  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  emptyText: {
    marginTop: 20,
    fontSize: 20,
    fontWeight: '600',
    color: '#666',
  },
  ctaButton: {
    marginTop: 30,
    backgroundColor: '#1e88e5',
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 30,
  },
  ctaButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '700',
  },

  listContent: {
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  cartItem: {
    flexDirection: 'row',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    marginBottom: 12,
    alignItems: 'center',
    backgroundColor: '#fafafa',
  },
  image: {
    width: 70,
    height: 70,
    resizeMode: 'contain',
    marginRight: 12,
  },
  details: {
    flex: 1,
  },
  title: {
    fontSize: 15,
    fontWeight: '600',
  },
  price: {
    fontSize: 13,
    color: '#444',
    marginVertical: 2,
  },

  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
  },
  qtyButton: {
    borderWidth: 1,
    borderColor: '#1e88e5',
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  quantityText: {
    marginHorizontal: 12,
    fontSize: 15,
    fontWeight: '600',
  },
  removeButton: {
    marginLeft: 16,
  },

  footer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    backgroundColor: '#fff',
  },
  totalText: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 12,
    textAlign: 'right',
  },
  totalPrice: {
    color: '#1e88e5',
  },
  checkoutButton: {
    backgroundColor: '#1e88e5',
    paddingVertical: 14,
    borderRadius: 30,
    alignItems: 'center',
  },
  checkoutButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '700',
  },
});
