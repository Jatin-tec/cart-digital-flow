export interface Product {
  product_id: string;
  name: string;
  price: number;
  image?: string;
  barcode: string;
  category: string;
}

// Get all products
export const getAllProducts = async (): Promise<Product[]> => {
  const url = `${import.meta.env.VITE_API_HOST}/api/product/`
  const item = localStorage.getItem('user');
  try {
    console.log(item, 'item');
    const user = JSON.parse(item);
    if (!user) {
      console.error('No user found in localStorage');
      return [];
    }
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user?.tokens.access}`
      }
    });
    const data = await response.json();
    console.log(data)
    return data;
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
};

// Get product by barcode
export const getProductByBarcode = async (barcode: string): Promise<Product | undefined> => {
  const url = `${import.meta.env.VITE_API_HOST}/api/product/${barcode}`
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    }
  });
  const data = await response.json();
  console.log(data)
  return data;
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
