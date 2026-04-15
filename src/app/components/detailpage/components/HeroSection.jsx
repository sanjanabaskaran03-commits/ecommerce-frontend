"use client";
import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from "next/navigation"; 
import Image from 'next/image';
import {
  Box, Typography, Stack, Rating, Divider,
  Button, useTheme, IconButton
} from '@mui/material';
import DoneIcon from '@mui/icons-material/Done';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import LanguageIcon from '@mui/icons-material/Language';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite'; 
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'; 
import { useCart } from '@/src/app/context/CartContext';
import LayoutContainer from '@/src/app/components/common/LayoutContainer';
import { useWishlist } from '@/src/app/context/WishlistContext';

const HeroSection = ({ product: propProduct }) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const router = useRouter(); 
  const { addToCart, cartItems } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist(); 
  const params = useParams();
  const id = params?.id;

  // MongoDB Data States
  const [activeProduct, setActiveProduct] = useState(null);
  const [relatedThumbnails, setRelatedThumbnails] = useState([]);
  const [isAdded, setIsAdded] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        const res = await fetch('/api/products');
        const data = await res.json();
        
        // Find current product or default to first
        const current = data.find((item) => item._id === id) || data[0];
        setActiveProduct(current);

        // Filter thumbnails from same category
        const related = data.filter((item) => item.category === current.category).slice(0, 5);
        setRelatedThumbnails(related);

        // Sync cart status - changed item.id to item._id
        setIsAdded(cartItems.some(item => item._id === current._id));
      } catch (err) {
        console.error("HeroSection fetch error", err);
      }
    };
    loadData();
  }, [id, cartItems]);

  if (!activeProduct) return null;

  // Sync wishlist status - changed activeProduct.id to activeProduct._id
  const isSaved = isInWishlist(activeProduct._id); 

  const handleCartAction = () => {
    if (isAdded) {
      router.push('/cart'); 
    } else {
      addToCart(activeProduct);
      setIsAdded(true);
    }
  };

  return (
    <LayoutContainer>
      <Box sx={{ p: 3, borderRadius: '6px', bgcolor: 'background.paper', border: '1px solid', borderColor: 'divider', display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4 }}>
        
        {/* Left Column: Image & Thumbnails */}
        <Box sx={{ flex: 1, minWidth: 0, order: 1 }}>
          <Box sx={{ border: '1px solid', borderColor: 'divider', borderRadius: '6px', height: 380, display: 'flex', alignItems: 'center', justifyContent: 'center', p: 2, bgcolor: '#fff', overflow: 'hidden', position: 'relative' }}>
            {/* Added _id to key for the image container */}
            <Box key={activeProduct._id} sx={{ position: 'relative', height: '300px', width: '100%', animation: 'fadeIn 0.5s ease-in-out', '@keyframes fadeIn': { '0%': { opacity: 0, transform: 'scale(0.95)' }, '100%': { opacity: 1, transform: 'scale(1)' } } }}>
              <Image
                src={activeProduct.img}
                alt={activeProduct.title}
                fill
                priority
                sizes="(max-width: 900px) 100vw, 520px"
                style={{ objectFit: 'contain' }}
              />
            </Box>
          </Box>

          <Stack direction="row" spacing={1} sx={{ mt: 2, overflowX: 'auto', pb: 1, '&::-webkit-scrollbar': { height: '4px' }, '&::-webkit-scrollbar-thumb': { bgcolor: 'divider', borderRadius: '10px' } }}>
            {relatedThumbnails.map((item) => (
              <Box 
                key={item._id} // FIXED: Changed item.id to item._id
                onClick={() => router.push(`/detail/${item._id}`)}
                sx={{ width: 70, height: 70, p: 0.5, cursor: 'pointer', flexShrink: 0, border: '1px solid', borderRadius: '4px', borderColor:'divider', bgcolor: '#fff', position: 'relative', overflow: 'hidden' }}
              >
                <Image
                  src={item.img}
                  alt={item.title}
                  fill
                  sizes="70px"
                  style={{ objectFit: 'contain', padding: '4px' }}
                />
              </Box>
            ))}
          </Stack>
        </Box>

        {/* Middle Column: Details & Pricing */}
        <Box sx={{ flex: 1.5, minWidth: 0, order: 2 }}>
          <Stack spacing={1.5}>
            <Stack direction="row" spacing={0.5} sx={{ alignItems: "center" }}>
              <DoneIcon sx={{ color: '#00B517', fontSize: '20px' }} />
              <Typography sx={{ color: '#00B517', fontWeight: 500 }}>In stock</Typography>
            </Stack>

            <Typography variant="h5" sx={{ fontWeight: 600, textAlign: "left" }}>{activeProduct.title}</Typography>
            
            <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
              <Rating value={Number(activeProduct.rating)} readOnly size="small" sx={{ color: '#FF9017' }} />
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>32 reviews</Typography>
              <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 0.5, color: 'text.secondary' }}>
                <ShoppingBasketIcon fontSize="small" />
                <Typography variant="body2">{activeProduct.orders} sold</Typography>
              </Box>
            </Stack>

            {/* Price Tiers */}
            <Box sx={{ display: 'flex', bgcolor: isDark ? '#2c2c2c' : '#FFF0DF', p: 2, borderRadius: '4px' }}>
              <Box sx={{ display: 'flex', width: '100%' }}>
                <Box sx={{ flex: 1, borderRight: '3px solid', borderColor: 'divider', px: 2, textAlign: 'left' }}>
                  <Typography variant="h6" sx={{ color: '#FA3434', fontWeight: 700 }}>${activeProduct.price}</Typography>
                  <Typography variant="caption" color="text.secondary">50-100 pcs</Typography>
                </Box>
                <Box sx={{ flex: 1, borderRight: '3px solid', borderColor: 'divider', px: 2, textAlign: 'left' }}>
                  <Typography variant="h6" fontWeight={700}>$90.00</Typography>
                  <Typography variant="caption" color="text.secondary">100-700 pcs</Typography>
                </Box>
                <Box sx={{ flex: 1, px: 2, textAlign: 'left' }}>
                  <Typography variant="h6" fontWeight={700}>$78.00</Typography>
                  <Typography variant="caption" color="text.secondary">700+ pcs</Typography>
                </Box>
              </Box>
            </Box>

            {/* Specifications List */}
            <Stack spacing={1.5} sx={{ mt: 1, textAlign: "left" }}>
              <Box sx={{ display: 'flex', pb: 1, borderBottom: '1px solid', borderColor: 'divider' }}>
                <Typography sx={{ width: 120, color: '#8B96A5' }}>Price: </Typography>
                <Typography sx={{ color: 'text.primary' }}>Negotiable</Typography>
              </Box>
              <Box sx={{ display: 'flex', pb: 1 }}>
                <Typography sx={{ width: 120, color: '#8B96A5' }}>Type:</Typography>
                <Typography sx={{ color: 'text.primary' }}>{activeProduct.category}</Typography>
              </Box>
              <Box sx={{ display: 'flex', pb: 1 }}>
                <Typography sx={{ width: 120, color: '#8B96A5' }}>Material: </Typography>
                <Typography sx={{ color: 'text.primary' }}>{activeProduct.description?.split(',')[0] || 'Premium material'}</Typography>
              </Box>
              <Box sx={{ display: 'flex', pb: 1, borderBottom: '1px solid', borderColor: 'divider' }}>
                <Typography sx={{ width: 120, color: '#8B96A5' }}>Design: </Typography>
                <Typography sx={{ color: 'text.primary' }}>Modern nice</Typography>
              </Box>
              <Box sx={{ display: 'flex', pb: 1 }}>
                <Typography sx={{ width: 120, color: '#8B96A5' }}>Customization:</Typography>
                <Typography sx={{ color: 'text.primary' }}>Customized logo and design custom packages</Typography>
              </Box>
              <Box sx={{ display: 'flex', pb: 1 }}>
                <Typography sx={{ width: 120, color: '#8B96A5' }}>Protection: </Typography>
                <Typography sx={{ color: 'text.primary' }}>Refund Policy</Typography>
              </Box>
              <Box sx={{ display: 'flex', pb: 1, borderBottom: '1px solid', borderColor: 'divider' }}>
                <Typography sx={{ width: 120, color: '#8B96A5' }}>Warranty: </Typography>
                <Typography sx={{ color: 'text.primary' }}>2 years full warranty </Typography>
              </Box>
            </Stack>
          </Stack>
        </Box>

        {/* Right Column: Supplier & Actions */}
        <Box sx={{ flex: 0.8, minWidth: 250, order: 3 }}>
          <Box sx={{ p: 2, borderRadius: '6px', border: '1px solid', borderColor: 'divider' }}>
            <Stack direction="row" spacing={2} sx={{ mb: 2, alignItems: "center" }}>
              <Box sx={{ width: 48, height: 48, bgcolor: '#C6F3F1', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, color: '#4CA7A7' }}>R</Box>
              <Box sx={{ textAlign: 'left' }}>
                <Typography variant="caption" sx={{ fontSize: "14px", display: 'block' }}>Supplier</Typography>
                <Typography variant="caption" sx={{ fontSize: "14px" }}>Guanjoi Trading LLC</Typography>
              </Box>
            </Stack>
            
            <Divider sx={{ mb: 2 }} />

            <Stack spacing={1.5}>
              <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
                <Box component="img" src="/images/navbar/flag.png" sx={{ width: 20 }} />
                <Typography variant="body2" color="text.secondary">Germany, Berlin</Typography>
              </Stack>
              <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
                <VerifiedUserIcon fontSize="small" color="disabled" />
                <Typography variant="body2" color="text.secondary">Verified Seller</Typography>
              </Stack>
              <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
                <LanguageIcon fontSize="small" color="disabled" />
                <Typography variant="body2" color="text.secondary">Worldwide shipping</Typography>
              </Stack>
            </Stack>

            <Stack spacing={1} sx={{ mt: 3 }}>
              <Button variant="contained" fullWidth sx={{ textTransform: 'none', boxShadow: 'none' }}>Send inquiry</Button>
              <Button variant="outlined" fullWidth sx={{ textTransform: 'none' }}>Seller&apos;s profile</Button>
            </Stack>
          </Box>

          <Button
            fullWidth
            startIcon={isSaved ? <FavoriteIcon /> : <FavoriteBorderIcon />}
            onClick={() => toggleWishlist(activeProduct)} 
            sx={{ 
              mt: 2, textTransform: 'none', color: 'primary.main', fontWeight: 600, 
              border: "1px solid", borderColor: 'divider'
            }}
          >
            {isSaved ? "Saved" : "Save for later"}
          </Button>

          <Button
            fullWidth
            startIcon={isAdded ? <ShoppingCartIcon /> : <AddShoppingCartIcon />}
            onClick={handleCartAction}
            sx={{
              mt: 1, textTransform: 'none', 
              bgcolor: isAdded ? 'transparent' : 'primary.main',
              color: isAdded ? 'primary.main' : '#fff',
              border: "1px solid",
              borderColor: 'primary.main',
              fontWeight: 600,
              '&:hover': { bgcolor: isAdded ? 'rgba(13, 110, 253, 0.04)' : 'primary.dark' }
            }}
          >
            {isAdded ? "Go to cart" : "Add to cart"}
          </Button>
        </Box>
      </Box>
    </LayoutContainer>
  );
};

export default HeroSection;
