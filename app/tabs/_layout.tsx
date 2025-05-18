// app/tabs/_layout.tsx 
import { MaterialIcons } from '@expo/vector-icons'; // import icons
import { Tabs } from 'expo-router';
import { CartProvider } from '../../context/CartContext';

export default function Layout() {
  return (
    <CartProvider>
      <Tabs screenOptions={{ headerShown: false }}>
        <Tabs.Screen
          name="explore"
          options={{
            title: 'Shop',
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name="store" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="cart"
          options={{
            title: 'Cart',
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name="shopping-cart" size={size} color={color} />
            ),
          }}
        />
      </Tabs>
    </CartProvider>
  );
}
