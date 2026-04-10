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
    <>
      <HeroSection />
      <Deals />
      <Categories />
      <SendingRequests />
      <RecommendedItems />
      <Services />
      <RegionalSuppliers />
    </>
  );
};

export default HomePage;