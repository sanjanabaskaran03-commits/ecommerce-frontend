"use client";

import { Box } from "@mui/material";
import AdminSidebar from "@/src/app/components/admin/layout/AdminSidebar";
import AdminHeader from "@/src/app/components/admin/layout/AdminHeader";

export default function AdminLayoutWrapper({ children }) {
  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      
      {/* 🔹 Sidebar */}
      <AdminSidebar />

      {/* 🔹 Main Content */}
      <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
        
        {/* Header */}
        <AdminHeader />

        {/* Page Content */}
        <Box
          sx={{
            p: 3,
            bgcolor: "background.default",
            flexGrow: 1,
          }}
        >
          {children}
        </Box>

      </Box>
    </Box>
  );
}