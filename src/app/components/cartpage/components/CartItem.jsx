"use client"
import React, { useMemo } from 'react';
import { Box, Typography, Button, Divider, MenuItem, Select, Stack, IconButton } from '@mui/material';
import { useCart } from '@/src/app/context/CartContext';
import Image from 'next/image';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import LayoutContainer from '@/src/app/components/common/LayoutContainer';
import { useTheme } from '@mui/material/styles';
import { useWishlist } from '@/src/app/context/WishlistContext';

const CartItem = () => {
  const { cartItems, removeFromCart, updateQuantity } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const theme = useTheme();

  // 1. Memoized Calculations: Recalculates whenever cartItems changes
  const subtotal = useMemo(() => {
    return cartItems.reduce((acc, item) => {
      const price = Number(item.price) || 0;
      const qty = Number(item.qty) || 1;
      return acc + (price * qty);
    }, 0);
  }, [cartItems]);
  

  const discount = subtotal > 0 ? 60.00 : 0;
  const tax = subtotal > 0 ? (subtotal * 0.05) : 0; // Calculated as 5% for realism
  const total = Math.max(0, subtotal - discount + tax);

  return (
    <LayoutContainer>
      <Typography variant="h5" sx={{ mb: 2, fontWeight: 700, textAlign: "left", mt: 4 }}>
        My cart ({cartItems.length})
      </Typography>

      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3 }}>
        {/* Left Side: Items List */}
        <Box sx={{ flexGrow: 1 }}>
          <Box sx={{ 
            bgcolor: 'background.paper', 
            p: { xs: 2, md: 3 }, 
            borderRadius: '8px', 
            border: { xs: 'none', md: `1px solid ${theme.palette.divider}` } 
          }}>

            {cartItems.length === 0 ? (
              <Typography sx={{ textAlign: 'center', py: 5 }}>Your cart is empty.</Typography>
            ) : (
              cartItems.map((item, index) => {
                const isSaved = isInWishlist(item.id);
                const itemTotal = (Number(item.price) * (item.qty || 1)).toFixed(2);

                return (
                  <Box key={`cart-item-${item.id}`} sx={{ mb: 3 }}>
                    <Box sx={{ display: 'flex', gap: 2 }}>
                      {/* Product Image */}
                      <Box sx={{
                        width: { xs: 70, md: 80 },
                        height: { xs: 70, md: 80 },
                        position: 'relative',
                        border: '1px solid #E3E8EE',
                        borderRadius: '6px',
                        bgcolor: '#fff',
                        overflow: 'hidden',
                        flexShrink: 0
                      }}>
                        <Image
                          src={item.img}
                          alt={item.title}
                          fill
                          style={{ objectFit: 'contain', padding: '5px' }}
                        />
                      </Box>

                      {/* Item Details */}
                      <Box sx={{ flexGrow: 1 }}>
                        <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                          <Box>
                            <Typography variant="subtitle1" sx={{ fontWeight: 600, textAlign: "left" }}>
                              {item.title}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" textAlign="left">
                              Seller: {item.seller || 'Artel Market'}
                            </Typography>

                            <Stack direction="row" spacing={1} sx={{ mt: 1, display: { xs: 'none', md: 'flex' } }}>
                              <Button
                                size="small"
                                sx={{ color: '#FF4D4C', textTransform: 'none', border: '1px solid #E3E8EE', '&:focus': { outline: 'none' } }}
                                onClick={() => removeFromCart(item.id)}
                              >
                                Remove
                              </Button>
                              
                              <Button
                                size="small"
                                sx={{
                                  color: isSaved ? '#00B517' : '#0D6EFD',
                                  textTransform: 'none',
                                  border: '1px solid #E3E8EE',
                                  fontWeight: isSaved ? 700 : 500,
                                  '&:focus': { outline: 'none' }
                                }}
                                onClick={() => toggleWishlist(item)}
                              >
                                {isSaved ? "Saved" : "Save for later"}
                              </Button>
                            </Stack>
                          </Box>

                          {/* Desktop Price & Qty Selection */}
                          <Box sx={{ textAlign: 'right', minWidth: '100px', display: { xs: 'none', md: 'block' } }}>
                            <Typography sx={{ fontWeight: 700, mb: 1 }}>
                               ${itemTotal}
                            </Typography>
                            <Select
                              value={item.qty || 1}
                              size="small"
                              sx={{ height: 35, minWidth: 100 }}
                              onChange={(e) => updateQuantity(item.id, Number(e.target.value))}
                            >
                              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                                <MenuItem key={num} value={num}>Qty: {num}</MenuItem>
                              ))}
                            </Select>
                          </Box>
                        </Stack>
                      </Box>
                    </Box>

                    {/* Mobile View Controls */}
                    <Box sx={{ display: { xs: 'flex', md: 'none' }, justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
                      <Stack direction="row" alignItems="center" sx={{ border: '1px solid #E3E8EE', borderRadius: '4px' }}>
                        <Button
                          onClick={() => updateQuantity(item.id, Math.max(1, (item.qty || 1) - 1))}
                          sx={{ minWidth: 40, color: 'text.primary', borderRight: '1px solid #E3E8EE', borderRadius: 0 }}
                        >—</Button>
                        <Typography sx={{ px: 2, fontWeight: 600 }}>{item.qty || 1}</Typography>
                        <Button
                          onClick={() => updateQuantity(item.id, (item.qty || 1) + 1)}
                          sx={{ minWidth: 40, color: 'text.primary', borderLeft: '1px solid #E3E8EE', borderRadius: 0 }}
                        >+</Button>
                      </Stack>

                      <Typography sx={{ fontWeight: 700 }}>
                        ${itemTotal}
                      </Typography>
                    </Box>

                    {index !== cartItems.length - 1 && <Divider sx={{ mt: 2 }} />}
                  </Box>
                );
              })
            )}
          </Box>
        </Box>

        {/* Right Side: Order Summary */}
        <Box sx={{ width: { xs: '100%', md: '300px' } }}>
          <Box sx={{ p: 2, bgcolor: 'background.paper', borderRadius: '8px', border: `1px solid ${theme.palette.divider}` }}>
            <Stack spacing={1.5}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography color="text.secondary">Subtotal:</Typography>
                <Typography sx={{ fontWeight: 600 }}>${subtotal.toFixed(2)}</Typography>
              </Box>

              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography color="text.secondary">Discount:</Typography>
                <Typography sx={{ color: '#FF4D4C' }}>- ${discount.toFixed(2)}</Typography>
              </Box>

              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography color="text.secondary">Tax:</Typography>
                <Typography sx={{ color: '#00B517' }}>+ ${tax.toFixed(2)}</Typography>
              </Box>

              <Divider />

              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography sx={{ fontWeight: 700, fontSize: '1.1rem' }}>Total:</Typography>
                <Typography sx={{ fontWeight: 700, fontSize: '1.2rem', color: theme.palette.primary.main }}>
                  ${total.toFixed(2)}
                </Typography>
              </Box>

              <Button
                variant="contained"
                fullWidth
                sx={{ 
                  bgcolor: '#00B517', 
                  mt: 2, 
                  py: 1.5, 
                  fontWeight: 600,
                  textTransform: 'none',
                  '&:hover': { bgcolor: '#009a13' } 
                }}
              >
                Checkout
              </Button>
            </Stack>
          </Box>
        </Box>
      </Box>
    </LayoutContainer>
  );
};

export default CartItem;