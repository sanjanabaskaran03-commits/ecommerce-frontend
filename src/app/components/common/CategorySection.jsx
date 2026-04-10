"use client";
import React from 'react';
import { Box, Typography, Button, Paper, useTheme } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CategoryCard from './CategoryCard';

const CategorySection = ({ title, bannerImg, items }) => {
  const theme = useTheme();

  return (
    <Box sx={{ width: '100%', mb: 3, mt: 3 }}>
      {/* MOBILE TITLE: Shows only on xs and sm */}
      <Typography
        variant="h6"
        sx={{
          display: { xs: 'block', md: 'none' ,lg:'none'},
          fontWeight: 600,
          mb: 1.5,
          textAlign: "left",
          px: 1
        }}
      >
        {title}
      </Typography>

      <Paper 
        variant="outlined" 
        sx={{ 
          width: '100%', 
          display: 'flex', 
          flexDirection: { xs: 'column',sm:'column', md: 'row',lg:'row' }, 
          borderRadius: '8px', 
          overflow: 'hidden',
          border: { xs: 'none',sm:'none', md: `1px solid ${theme.palette.divider}`,lg: `1px solid ${theme.palette.divider}` } 
        }}
      >
        {/* BANNER SECTION: Only visible on md and lg */}
        <Box sx={{
         width: { xs: '100%', md: '280px' },
  minWidth: { xs: '100%', md: '280px' },
          backgroundImage: `url(${bannerImg?.src || bannerImg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          p: 3,
          display: { xs: 'none',sm:'none', md: 'flex',lg:'flex' }, 
          flexDirection: 'column'
        }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2, maxWidth: '160px', textAlign: "left", color: '#000' }}>
            {title}
          </Typography>
          <Button variant="contained" sx={{ bgcolor: '#fff', color: '#000', width: 'fit-content', textTransform: 'none' }}>
            Source now
          </Button>
        </Box>

        {/* ITEMS SECTION: Horizontal Scroll on xs/sm, Grid on md/lg */}
        <Box sx={{
          flex: 1,
          display: { xs: 'flex', md: 'grid' },
          overflowX: { xs: 'auto', md: 'unset' },
          gridTemplateColumns: 'repeat(4, 1fr)',
          gridTemplateRows: 'repeat(2, 1fr)',
          '&::-webkit-scrollbar': { display: 'none' },
          msOverflowStyle: 'none',
          scrollbarWidth: 'none',
        }}>
          {items.map((item, index) => (
            <Box 
              key={index} 
              sx={{ 
                minWidth: { xs: '150px', md: 'auto' ,lg:'auto'}, 
                border: { xs: `1px solid ${theme.palette.divider}`, sm: `1px solid ${theme.palette.divider}`,md: 'none',lg:'none' },
                borderRadius: { xs: '8px',sm:'8px', md: 0 ,lg:0},
                mr: { xs: 1,sm:1, md: 0 ,lg:0}
              }}
            >
              <CategoryCard 
                title={item.title} 
                price={item.price} 
                img={item.img?.src || item.img}  
              />
            </Box>
          ))}
        </Box>

        {/* MOBILE SOURCE NOW: Appears at bottom only for xs/sm */}
        <Box sx={{ display: { xs: 'block', md: 'none' }, mt: 1, px: 1 }}>
          <Button 
            endIcon={<ArrowForwardIcon />}
            sx={{ 
              textTransform: 'none', 
              color: '#0D6EFD', 
              fontWeight: 600,
              p: 0,
              '&:hover': { bgcolor: 'transparent' }
            }}
          >
            Source now
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default CategorySection;