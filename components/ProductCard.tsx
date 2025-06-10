// components/ProductCard.tsx
import { Link } from 'expo-router';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Product } from '../types';

export default function ProductCard({ product }: { product: Product }) {
  return (
    <View style={styles.card}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: product.image }} style={styles.image} />
        <View style={styles.ratingBadge}>
          <Text style={styles.ratingText}>⭐ {product.rating?.rate?.toFixed(1) ?? 'N/A'}</Text>
        </View>
      </View>
      
      <View style={styles.content}>
        <Text numberOfLines={2} style={styles.title}>
          {product.title}
        </Text>
        
        <View style={styles.priceContainer}>
          <Text style={styles.price}>${product.price.toFixed(2)}</Text>
          <Text style={styles.originalPrice}>${(product.price * 1.2).toFixed(2)}</Text>
        </View>
        
        <Text style={styles.reviewCount}>({product.rating?.count ?? 0} reviews)</Text>

        <Link href={`/product/${product.id}`} asChild>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>View Details</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    margin: 6,
    backgroundColor: '#fff',
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
    maxWidth: '31%',
    borderWidth: 1,
    borderColor: '#f1f5f9',
  },
  imageContainer: {
    position: 'relative',
    backgroundColor: '#f8fafc',
    paddingTop: 16,
    paddingHorizontal: 8,
    height: 120,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  ratingBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    borderRadius: 12,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  ratingText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: '600',
  },
  content: {
    padding: 12,
  },
  title: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 8,
    lineHeight: 18,
    minHeight: 36,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  price: {
    fontSize: 16,
    fontWeight: '800',
    color: '#059669',
    marginRight: 6,
  },
  originalPrice: {
    fontSize: 12,
    color: '#94a3b8',
    textDecorationLine: 'line-through',
  },
  reviewCount: {
    fontSize: 11,
    color: '#64748b',
    marginBottom: 12,
  },
  button: {
    backgroundColor: '#6366f1',
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 12,
    alignItems: 'center',
    shadowColor: '#6366f1',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 12,
  },
});