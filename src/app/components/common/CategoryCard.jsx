
import React from 'react';
import { Box, Typography, Stack, useTheme } from '@mui/material';
import { motion } from 'framer-motion';
import Image from 'next/image';

const MotionBox = motion.create(Box);

const CategoryCard = ({ title, price, img }) => {
  const theme = useTheme();

  return (
    <MotionBox
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false,amount: 0.2 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      whileHover={{ scale: 1.01 }}
      
      sx={{
        p: 2,
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row', lg: 'row' }, 
        justifyContent: { xs: 'center', md: 'space-between', lg: 'space-between' },
        alignItems: { xs: 'center', md: 'flex-start' , lg: 'flex-start' },
        height: '100%',
        minHeight: '127px',
        borderRight: { 
          xs: `1px solid ${theme.palette.divider}`,
          md: `1px solid ${theme.palette.divider}`  
        },
        borderBottom: { 
          xs: `1px solid ${theme.palette.divider}`, 
          md: `1px solid ${theme.palette.divider}` 
        },
        '&:nth-of-type(4n)': {
      borderRight: { xs:'none',lg:'none',md: 'none' }
    },
    '&:nth-of-type(n+5)': {
      borderBottom: { md: 'none' }
    },
        transition: '0.3s',
        cursor: 'pointer',
        '&:hover': {
          bgcolor: 'action.hover',
        },
      }}
    >
      <Box
        component={motion.div}
        whileHover={{ scale: 1.1, rotate: 2 }}
        transition={{ type: "spring", stiffness: 300 }}
        sx={{
          width: { xs: '70px', md: '80px' },
          height: { xs: '70px', md: '80px' },
          alignSelf: { xs: 'center', md: 'flex-end' },
          order: { xs: 1, md: 2 },
          mb: { xs: 1, md: 0 },
          position: 'relative',
        }}
      >
        <Image
          src={img?.src || img}
          alt={title}
          fill
          sizes="80px"
          style={{ objectFit: 'contain' }}
        />
      </Box>

      <Stack 
        spacing={0.5} 
        sx={{ 
          textAlign: { xs: 'center', md: 'left' },
          order: { xs: 2, md: 1 } 
        }}
      >
        <Typography 
          variant="body1" 
          sx={{ fontWeight: 500, color: 'text.primary', fontSize: {xs:'14px', sm:'14px', md:'10px', lg:'14px'} }}
        >
          {title}
        </Typography>
        <Typography 
          variant="caption" 
          sx={{ color: "#8B96A5", fontSize: '12px',width:{ xs: '100%',sm:'100%', md: '50px',lg:'50px'} }}
        >
          From USD {price}
        </Typography>
      </Stack>
    </MotionBox>
  );
};

export default CategoryCard;
