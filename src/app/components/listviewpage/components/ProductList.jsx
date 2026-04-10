"use client";

import React, { useState, useEffect } from "react";
import { Box, Typography, CircularProgress } from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation"; 
import ProductCard from "@/src/app/components/listviewpage/components/ProductCard";

const ProductList = ({
  activeFilters = [],
  priceRange = [0, 5000],
  verifiedOnly = false, // Prop from Header
  sortOption = "Featured", // Prop from Header
  viewMode = "list",
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const categoryQuery = searchParams.get("category");
  const searchQuery = searchParams.get("search");

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      try {
        const url = categoryQuery 
          ? `/api/products?category=${categoryQuery}` 
          : `/api/products`;
        const res = await fetch(url);
        const data = await res.json();
        setProducts(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Fetch error:", error);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, [categoryQuery]);

  // --- FILTERING LOGIC ---
  const filteredProducts = products.filter((product) => {
    const searchTerm = searchQuery ? searchQuery.trim().toLowerCase() : "";
    const productPrice = parseFloat(product.price);

    // Price Filter
    if (productPrice < priceRange[0] || productPrice > priceRange[1]) return false;

    // WORKING: VERIFIED ONLY
    // Checks if product has isVerified property OR high rating
    if (verifiedOnly) {
      const isProductVerified = product.isVerified === true || product.rating >= 4.5;
      if (!isProductVerified) return false;
    }

    // Search Term Filter
    if (searchTerm) {
      const haystack = `${product.title} ${product.description}`.toLowerCase();
      if (!haystack.includes(searchTerm)) return false;
    }

    // Sidebar Active Filters (Brand, Rating, etc.)
    if (activeFilters.length > 0) {
      const ratingFilters = activeFilters.filter(f => f.includes("star")).map(f => parseInt(f));
      const otherFilters = activeFilters.filter(f => !f.includes("star"));

      if (ratingFilters.length > 0) {
        const matchRating = ratingFilters.some(r => Math.floor(product.rating) === r);
        if (!matchRating) return false;
      }

      if (otherFilters.length > 0) {
        const haystack = `${product.title} ${product.description} ${product.category}`.toLowerCase();
        const matchOthers = otherFilters.some(filter => 
          haystack.includes(filter.toLowerCase())
        );
        if (!matchOthers) return false;
      }
    }

    return true;
  });

  // --- WORKING: SORTING LOGIC ---
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortOption === "Newest") {
      // Sort by MongoDB date string
      return new Date(b.createdAt) - new Date(a.createdAt);
    }
    
    if (sortOption === "Featured") {
      // Featured logic: High rating combined with high order count
      // We give rating more weight by multiplying it
      const scoreA = (a.rating * 10) + (a.orders / 100);
      const scoreB = (b.rating * 10) + (b.orders / 100);
      return scoreB - scoreA;
    }

    return 0;
  });

  if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', p: 5 }}><CircularProgress /></Box>;

  return (
    <Box sx={{ width: "100%" }}>
      {/* Header Info */}
      <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, textAlign: "left" }}>
        {categoryQuery ? categoryQuery.replace(/-/g, ' ') : "All Products"}
        <Typography component="span" sx={{ color: "text.secondary", ml: 1, fontSize: "14px" }}>
          ({sortedProducts.length} items found)
        </Typography>
      </Typography>

      {/* Product Display */}
      {sortedProducts.length > 0 ? (
        <Box sx={{ 
          display: viewMode === "grid" ? "flex" : "block", 
          flexWrap: "wrap", 
          gap: viewMode === "grid" ? 2 : 0 
        }}>
          {sortedProducts.map((item, index) => (
            <Box
              key={item._id}
              onClick={() => router.push(`/detail/${item._id}`)}
              sx={{
                cursor: "pointer",
                flex: viewMode === "grid" ? { xs: "1 1 calc(50% - 16px)", md: "1 1 calc(33.333% - 16px)" } : "1 1 auto",
                maxWidth: viewMode === "grid" ? { xs: "calc(50% - 16px)", md: "calc(33.333% - 16px)" } : "100%",
                mb: viewMode === "list" ? 2 : 0
              }}
            >
              <ProductCard product={item} viewMode={viewMode} isFirst={index === 0} />
            </Box>
          ))}
        </Box>
      ) : (
        <Box sx={{ textAlign: 'center', py: 10 }}>
          <Typography sx={{ color: "text.secondary" }}>No products match your criteria.</Typography>
        </Box>
      )}
    </Box>
  );
};

export default ProductList;