// components/ProductCard.tsx
import { Link } from 'expo-router';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Product } from '../types';

export default function ProductCard({ product }: { product: Product }) {
  return (
    <View style={styles.card}>
      <Image source={{ uri: product.image }} style={styles.image} />
      <Text numberOfLines={2} style={styles.title}>
        {product.title}
      </Text>
      <Text style={styles.rating}>
        ⭐ {product.rating?.rate ?? 'N/A'} ({product.rating?.count ?? 0})
      </Text>
      <Text style={styles.price}>${product.price.toFixed(2)}</Text>

      <Link href={`/product/${product.id}`} asChild>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>View</Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    margin: 4, // Reduced margin for tighter layout
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 8, // Reduced padding for smaller cards
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ffd700',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
    maxWidth: '33%', // Ensure it takes up roughly 1/3 of the screen width
  },
  image: {
    width: 80, // Smaller image
    height: 80,
    resizeMode: 'contain',
    marginBottom: 8,
  },
  title: {
    fontSize: 12, // Smaller font
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 4,
  },
  rating: {
    fontSize: 11, // Smaller font
    color: '#666',
    marginBottom: 4,
  },
  price: {
    fontSize: 13, // Smaller font
    fontWeight: 'bold',
    color: '#1e88e5',
    marginBottom: 8,
  },
  button: {
    backgroundColor: '#ffa500',
    borderRadius: 6,
    paddingVertical: 4,
    paddingHorizontal: 12,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 12, // Smaller font
  },
});