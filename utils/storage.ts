import AsyncStorage from '@react-native-async-storage/async-storage';
import { CartItem } from '../types';

const CART_KEY = 'cart';

/**
 * Save cart items to AsyncStorage
 */
export const saveCartToStorage = async (cart: CartItem[]) => {
  try {
    await AsyncStorage.setItem(CART_KEY, JSON.stringify(cart));
  } catch (error) {
    console.error('🔴 Failed to save cart:', error);
  }
};

/**
 * Load cart items from AsyncStorage with basic validation
 */
export const getCartFromStorage = async (): Promise<CartItem[]> => {
  try {
    const cart = await AsyncStorage.getItem(CART_KEY);
    const parsed: unknown = cart ? JSON.parse(cart) : [];

    if (
      Array.isArray(parsed) &&
      parsed.every(
        (item) =>
          typeof item.id === 'number' &&
          typeof item.title === 'string' &&
          typeof item.price === 'number' &&
          typeof item.image === 'string' &&
          typeof item.description === 'string' &&
          typeof item.category === 'string' &&
          typeof item.rating?.rate === 'number' &&
          typeof item.rating?.count === 'number' &&
          typeof item.quantity === 'number'
      )
    ) {
      return parsed as CartItem[];
    }

    console.warn('⚠️ Invalid cart data structure in storage.');
    return [];
  } catch (error) {
    console.error('🔴 Failed to load cart:', error);
    return [];
  }
};

/**
 * Clear the cart from AsyncStorage
 */
export const clearCartStorage = async () => {
  try {
    await AsyncStorage.removeItem(CART_KEY);
  } catch (error) {
    console.error('🔴 Failed to clear cart:', error);
  }
};
