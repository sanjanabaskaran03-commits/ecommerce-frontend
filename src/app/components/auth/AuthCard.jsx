"use client";
import { Box, Typography, useTheme } from "@mui/material";
import { ShoppingBag } from "@mui/icons-material";

export default function AuthCard({ children }) {
  const theme = useTheme();

  return (

    <Box
      sx={{
        display: "flex",
        width: { xs: "95%", md: 800 },
        minHeight: { md: 500 },
        mx: "auto",
        mt: { xs: 1, md: 1 },
        borderRadius: 3,
        overflow: "hidden",
        boxShadow: 4,
        bgcolor: "background.paper",
      }}
    >
      {/* LEFT SIDE */}
      <Box
        sx={{
          flex: 1,
          display: { xs: "none", md: "flex" },
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          color: "#fff",
          p: 4,
          background: "linear-gradient(135deg, #0D6EFD, #00B517)",
        }}
      >
        <Box
          sx={{
            bgcolor: "#fff",
            borderRadius: "8px",
            p: 1,
            mb: 2,
          }}
        >
          <ShoppingBag sx={{ color: "#0D6EFD", fontSize: "2rem" }} />
        </Box>

        <Typography variant="h5" fontWeight={700}>
          Welcome to
        </Typography>
        <Typography
          variant="h3"
          fontSize={34}
          fontWeight={700}
          sx={{
            color: '#8CB7F5',
            lineHeight: 1.2,
          }}
        >
          Brand App
        </Typography>

        <Typography variant="body2" sx={{ mt: 1, textAlign: "center" }}>
          Shop smarter with best deals on electronics & more
        </Typography>
      </Box>

      <Box
        sx={{
          flex: 1,
          p: { xs: 3, md: 5 },
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box sx={{ width: "100%", maxWidth: 320, textAlign: "center" }}>
          {children}
        </Box>
      </Box>
    </Box>
  );
}