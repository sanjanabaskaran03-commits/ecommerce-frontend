"use client";

import { Box, Typography, List, ListItemButton, ListItemText } from "@mui/material";
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
        width: 220,
        bgcolor: "background.paper",
        borderRight: "1px solid",
        borderColor: "divider",
        p: 2,
      }}
    >
      <Typography variant="h6" fontWeight={700} mb={2}>
        Admin Panel
      </Typography>

      <List>
        {menu.map((item) => (
          <ListItemButton key={item.path} onClick={() => router.push(item.path)}>
            <ListItemText primary={item.label} />
          </ListItemButton>
        ))}
      </List>
    </Box>
  );
}