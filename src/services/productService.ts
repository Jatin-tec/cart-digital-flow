
// Sample product database for our Smart Cart system
export interface Product {
  id: string;
  name: string;
  price: number;
  image?: string;
  barcode: string;
  category: string;
}

// Sample product database
const products: Product[] = [
  {
    id: "prod-001",
    name: "Organic Bananas",
    price: 1.99,
    image: "https://images.unsplash.com/photo-1609042486535-f95641e71555?q=80&w=300",
    barcode: "7890123456",
    category: "Fruits",
  },
  {
    id: "prod-002",
    name: "Whole Milk",
    price: 3.49,
    image: "https://images.unsplash.com/photo-1563636619-e9143da7973b?q=80&w=300",
    barcode: "7890123457",
    category: "Dairy",
  },
  {
    id: "prod-003",
    name: "Artisan Bread",
    price: 4.99,
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=300",
    barcode: "7890123458",
    category: "Bakery",
  },
  {
    id: "prod-004",
    name: "Fresh Salmon",
    price: 12.99,
    image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?q=80&w=300",
    barcode: "7890123459",
    category: "Seafood",
  },
  {
    id: "prod-005",
    name: "Avocado",
    price: 1.49,
    image: "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?q=80&w=300",
    barcode: "7890123460",
    category: "Fruits",
  },
  {
    id: "prod-006",
    name: "Chicken Breast",
    price: 8.99,
    image: "https://images.unsplash.com/photo-1644752589106-47c4fdfb22b9?q=80&w=300",
    barcode: "7890123461",
    category: "Meat",
  },
  {
    id: "prod-007",
    name: "Red Bell Pepper",
    price: 1.29,
    image: "https://images.unsplash.com/photo-1560806175-c5d67cc229cc?q=80&w=300",
    barcode: "7890123462",
    category: "Vegetables",
  },
  {
    id: "prod-008",
    name: "Pasta",
    price: 2.49,
    image: "https://images.unsplash.com/photo-1551462147-ff29053bfc14?q=80&w=300",
    barcode: "7890123463",
    category: "Dry Goods",
  },
  {
    id: "prod-009",
    name: "Orange Juice",
    price: 3.99,
    image: "https://images.unsplash.com/photo-1600271886742-f049cd451bba?q=80&w=300",
    barcode: "7890123464",
    category: "Beverages",
  },
  {
    id: "prod-010",
    name: "Cereal",
    price: 4.29,
    image: "https://images.unsplash.com/photo-1610554779231-12e3c092e5e8?q=80&w=300",
    barcode: "7890123465",
    category: "Breakfast",
  }
];

// Get all products
export const getAllProducts = (): Product[] => {
  return products;
};

// Get product by barcode
export const getProductByBarcode = (barcode: string): Product | undefined => {
  return products.find(product => product.barcode === barcode);
};

// Get product by ID
export const getProductById = (id: string): Product | undefined => {
  return products.find(product => product.id === id);
};

// Search products by name or category
export const searchProducts = (query: string): Product[] => {
  const lowercaseQuery = query.toLowerCase();
  return products.filter(
    product => 
      product.name.toLowerCase().includes(lowercaseQuery) || 
      product.category.toLowerCase().includes(lowercaseQuery)
  );
};

// Get products by category
export const getProductsByCategory = (category: string): Product[] => {
  return products.filter(product => product.category === category);
};
