"use client";

import { Box } from "@mui/material";
import AdminHeader from "@/src/app/components/admin/layout/AdminHeader";

export default function AdminLayoutWrapper({ children }) {
  return (
    <Box 
      sx={{ 
        minHeight: "100vh", 
        display: "flex", 
        flexDirection: "column",
        bgcolor: (theme) => theme.palette.mode === "light" ? "#f8f9fa" : "background.default"
      }}
    >
      {/* HEADER */}
      <AdminHeader />

      {/* PAGE CONTENT */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: { xs: 2, md: 4 }, // Responsive padding
        }}
      >
        {children}
      </Box>
    </Box>
  );
}