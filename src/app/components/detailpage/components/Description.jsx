"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useTheme, Avatar, Rating, Divider } from '@mui/material';
import { useParams, useRouter } from 'next/navigation';
import {
  Box, Typography, Stack, Link, TableCell, TableBody, TableRow, TableContainer, Table
} from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import LayoutContainer from '@/src/app/components/common/LayoutContainer';
import { getProductById, getProducts } from "@/src/app/services/productService";

const Description = ({ productId }) => {
  const params = useParams();
  const id = productId || params?.id;
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('Description');
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const current = await getProductById(id);
        setProduct(current);

        const all = await getProducts();
        const otherProducts = all.filter((p) => p._id !== current._id);
        const shuffled = otherProducts.sort(() => 0.5 - Math.random());
        setRelatedProducts(shuffled.slice(0, 5));
      } catch (err) {
        console.error("Failed to fetch product for description", err);
      }
    };
    if (id) fetchProductDetails();
  }, [id]);

  if (!product) return null;

  const specs = [
    { label: 'Model', value: product.model || `#${product.id || 'N/A'}` },
    { label: 'Category', value: product.category || 'General' },
    { label: 'Brand', value: product.brand || 'Authentic Vendor' },
    { label: 'Material', value: product.material || 'Premium Quality' },
    { label: 'Availability', value: 'In Stock' },
  ];

  const features = product.features || [
    `High-quality ${product.category} for daily use`,
    `Ergonomic design with ${product.material || 'durable materials'}`,
    "Strict quality control and ISO certification",
    "Eco-friendly packaging and global shipping"
  ];

  // --- RENDER LOGIC FOR TABS ---
  const renderTabContent = () => {
    switch (activeTab) {
      case 'Description':
        return (
          <>
            <Typography variant="body1" sx={{ color: 'text.primary', mb: 3, lineHeight: 1.6 }}>
              {product.description || "Detailed information about this product is currently being updated."}
            </Typography>
            <TableContainer component={Box} sx={{ maxWidth: 450, mb: 3, border: '1px solid', borderColor: "divider", borderRadius: '4px' }}>
              <Table size="small">
                <TableBody>
                  {specs.map((row) => (
                    <TableRow key={row.label}>
                      <TableCell sx={{ bgcolor: isDark ? '#404040' : '#eff2f4', width: 150, fontWeight: 500, color: 'text.secondary' }}>{row.label}</TableCell>
                      <TableCell sx={{ color: 'text.secondary' }}>{row.value}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <Stack spacing={1}>
              {features.map((text, i) => (
                <Stack key={i} direction="row" spacing={1} alignItems="center">
                  <CheckIcon sx={{ fontSize: 18, color: '#8B96A5' }} />
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>{text}</Typography>
                </Stack>
              ))}
            </Stack>
          </>
        );

      case 'Reviews':
        return (
          <Stack spacing={3}>
            {[1, 2].map((review) => (
              <Box key={review}>
                <Stack direction="row" spacing={2} alignItems="center" mb={1}>
                  <Avatar sx={{ width: 40, height: 40, bgcolor: 'primary.light' }}>U</Avatar>
                  <Box>
                    <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>Verified Customer</Typography>
                    <Rating value={product.rating || 5} size="small" readOnly />
                  </Box>
                </Stack>
                <Typography variant="body2" sx={{ color: '#505050', mb: 1 }}>
                  The quality of this {product.category} is outstanding. Exactly as described in the specifications.
                </Typography>
                <Divider />
              </Box>
            ))}
          </Stack>
        );

      case 'Shipping':
        return (
          <Box>
            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>Logistic Information</Typography>
            <Typography variant="body2" sx={{ color: '#505050', mb: 2 }}>
              We ship this product worldwide. All items are inspected for quality before dispatch.
            </Typography>
            <Stack spacing={1}>
              <Typography variant="body2"><b>Courier:</b> FedEx, DHL, UPS</Typography>
              <Typography variant="body2"><b>Delivery:</b> 5-10 business days</Typography>
              <Typography variant="body2"><b>Location:</b> Global Shipping Centers</Typography>
            </Stack>
          </Box>
        );

      case 'About seller':
        return (
          <Stack direction="row" spacing={3} alignItems="flex-start">
            <Box sx={{ width: 60, height: 60, bgcolor: '#eff2f4', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#8B96A5' }}>S</Typography>
            </Box>
            <Box>
              <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>{product.brand || 'Authentic Vendor Ltd.'}</Typography>
              <Typography variant="body2" sx={{ color: '#8B96A5', mb: 1 }}>Verified Supplier | 5 years experience</Typography>
              <Typography variant="body2" sx={{ color: '#505050' }}>
                Specialized in high-quality {product.category} products with international standards.
              </Typography>
            </Box>
          </Stack>
        );

      default:
        return null;
    }
  };

  return (
    <LayoutContainer>
      <Stack
        direction="row"
        spacing={2}
        
        alignItems="stretch"
        sx={{ mt: 3, mb: 5 ,justifyContent:"space-between"}}
      >
        {/* Main Content (Left) */}
        <Stack sx={{ flex: 3 }}>
          <Box sx={{ 
            height: '100%', 
            minHeight: '400px', // Ensures size stays consistent
            border: '1px solid', 
            borderColor: 'divider', 
            borderRadius: '6px', 
            overflow: 'hidden', 
            bgcolor: 'background.paper' 
          }}>
            <Box sx={{ borderBottom: '1px solid', borderColor: 'divider', px: 3 }}>
              <Stack direction="row" spacing={3}>
                {['Description', 'Reviews', 'Shipping', 'About seller'].map((tab) => (
                  <Link
                    key={tab}
                    component="button"
                    onClick={() => setActiveTab(tab)}
                    underline="none"
                    sx={{
                      py: 2,
                      fontSize: {xs:'9px',sm:'16px',md:"16px",lg:"16px"},
                      fontWeight: 500,
                      color: activeTab === tab ? 'primary.main' : '#8B96A5',
                      borderBottom: activeTab === tab ? '2px solid' : 'none',
                      borderColor: 'primary.main',
                    }}
                  >
                    {tab}
                  </Link>
                ))}
              </Stack>
            </Box>

            <Box sx={{ p: 3 }}>
               {renderTabContent()}
            </Box>
          </Box>
        </Stack>

        {/* Sidebar (Right) remains exactly the same */}
        <Stack sx={{ flex: 1, minWidth: 280, display: { xs: 'none', md: 'flex' } }}>
          <Box sx={{
            height: '100%', 
            bgcolor: 'background.paper',
            borderRadius: '6px',
            border: '1px solid',
            borderColor: 'divider',
            p: 2,
          }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2, color: 'text.primary' }}>
              You may like
            </Typography>
            
            <Stack spacing={2}>
              {relatedProducts.map((item) => (
                <Stack 
                  key={item._id} 
                  direction="row" 
                  spacing={2} 
                  alignItems="center"
                  onClick={() => router.push(`/detail/${item._id}`)}
                  sx={{ cursor: 'pointer', '&:hover': { opacity: 0.7 } }}
                >
                  <Box sx={{ 
                    width: 80, height: 80, borderRadius: '6px', p: 1,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                  }}>
                    <Image src={item.image || item.img || "/images/sample.jpg"} width={60} height={60} style={{ objectFit: 'contain' }} alt={item.title} />
                  </Box>
                  <Box>
                    <Typography sx={{ fontSize: "14px", fontWeight: 400, color: 'text.primary', lineHeight: 1.3, mb: 0.5 }}>
                      {item.title}
                    </Typography>
                    <Typography sx={{ color: 'text.secondary', fontSize: "14px" }}>
                      ${item.price}
                    </Typography>
                  </Box>
                </Stack>
              ))}
            </Stack>
          </Box>
        </Stack>
      </Stack>
    </LayoutContainer>
  );
};

export default Description;
