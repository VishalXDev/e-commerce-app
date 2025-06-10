import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useColorScheme,
} from "react-native";
import { useCart } from "../context/CartContext";
import { Product } from "../types";

export default function ProductDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const { cartItems, addToCart } = useCart();
  const colorScheme = useColorScheme();

  const isDark = colorScheme === "dark";

  const theme = {
    background: isDark ? "#121212" : "#fff",
    text: isDark ? "#fff" : "#000",
    secondaryText: isDark ? "#ccc" : "#444",
    accent: "#1e88e5",
    danger: "#e53935",
  };

  const product: Product = {
    id: Number(id),
    title: "Smartphone Model X",
    price: 699.99,
    description:
      "This smartphone features the latest technology with high-performance specs and a stunning display...",
    image: "https://fakestoreapi.com/img/81QpkIctqPL._AC_SX679_.jpg",
    rating: { rate: 4.5, count: 120 },
    category: "electronics", // ✅ Add this line
  };

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const onAddToCart = () => {
    addToCart(product);
    Alert.alert("Added to cart!");
  };

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Header */}
      <View
        style={[styles.header, { borderBottomColor: isDark ? "#333" : "#ddd" }]}
      >
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
          accessibilityLabel="Go back"
          accessible
        >
          <MaterialIcons name="arrow-back" size={24} color={theme.accent} />
          <Text style={[styles.backText, { color: theme.accent }]}>Back</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => router.push("/tabs/cart")}
          style={styles.cart}
          accessibilityLabel="View cart"
          accessible
        >
          <MaterialIcons name="shopping-cart" size={24} color={theme.accent} />
          {cartCount > 0 && (
            <View style={[styles.badge, { backgroundColor: theme.danger }]}>
              <Text style={styles.badgeText}>{cartCount}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <Image
          source={{ uri: product.image }}
          style={styles.image}
          accessibilityLabel={`${product.title} image`}
        />

        <Text style={[styles.title, { color: theme.text }]}>
          {product.title}
        </Text>
        <Text style={[styles.rating, { color: theme.secondaryText }]}>
          ⭐ {product.rating.rate} ({product.rating.count} reviews)
        </Text>
        <Text style={[styles.price, { color: theme.accent }]}>
          {formatCurrency(product.price)}
        </Text>

        <Text style={[styles.sectionTitle, { color: theme.text }]}>
          Description
        </Text>
        <Text style={[styles.description, { color: theme.secondaryText }]}>
          {product.description}
        </Text>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: theme.accent }]}
          onPress={onAddToCart}
          accessibilityRole="button" // Accessibility best practice
          accessibilityLabel="Add to cart"
        >
          <Text style={styles.buttonText}>Add to Cart 🛒</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: 56,
    paddingHorizontal: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  backText: {
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 4,
  },
  cart: {
    position: "relative",
  },
  badge: {
    position: "absolute",
    right: -8,
    top: -6,
    borderRadius: 8,
    minWidth: 16,
    paddingHorizontal: 5,
    paddingVertical: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  badgeText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 12,
  },
  content: {
    padding: 20,
    alignItems: "center",
  },
  image: {
    width: 200,
    height: 300,
    resizeMode: "contain",
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 8,
    textAlign: "center",
  },
  rating: {
    fontSize: 14,
    marginBottom: 8,
  },
  price: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    alignSelf: "flex-start",
    marginBottom: 6,
  },
  description: {
    fontSize: 14,
    marginBottom: 30,
    textAlign: "left",
    lineHeight: 20,
  },
  button: {
    paddingVertical: 14,
    paddingHorizontal: 60,
    borderRadius: 30,
    alignItems: "center",
    alignSelf: "stretch",
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "700",
  },
});
