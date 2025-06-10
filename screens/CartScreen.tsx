import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Alert,
  Animated,
  FlatList,
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useCart } from '../context/CartContext';
import { useThemeColors } from '../hooks/useThemeColor';

export default function CartScreen() {
  const router = useRouter();
  const colors = useThemeColors();
  const { cartItems, updateQuantity, removeFromCart, clearCart } = useCart();
  const [fadeAnim] = useState(new Animated.Value(1));

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleRemoveItem = (id: number) => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      removeFromCart(id);
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    });
  };

  const handleCheckout = () => {
    Alert.alert(
      '🎉 Order Placed Successfully!',
      `Thank you for your purchase!\n\nTotal: $${totalPrice.toFixed(2)}\n\nYour order will be delivered within 3-5 business days.`,
      [
        {
          text: 'Continue Shopping',
          onPress: () => {
            clearCart();
            router.push('/tabs/explore');
          },
          style: 'default',
        },
        {
          text: 'View Orders',
          onPress: () => {
            clearCart();
            Alert.alert('Feature Coming Soon', 'Order tracking will be available in the next update!');
          },
          style: 'default',
        },
      ]
    );
  };

  const renderItem = ({ item, index }: { item: typeof cartItems[0]; index: number }) => (
    <Animated.View style={[styles.cartItem, { opacity: fadeAnim }]}>
      <View style={styles.itemImageContainer}>
        <Image source={{ uri: item.image }} style={styles.image} />
      </View>
      
      <View style={styles.details}>
        <Text style={[styles.title, { color: colors.text }]} numberOfLines={2}>
          {item.title}
        </Text>
        <Text style={[styles.price, { color: colors.primary }]}>
          ${item.price.toFixed(2)}
        </Text>

        <View style={styles.quantityContainer}>
          <TouchableOpacity
            style={[styles.qtyButton, { borderColor: colors.primary }]}
            onPress={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
          >
            <MaterialIcons name="remove" size={18} color={colors.primary} />
          </TouchableOpacity>

          <View style={styles.quantityBadge}>
            <Text style={[styles.quantityText, { color: colors.text }]}>
              {item.quantity}
            </Text>
          </View>

          <TouchableOpacity
            style={[styles.qtyButton, { borderColor: colors.primary }]}
            onPress={() => updateQuantity(item.id, item.quantity + 1)}
          >
            <MaterialIcons name="add" size={18} color={colors.primary} />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.removeButton}
            onPress={() => handleRemoveItem(item.id)}
          >
            <MaterialIcons name="delete-outline" size={22} color={colors.error} />
          </TouchableOpacity>
        </View>
      </View>
    </Animated.View>
  );

  if (cartItems.length === 0) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <StatusBar barStyle="light-content" backgroundColor="#1a237e" />
        
        {/* Header */}
        <LinearGradient colors={['#1a237e', '#3949ab']} style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <MaterialIcons name="arrow-back" size={24} color="#fff" />
            <Text style={styles.backText}>Back</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>My Cart</Text>
          <View style={{ width: 60 }} />
        </LinearGradient>

        {/* Empty State */}
        <View style={styles.emptyContainer}>
          <View style={styles.emptyIconContainer}>
            <MaterialIcons name="shopping-cart" size={100} color={colors.textMuted} />
          </View>
          <Text style={[styles.emptyTitle, { color: colors.text }]}>
            Your cart is empty
          </Text>
          <Text style={[styles.emptySubtitle, { color: colors.textSecondary }]}>
            Looks like you haven&#39;t added anything to your cart yet
          </Text>

          <TouchableOpacity
            style={[styles.ctaButton, { backgroundColor: colors.primary }]}
            onPress={() => router.push('/tabs/explore')}
          >
            <MaterialIcons name="shopping-bag" size={20} color="#fff" />
            <Text style={styles.ctaButtonText}>Start Shopping</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar barStyle="light-content" backgroundColor="#1a237e" />
      
      {/* Header */}
      <LinearGradient colors={['#1a237e', '#3949ab']} style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <MaterialIcons name="arrow-back" size={24} color="#fff" />
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Cart ({cartItems.length})</Text>
        <TouchableOpacity onPress={clearCart} style={styles.clearButton}>
          <MaterialIcons name="clear-all" size={24} color="#fff" />
        </TouchableOpacity>
      </LinearGradient>

      {/* Cart Items */}
      <View style={{ flex: 1 }}>
        <FlatList
          data={cartItems}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />

        {/* Footer */}
        <LinearGradient 
          colors={['rgba(255,255,255,0)', colors.background]} 
          style={styles.footerGradient}
        >
          <View style={[styles.footer, { backgroundColor: colors.surface, borderTopColor: colors.border }]}>
            <View style={styles.totalContainer}>
              <Text style={[styles.totalLabel, { color: colors.textSecondary }]}>
                Total Amount
              </Text>
              <Text style={[styles.totalPrice, { color: colors.primary }]}>
                ${totalPrice.toFixed(2)}
              </Text>
            </View>

            <TouchableOpacity
              style={[styles.checkoutButton, { backgroundColor: colors.primary }]}
              onPress={handleCheckout}
            >
              <MaterialIcons name="payment" size={20} color="#fff" />
              <Text style={styles.checkoutButtonText}>Proceed to Checkout</Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1,
  },
  header: {
    paddingTop: 50,
    paddingBottom: 16,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 80,
  },
  backText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 4,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#fff',
  },
  clearButton: {
    width: 40,
    alignItems: 'flex-end',
  },

  // Empty State
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  emptyIconContainer: {
    padding: 30,
    backgroundColor: 'rgba(57, 73, 171, 0.1)',
    borderRadius: 60,
    marginBottom: 30,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 8,
    textAlign: 'center',
  },
  emptySubtitle: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 40,
  },
  ctaButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 25,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  ctaButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
    marginLeft: 8,
  },

  // List
  listContent: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    paddingBottom: 100,
  },
  cartItem: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  itemImageContainer: {
    width: 80,
    height: 80,
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    marginRight: 16,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  details: {
    flex: 1,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 22,
    marginBottom: 4,
  },
  price: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 8,
  },

  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  qtyButton: {
    borderWidth: 1.5,
    borderRadius: 8,
    padding: 6,
  },
  quantityBadge: {
    backgroundColor: '#f8f9fa',
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginHorizontal: 12,
    borderRadius: 8,
  },
  quantityText: {
    fontSize: 16,
    fontWeight: '700',
  },
  removeButton: {
    marginLeft: 16,
    padding: 4,
  },

  // Footer
  footerGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 120,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderTopWidth: 1,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: '600',
  },
  totalPrice: {
    fontSize: 24,
    fontWeight: '800',
  },
  checkoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 25,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  checkoutButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
    marginLeft: 8,
  },
});