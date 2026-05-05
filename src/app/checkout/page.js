"use client";

import React from "react";
import {Box} from "@mui/material"
import LayoutContainer from "@/src/app/components/common/LayoutContainer";
import CheckoutView from "@/src/app/components/checkout/CheckoutView";

const CheckoutPage = () => {
  const user = {
    // simulate DB
    address: null, // 🔥 change this to test
  };

  return (
    <Box sx={{ bgcolor: "background.default", minHeight: "100vh",pt:3,pb:3}}>
      <LayoutContainer>
      <CheckoutView user={user} />
      </LayoutContainer>
    </Box>
  );
};

export default CheckoutPage;