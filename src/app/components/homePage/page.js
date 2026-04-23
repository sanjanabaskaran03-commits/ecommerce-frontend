"use client";

import React from "react";
import { Box } from "@mui/material";

// Feature Components
import HeroSection from "./components/HeroSection";
import Deals from "./components/Deals";
import Categories from "./components/Categories";
import SendingRequests from "./components/SendingRequests";
import RecommendedItems from "./components/RecommendedItems";
import Services from "./components/Services";
import RegionalSuppliers from "./components/RegionalSuppliers";

const HomePage = () => {

  return (
    <Box sx={{ bgcolor: "background.default", minHeight: "100vh", py: 2 }}>
      <HeroSection />
      <Deals />
      <Categories />
      <SendingRequests />
      <RecommendedItems />
      <Services />
      <RegionalSuppliers />
    </Box>
  );
};

export default HomePage;
