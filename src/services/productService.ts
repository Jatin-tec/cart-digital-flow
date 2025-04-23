
export interface Product {
  product_id: string;
  name: string;
  price: string;
  image?: string;
  barcode: number;
  category: string;
  description?: string;
  weight?: string;
}

// Get all products
export const getAllProducts = async (): Promise<Product[]> => {
  const url = `${import.meta.env.VITE_API_HOST}/api/product/`;
  const item = localStorage.getItem('user');
  try {
    const user = item ? JSON.parse(item) : null;
    if (!user || !user.tokens) {
      console.error('No user found in localStorage or invalid user data');
      return [];
    }
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.tokens.access}`
      }
    });

    if (!response.ok) {
      console.error('API error:', response.status, response.statusText);
      return [];
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
};

// Get product by barcode
export const getProductByBarcode = async (barcode: string): Promise<Product | null> => {
  const url = `${import.meta.env.VITE_API_HOST}/api/product/${barcode}/`;
  const item = localStorage.getItem('user');
  
  try {
    const user = item ? JSON.parse(item) : null;

    if (!user || !user.tokens) {
      console.error('No user found in localStorage or invalid user data');
      return null;
    }
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.tokens.access}`
      }
    })
    if (!response.ok) {
      console.error('API error:', response.status, response.statusText);
      return null;
    }
    const data = await response.json();

    if (data.length === 0) {
      console.error('No product found with the given barcode');
      return null;
    }
    return data[0];
  } catch (error) {
    console.error('Error fetching product by barcode:', error);
    return null;
  }
};

// Search products by name or category
export const searchProducts = async (query: string): Promise<Product[]> => {
  const products = await getAllProducts();
  const lowercaseQuery = query.toLowerCase();
  return products.filter(
    product =>
      product.name.toLowerCase().includes(lowercaseQuery) ||
      product.category.toLowerCase().includes(lowercaseQuery)
  );
};

// Get products by category
export const getProductsByCategory = async (category: string): Promise<Product[]> => {
  const products = await getAllProducts();
  return products.filter(product => product.category === category);
};
