"use client";

import React from "react";
import { Paper, Box, Typography, useTheme } from "@mui/material";
import { motion } from "framer-motion";

const MotionPaper = motion.create(Paper);

const RecommendedCard = ({ img, price, title }) => {
  const theme = useTheme();

  return (
    <MotionPaper
      initial={{ opacity: 0, scale: 0.9, y: 30 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: false, amount: 0.2 }}
      transition={{
        duration: 0.2,
        ease: [0.215, 0.61, 0.355, 1],
      }}
      whileHover={{ y: -8 }}
      variant="outlined"
      sx={{
        p: { xs: 1.5, md: 2 },
        height: "100%",
        display: "flex",
        flexDirection: "column",
        borderRadius: "6px",
        bgcolor: "background.paper",
        cursor: "pointer",
        border: "none",
        "&:hover": {
          boxShadow: theme.shadows[4],
        },
      }}
    >
      {/* ✅ IMAGE (ONLY ONE, BASE64 SAFE) */}
      <Box
        sx={{
          width: "100%",
          height: { xs: 140, md: 180 },
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          mb: 1,
        }}
      >
        {img ? (
          <motion.img
            src={img}
            alt={title}
            whileHover={{ scale: 1.1 }}
            style={{
              maxHeight: "100%",
              maxWidth: "100%",
              objectFit: "contain",
            }}
          />
        ) : (
          <Box>No Image</Box>
        )}
      </Box>

      {/* ✅ PRICE */}
      <Typography
        sx={{
          fontWeight: 600,
          fontSize: { xs: "14px", md: "16px" },
        }}
      >
        ${price}
      </Typography>

      {/* ✅ PRODUCT NAME BELOW PRICE */}
      <Typography
        sx={{
          color: "#8B96A5",
          mt: 0.5,
          fontSize: { xs: "12px", md: "14px" },
          display: "-webkit-box",
          WebkitLineClamp: 2,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
        }}
      >
        {title}
      </Typography>
    </MotionPaper>
  );
};

export default RecommendedCard;