"use client";

import { CustomThemeProvider } from "@/src/app/context/ThemeContext";
import { CartProvider } from "@/src/app/context/CartContext";
import { CssBaseline } from "@mui/material";

export default function Providers({ children }) {
  return (
    <CustomThemeProvider>
      <CssBaseline /> 
      <CartProvider>
        {children}
      </CartProvider>
    </CustomThemeProvider>
  );
}