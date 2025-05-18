import AsyncStorage from '@react-native-async-storage/async-storage';
import { CartItem } from '../types';

const CART_KEY = 'cart';

export const saveCartToStorage = async (cart: CartItem[]) => {
  try {
    await AsyncStorage.setItem(CART_KEY, JSON.stringify(cart));
  } catch (e) {
    console.error('Saving cart failed', e);
  }
};

export const getCartFromStorage = async (): Promise<CartItem[]> => {
  try {
    const cart = await AsyncStorage.getItem(CART_KEY);
    return cart ? JSON.parse(cart) : [];
  } catch (e) {
    console.error('Loading cart failed', e);
    return [];
  }
};
