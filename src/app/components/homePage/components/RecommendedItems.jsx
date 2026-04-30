"use client";

import React, { useEffect, useState } from "react";
import RecommendedSection from "@/src/app/components/common/RecommendedSection";
import LayoutContainer from "@/src/app/components/common/LayoutContainer";
import { getProducts } from "@/src/app/services/productService";

const RecommendedItems = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const products = await getProducts();

        if (Array.isArray(products)) {
          const shuffled = [...products].sort(() => 0.5 - Math.random());

          const selected = shuffled.slice(0, 10);

          const mapped = selected.map((product) => ({
            id: product._id,
            title: product.title,
            price: product.price,
            img: product.image || product.img || "/images/sample.jpg",
          }));

          setItems(mapped);
        }
      } catch (err) {
        console.error("Error fetching products:", err);
        setItems([]);
      }
    };

    fetchProducts();
  }, []);

  return (
    <LayoutContainer>
      <RecommendedSection title="Recommended for you" items={items} />
    </LayoutContainer>
  );
};

export default RecommendedItems;
