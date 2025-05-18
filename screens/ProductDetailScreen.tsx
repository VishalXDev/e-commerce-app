// screens/productdetailscreen.tsx
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useCart } from '../context/CartContext';
import { Product } from '../types';

export default function ProductDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const { cartItems, addToCart } = useCart();

  // Dummy product data for UI layout only:
  const product: Product = {
    id: Number(id),
    title: 'Smartphone Model X',
    price: 699.99,
    description:
      'This smartphone features the latest technology with high-performance specs and a stunning display...',
    image: 'https://fakestoreapi.com/img/81QpkIctqPL._AC_SX679_.jpg',
    rating: { rate: 4.5, count: 120 },
  };

  // Calculate total items in cart for badge
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const onAddToCart = () => {
    addToCart(product);
    alert('Added to cart!');
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <MaterialIcons name="arrow-back" size={24} color="#1e88e5" />
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push('/tabs/cart')} style={styles.cart}>
          <MaterialIcons name="shopping-cart" size={24} color="#1e88e5" />
          {cartCount > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{cartCount}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {/* Product Image */}
        <Image source={{ uri: product.image }} style={styles.image} />

        {/* Title */}
        <Text style={styles.title}>{product.title}</Text>

        {/* Rating */}
        <Text style={styles.rating}>
          ⭐ {product.rating.rate} ({product.rating.count} reviews)
        </Text>

        {/* Price */}
        <Text style={styles.price}>${product.price.toFixed(2)}</Text>

        {/* Description */}
        <Text style={styles.sectionTitle}>Description</Text>
        <Text style={styles.description}>{product.description}</Text>

        {/* Add to Cart Button */}
        <TouchableOpacity style={styles.button} onPress={onAddToCart}>
          <Text style={styles.buttonText}>Add to Cart 🛒</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    height: 56,
    paddingHorizontal: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backText: {
    color: '#1e88e5',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 4,
  },
  cart: {
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    right: -8,
    top: -6,
    backgroundColor: '#e53935',
    borderRadius: 8,
    minWidth: 16,
    paddingHorizontal: 5,
    paddingVertical: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 12,
  },
  content: {
    padding: 20,
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 300,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 8,
    textAlign: 'center',
  },
  rating: {
    fontSize: 14,
    color: '#888',
    marginBottom: 8,
  },
  price: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1e88e5',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    alignSelf: 'flex-start',
    marginBottom: 6,
  },
  description: {
    fontSize: 14,
    color: '#444',
    marginBottom: 30,
    textAlign: 'left',
    lineHeight: 20,
  },
  button: {
    backgroundColor: '#1e88e5',
    paddingVertical: 14,
    paddingHorizontal: 60,
    borderRadius: 30,
    alignItems: 'center',
    alignSelf: 'stretch',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '700',
  },
});
