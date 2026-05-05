"use client";

import React from 'react';
import { Box, Typography, Stack, IconButton, useTheme, Link, Container } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import AppleIcon from '@mui/icons-material/Apple';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { ShoppingBag } from '@mui/icons-material';

const footerLinks = [
  { title: 'About', links: ['About Us', 'Find store', 'Categories', 'Blogs'] },
  { title: 'Partnership', links: ['About Us', 'Find store', 'Categories', 'Blogs'] },
  { title: 'Information', links: ['Help Center', 'Money Refund', 'Shipping', 'Contact us'] },
  { title: 'For users', links: ['Login', 'Register', 'Settings', 'My Orders'] },
];

const Footer = () => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const currentYear = new Date().getFullYear();

  const appButtonStyle = {
    display: 'flex',
    alignItems: 'center',
    bgcolor: '#000',
    color: '#fff',
    borderRadius: '6px',
    px: 1.5,
    py: 0.5,
    width: '124px',
    height: '42px',
    cursor: 'pointer',
    border: '1px solid #333',
    '&:hover': { bgcolor: '#222' }
  };

  return (
    <Box component="footer" sx={{ bgcolor: 'background.paper', pt: { xs: 4, md: 6 }, width: '100%' }}>

      <Container
        maxWidth={false}
        sx={{
          maxWidth: "1280px",
          margin: "0 auto",
          px: 2,
          pb: 6,
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          flexWrap: 'wrap',
          textAlign: "left",
          gap: { xs: 4, md: 2, lg: 4 }
        }}
      >
        <Box sx={{
          flex: { xs: '1 1 100%', sm: '1 1 30%', md: '0 0 250px' },
          textAlign: "left"
        }}>
          <Stack spacing={2}>
            <Stack direction="row" spacing={1.5} sx={{ alignItems: "center" }}>
              <Box sx={{ bgcolor: '#0D6EFD', borderRadius: '8px', p: 0.8, display: 'flex' }}>
                <ShoppingBag sx={{ color: '#fff', fontSize: '1.5rem' }} />
              </Box>
              <Typography variant="h5" sx={{ fontWeight: 800, color: '#8CB7F5' }}>
                Brand
              </Typography>
            </Stack>
            <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.6, maxWidth: '280px' }}>
              Best information about the company goes here but now lorem ipsum is
            </Typography>
            <Stack direction="row" spacing={1}>
              {[FacebookIcon, TwitterIcon, LinkedInIcon, InstagramIcon, YouTubeIcon].map((Icon, i) => (
                <IconButton key={i} size="small" sx={{ bgcolor: isDark ? 'rgba(255,255,255,0.1)' : '#BDC4CD', color: '#fff', '&:hover': { bgcolor: '#127FFF' } }}>
                  <Icon fontSize="small" />
                </IconButton>
              ))}
            </Stack>
          </Stack>
        </Box>

        {/* LINKS SECTION */}
        <Box
          sx={{
            flex: 1,
            display: 'grid',
            // 2 columns on mobile, 4 columns on desktop
            gridTemplateColumns: { xs: 'repeat(2, 1fr)', sm: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' },
            gap: 3,
          }}
        >
          {footerLinks.map((section) => (
            <Box key={section.title}>
              <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2, fontSize: '16px', color: isDark ? 'text.primary' : '#1c1c1c' }}>
                {section.title}
              </Typography>
              <Stack spacing={1.5}>
                {section.links.map((link) => (
                  <Link key={link} href="#" underline="none" sx={{ color: '#8B96A5', fontSize: '15px', '&:hover': { color: '#127FFF' } }}>
                    {link}
                  </Link>
                ))}
              </Stack>
            </Box>
          ))}
        </Box>

        {/* APP SECTION */}
        <Box sx={{
          flex: { xs: '1 1 100%', sm: '1 1 100%', md: '0 0 124px' },
          mt: { xs: 2, md: 0 }
        }}>
          <Stack spacing={1.5} direction={{ xs: 'row', md: 'column' }} sx={{ flexWrap: "wrap" }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600, fontSize: '16px', color: isDark ? 'text.primary' : '#1c1c1c', width: '100%' }}>
              Get app
            </Typography>
            <Box sx={appButtonStyle}>
              <AppleIcon sx={{ fontSize: 24, mr: 1 }} />
              <Box>
                <Typography sx={{ fontSize: '8px', lineHeight: 1 }}>Download on the</Typography>
                <Typography sx={{ fontSize: '12px', fontWeight: 600, lineHeight: 1 }}>App Store</Typography>
              </Box>
            </Box>
            <Box sx={appButtonStyle}>
              <PlayArrowIcon sx={{ fontSize: 24, mr: 1 }} />
              <Box>
                <Typography sx={{ fontSize: '8px', lineHeight: 1 }}>GET IT ON</Typography>
                <Typography sx={{ fontSize: '10px', fontWeight: 600, lineHeight: 1 }}>Google Play</Typography>
              </Box>
            </Box>
          </Stack>
        </Box>
      </Container>

      <Box sx={{ bgcolor: isDark ? 'rgba(255,255,255,0.05)' : '#EFF2F4', py: 2.5, width: '100%' }}>
        <Container
          maxWidth="false"
          sx={{
            maxWidth: "1280px",
            margin: "0 auto",
            px: 2,
            display: 'flex',
            flexDirection: { xs: 'row', sm: 'row' },
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: { xs: 2, sm: 0 }
          }}
        >
          <Typography variant="body2" sx={{ color: '#606060' }}>
            © {currentYear} Ecommerce.
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, cursor: 'pointer' }}>
            <Box component="img" src="/images/homepage/regions/us.png" sx={{ width: 22, height: 15, borderRadius: '2px' }} />
            <Typography sx={{ color: '#606060', fontSize: '14px', display: 'flex', alignItems: 'center' }}>
              English, USD <KeyboardArrowUpIcon fontSize="small" sx={{ ml: 0.5 }} />
            </Typography>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default Footer;
