"use client";

import React, { useMemo, useState, useEffect } from "react";
import { Box, Typography, CircularProgress } from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";
import ProductCard from "./ProductCard";
import PaginationSection from "./PaginationSection";
import {
  formatCategoryLabel,
  matchesActiveFilters,
  normalizeCategoryParam,
  unwrapProductsResponse,
} from "@/src/app/utils/productFilters";

const ProductList = ({
  activeFilters = [],
  priceRange = [0, 5000],
  verifiedOnly = false,
  sortOption = "Featured",
  viewMode = "list",
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const categoryParam = searchParams.get("category");
  const searchParam = searchParams.get("search") || ""; // ✅ FIX ADDED

  const categoryLabel = normalizeCategoryParam(categoryParam);

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);

      try {
        const url = categoryLabel
          ? `/api/products?category=${encodeURIComponent(categoryLabel)}`
          : `/api/products`;

        const res = await fetch(url);
        const json = await res.json();

        setProducts(unwrapProductsResponse(json));
      } catch (err) {
        console.error("Fetch error:", err);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [categoryLabel]);

  // reset page when filters change
  useEffect(() => {
    setPage(1);
  }, [categoryLabel, activeFilters, priceRange, verifiedOnly, sortOption, limit, searchParam]);

  // ✅ MAIN FILTERING LOGIC
  const filteredAndSorted = useMemo(() => {
    const minPrice = Number(priceRange?.[0] ?? 0);
    const maxPrice = Number(priceRange?.[1] ?? Infinity);

    let list = Array.isArray(products) ? products : [];

    // 🔥 PRICE FILTER
    list = list.filter((p) => {
      const price = Number(p?.price ?? 0);
      if (price < minPrice) return false;
      if (price > maxPrice) return false;
      return true;
    });

    // 🔥 SEARCH FILTER (FIX)
    if (searchParam.trim()) {
      const term = searchParam.toLowerCase();
      list = list.filter((p) =>
        p.title?.toLowerCase().includes(term)
      );
    }

    if (verifiedOnly) {
      list = list.filter((p) => Number(p?.numReviews || 0) > 0);
    }
    list = list.filter((p) => matchesActiveFilters(p, activeFilters));

    if (sortOption === "Newest") {
      list = [...list].sort((a, b) => {
        const at = new Date(a?.createdAt || 0).getTime();
        const bt = new Date(b?.createdAt || 0).getTime();
        return bt - at;
      });
    }

    return list;
  }, [
    products,
    activeFilters,
    priceRange,
    verifiedOnly,
    sortOption,
    searchParam, 
  ]);

  const totalPages = Math.max(1, Math.ceil(filteredAndSorted.length / limit));

  const safePage = Math.min(page, totalPages);

  const pageItems = useMemo(() => {
    const start = (safePage - 1) * limit;
    return filteredAndSorted.slice(start, start + limit);
  }, [filteredAndSorted, safePage, limit]);

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", p: 5 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h6" sx={{ mb: 2,color:"text.primary" }}>
        {searchParam
          ? `Search results for "${searchParam}"`
          : categoryLabel
            ? formatCategoryLabel(categoryLabel)
            : "All Products"}
      </Typography>

      {pageItems.length === 0 ? (
        <Typography>No products found</Typography>
      ) : (
        <>
         <Box
  sx={{
    display: viewMode === "grid" ? "grid" : "block",
    gridTemplateColumns:
      viewMode === "grid"
        ? {
            xs: "repeat(2, 1fr)",
            sm: "repeat(3, 1fr)",
            md: "repeat(4, 1fr)", // ✅ better desktop layout
          }
        : undefined,
    gap: 2,
    alignItems: "stretch", // ✅ important
  }}
>
  {pageItems.map((item, index) => (
    <Box
      key={item._id}
      onClick={() => router.push(`/detail/${item._id}`)}
      sx={{
        cursor: "pointer",
        height: "100%",     // ✅ makes all equal
      }}
    >
      <ProductCard
        product={item}
        viewMode={viewMode}
      />
    </Box>
  ))}
</Box>

          <PaginationSection
            page={safePage}
            setPage={setPage}
            totalPages={totalPages}
            limit={limit}
            setLimit={setLimit}
          />
        </>
      )}
    </Box>
  );
};

export default ProductList;
