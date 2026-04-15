"use client"
import React from 'react';
import {
  Box, Typography, Stack, useTheme, Button
} from '@mui/material';
import { useCart } from '@/src/app/context/CartContext'; 
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LayoutContainer from '@/src/app/components/common/LayoutContainer';
import Poco from '@/public/images/homepage/categories/tab.png';
import Wallet from '@/public/images/listviewpage/mobiles/mobile3.png';
import Watch from '@/public/images/homepage/deals/watch.png';
import Laptop from '@/public/images/listviewpage/laptop.png';

import { motion } from 'framer-motion';

const SavedForLater = () => {
  const theme = useTheme();
  const router=useRouter()
  const { cartItems, addToCart } = useCart();
  
  const isDark = theme.palette.mode === 'dark';
  const borderColor = theme.palette.divider;

  const productsArray = [
    { id: 4, title: 'Poco X5 Pro 5G', price: 99.50, img: Poco },
    { id: 10, title: 'Wallet', price: 99.50, img: Wallet },
    { id: 20, title: 'Smart watch', price: 99.50, img: Watch },
    { id: 30, title: 'Headphone', price: 99.50, img: Laptop },
  ];

  const handleCartAction = (item) => {
    const isAdded = cartItems.some(cartItem => cartItem.id === item.id);
    if (isAdded) {
      navigate('/cart');
    } else {
      addToCart(item);
    }
  };

  return (
    <LayoutContainer>
      <Box
        component={motion.div}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.2 }}
        sx={{
          p: { xs: 2, sm: 3 }, 
          borderRadius: '6px',
          bgcolor: 'background.paper',
          border: { xs: 'none', md: `1px solid ${theme.palette.divider}` }, 
          mt: 5,
          mx: { xs: -1, sm: 0 } 
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 600, mb: 3, color: 'text.primary', textAlign: 'left' }}>
          Saved for later
        </Typography>

        <Stack 
          direction="row" 
          sx={{
            justifyContent: { xs: 'center', sm: 'space-between' },
            flexWrap: "wrap",
            gap: { xs: 2, sm: 3 },
          }}
        >
          {productsArray.map((item, index) => {
  const isAdded = cartItems.some(cartItem => cartItem.id === item.id);

            return (
              <Stack 
                key={`saved-item-${item.id}`}
                component={motion.div}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                
                direction="column" 
                spacing={1} 
                sx={{ 
                  flex: { xs: '1 1 45%', sm: '1 1 220px' }, 
                  maxWidth: { xs: '100%', sm: 240 } 
                }}
              >
                <Box
                  sx={{
                    width: '100%',
                    height: { xs: 160, sm: 200 }, 
                    borderRadius: '4px',
                    border: '1px solid',
                    borderColor: borderColor,
                    position: 'relative', // Necessary for Next.js Image fill
                    overflow: 'hidden',
                    p: 1.5,
                    bgcolor: isDark ? '#fff' : 'transparent',
                  }}
                >
                  <Image 
                    src={item.img} 
                    alt={item.title}
                    fill
                    sizes="(max-width: 600px) 45vw, 240px"
                    style={{ objectFit: 'contain', padding: '12px' }}
                  />
                </Box>
                <Box sx={{ textAlign: 'left' }}>
                  <Typography sx={{ fontWeight: 600, color: 'text.primary', fontSize: "16px", mt: 1 }}>
                    ${Number(item.price).toFixed(2)}
                  </Typography>
                  <Typography 
                    sx={{ 
                      color: '#8B96A5', 
                      fontSize: "14px", 
                      lineHeight: 1.2, 
                      height: '34px', 
                      overflow: 'hidden',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      mb: 1
                    }}
                  >
                    {item.title}
                  </Typography>
                  <Button
                    fullWidth
                    variant="outlined"
                    startIcon={isAdded ? <ShoppingCartIcon /> : <AddShoppingCartIcon />}
                    onClick={() => handleCartAction(item)}
                    sx={{
                      textTransform: 'none',
                      borderColor: 'divider',
                      color: 'primary.main',
                      fontSize: { xs: '10px', md: '14px' }, 
                      fontWeight: 600,
                      '&:focus': { outline: 'none' },
                      '&:hover': {
                        bgcolor: 'rgba(13, 110, 253, 0.04)',
                        borderColor: 'primary.main',
                      },
                    }}
                  >
                    {isAdded ? "Go to cart" : "Move to cart"}
                  </Button>
                </Box>
              </Stack>
            );
          })}
        </Stack>
      </Box>
    </LayoutContainer>
  );
};

export default SavedForLater;
