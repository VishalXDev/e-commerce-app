import { MaterialIcons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { CartProvider, useCart } from '../../context/CartContext';

function TabsLayout() {
  const { cartItems } = useCart();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#fff',
          borderTopWidth: 0,
          elevation: 20,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.06,
          shadowRadius: 8,
          height: 70,
          paddingBottom: 10,
          paddingTop: 10,
        },
        tabBarActiveTintColor: '#667eea',
        tabBarInactiveTintColor: '#94a3b8',
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
          marginTop: 4,
        },
        tabBarIconStyle: {
          marginBottom: -4,
        },
      }}
    >
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Shop',
          tabBarIcon: ({ color, size, focused }) => (
            <MaterialIcons
              name="store"
              size={focused ? size + 2 : size}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          title: 'Cart',
          tabBarIcon: ({ color, size, focused }) => (
            <>
              <MaterialIcons
                name="shopping-cart"
                size={focused ? size + 2 : size}
                color={color}
              />
              {cartItems.length > 0 && (
                <CartBadge count={cartItems.length} />
              )}
            </>
          ),
        }}
      />
    </Tabs>
  );
}

function CartBadge({ count }: { count: number }) {
  return (
    <MaterialIcons
      name="circle"
      size={8}
      color="#ef4444"
      style={{
        position: 'absolute',
        top: 2,
        right: -6,
      }}
    />
  );
}

export default function Layout() {
  return (
    <CartProvider>
      <TabsLayout />
    </CartProvider>
  );
}
