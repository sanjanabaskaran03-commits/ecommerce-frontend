"use client";

import { Box } from "@mui/material";
import Image from "next/image";
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
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/products`
        );
        const allProducts = await res.json();

        console.log("All Products:", allProducts); // ✅ Debug

        if (!isMounted || !Array.isArray(allProducts)) return;

        // ✅ FILTER MATCHING YOUR ADMIN TAGS
        const home = allProducts.filter(
          (item) =>
            item.sectionTags &&
            item.sectionTags.includes("home")
        );

        const electronics = allProducts.filter(
          (item) =>
            item.sectionTags &&
            item.sectionTags.includes("electronics")
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
        {/* HOME SECTION */}
        <CategorySection
          title="Home and Outdoor"
          bannerImg={Homedecor}
          items={homeItems.map((item) => ({
            title: item.title,
            price: item.price,
            img: item.image, // ✅ FIXED FIELD
          }))}
        />

        {/* ELECTRONICS SECTION */}
        <CategorySection
          title="Electronics and Gadgets"
          bannerImg={ElectronicsBanner}
          items={electronicsItems.map((item) => ({
            title: item.title,
            price: item.price,
            img: item.image, // ✅ FIXED FIELD
          }))}
        />
      </Box>
    </LayoutContainer>
  );
};

export default Categories;