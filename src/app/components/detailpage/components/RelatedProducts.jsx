"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Box,
  Typography,
  Stack,
  useTheme,
  CircularProgress
} from '@mui/material';
import LayoutContainer from '@/src/app/components/common/LayoutContainer';

const RelatedProducts = () => {
  const theme = useTheme();
  const borderColor = theme.palette.divider;

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

  if (!products.length) return null;

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
        <Typography
          variant="h6"
          sx={{ fontWeight: 600, mb: 3, color: 'text.primary' }}
        >
          Related products
        </Typography>

        <Stack
          direction="row"
          spacing={2}
          sx={{
            flexWrap: "nowrap",
            overflowX: 'auto',
            pb: 2,
            '&::-webkit-scrollbar': { height: '4px' },
            '&::-webkit-scrollbar-thumb': {
              bgcolor: 'divider',
              borderRadius: '10px'
            }
          }}
        >
          {products.map((item) => (
            <Link
              key={item._id}
              href={`/detail/${item._id}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <Stack
                direction="column"
                sx={{
                  minWidth: { xs: '140px', md: '120px' },
                  maxWidth: { md: '180px' },
                  cursor: 'pointer',
                  alignItems: "flex-start",
                  transition: '0.2s',
                  '&:hover': { transform: 'scale(1.03)' }
                }}
              >
                {/* Image Box */}
                <Box
                  sx={{
                    position: 'relative',
                    width: '100%',
                    height: { xs: 140, md: 160 },
                    borderRadius: '6px',
                    border: '1px solid',
                    borderColor: borderColor,
                    p: 1,
                    bgcolor: '#fff',
                    overflow: 'hidden'
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

                {/* Title */}
                <Typography
                  sx={{
                    fontSize: "14px",
                    fontWeight: 400,
                    mt: 1.5,
                    color: 'text.primary',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden'
                  }}
                >
                  {item.title}
                </Typography>

                {/* Price */}
                <Typography
                  sx={{
                    fontSize: "14px",
                    color: '#8B96A5',
                    mt: 0.5
                  }}
                >
                  ${item.price}
                </Typography>
              </Stack>
            </Link>
          ))}
        </Stack>
      </Box>
    </LayoutContainer>
  );
};

export default RelatedProducts;