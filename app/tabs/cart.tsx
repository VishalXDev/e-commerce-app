import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Animated,
  FlatList,
  Image,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useCart } from '../../context/CartContext';
import { CartItem } from '../../types';

export default function CartScreen() {
  const { cartItems, updateQuantity, removeFromCart } = useCart();
  const router = useRouter();
  const [modalVisible, setModalVisible] = useState(false);
  const [animation] = useState(new Animated.Value(0));

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleCheckout = () => {
    setModalVisible(true);

    Animated.sequence([
      Animated.timing(animation, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }),
      Animated.delay(1800),
      Animated.timing(animation, {
        toValue: 0,
        duration: 400,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setModalVisible(false);
      router.push('/tabs/explore');
    });
  };

  const renderItem = ({ item }: { item: CartItem }) => (
    <View style={styles.card}>
      <Image
        source={{ uri: item.image }}
        style={styles.image}
        resizeMode="contain"
      />
      <View style={styles.details}>
        <Text numberOfLines={2} style={styles.title}>
          {item.title}
        </Text>
        <Text style={styles.price}>${item.price.toFixed(2)}</Text>

        <View style={styles.actions}>
          <View style={styles.quantityContainer}>
            <TouchableOpacity
              accessible accessibilityLabel="Decrease quantity"
              style={styles.quantityButton}
              onPress={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
            >
              <MaterialIcons name="remove" size={16} color="#667eea" />
            </TouchableOpacity>

            <TextInput
              style={styles.input}
              keyboardType="number-pad"
              value={item.quantity.toString()}
              onChangeText={(text) => {
                const qty = parseInt(text) || 1;
                if (qty > 0) updateQuantity(item.id, qty);
              }}
            />

            <TouchableOpacity
              accessible accessibilityLabel="Increase quantity"
              style={styles.quantityButton}
              onPress={() => updateQuantity(item.id, item.quantity + 1)}
            >
              <MaterialIcons name="add" size={16} color="#667eea" />
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            accessible accessibilityLabel="Remove item"
            style={styles.removeButton}
            onPress={() => removeFromCart(item.id)}
          >
            <MaterialIcons name="delete" size={18} color="#ef4444" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  const EmptyCart = () => (
    <View style={styles.emptyContainer}>
      <LinearGradient colors={['#667eea', '#764ba2']} style={styles.emptyIcon}>
        <MaterialIcons name="shopping-cart" size={60} color="#fff" />
      </LinearGradient>
      <Text style={styles.emptyTitle}>Your cart is empty</Text>
      <Text style={styles.emptySubtitle}>
        Discover amazing products and add them to your cart
      </Text>
      <TouchableOpacity onPress={() => router.push('/tabs/explore')} style={styles.shopButton}>
        <LinearGradient colors={['#667eea', '#764ba2']} style={styles.shopGradient}>
          <MaterialIcons name="store" size={20} color="#fff" />
          <Text style={styles.shopText}>Start Shopping</Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#f8fafc', '#e2e8f0']} style={styles.background} />

      {cartItems.length === 0 ? (
        <EmptyCart />
      ) : (
        <>
          <FlatList
            data={cartItems}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderItem}
            contentContainerStyle={styles.list}
            showsVerticalScrollIndicator={false}
          />

          <View style={styles.footer}>
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Total</Text>
              <Text style={styles.totalAmount}>${total.toFixed(2)}</Text>
            </View>
            <TouchableOpacity onPress={handleCheckout} style={styles.checkoutButton}>
              <LinearGradient colors={['#667eea', '#764ba2']} style={styles.checkoutGradient}>
                <MaterialIcons name="payment" size={20} color="#fff" />
                <Text style={styles.checkoutText}>Checkout</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </>
      )}

      <Modal visible={modalVisible} transparent animationType="fade">
        <View style={styles.modal}>
          <Animated.View
            style={[
              styles.successModal,
              {
                opacity: animation,
                transform: [
                  {
                    scale: animation.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0.8, 1],
                    }),
                  },
                ],
              },
            ]}
          >
            <LinearGradient colors={['#10b981', '#059669']} style={styles.successIcon}>
              <MaterialIcons name="check" size={40} color="#fff" />
            </LinearGradient>
            <Text style={styles.successTitle}>Order Placed Successfully!</Text>
            <Text style={styles.successMsg}>Thank you for your purchase 🎉</Text>
            <Text style={styles.successSub}>You’ll receive a confirmation email shortly.</Text>
          </Animated.View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  background: {
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
  },
  list: {
    padding: 20,
    paddingBottom: 120,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
  },
  image: {
    height: 100,
    width: 100,
    borderRadius: 12,
    backgroundColor: '#f1f5f9',
    marginRight: 16,
  },
  details: { flex: 1 },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1e293b',
  },
  price: {
    fontSize: 18,
    color: '#667eea',
    fontWeight: '700',
    marginVertical: 8,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  quantityContainer: {
    flexDirection: 'row',
    backgroundColor: '#f1f5f9',
    borderRadius: 20,
    padding: 4,
  },
  quantityButton: {
    width: 32,
    height: 32,
    backgroundColor: '#fff',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
  },
  input: {
    minWidth: 40,
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
    paddingHorizontal: 8,
  },
  removeButton: {
    backgroundColor: '#fee2e2',
    padding: 8,
    borderRadius: 20,
  },
  footer: {
    position: 'absolute',
    bottom: 0, left: 0, right: 0,
    backgroundColor: '#fff',
    padding: 20,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    elevation: 10,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: -2 },
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  totalLabel: {
    fontSize: 16,
    color: '#64748b',
    fontWeight: '600',
  },
  totalAmount: {
    fontSize: 24,
    fontWeight: '800',
    color: '#1e293b',
  },
  checkoutButton: {
    borderRadius: 30,
    overflow: 'hidden',
  },
  checkoutGradient: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 16,
    gap: 8,
  },
  checkoutText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  emptyIcon: {
    width: 120,
    height: 120,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  emptyTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 16,
    color: '#64748b',
    textAlign: 'center',
    marginBottom: 28,
    lineHeight: 24,
  },
  shopButton: {
    borderRadius: 30,
    overflow: 'hidden',
  },
  shopGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 32,
    paddingVertical: 14,
    gap: 8,
  },
  shopText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
  modal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  successModal: {
    backgroundColor: '#fff',
    borderRadius: 24,
    padding: 32,
    alignItems: 'center',
    width: '85%',
    elevation: 20,
  },
  successIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  successTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 4,
    textAlign: 'center',
  },
  successMsg: {
    fontSize: 16,
    fontWeight: '600',
    color: '#10b981',
    marginBottom: 2,
    textAlign: 'center',
  },
  successSub: {
    fontSize: 14,
    color: '#64748b',
    textAlign: 'center',
  },
});
