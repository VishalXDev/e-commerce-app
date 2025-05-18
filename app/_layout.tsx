// app/_layout.tsx
import { Slot, useSegments } from 'expo-router';
import { SafeAreaView, StatusBar, StyleSheet, View } from 'react-native';
import Header from '../components/Header';
import { CartProvider } from '../context/CartContext';

function LayoutWrapper() {
  const segments = useSegments();
  const hideHeaderOn = ['product'];
  const hideHeader = segments[0] && hideHeaderOn.includes(segments[0]);

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      
      {/* Show Header unless route is in hideHeaderOn */}
      {!hideHeader && <Header />}

      <View style={styles.container}>
        <Slot />
      </View>
    </SafeAreaView>
  );
}

export default function RootLayout() {
  return (
    <CartProvider>
      <LayoutWrapper />
    </CartProvider>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
  },
});
