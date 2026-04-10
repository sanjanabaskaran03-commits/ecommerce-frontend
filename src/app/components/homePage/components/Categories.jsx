"use client";
import { Box } from "@mui/material";
import LayoutContainer from "@/src/app/components/common/LayoutContainer";
import CategorySection from "@/src/app/components/common/CategorySection";
import ElectronicsBanner from "@/public/images/homepage/categories/electronics.png";
import Homedecor from "@/public/images/homepage/categories/homedecor.png";
import { useEffect, useState } from "react";

const Categories = () => {
  const [homeItems, setHomeItems] = useState([]);
  const [electronicsItems, setElectronicsItems] = useState([]);

  useEffect(() => {
    let isMounted = true;
    const loadSections = async () => {
      try {
        const [homeRes, electronicsRes] = await Promise.all([
          fetch('/api/ecommerce?tag=home-outdoor'),
          fetch('/api/ecommerce?tag=consumer-electronics,gadgets'),
        ]);
        const homeData = await homeRes.json();
        const electronicsData = await electronicsRes.json();

        if (!isMounted) return;

        setHomeItems(Array.isArray(homeData) ? homeData : []);
        setElectronicsItems(Array.isArray(electronicsData) ? electronicsData : []);
      } catch (err) {
        if (!isMounted) {
          return;
        }
        setHomeItems([]);
        setElectronicsItems([]);
      }
    };
    loadSections();
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <LayoutContainer>
      <Box sx={{ py: 2 }}>
        <CategorySection 
          title="Home and outdoor" 
          bannerImg={ElectronicsBanner} 
          items={homeItems.map((item) => ({
            title: item.title,
            price: item.price,
            img: item.image,
          }))} 
        />

        <CategorySection 
          title="Consumer electronics and gadgets" 
          bannerImg={Homedecor}
          items={electronicsItems.map((item) => ({
            title: item.title,
            price: item.price,
            img: item.image,
          }))} 
        />
      </Box>
    </LayoutContainer>
  );
};

export default Categories;











