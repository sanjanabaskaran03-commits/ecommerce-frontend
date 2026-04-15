"use client";
import { Box } from "@mui/material";

export default function AuthLayout({ children }) {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        bgcolor: "background.default", // 🔥 theme-safe
      }}
    >
      {children}
    </Box>
  );
}