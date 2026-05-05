"use client";

import React, { useState, useEffect } from 'react';
import { Breadcrumbs, Link, Box, Typography, CircularProgress } from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { useTheme } from '@mui/material/styles';
import { usePathname, useSearchParams, useParams } from 'next/navigation';
import LayoutContainer from '@/src/app/components/common/LayoutContainer';

const API_BASE = "";

const BreadcrumbSection = () => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const params = useParams(); 

  const [currentProduct, setCurrentProduct] = useState(null);
  const [loading, setLoading] = useState(false);

  // Get category from search bar (list page) or product data (detail page)
  const categoryQuery = searchParams.get('category');
  const productId = params?.id; 

  useEffect(() => {
    const fetchBreadcrumbData = async () => {
      // Check if we are currently on the detail page
      if (pathname.startsWith('/detail')) {
        try {
          setLoading(true);
          if (productId) {
            const res = await fetch(`${API_BASE}/api/products/${productId}`);
            if (res.ok) {
              const data = await res.json();
              setCurrentProduct(data);
              return;
            }
          }

          // Fallback: use first product when no ID or failed fetch
          const listRes = await fetch(`${API_BASE}/api/products`);
          if (listRes.ok) {
            const listData = await listRes.json();
            const fallbackProduct =
              (productId && listData.find((item) => item._id === productId)) ||
              listData[0] ||
              null;
            setCurrentProduct(fallbackProduct);
          }
        } catch (error) {
          console.error("Breadcrumb fetch error:", error);
        } finally {
          setLoading(false);
        }
      } else {
        // Clear product state when on Shop or Home pages
        setCurrentProduct(null);
      }
    };

    fetchBreadcrumbData();
  }, [productId, pathname]); // Re-run when ID or Path changes

  const formatText = (text) => {
    if (!text) return "";
    return text
      .replace(/-/g, ' ')
      .replace(/\b\w/g, (char) => char.toUpperCase());
  };

  return (
    <LayoutContainer>
      <Box 
        sx={{ 
          py: { xs: 1.5, md: 2 },
          overflowX: 'auto',
          whiteSpace: 'nowrap',
          '&::-webkit-scrollbar': { display: 'none' },
        }}
      >
        <Breadcrumbs 
          separator={<NavigateNextIcon sx={{ fontSize: { xs: '16px', md: '20px' }, color: "#8B96A5" }} />} 
          aria-label="breadcrumb"
          sx={{ 
            '& .MuiBreadcrumbs-li': { 
              fontSize: { xs: '13px', md: '14px' }, 
              color: isDark ? '#fff' : '#8B96A5' 
            } 
          }}
        >
          {/* 1. Home Link */}
          <Link underline="hover" color="inherit" href="/">
            Home
          </Link>

          {/* 2. Shop Link (visible on shop and detail pages) */}
          {(pathname.includes('/shop') || pathname.startsWith('/detail')) && (
            <Link underline="hover" color="inherit" href="/shop">
              Shop
            </Link>
          )}

          {/* 3. Category Link (Fallback to currentProduct.category if URL param is missing) */}
          {(categoryQuery || (currentProduct && currentProduct.category)) && (
            <Link 
              underline="hover" 
              color="inherit" 
              href={`/shop?category=${(categoryQuery || currentProduct?.category).toLowerCase().replace(/\s+/g, '-')}`}
            >
              {formatText(categoryQuery || currentProduct?.category)}
            </Link>
          )}

          {/* 4. Product Title (Only visible on Detail page) */}
          {pathname.startsWith('/detail') && currentProduct && (
            <Typography 
              sx={{   
                fontSize: { xs: '13px', md: '14px' },
                color: 'inherit',
              }}
            >
              {currentProduct.title}
            </Typography>
          )}

          {loading && <CircularProgress size={14} sx={{ ml: 1, verticalAlign: 'middle' }} />}
        </Breadcrumbs>
      </Box>
    </LayoutContainer>
  );
};

export default BreadcrumbSection;
