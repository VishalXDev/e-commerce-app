export interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  description: string;
  category: string; // ✅ Add this line
  rating: {
    rate: number;
    count: number;
  };
}

export interface CartItem extends Product {
  quantity: number;
}
