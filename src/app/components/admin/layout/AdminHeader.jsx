"use client";

import { Box, Typography, Button, IconButton, Container, Stack } from "@mui/material";
import { useRouter, usePathname } from "next/navigation";
import ShoppingBag from "@mui/icons-material/ShoppingBag";
import DashboardIcon from "@mui/icons-material/Dashboard";
import InventoryIcon from "@mui/icons-material/Inventory2";
import AddBoxIcon from "@mui/icons-material/AddBox";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LogoutIcon from "@mui/icons-material/Logout";
import { useTheme } from "@mui/material/styles";
import { useColorMode } from "@/src/app/context/ThemeContext";

export default function AdminHeader() {
  const router = useRouter();
  const pathname = usePathname();
  const theme = useTheme();
  const { toggleColorMode } = useColorMode();

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
      <Container maxWidth="xl">
        {/* TOP BAR */}
        <Box
          sx={{
            height: 64,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* LEFT: LOGO & NAV COMBINED FOR NEATNESS */}
          <Stack direction="row" alignItems="center" spacing={4}>
            <Box 
              display="flex" 
              alignItems="center" 
              gap={1.5} 
              sx={{ cursor: "pointer" }}
              onClick={() => router.push("/admin/dashboard")}
            >
              <Box style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <Box sx={{ bgcolor: '#0D6EFD', borderRadius: '8px', p: { xs: 0.5, md: 0.8 }, display: 'flex' }}>
                  <ShoppingBag sx={{ color: '#fff', fontSize: { xs: '1.4rem', md: '1.8rem' } }} />
                </Box>
                <Typography variant="h4" sx={{ fontWeight: 800, color: '#8CB7F5', display: { xs: 'none', md: 'block' }, fontSize: { xs: '1.5rem', md: '2.125rem' } }}>Brand</Typography>
              </Box>
              </Box>

            {/* INTEGRATED MENU BAR (Cleaner than a second row) */}
            <Stack direction="row" spacing={1}>
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
                      color: active ? "primary.main" : "text.primary",
                      "&:hover": {
                        bgcolor: "action.hover",
                        color: "primary.main",
                      },
                    }}
                  >
                    {item.label}
                  </Button>
                );
              })}
            </Stack>
          </Stack>

          {/* RIGHT: ACTIONS */}
          <Stack direction="row" alignItems="center" spacing={1.5}>
            <IconButton 
              onClick={toggleColorMode} 
              size="small"
              sx={{ border: "1px solid", borderColor: "divider" }}
            >
              {theme.palette.mode === "light" ? <DarkModeIcon fontSize="small" /> : <LightModeIcon fontSize="small" />}
            </IconButton>

            <Button 
              variant="outlined" 
              color="primary" 
              size="small"
              startIcon={<LogoutIcon />}
              onClick={handleLogout}
              sx={{ textTransform: "none", borderRadius: "8px" }}
            >
              Logout
            </Button>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
}