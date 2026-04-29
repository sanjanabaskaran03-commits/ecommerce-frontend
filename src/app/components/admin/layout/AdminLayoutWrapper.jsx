"use client";

import { Box } from "@mui/material";
import AdminHeader from "@/src/app/components/admin/layout/AdminHeader";
import LayoutContainer from "@/src/app/components/common/LayoutContainer";

export default function AdminLayoutWrapper({ children }) {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        bgcolor: (theme) =>
          theme.palette.mode === "light"
            ? "#f8f9fa"
            : "background.default"
      }}
    >
      <AdminHeader />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: { xs: 2, md: 4 },
        }}
      >
        <LayoutContainer>
          {children}
        </LayoutContainer>
      </Box>
    </Box>
  );
}