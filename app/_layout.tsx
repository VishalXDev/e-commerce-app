import { LinearGradient } from 'expo-linear-gradient';
import { Slot, useSegments } from 'expo-router';
import { Platform, SafeAreaView, StatusBar, StyleSheet, View } from 'react-native';
import Header from '../components/Header';
import { CartProvider } from '../context/CartContext';

function LayoutWrapper() {
  const segments = useSegments();
  const hideHeaderOn = ['product', '+not-found'];
  const currentSegment = segments[segments.length - 1] || '';
  const hideHeader = hideHeaderOn.includes(currentSegment);

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="#667eea"
        translucent={Platform.OS === 'android'}
      />

      {/* Background Gradient */}
      <LinearGradient
        colors={['#f8fafc', '#e2e8f0']}
        style={StyleSheet.absoluteFill}
      />

      {/* Header (conditionally shown) */}
      {!hideHeader && <Header />}

      {/* Slot content */}
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
    backgroundColor: '#667eea', // fallback color behind gradient
  },
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
});
