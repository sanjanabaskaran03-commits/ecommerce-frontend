import { unwrapProductsResponse } from "@/src/app/utils/productFilters";

const BASE_URL =
  process.env.NEXT_PUBLIC_API_URL?.trim() || "http://localhost:5000";

async function fetchJson(url, options) {
  const res = await fetch(url, options);
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Request failed (${res.status}): ${text || url}`);
  }
  return res.json();
}

// Get all products
export const getProducts = async (options = {}) => {
  const { category } = options;

  const url = category
    ? `${BASE_URL}/api/products?category=${encodeURIComponent(category)}`
    : `${BASE_URL}/api/products`;

  const json = await fetchJson(url);
  return unwrapProductsResponse(json);
};

// Get single product
export const getProductById = async (id) => {
  if (!id) throw new Error("Product id is required");
  return fetchJson(`${BASE_URL}/api/products/${id}`);
};
