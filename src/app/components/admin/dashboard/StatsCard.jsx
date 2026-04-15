"use client";

import { Box, Typography } from "@mui/material";

export default function StatsCard({ title, value }) {
  return (
    <Box
      sx={{
        p: 3,
        borderRadius: 3,
        bgcolor: "background.paper",
        boxShadow: 2,
      }}
    >
      <Typography variant="body2" color="text.secondary">
        {title}
      </Typography>

      <Typography variant="h5" fontWeight={700}>
        {value}
      </Typography>
    </Box>
  );
}