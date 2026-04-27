export const DEFAULT_CATEGORIES = [
  "Mobiles",
  "Clothes and wear",
  "Home interiors",
  "Computer and tech",
  "Accessories",
  "Tools and machinery",
  "Sports and outdoor",
  "Animal and pets",
  "Machinery tools",
];

export function unwrapProductsResponse(json) {
  if (Array.isArray(json)) return json;
  if (Array.isArray(json?.data)) return json.data;
  if (Array.isArray(json?.products)) return json.products;
  return [];
}

export function normalizeCategoryParam(value) {
  if (!value) return "";
  try {
    return decodeURIComponent(String(value)).replace(/-/g, " ").trim();
  } catch {
    return String(value).replace(/-/g, " ").trim();
  }
}

export function formatCategoryLabel(value) {
  if (!value) return "";
  return String(value)
    .replace(/-/g, " ")
    .replace(/\b\w/g, (ch) => ch.toUpperCase());
}

export function getDerivedBrand(product) {
  const title = product?.title ? String(product.title).trim() : "";
  if (!title) return "";
  return title.split(/\s+/)[0];
}

function flattenSpecificationValues(specifications) {
  if (!specifications || typeof specifications !== "object") return [];

  // ✅ Only allow these fields in filters
  const ALLOWED_KEYS = [
    "Material",
    "Type",
    "Design",
  ];

  return Object.entries(specifications)
    .filter(([key]) => ALLOWED_KEYS.includes(key)) // 🔥 KEY FIX
    .flatMap(([_, value]) => {
      if (!value) return [];
      if (Array.isArray(value)) return value.filter(Boolean).map(String);
      if (typeof value === "string") return [value];
      return [];
    });
}

const KEYWORD_FEATURES = [
  "Steel",
  "Heavy Duty",
  "Professional",
  "Electric",
  "Manual",
  "Hydraulic",
  "Portable",
  "Wireless",
  "Waterproof",
  "Fast charging",
  "Noise Cancelling",
  "Cotton",
  "Leather",
  "Woolen",
  "Wooden",
  "Velvet",
  "Ceramic",
  "Luxury",
  "Minimalist",
  "Modern",
];

export function extractFeatures(product) {
  const specValues = flattenSpecificationValues(product?.specifications);
  const text = `${product?.title || ""} ${product?.description || ""}`
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ");

  const fromSpecs = specValues
    .flatMap((raw) => String(raw).split(/[;,/|]+/))
    .map((s) => s.trim())
    .filter(Boolean);

  const fromKeywords = KEYWORD_FEATURES.filter((feature) =>
    text.includes(feature.toLowerCase())
  );

  const combined = [...fromSpecs, ...fromKeywords]
    .map((s) => s.replace(/\s+/g, " ").trim())
    .filter(Boolean);

  return [...new Set(combined)];
}

export function matchesActiveFilters(product, activeFilters = []) {
  if (!activeFilters.length) return true;

  const brand = getDerivedBrand(product);
  const features = extractFeatures(product);
  const rating = Number(product?.rating || 0);

  return activeFilters.every((filter) => {
    if (!filter) return true;
    const text = String(filter).trim();
    const starMatch = text.match(/^(\d+)\s*star$/i);
    if (starMatch) return rating >= Number(starMatch[1]);
    if (brand && text.toLowerCase() === brand.toLowerCase()) return true;
    return features.some((f) => f.toLowerCase() === text.toLowerCase());
  });
}
