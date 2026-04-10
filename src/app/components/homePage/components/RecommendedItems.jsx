"use client";
import React, { useEffect, useState } from 'react';
import RecommendedSection from '@/src/app/components/common/RecommendedSection';
import LayoutContainer from '@/src/app/components/common/LayoutContainer';

const RecommendedItems = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch('/api/ecommerce?tag=recommended')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setItems(data.map(product => ({
            price: product.price.toFixed(2),
            description: product.title, 
            img: product.image
          })));
        }
      });
  }, []);

  return (
    <LayoutContainer>
      <RecommendedSection title="Recommended items" items={items} />
    </LayoutContainer>
  );
};

export default RecommendedItems;