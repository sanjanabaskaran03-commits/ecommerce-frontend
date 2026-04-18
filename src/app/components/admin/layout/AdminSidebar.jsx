"use client";

import { Box, Typography, Stack, Button } from "@mui/material";
import { useRouter, usePathname } from "next/navigation";
import DashboardIcon from "@mui/icons-material/Dashboard";
import InventoryIcon from "@mui/icons-material/Inventory2";
import AddBoxIcon from "@mui/icons-material/AddBox";
import ShoppingBag from "@mui/icons-material/ShoppingBag";

export default function AdminSidebar() {
  const router = useRouter();
  const pathname = usePathname();

  const menu = [
    { label: "Dashboard", path: "/admin/dashboard", icon: <DashboardIcon /> },
    { label: "Products", path: "/admin/products", icon: <InventoryIcon /> },
    { label: "Add Product", path: "/admin/add-product", icon: <AddBoxIcon /> },
  ];

  return (
    <Box
      sx={{
        width: 250,
        bgcolor: "background.paper",
        borderRight: "1px solid",
        borderColor: "divider",
        p: 2,
      }}
    >
     {/* 🔹 LOGO (FIXED) */}
<Box
  sx={{
    display: "flex",
    alignItems: "center",
    gap: 1.5,
    mb: 3,
  }}
>
  {/* Icon box */}
  <Box
    sx={{
      bgcolor: "#0D6EFD",
      borderRadius: "10px",
      p: 1,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    <ShoppingBag sx={{ color: "#fff", fontSize: "1.5rem" }} />
  </Box>

  {/* Brand text */}
  <Typography
    sx={{
      fontWeight: 800,
      color: "#8CB7F5",
      fontSize: "32px",
      lineHeight: 1,
    }}
  >
    Brand
  </Typography>
</Box>
      {/* 🔹 MENU */}
      <Stack spacing={1}>
        {menu.map((item) => {
          const active = pathname === item.path;

          return (
            <Button
              key={item.label}
              onClick={() => router.push(item.path)}
              startIcon={item.icon}
              sx={{
                justifyContent: "flex-start",
                textTransform: "none",
                borderRadius: "10px",
                px: 2,
                py: 1.2,

                bgcolor: active ? "primary.main" : "transparent",
                color: active ? "#fff" : "text.primary",

                "&:hover": {
                  bgcolor: active ? "primary.dark" : "action.hover",
                },
              }}
            >
              {item.label}
            </Button>
          );
        })}
      </Stack>
    </Box>
  );
}