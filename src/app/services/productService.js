const BASE_URL = "http://localhost:5000";

// Get all products
export const getProducts = async () => {
  const res = await fetch(`${BASE_URL}/api/products`);
  return res.json();
};

// Get single product
export const getProductById = async (id) => {
  const res = await fetch(`${BASE_URL}/api/products/${id}`);
  return res.json();
};