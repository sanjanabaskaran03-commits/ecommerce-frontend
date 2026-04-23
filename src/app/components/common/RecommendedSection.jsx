"use client";

import React from "react";
import { Box, Typography } from "@mui/material";
import RecommendedCard from "./RecommendedCard";

const RecommendedSection = ({ title, items }) => {
  return (
    <Box sx={{ width: "100%", my: { xs: 2, md: 4 }, px: { xs: 1, md: 0 } }}>
      
      <Typography
        variant="h5"
        sx={{
          fontWeight: 700,
          mb: { xs: 2, md: 3 },
          color: "text.primary",
          textAlign: "left",
          fontSize: { xs: "18px", md: "24px" },
        }}
      >
        {title}
      </Typography>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "repeat(2, 1fr)",
            sm: "repeat(3, 1fr)",
            md: "repeat(4, 1fr)",
            lg: "repeat(5, 1fr)",
          },
          gap: { xs: 1, md: 2 },
          width: "100%",
        }}
      >
        {items.map((item, index) => (
          <RecommendedCard key={item.id || index} {...item} />
        ))}
      </Box>
    </Box>
  );
};

export default RecommendedSection;