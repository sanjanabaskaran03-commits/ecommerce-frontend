"use client";

import { Box } from "@mui/material";
import AdminSidebar from "@/src/components/admin/layout/AdminSidebar";
import AdminHeader from "@/src/components/admin/layout/AdminHeader";

export default function AdminLayout({ children }) {
  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content */}
      <Box sx={{ flex: 1 }}>
        <AdminHeader />

        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      </Box>

    </Box>
  );
}