"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import {
  Box,
  Card,
  Typography,
  Stack,
  Button,
  IconButton,
  Rating
} from '@mui/material';

import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

import { useCart } from '@/src/app/context/CartContext';
import { useWishlist } from '@/src/app/context/WishlistContext';
import { useTheme } from '@mui/material/styles';
import { motion } from 'framer-motion';

const MotionCard = motion.create(Card);

const ProductCard = ({ product, viewMode = 'list', isFirst = false }) => {
  const router = useRouter();
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  const { toggleCart, isInCart } = useCart();
  const { toggleWishlist } = useWishlist();

  const [isWishlisted, setIsWishlisted] = useState(false);
  const [animate, setAnimate] = useState(false);

  if (!product) return null;

  // ✅ FIX: cart state
  const inCart = isInCart(product.id || product._id);

  const handleWishlistClick = (e) => {
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);
    setAnimate(true);
    toggleWishlist(product);
    setTimeout(() => setAnimate(false), 400);
  };

  // ✅ FIX: cart toggle
  const handleCartClick = (e) => {
    e.stopPropagation();
    toggleCart(product);
  };

  const isGrid = viewMode === 'grid';

  return (
    <MotionCard
      variant="outlined"
      whileHover={{ y: -5 }}
      animate={animate ? { scale: 1.02, rotate: 0.5 } : { scale: 1, rotate: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 15 }}
      sx={{
        mb: isGrid ? 0 : 2,
        p: isGrid ? { xs: 1.2, sm: 1.5 } : 2,
        display: 'flex',
        flexDirection: isGrid ? 'column' : { xs: 'column', sm: 'row' },
        gap: { xs: 2, md: 3 },
        borderRadius: '6px',
        bgcolor: 'background.paper',
        borderColor: 'divider',
        boxShadow: 'none',
        position: 'relative',
        zIndex: animate ? 2 : 1,
      }}
    >

      {/* TOP RIGHT ICONS */}
      <Box
        sx={{
          position: "absolute",
          top: 8,
          right: 8,
          display: "flex",
          gap: 1,
          zIndex: 3,
        }}
      >

        {/* 🛒 CART TOGGLE */}
        <IconButton
          size="small"
          onClick={handleCartClick}
          sx={{
            bgcolor: inCart ? "#0D6EFD" : "#fff",
            color: inCart ? "#fff" : "#0D6EFD",
            border: "1px solid",
            borderColor: isDark ? "#30363D" : "#DEE2E7",
            borderRadius: "50%",
            boxShadow: 1,
            '&:focus': { outline: 'none' },
          }}
        >
          {inCart ? (
            <ShoppingCartIcon fontSize="small" />
          ) : (
            <ShoppingCartOutlinedIcon fontSize="small" />
          )}
        </IconButton>

        {/* ❤️ WISHLIST */}
        <IconButton
          size="small"
          onClick={handleWishlistClick}
          sx={{
            bgcolor: isWishlisted ? "#0D6EFD" : "#fff",
            color: isWishlisted ? "#fff" : "#0D6EFD",
            borderRadius: "50%",
            boxShadow: 1,
            '&:focus': { outline: 'none' },
          }}
        >
          {isWishlisted ? (
            <FavoriteIcon fontSize="small" />
          ) : (
            <FavoriteBorderIcon fontSize="small" />
          )}
        </IconButton>

      </Box>

      {/* IMAGE */}
      <Box
        sx={{
          width: isGrid ? '100%' : { xs: '100%', sm: 180 },
          height: isGrid ? { xs: 140, sm: 170 } : 180,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          position: 'relative',
          overflow: 'hidden',
          borderRadius: '4px',
          bgcolor: '#fff'
        }}
      >
        <Image
          src={product.image || "/images/sample.jpg"}
          alt={product.title}
          fill
          sizes={isGrid ? "(max-width: 600px) 50vw, (max-width: 900px) 33vw, 200px" : "180px"}
          loading={isFirst ? "eager" : "lazy"}
          priority={isFirst}
          style={{ objectFit: 'contain', padding: '8px' }}
        />
      </Box>

      {/* CONTENT */}
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>

        {isGrid ? (
          <Stack spacing={0.5}>
            <Typography sx={{ fontWeight: 500, fontSize: { xs: '12px', sm: '14px' } }}>
              {product.title}
            </Typography>

            <Typography sx={{ fontWeight: 600, fontSize: { xs: '14px', sm: '16px' } }}>
              ${product.price}
            </Typography>

            <Rating value={Number(product.rating)} readOnly size="small" />
          </Stack>
        ) : (
          <>
            <Typography sx={{ fontWeight: 500, fontSize: '16px' }}>
              {product.title}
            </Typography>

            <Typography sx={{ fontWeight: 600, fontSize: '20px', mt: 0.5 }}>
              ${product.price}
            </Typography>
          </>
        )}

        {!isGrid && (
          <Stack direction="row" spacing={1} sx={{ mt: 0.5 }}>
            <Rating value={Number(product.rating)} readOnly size="small" />
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              {product.orders} orders
            </Typography>
          </Stack>
        )}

        <Typography
          variant="body2"
          sx={{
            color: 'text.secondary',
            mt: 1,
            mb: 1,
            WebkitLineClamp: 2,
            display: '-webkit-box',
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {product.description}
        </Typography>

        <Button
          variant="text"
          sx={{
            textTransform: 'none',
            fontWeight: 600,
            p: 0,
            alignSelf: 'flex-start',
            color: '#0D6EFD',
          }}
        >
          View details
        </Button>
      </Box>
    </MotionCard>
  );
};

export default ProductCard;