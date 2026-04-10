"use client";
import React, { useEffect, useState } from 'react';
import RecommendedSection from '@/src/app/components/common/RecommendedSection';
import LayoutContainer from '@/src/app/components/common/LayoutContainer';

const RecommendedItems = () => {
  const [items, setItems] = useState([]);

 useEffect(() => {
    // 1. Point to your specific backend URL and endpoint
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          // 2. Filter for items with the 'recommended' tag
          const recommendedData = data.filter(product => 
            product.sectionTags && product.sectionTags.includes('recommended')
          );

          // 3. Map the database fields to your component's expected prop names
          setItems(recommendedData.map((product) => ({
            id: product._id, // Adding ID is good practice for React keys
            price: product.price ? product.price.toFixed(2) : "0.00",
            description: product.title, 
            img: product.image || "/images/placeholder.png"
          })));
        }
      })
      .catch((err) => {
        console.error("Error fetching recommended items:", err);
        setItems([]); // Clear items if there is an error
      });
  }, []);
  return (
    <LayoutContainer>
      <RecommendedSection title="Recommended items" items={items} />
    </LayoutContainer>
  );
};

export default RecommendedItems;