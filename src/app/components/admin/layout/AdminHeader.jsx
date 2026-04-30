"use client";

import {
  Box,
  Typography,
  Button,
  IconButton,
  Stack,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import ShoppingBag from "@mui/icons-material/ShoppingBag";
import DashboardIcon from "@mui/icons-material/Dashboard";
import InventoryIcon from "@mui/icons-material/Inventory2";
import AddBoxIcon from "@mui/icons-material/AddBox";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LogoutIcon from "@mui/icons-material/Logout";

import { useRouter, usePathname } from "next/navigation";
import { useTheme } from "@mui/material/styles";
import { useColorMode } from "@/src/app/context/ThemeContext";
import { useState } from "react";

import LayoutContainer from "@/src/app/components/common/LayoutContainer";

export default function AdminHeader() {
  const router = useRouter();
  const pathname = usePathname();
  const theme = useTheme();
  const { toggleColorMode } = useColorMode();

  const [open, setOpen] = useState(false);

  const menu = [
    { label: "Dashboard", path: "/admin/dashboard", icon: <DashboardIcon fontSize="small" /> },
    { label: "Products", path: "/admin/products", icon: <InventoryIcon fontSize="small" /> },
    { label: "Add Product", path: "/admin/add-product", icon: <AddBoxIcon fontSize="small" /> },
  ];

  const handleLogout = () => {
    fetch("http://localhost:5000/api/auth/logout", {
      method: "POST",
      credentials: "include",
    }).then(() => {
      router.push("/auth/login");
    });
  };

  return (
    <>
      <Box
        component="header"
        sx={{
          bgcolor: "background.paper",
          borderBottom: "1px solid",
          borderColor: "divider",
          position: "sticky",
          top: 0,
          zIndex: 1100
        }}
      >
        <LayoutContainer>
          <Box
            sx={{
              height: 84,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between"
            }}
          >

            {/* 🔥 LEFT SIDE */}
            <Stack direction="row" sx={{ alignItems: "center" }}>

              {/* MOBILE MENU */}
              <IconButton
                onClick={() => setOpen(true)}
                sx={{ display: { xs: "flex", md: "none" } }}
              >
                <MenuIcon />
              </IconButton>

              {/* 🔥 GROUP WRAPPER (IMPORTANT FIX) */}
              <Stack
                direction="row"
                sx={{ alignItems: "center" }}
                spacing={4}   // 👈 CONTROL GAP BETWEEN BRAND & MENU HERE
              >

                {/* ✅ GROUP 1: LOGO + BRAND */}
                <Stack
                  direction="row"
                  spacing={1.5}
                  sx={{ cursor: "pointer", alignItems: "center" }}
                  onClick={() => router.push("/admin/dashboard")}
                >
                  <Box
                    sx={{
                      bgcolor: "#0D6EFD",
                      borderRadius: "8px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",

                      // ✅ FIXED SIZE (important for alignment)
                      width: { xs: 32, md: 38 },
                      height: { xs: 32, md: 39 },
                    }}
                  >
                    <ShoppingBag sx={{ color: "#fff", fontSize: { xs: "1.4rem", md: "1.8rem" } }} />
                  </Box>

                  <Typography
                    variant="h4"
                    sx={{
                      fontWeight: 800,
                      color: "#8CB7F5",
                      display: { xs: "none", md: "block" }
                    }}
                  >
                    Brand
                  </Typography>
                </Stack>

                {/* ✅ GROUP 2: MENU */}
                <Stack
                  direction="row"
                  spacing={1}
                  sx={{ display: { xs: "none", md: "flex" } }}
                >
                  {menu.map((item) => {
                    const active = pathname === item.path;
                    return (
                      <Button
                        key={item.label}
                        startIcon={item.icon}
                        onClick={() => router.push(item.path)}
                        sx={{
                          textTransform: "none",
                          borderRadius: "8px",
                          px: 2,
                          fontWeight: active ? 600 : 400,
                          bgcolor: active ? "action.selected" : "transparent",
                          color: active ? "primary.main" : "text.primary"
                        }}
                      >
                        {item.label}
                      </Button>
                    );
                  })}
                </Stack>

              </Stack>
            </Stack>

            {/* RIGHT */}
            <Stack direction="row" sx={{ alignItems: "center" }} spacing={1.5}>
              <IconButton
                onClick={toggleColorMode}
                size="small"
                sx={{ border: "1px solid", borderColor: "divider" }}
              >
                {theme.palette.mode === "light" ? (
                  <DarkModeIcon fontSize="small" />
                ) : (
                  <LightModeIcon fontSize="small" />
                )}
              </IconButton>

              <Button
                variant="outlined"
                size="small"
                startIcon={<LogoutIcon />}
                onClick={handleLogout}
                sx={{ textTransform: "none", borderRadius: "8px" }}
              >
                Logout
              </Button>
            </Stack>

          </Box>
        </LayoutContainer>
      </Box>

      {/* DRAWER */}
      <Drawer anchor="left" open={open} onClose={() => setOpen(false)}>
        <Box sx={{ width: 250 }}>
          <List>
            {menu.map((item) => (
              <ListItemButton
                key={item.label}
                onClick={() => {
                  router.push(item.path);
                  setOpen(false);
                }}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.label} />
              </ListItemButton>
            ))}
          </List>
        </Box>
      </Drawer>
    </>
  );
}