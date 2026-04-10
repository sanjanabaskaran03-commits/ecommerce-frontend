"use client"
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';    
import Image from 'next/image';
import { Box, Card, Typography, Stack, Button, IconButton, Rating } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite'; 
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined'; 
import { useTheme } from '@mui/material/styles';
import { motion } from 'framer-motion'; 
import { useCart } from '@/src/app/context/CartContext'; 
import { useWishlist } from '@/src/app/context/WishlistContext';

const MotionCard = motion.create(Card);

const ProductCard = ({ product, viewMode = 'list', isFirst = false }) => {
  const { addToCart } = useCart();
  const router = useRouter();
  const { toggleWishlist, isInWishlist } = useWishlist(); 
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [animate, setAnimate] = useState(false);
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  if (!product) return null;

  const handleWishlistClick = (e) => {
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);
    setAnimate(true);
    toggleWishlist(product);
    setTimeout(() => setAnimate(false), 400); 
  };

  const handleCartClick = (e) => {
    e.stopPropagation();
    addToCart(product);
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
          src={product.img} 
          alt={product.title}
          fill 
          sizes={isGrid ? "(max-width: 600px) 50vw, (max-width: 900px) 33vw, 200px" : "180px"}
          loading={isFirst ? "eager" : "lazy"}
          priority={isFirst}
          style={{ 
            objectFit: 'contain', 
            padding: '8px' 
          }} 
        />
      </Box>
      
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
        {isGrid ? (
          <Stack spacing={0.5} sx={{ width: '100%' }}>
            <Stack direction="row" justifyContent="space-between" alignItems="flex-start" sx={{ width: '100%', minWidth: 0 }}>
              <Typography
                sx={{
                  fontWeight: 500,
                  color: 'text.primary',
                  fontSize: { xs: '12px', sm: '14px' },
                  lineHeight: 1.4,
                  mr: 1,
                  whiteSpace: 'normal',
                }}
              >
                {product.title}
              </Typography>
              <Stack direction="row" spacing={0.5}>
                <IconButton
                size="small"
                onClick={handleCartClick}
                sx={{
                  border: '1px solid',
                  borderColor: isDark ? '#30363D' : '#DEE2E7',
                  borderRadius: '6px',
                  color: '#0D6EFD',
                  '&:focus':{outline:'none'},
                  p: { xs: 0.5, sm: 0.75 },
                }}
              >
                <ShoppingCartOutlinedIcon sx={{ fontSize: { xs: '0.9rem', sm: '1rem' } }} />
              </IconButton>
              <IconButton
                size="small"
                onClick={handleWishlistClick}
                sx={{
                  border: isWishlisted ? 'none' : '1px solid',
                  borderColor: isDark ? '#30363D' : '#DEE2E7',
                  borderRadius: '6px',
                  color: isWishlisted ? '#fff' : '#0D6EFD',
                  bgcolor: isWishlisted ? '#0D6EFD' : 'transparent',
                  '&:focus': { outline: 'none' },
                  p: { xs: 0.5, sm: 0.75 },
                }}
              >
                {isWishlisted
                  ? <FavoriteIcon sx={{ fontSize: { xs: '0.9rem', sm: '1rem' } }} />
                  : <FavoriteBorderIcon sx={{ fontSize: { xs: '0.9rem', sm: '1rem' } }} />
                }
              </IconButton>
            </Stack>
            </Stack>

            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ width: '100%' }}>
              <Typography
                sx={{
                  fontWeight: 600,
                  fontSize: { xs: '14px', sm: '16px' },
                  color: 'text.primary',
                }}
              >
                ${product.price}
              </Typography>
              <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
                <Typography sx={{ fontSize: '12px', color: 'text.secondary' }}>
                  {Number(product.rating).toFixed(1)} stars
                </Typography>
              </Box>
              <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                <Rating value={Number(product.rating)} readOnly precision={0.1} size="small" />
              </Box>
            </Stack>
          </Stack>
        ) : (
          <>
            <Stack direction="row" justifyContent="space-between" alignItems="flex-start" sx={{ width: '100%' }}>
              <Typography
                sx={{
                  fontWeight: 500,
                  color: 'text.primary',
                  fontSize: '16px',
                  lineHeight: 1.4,
                }}
              >
                {product.title}
              </Typography>

              <Stack direction="row" spacing={1}> 
                <IconButton 
                  size="small" 
                  onClick={handleCartClick}
                  sx={{ border: '1px solid', borderColor: isDark ? '#30363D' : '#DEE2E7', borderRadius: '6px', color: '#0D6EFD','&:focus':{outline:'none'} }}
                >
                  <ShoppingCartOutlinedIcon fontSize="small" />
                </IconButton>

                <IconButton size="small" onClick={handleWishlistClick} sx={{ border: isWishlisted ? 'none' : '1px solid', borderColor: isDark ? '#30363D' : '#DEE2E7', borderRadius: '6px', color: isWishlisted ? '#fff' : '#0D6EFD', bgcolor: isWishlisted ? '#0D6EFD' : 'transparent' ,'&:focus':{outline:'none'}}}>
                  {isWishlisted ? <FavoriteIcon fontSize="small" /> : <FavoriteBorderIcon fontSize="small" />}
                </IconButton>
              </Stack>
            </Stack>

            <Stack direction="row" spacing={1} alignItems="center" sx={{ mt: 0.5 }}>
              <Typography
                sx={{
                  fontWeight: 600,
                  fontSize: '20px',
                  color: 'text.primary',
                }}
              >
                ${product.price}
              </Typography>
            </Stack>
          </>
        )}
        
        {!isGrid && (
          <Stack direction="row" spacing={1} alignItems="center" sx={{ mt: 0.5 }}>
            <Rating value={Number(product.rating)} readOnly precision={0.1} size="small" />
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
            display: isGrid ? { xs: 'none', sm: '-webkit-box' } : '-webkit-box',
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            fontSize: isGrid ? { xs: '12px', sm: '13px' } : 'inherit',
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
            color: '#0D6EFD',
            fontSize: isGrid ? { xs: '12px', sm: '13px' } : 'inherit',
          }}
        >
          View details
        </Button>
      </Box>
    </MotionCard>
  );
};

export default ProductCard;
