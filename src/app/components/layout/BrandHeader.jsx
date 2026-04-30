"use client";

import React, { useContext, useState, useEffect, useMemo, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { useWishlist } from '@/src/app/context/WishlistContext';
import { ColorModeContext } from '../../context/ThemeContext';
import { useCart } from '../../context/CartContext';
import {
  useTheme, AppBar, Toolbar, Typography, Box, IconButton, InputBase,
  Button, Stack, MenuItem, MenuList, Select, Container, Badge, Drawer, List, ListItem, Menu, Divider, Paper
} from '@mui/material';
import {
  Person, Chat, Favorite, ShoppingCart,
  WbSunny, DarkMode, ShoppingBag, Menu as MenuIcon, Logout
} from '@mui/icons-material';

const BrandHeader = () => {
  const theme = useTheme();
  const [mounted, setMounted] = useState(false);
  const [user, setUser] = useState(null);
  const themeMode = useContext(ColorModeContext);
  const { cartItems } = useCart();
  const { wishlist } = useWishlist();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchCategory, setSearchCategory] = useState('All category');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [activeSuggestion, setActiveSuggestion] = useState(-1);
  const [profileAnchorEl, setProfileAnchorEl] = useState(null);

  const isDark = theme.palette.mode === 'dark';

  // --- MongoDB Data States ---
  const [dbProducts, setDbProducts] = useState([]);
  const [productCategories, setProductCategories] = useState([]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  useEffect(() => {
    const fetchHeaderData = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products`);
        const json = await res.json();
        const productsArray = Array.isArray(json)
          ? json
          : Array.isArray(json?.data)
            ? json.data
            : Array.isArray(json?.products)
              ? json.products
              : [];
        setDbProducts(productsArray);
        const uniqueCats = [...new Set(productsArray.map(item => item.category))];
        setProductCategories(uniqueCats);
      } catch (err) {
        console.error("Failed to fetch header data", err);
        setDbProducts([]);
      }
    };
    if (mounted) fetchHeaderData();
  }, [mounted]);

  const cartCount = Array.isArray(cartItems)
    ? cartItems.reduce((acc, item) => {
      const qty = parseInt(item?.qty, 10);
      return acc + (isNaN(qty) ? 0 : qty);
    }, 0)
    : 0;
  const wishlistCount = wishlist.length;

  const categoryCards = useMemo(() => {
    return productCategories
      .map((category) => {
        const product = dbProducts.find(item => item.category === category);
        return product ? { category, product } : null;
      })
      .filter(Boolean);
  }, [productCategories, dbProducts]);

  const searchSuggestions = useMemo(() => {
    const titles = dbProducts.map(item => item.title);
    return [...new Set(titles)];
  }, [dbProducts]);

  const filteredSuggestions = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    if (!term) return [];
    return searchSuggestions
      .filter(item => item.toLowerCase().includes(term))
      .slice(0, 6);
  }, [searchTerm, searchSuggestions]);

  const toCategoryLabel = useCallback((value) => {
    if (!value) return 'All category';
    const normalized = value.replace(/-/g, ' ').toLowerCase();
    const match = productCategories.find(c => c.toLowerCase() === normalized);
    return match || 'All category';
  }, [productCategories]);

  useEffect(() => {
    const term = searchParams.get('search') || '';
    const category = searchParams.get('category');
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSearchTerm(term);
    setSearchCategory(toCategoryLabel(category));
  }, [searchParams, productCategories, toCategoryLabel]);

  const handleSearch = () => {
    const params = new URLSearchParams();
    const trimmed = searchTerm.trim();
    if (trimmed) params.set('search', trimmed);
    if (searchCategory && searchCategory !== 'All category') {
      params.set('category', searchCategory.toLowerCase().replace(/\s+/g, '-'));
    }
    const query = params.toString();
    router.push(query ? `/shop?${query}` : '/shop');
    setShowSuggestions(false);
  };

  const handleProfileOpen = (event) => setProfileAnchorEl(event.currentTarget);
  const handleProfileClose = () => setProfileAnchorEl(null);
  const requireLoginAndGo = (path) => {
    if (user) {
      router.push(path);
      return;
    }
    router.push(`/auth/login?next=${encodeURIComponent(path)}`);
  };
  const handleLogout = () => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/logout`, {
      method: "POST",
      credentials: "include",
    })
      .then(() => {
        handleProfileClose();
        window.dispatchEvent(new Event("auth-changed"));
        router.push("/auth/login"); // redirect after logout
      })
      .catch(() => {
        console.error("Logout failed");
      });
  };

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/me`, {
      credentials: "include",
    })
      .then((res) => {
        if (!res.ok) return null;
        return res.json();
      })
      .then((data) => {
        if (data && data.user) {
          setUser(data.user);
        }
      })
      .catch(() => {
        setUser(null);
      });
  }, []);
  if (!mounted) return <Box sx={{ height: '70px', bgcolor: 'background.paper' }} />;
  return (
    <AppBar
      position="sticky" color="inherit" elevation={0}
      sx={{ top: 0, borderBottom: '1px solid', borderColor: 'divider', bgcolor: 'background.paper', zIndex: 1100, backgroundImage: 'none' }}
    >
      <Container maxWidth={false} sx={{ maxWidth: '1280px', px: 2, margin: '0 auto' }}>
        <Toolbar disableGutters sx={{ flexDirection: { xs: 'column', md: 'row' }, justifyContent: 'space-between', alignItems: 'center', py: { xs: 1.5, md: 3 }, gap: { xs: 1, md: 4 } }}>

          <Stack direction="row" sx={{ width: { xs: '100%', md: 'auto' }, justifyContent: 'space-between', alignItems: "center" }}>
            <Stack direction="row" sx={{ alignItems: "center" }}>
              <IconButton onClick={() => setDrawerOpen(true)} sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }}>
                <MenuIcon />
              </IconButton>
              <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '12px' }}>
                <Box sx={{ bgcolor: '#0D6EFD', borderRadius: '8px', p: { xs: 0.5, md: 0.8 }, display: 'flex' }}>
                  <ShoppingBag sx={{ color: '#fff', fontSize: { xs: '1.4rem', md: '1.8rem' } }} />
                </Box>
                <Typography variant="h4" sx={{ fontWeight: 800, color: '#8CB7F5', display: { xs: 'none', md: 'block' }, fontSize: { xs: '1.5rem', md: '2.125rem' } }}>Brand</Typography>
              </Link>
            </Stack>

            {/* Mobile Header Icons */}
            <Stack direction="row" spacing={1} sx={{ display: { xs: 'flex', md: 'none' }, alignItems: "center" }}>
              <HeaderAction icon={<Person />} label="Profile" mobileHideLabel onClick={handleProfileOpen} />
              <IconButton onClick={themeMode.toggleColorMode}>
                {isDark ? <WbSunny sx={{ color: '#FFD700' }} /> : <DarkMode sx={{ color: '#4A5568' }} />}
              </IconButton>
              <HeaderAction
                icon={<Badge badgeContent={cartCount} color="error"><ShoppingCart /></Badge>}
                label="Cart"
                mobileHideLabel
                onClick={() => requireLoginAndGo("/cart")}
              />
            </Stack>
          </Stack>

          {/* Search Bar Section */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', flex: 1, maxWidth: '660px', position: 'relative' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', height: '44px', border: '2px solid', borderColor: '#0D6EFD', borderRadius: '8px', overflow: 'hidden', bgcolor: 'background.paper' }}>
              <InputBase
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setShowSuggestions(true);
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleSearch();
                  }
                }}
                onFocus={() => setShowSuggestions(true)}
                onBlur={() => {
                  // delay so click works properly
                  setTimeout(() => setShowSuggestions(false), 150);
                }}
                sx={{ ml: 2, flex: 1, fontSize: '0.95rem', color: 'text.primary' }}
              />
              <Select
                value={searchCategory}
                onChange={(e) => setSearchCategory(e.target.value)}
                variant="standard" disableUnderline
                sx={{ width: 'auto', minWidth: '130px', px: 1, color: 'text.primary' }}
              >
                <MenuItem value="All category">All category</MenuItem>
                {productCategories.map((cat) => (
                  <MenuItem key={cat} value={cat}>{cat}</MenuItem>
                ))}
              </Select>
              <Button variant="contained" disableElevation onClick={handleSearch} sx={{ height: '100%', borderRadius: 0, px: 4, bgcolor: '#0D6EFD', textTransform: 'none' }}>
                Search
              </Button>
            </Box>

            {/* Suggestion Dropdown */}
            {showSuggestions && filteredSuggestions.length > 0 && (
              <Paper
                elevation={3}
                sx={{ position: 'absolute', top: '100%', left: 0, right: 0, mt: 1, zIndex: 1500, borderRadius: '8px', overflow: 'hidden' }}
              >
                <MenuList disablePadding>
                  {filteredSuggestions.map((suggestion, idx) => (
                    <MenuItem
                      key={idx}
                      onMouseDown={(e) => e.preventDefault()}
                      onClick={() => {
                        setSearchTerm(suggestion);
                        setShowSuggestions(false);
                      }}
                      sx={{ py: 1.5 }}
                    >
                      <Typography variant="body2">{suggestion}</Typography>
                    </MenuItem>
                  ))}
                </MenuList>
              </Paper>
            )}
          </Box>

          {/* Desktop Header Actions */}
          <Stack direction="row" spacing={2} sx={{ display: { xs: 'none', md: 'flex' }, alignItems: "center" }}>
            <HeaderAction icon={<Person />} label="Profile" onClick={handleProfileOpen} />
            <HeaderAction icon={<Chat />} label="Message" />
            <HeaderAction
              icon={<Badge badgeContent={wishlistCount} color="error"><Favorite /></Badge>}
              label="Wishlist"
              onClick={() => requireLoginAndGo("/wishlist")}
            />
            <HeaderAction
              icon={<Badge badgeContent={cartCount} color="error"><ShoppingCart /></Badge>}
              label="My cart"
              onClick={() => requireLoginAndGo("/cart")}
            />

            <IconButton onClick={themeMode.toggleColorMode} size="small">
              {isDark ? (
                <WbSunny fontSize="small" sx={{ color: '#FFD700' }} />
              ) : (
                <DarkMode fontSize="small" sx={{ color: '#4A5568' }} />
              )}
            </IconButton>
          </Stack>
        </Toolbar>
      </Container>

      {/* Profile Menu */}
      <Menu
        anchorEl={profileAnchorEl}
        open={Boolean(profileAnchorEl)}
        onClose={handleProfileClose}
        PaperProps={{ sx: { width: '220px', mt: 1, borderRadius: '8px' } }}
      >
        <MenuItem disabled sx={{ opacity: '1 !important', color: 'text.primary', fontWeight: 600 }}>
          Account holder: {user ? user.name : "Guest"}
        </MenuItem>
        <Divider />
        <MenuItem
          onClick={() => {
            handleProfileClose();
            router.push('/profile');
          }}
        >
          <Stack direction="row" spacing={1.5} sx={{ alignItems: "center" }}>
            <Person fontSize="small" sx={{ color: '#0D6EFD' }} />
            <Typography variant="body2">My Profile</Typography>
          </Stack>
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          <Stack direction="row" spacing={1.5} sx={{ alignItems: "center" }}>
            <Logout fontSize="small" sx={{ color: 'error.main' }} />
            <Typography variant="body2" sx={{ color: 'error.main' }}>Logout</Typography>
          </Stack>
        </MenuItem>
      </Menu>

      {/* Mobile Drawer */}
      <Drawer anchor="left" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <Box sx={{ width: 250 }} onClick={() => setDrawerOpen(false)}>
          <List sx={{ pt: 2 }}>
            {[{ text: 'Home', path: '/' }, { text: 'Categories', path: '/list' }, { text: 'Cart', path: '/cart' }].map((item) => (
              <ListItem key={item.text} disablePadding>
                <Button fullWidth onClick={() => router.push(item.path)} sx={{ justifyContent: 'flex-start', px: 3, py: 1.5, textTransform: 'none' }}>{item.text}</Button>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </AppBar>
  );
};

const HeaderAction = ({ icon, label, onClick, mobileHideLabel }) => (
  <Stack onClick={onClick} sx={{ cursor: 'pointer', minWidth: { xs: 'auto', md: '60px' }, color: '#979797', '&:hover': { color: '#0D6EFD' }, alignItems: "center" }}>
    {icon}
    <Typography variant="caption" sx={{ fontSize: '12px', mt: 0.5, display: mobileHideLabel ? { xs: 'none', md: 'block' } : 'block' }}>
      {label}
    </Typography>
  </Stack>
);

export default BrandHeader;
