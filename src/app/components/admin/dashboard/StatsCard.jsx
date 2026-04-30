"use client";

import { Box, Typography, useTheme } from "@mui/material";

export default function StatsCard({ title, value }) {
  const theme = useTheme()
  return (
    <Box
      sx={{
        p: 3,
        borderRadius: 3,
        bgcolor: "background.paper",
        border: "1px solid",
        borderColor: "divider",
        boxShadow: 1,
        transition: "0.3s",
        "&:hover": {
          boxShadow: 4,
          transform: "translateY(-3px)",
        },
      }}
    >
      <Typography variant="body2" style={{ color: theme.palette.text.primary }}>
        {title}
      </Typography>

      <Typography variant="h4" sx={{ mt: 1, fontWeight: 700 }} style={{ color: theme.palette.text.secondary }}>
        {value}
      </Typography>
    </Box>
  );
}