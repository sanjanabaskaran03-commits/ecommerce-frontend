"use client";

import React from 'react';
import { 
  Box, Typography, Stack, Container, useTheme 
} from '@mui/material';
import { Menu as MenuIcon, KeyboardArrowDown } from '@mui/icons-material';

const Navbar = () => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  return (
    <Box 
      
      sx={{ 
        display: { xs: 'none', md: 'flex' }, 
        borderBottom: '1px solid', 
        borderColor: 'divider', 
        bgcolor: 'background.paper',
        width: '100%',
        justifyContent: 'center',
      }}
    >
      <Container 
        maxWidth="false"
        sx={{ 
          height: '56px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          maxWidth: "1280px",
    margin: "0 auto",
    px: 2
        
        }}
      >
        {/* LEFT SIDE: CATEGORIES & LINKS */}
        <Stack direction="row" spacing={3} sx={{ alignItems: "center" }}>
          <Stack 
            direction="row" 
            spacing={1} 
            sx={{ 
              cursor: 'pointer',
              alignItems: "center",
              '&:hover': { opacity: 0.8 }
            }}
          >
            <MenuIcon sx={{ fontSize: '20px', color: 'text.primary' }} />
            <Typography variant="body2" sx={{ fontWeight: 500, color: 'text.primary' }}>
              All category
            </Typography>
          </Stack>
          
          <NavLink label="Hot offers" />
          <NavLink label="Gift boxes" />
          <NavLink label="Projects" />
          <NavLink label="Menu item" />
          
          <Stack direction="row" sx={{ cursor: 'pointer', alignItems: "center" }}>
            <Typography variant="body2" sx={{ fontWeight: 500, color: 'text.primary' }}>
              Help
            </Typography>
            <KeyboardArrowDown sx={{ fontSize: '18px', color: 'text.secondary' }} />
          </Stack>
        </Stack>

        {/* RIGHT SIDE: SETTINGS & SHIPPING */}
        <Stack direction="row" spacing={4} sx={{ alignItems: "center" }}>
          <NavDropdown label="English, USD" />
          
          <Stack 
            direction="row" 
            spacing={1} 
            sx={{ 
              cursor: 'pointer',
              padding: '4px 8px',
              borderRadius: '4px',
              alignItems: "center",
              '&:hover': { bgcolor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.04)' }
            }}
          >
            <Typography variant="body2" sx={{ fontWeight: 500, color: 'text.primary' }}>
              Ship to
            </Typography>
            <Box 
              component="img" 
              // Ensure this path exists in your public/ folder
              src="/images/navbar/flag.png" 
              alt="Germany Flag"
              sx={{ width: 20, height: 14, borderRadius: '2px', objectFit: 'cover' }}
            />
            <KeyboardArrowDown sx={{ fontSize: '18px', color: 'text.secondary' }} />
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
};

// Sub-component for simple links
const NavLink = ({ label }) => (
  <Typography 
    variant="body2" 
    sx={{ 
      fontWeight: 500, 
      color: 'text.primary',
      cursor: 'pointer', 
      transition: 'color 0.2s',
      '&:hover': { color: 'primary.main' } 
    }}
  >
    {label}
  </Typography>
);

// Sub-component for dropdowns
const NavDropdown = ({ label }) => (
  <Stack 
    direction="row" 
    sx={{ 
      cursor: 'pointer',
      alignItems: "center",
      '&:hover': { opacity: 0.8 }
    }}
  >
    <Typography variant="body2" sx={{ fontWeight: 500, color: 'text.primary' }}>
      {label}
    </Typography>
    <KeyboardArrowDown sx={{ fontSize: '18px', color: 'text.secondary' }} />
  </Stack>
);

export default Navbar;
