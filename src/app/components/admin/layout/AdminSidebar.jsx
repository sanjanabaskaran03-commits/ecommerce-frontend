"use client";

import { Box, Typography, Stack,Button,List, ListItemButton, ListItemText } from "@mui/material";
import { useRouter } from "next/navigation";

export default function AdminSidebar() {
  const router = useRouter();

  const menu = [
    { label: "Dashboard", path: "/admin/dashboard" },
    { label: "Products", path: "/admin/products" },
    { label: "Add Product", path: "/admin/add-product" },
  ];

  return (
    <Box
  sx={{
    width: 240,
    bgcolor: "background.paper",
    borderRight: "1px solid",
    borderColor: "divider",
    p: 2,
  }}
>
  <Typography fontWeight={700} mb={2}>
    Admin Panel
  </Typography>

  <Stack spacing={1}>
    {["Dashboard", "Products", "Add Product"].map((item) => (
      <Button
        key={item}
        sx={{
          justifyContent: "flex-start",
          textTransform: "none",
          borderRadius: "8px",
        }}
      >
        {item}
      </Button>
    ))}
  </Stack>
</Box>
  );
}