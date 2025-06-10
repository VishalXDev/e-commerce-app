import { MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React, { useCallback, useState } from "react";
import {
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import ProductList from "../index";

export default function ExploreScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", "Electronics", "Fashion", "Home", "Sports", "Books"];

  const handleCategorySelect = useCallback((category: string) => {
    setSelectedCategory(category);
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1a237e" />

      {/* Gradient Header */}
      <LinearGradient colors={["#1a237e", "#3949ab"]} style={styles.header}>
        <Text style={styles.headerTitle}>Explore Products</Text>
        <Text style={styles.headerSubtitle}>Discover amazing deals</Text>
      </LinearGradient>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBox}>
          <MaterialIcons name="search" size={20} color="#666" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search products..."
            placeholderTextColor="#aaa"
            value={searchQuery}
            onChangeText={setSearchQuery}
            accessible
            accessibilityLabel="Search for products"
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity
              accessible
              accessibilityLabel="Clear search input"
              onPress={() => setSearchQuery("")}
            >
              <MaterialIcons name="clear" size={20} color="#666" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Categories */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={true}
        style={styles.categoryContainer}
        contentContainerStyle={styles.categoryScroll}
      >
        {categories.map((category) => {
          const isActive = category === selectedCategory;
          return (
            <TouchableOpacity
              key={category}
              onPress={() => handleCategorySelect(category)}
              style={[
                styles.categoryButton,
                isActive && styles.categoryButtonActive,
              ]}
              accessibilityLabel={`Filter by ${category}`}
              accessible
            >
              <Text
                style={[
                  styles.categoryText,
                  isActive && styles.categoryTextActive,
                ]}
              >
                {category}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* Product List */}
      <View style={styles.productListContainer}>
        <ProductList
          searchQuery={searchQuery}
          selectedCategory={selectedCategory}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  header: {
    paddingTop: 32, // reduced from 40
    paddingBottom: 12, // reduced from 16
    paddingHorizontal: 20,
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#fff",
  },
  headerSubtitle: {
    fontSize: 14,
    color: "#e0e7ff",
    marginTop: 2,
  },
  searchContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10, // reduced from 16
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#e2e8f0",
  },
  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f1f5f9",
    borderRadius: 30,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: "#dbeafe",
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: "#1e293b",
    marginHorizontal: 8,
  },
  categoryContainer: {
    backgroundColor: "#fff",
    paddingVertical: 10, // reduced from 14
    borderBottomWidth: 1,
    borderBottomColor: "#f1f5f9",
  },
  categoryScroll: {
    paddingHorizontal: 20,
    alignItems: "center",
    ...Platform.select({
      android: {
        scrollbarColor: "#8e24aa #e1bee7", // purple + light purple
      },
      web: {
        scrollbarColor: "#8e24aa #e1bee7",
      },
    }),
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 10,
    borderRadius: 20,
    backgroundColor: "#f1f5f9",
    borderWidth: 1,
    borderColor: "#e2e8f0",
  },
  categoryButtonActive: {
    backgroundColor: "#3949ab",
    borderColor: "#3949ab",
  },
  categoryText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#64748b",
  },
  categoryTextActive: {
    color: "#fff",
  },
  productListContainer: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 8,
    backgroundColor: "#f8f9fa",
  },
});
