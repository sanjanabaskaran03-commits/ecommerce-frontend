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
  const { toggleWishlist, isInWishlist } = useWishlist();

  const [cartAnimate, setCartAnimate] = useState(false);
  const [wishAnimate, setWishAnimate] = useState(false);

  if (!product) return null;

  const inCart = isInCart(product.id || product._id);
  const isWishlisted = isInWishlist(product._id || product.id);

  const handleWishlistClick = (e) => {
    e.stopPropagation();
    toggleWishlist(product);

    setWishAnimate(true);
    setTimeout(() => setWishAnimate(false), 300);
  };

  const handleCartClick = (e) => {
    e.stopPropagation();
    toggleCart(product);

    setCartAnimate(true);
    setTimeout(() => setCartAnimate(false), 300);
  };

  const isGrid = viewMode === 'grid';

  return (
    <MotionCard
      variant="outlined"
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 300, damping: 15 }}
      sx={{
        mb: isGrid ? 0 : 2,
        p: isGrid ? 1.5 : 2,
        display: 'flex',
        flexDirection: isGrid ? 'column' : { xs: 'column', sm: 'row' },
        gap: 2,
        borderRadius: '6px',
        bgcolor: 'background.paper',
        borderColor: 'divider',
        position: 'relative',
        minHeight: isGrid ? 320 : "auto", // ✅ equal height
      }}
    >

      {/* LIST VIEW ICONS */}
      {!isGrid && (
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
          <motion.div animate={cartAnimate ? { scale: 1.2 } : { scale: 1 }}>
            <IconButton
              size='small'
              disableRipple
              onClick={handleCartClick}
              sx={{
                bgcolor: inCart ? "#0D6EFD" : (isDark ? "#161B22" : "#fff"),
                color: inCart ? "#fff" : "#0D6EFD",
                border: "1px solid",
                borderColor: inCart ? "#0D6EFD" : (isDark ? "#30363D" : "#DEE2E7"),
                transition: "all 0.1s ease",

                // "&:hover": {
                //   bgcolor: "#0D6EFD",
                //   color: "#fff",
                //   borderColor: "#0D6EFD",
                // },
              }}
            >
              {inCart ? (
                <ShoppingCartIcon sx={{ fontSize: 16 }} />
              ) : (
                <ShoppingCartOutlinedIcon sx={{ fontSize: 16 }} />
              )}
            </IconButton>
          </motion.div>

          <motion.div animate={wishAnimate ? { scale: 1.2 } : { scale: 1 }}>
            <IconButton
              size="small"
              disableRipple
              onClick={handleWishlistClick}
              sx={{
                bgcolor: isWishlisted ? "#0D6EFD" : (isDark ? "#161B22" : "#fff"),
                color: isWishlisted ? "#fff" : "#0D6EFD",
                border: "1px solid",
                borderColor: isWishlisted ? "#0D6EFD" : (isDark ? "#30363D" : "#DEE2E7"),
                transition: "all 0.1s ease",

                // "&:hover": {
                //   bgcolor: "#0D6EFD",
                //   color: "#fff",
                //   borderColor: "#0D6EFD",
                // },
              }}
            >
              {isWishlisted ? (
                <FavoriteIcon sx={{ fontSize: 16 }} />
              ) : (
                <FavoriteBorderIcon sx={{ fontSize: 16 }} />
              )}
            </IconButton>
          </motion.div>
        </Box>
      )}

      {/* IMAGE */}
      <Box
        sx={{
          width: isGrid ? '100%' : { xs: '100%', sm: 180 },
          height: isGrid ? 170 : 180,
          position: 'relative',
          borderRadius: '4px',
          overflow: 'hidden',
        }}
      >
        <Image
          src={
            product.image?.startsWith("data:image")
              ? product.image
              : "/images/placeholder.png"
          }
          fill
          unoptimized
          alt={product.title}
          style={{ objectFit: 'contain', padding: 10 }}
        />
      </Box>

      {/* CONTENT */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between", // ✅ keeps height equal
        }}
      >

        {isGrid ? (
          <Stack spacing={1} sx={{ width: "100%" }}>

            {/* TITLE + ICONS */}
            <Stack direction="row" alignItems="flex-start" sx={{ width: "100%" }}>
              <Typography
                sx={{
                  fontWeight: 500,
                  fontSize: 14,
                  flex: 1,
                  display: "-webkit-box",
                  WebkitLineClamp: 2, // ✅ 2 lines
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                  lineHeight: 1.3,
                }}
              >
                {product.title}
              </Typography>

              <Stack direction="row" spacing={1}>
                <motion.div animate={cartAnimate ? { scale: 1.2 } : { scale: 1 }}>
                  <IconButton
                    size="small"
                    disableRipple
                    onClick={handleCartClick}
                    sx={{
                      bgcolor: inCart ? activeColor : bgDefault,
                      color: inCart ? "#fff" : activeColor,
                      border: "1px solid",
                      borderColor: inCart ? activeColor : borderDefault,
                      transition: "all 0.2s ease",

                      "&:hover": {
                        bgcolor: activeColor,
                        color: "#fff",
                        borderColor: activeColor,
                      },
                    }}
                  >
                    {inCart ? (
                      <ShoppingCartIcon sx={{ fontSize: 16 }} />
                    ) : (
                      <ShoppingCartOutlinedIcon sx={{ fontSize: 16 }} />
                    )}
                  </IconButton>

                </motion.div>

                <motion.div animate={wishAnimate ? { scale: 1.2 } : { scale: 1 }}>
                  <IconButton
                    size="small"
                    disableRipple
                    onClick={handleWishlistClick}
                    sx={{
                      bgcolor: isWishlisted ? activeColor : bgDefault,
                      color: isWishlisted ? "#fff" : activeColor,
                      border: "1px solid",
                      borderColor: isWishlisted ? activeColor : borderDefault,
                      transition: "all 0.2s ease",

                      "&:hover": {
                        bgcolor: activeColor,
                        color: "#fff",
                        borderColor: activeColor,
                      },
                    }}
                  >
                    {isWishlisted ? (
                      <FavoriteIcon sx={{ fontSize: 16 }} />
                    ) : (
                      <FavoriteBorderIcon sx={{ fontSize: 16 }} />
                    )}
                  </IconButton>
                </motion.div>
              </Stack>
            </Stack>

            {/* PRICE + RATING */}
            <Stack direction="row" alignItems="center" sx={{ width: "100%" }}>
              <Typography sx={{ fontWeight: 600, fontSize: 16, flex: 1 }}>
                ${product.price}
              </Typography>

              <Rating value={Number(product.rating)} readOnly size="small" />
            </Stack>

            {/* DESCRIPTION */}
            <Typography
              variant="body2"
              sx={{
                color: 'text.secondary',
                fontSize: 13,
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
                minHeight: "38px", // ✅ fixed height
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
              }}
            >
              View details
            </Button>

          </Stack>
        ) : (
          <>
            {/* LIST VIEW UNCHANGED */}
            <Typography sx={{ fontWeight: 500, fontSize: '16px' }}>
              {product.title}
            </Typography>

            <Typography sx={{ fontWeight: 600, fontSize: '20px', mt: 0.5 }}>
              ${product.price}
            </Typography>

            <Stack direction="row" spacing={1} sx={{ mt: 0.5 }}>
              <Rating value={Number(product.rating)} readOnly size="small" />
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                {product.orders} orders
              </Typography>
            </Stack>

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
                alignSelf: 'flex-end',
                color: '#0D6EFD',
              }}
            >
              View details
            </Button>
          </>
        )}
      </Box>
    </MotionCard>
  );
};

export default ProductCard;