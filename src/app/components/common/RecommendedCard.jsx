"use client"
import Image from 'next/image';
import React from 'react';
import { Paper, Box, Typography, useTheme } from '@mui/material';
import { motion } from 'framer-motion';

const MotionPaper = motion(Paper);

const RecommendedCard = ({ img, price, description }) => {
  const theme = useTheme();

  return (
    <MotionPaper
      initial={{ opacity: 0, scale: 0.9, y: 30 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: false, amount: 0.2 }} 
      transition={{ 
        duration: 0.2, 
        ease: [0.215, 0.61, 0.355, 1]
      }}
      whileHover={{ y: -8, transition: { duration: 0.2 } }}
      
      variant="outlined"
      sx={{
        p: { xs: 1.5, md: 2 },
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: '6px',
        bgcolor: 'background.paper',
        transition: '0.3s',
        cursor: 'pointer',
        border: 'none',
        '&:hover': {
          boxShadow: theme.shadows[4],
          borderColor: '#8a8888'
        }
      }}
    >
      <Box
        sx={{
          width: '100%',
          height: { xs: 140, md: 180 },
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          mb: { xs: 1, md: 2 },
          position:'relative'
        }}
      >
        <Box
          component={motion.img}
          whileHover={{ scale: 1.1 }}
          src={img}
          sx={{
            maxHeight: '100%',
            maxWidth: '100%',
            objectFit: 'contain'
          }}
        />
        <Image
            src={img?.src || img} 
            alt={description}
            fill
            sizes="(max-width: 768px) 140px, 180px"
            style={{ objectFit: 'contain' }}
          />
      </Box>

      <Typography
        variant="subtitle1"
        sx={{
          fontWeight: 600,
          color: 'text.primary',
          textAlign: "left",
          fontSize: { xs: '14px', md: '16px' }
        }}
      >
        ${price}
      </Typography>

      <Typography
        variant="body2"
        sx={{
          color: '#8B96A5',
          mt: 0.5,
          lineHeight: 1.3,
          textAlign: "left",
          fontSize: { xs: '12px', md: '14px' },
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden'
        }}
      >
        {description}
      </Typography>
    </MotionPaper>
  );
};

export default RecommendedCard;
