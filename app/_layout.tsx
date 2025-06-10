import { LinearGradient } from 'expo-linear-gradient';
import { Slot, useSegments } from 'expo-router';
import { SafeAreaView, StatusBar, StyleSheet, View } from 'react-native';
import Header from '../components/Header';
import { CartProvider } from '../context/CartContext';

function LayoutWrapper() {
  const segments = useSegments();
  const hideHeaderOn = ['product', '+not-found'];
  const hideHeader = segments[0] && hideHeaderOn.includes(segments[0]);

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" backgroundColor="#667eea" translucent />
      
      {/* Background Gradient */}
      <LinearGradient
        colors={['#f8fafc', '#e2e8f0']}
        style={styles.backgroundGradient}
      />

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
    backgroundColor: '#667eea',
  },
  backgroundGradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: '100%',
  },
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
});