
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
}

export function truncate(str: string, length: number): string {
  if (str.length <= length) return str;
  return `${str.substring(0, length)}...`;
}

export function generateUniqueId(): string {
  return Math.random().toString(36).substring(2, 9);
}

// Added for dummy data and testing purposes
export function getProductById(id: string) {
  const dummyProducts = [
    {
      id: "1",
      name: "Organic Bananas",
      price: 1.99,
      image: "https://images.unsplash.com/photo-1543218024-57a70143c369?q=80&w=200",
      barcode: "7890123456",
      category: "Fruits"
    },
    {
      id: "2",
      name: "Whole Milk",
      price: 3.49,
      image: "https://images.unsplash.com/photo-1550583724-b2692b85b150?q=80&w=200",
      barcode: "7890123457",
      category: "Dairy"
    },
    {
      id: "3",
      name: "Wheat Bread",
      price: 2.29,
      image: "https://images.unsplash.com/photo-1549931319-a545dcf3bc7b?q=80&w=200",
      barcode: "7890123458",
      category: "Bakery"
    },
    {
      id: "4",
      name: "Avocado",
      price: 1.49,
      image: "https://images.unsplash.com/photo-1601039641847-7857b994d704?q=80&w=200",
      barcode: "7890123459",
      category: "Fruits"
    },
  ];
  
  return dummyProducts.find(product => product.id === id);
}
