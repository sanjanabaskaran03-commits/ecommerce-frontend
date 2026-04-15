"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from "next/navigation"; 
import {
  Box, Typography, Stack, useTheme, CircularProgress
} from '@mui/material';
import LayoutContainer from '@/src/app/components/common/LayoutContainer';

const RelatedProducts = () => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const borderColor = theme.palette.divider;
  const router = useRouter();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRelated = async () => {
      try {
        setLoading(true);
        const res = await fetch('/api/products');
        const data = await res.json();

        if (Array.isArray(data)) {
          const randomProducts = data
            .sort(() => 0.5 - Math.random())
            .slice(0, 6);
          setProducts(randomProducts);
        }
      } catch (error) {
        console.error("Error fetching related products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchRelated();
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 5 }}>
        <CircularProgress size={24} />
      </Box>
    );
  }

  if (products.length === 0) return null;

  return (
    <LayoutContainer>
      <Box
        sx={{
          p: 3,
          borderRadius: '6px',
          bgcolor: 'background.paper',
          border: '1px solid',
          borderColor: borderColor,
          mt: 3
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 600, mb: 3, color: 'text.primary', textAlign: 'left' }}>
          Related products
        </Typography>

        <Stack 
          direction="row" 
          spacing={2}
          sx={{ 
            justifyContent: { md: 'space-between' },
            flexWrap: "nowrap",
            overflowX: 'auto', 
            pb: { xs: 2, md: 0 }, 
            // FIXED: Scrollbar is completely hidden on desktop/md+
            '&::-webkit-scrollbar': { 
              height: '4px',
              display: { xs: 'block', md: 'none' } 
            },
            '&::-webkit-scrollbar-thumb': { 
              bgcolor: 'divider', 
              borderRadius: '10px' 
            },
            // FIXED: Hover effect only shows scrollbar on mobile/xs
            '&:hover::-webkit-scrollbar': {
              display: { xs: 'block', md: 'none' }
            }
          }}
        >
          {products.map((item) => (
            <Stack 
              key={item._id} 
              direction="column" 
              onClick={() => router.push(`/detail/${item._id}`)}
              sx={{ 
                flex: { xs: '0 0 auto', md: '1 1 auto' }, 
                minWidth: { xs: '140px', md: '120px' },
                maxWidth: { md: '180px' }, 
                cursor: 'pointer',
                alignItems: "flex-start",
              }}
            >
              <Box 
                sx={{
                  position:'relative',
                  width: '100%', 
                  height: { xs: 140, md: 160 },
                  borderRadius: '4px',
                  border: '1px solid',
                  borderColor: borderColor,
                  p: 1,
                  bgcolor: '#fff', 
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'scale(1.02)'
                  }
                }}
              >
                <Image
                  src={item.img}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 140px, 180px"
                  style={{ objectFit: 'contain', padding: '8px' }}
                />
              </Box>
              <Box sx={{ width: '100%' }}>
                <Typography 
                  sx={{ 
                    color: 'text.primary', 
                    fontWeight: 400, 
                    lineHeight: 1.2, 
                    fontSize: "14px", 
                    textAlign: 'left', 
                    mt: 1.5,
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'normal'
                  }}
                >
                  {item.title}
                </Typography>
                <Typography sx={{ color: '#8B96A5', mt: 0.5, textAlign: "left", fontSize: "14px" }}>
                  ${item.price}
                </Typography>
              </Box>
            </Stack>
          ))}
        </Stack>
      </Box>
    </LayoutContainer>
  );
};

export default RelatedProducts;
