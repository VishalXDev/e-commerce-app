// app/index.tsx
import React, { useEffect, useState } from 'react';
import {
  FlatList,
  StyleSheet,
  View,
} from 'react-native';
import ProductCard from '../components/ProductCard';
import { Product } from '../types';

export default function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then(res => res.json())
      .then(setProducts)
      .catch(console.error);
  }, []);

  return (
    <View style={styles.wrapper}>
      <FlatList
        data={products}
        renderItem={({ item }) => <ProductCard product={item} />}
        keyExtractor={(item) => item.id.toString()}
        numColumns={3} // Changed from 2 to 3 columns
        contentContainerStyle={styles.container}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#f8f8f8', // Lighter background
  },
  container: {
    padding: 8,
  },
});