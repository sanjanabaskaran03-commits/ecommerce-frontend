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
        // We fetch all products once to save on network requests
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products`);
        const allProducts = await res.json();

        if (!isMounted || !Array.isArray(allProducts)) return;

        // Filter for Home & Outdoor section
        const home = allProducts.filter(item => 
          item.sectionTags && item.sectionTags.includes("home-outdoor")
        );

        // Filter for Electronics & Gadgets section
        const electronics = allProducts.filter(item => 
          item.sectionTags && (
            item.sectionTags.includes("consumer-electronics") || 
            item.sectionTags.includes("gadgets")
          )
        );

        setHomeItems(home);
        setElectronicsItems(electronics);

      } catch (err) {
        console.error("Fetch error:", err);
        if (isMounted) {
          setHomeItems([]);
          setElectronicsItems([]);
        }
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











