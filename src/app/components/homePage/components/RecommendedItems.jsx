"use client";

import React, { useEffect, useState } from "react";
import RecommendedSection from "@/src/app/components/common/RecommendedSection";
import LayoutContainer from "@/src/app/components/common/LayoutContainer";

const RecommendedItems = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/products`
        );
        const data = await res.json();

        if (Array.isArray(data)) {
          // 🔥 RANDOMIZE PRODUCTS
          const shuffled = [...data].sort(() => 0.5 - Math.random());

          // 🔥 PICK TOP 10 (you can change number)
          const selected = shuffled.slice(0, 10);

          // 🔥 MAP DATA
          const mapped = selected.map((product) => ({
            id: product._id,
            title: product.title,
            price: product.price,
            img: product.image, // ✅ correct field
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