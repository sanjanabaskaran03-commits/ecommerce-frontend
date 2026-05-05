"use client";
import React from "react";
import {
  Box,
  Typography,
  useTheme,
  Button,
  Divider,
} from "@mui/material";
import { useWishlist } from "@/src/app/context/WishlistContext";
import { useCart } from "@/src/app/context/CartContext";
import Image from "next/image";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LayoutContainer from "@/src/app/components/common/LayoutContainer";

const SavedForLater = () => {
  const theme = useTheme();
  const { wishlist, toggleWishlist } = useWishlist();
  const { addToCart } = useCart();

  const savedItems = wishlist
    .map((w) => w?.productId)
    .filter(Boolean);

  if (!Array.isArray(savedItems) || savedItems.length === 0) return null;

  return (
    <LayoutContainer>
      <Box
        sx={{
          p: { xs: 2, sm: 3 },
          borderRadius: "6px",
          bgcolor: "background.paper",
          border: { xs: "none", md: `1px solid ${theme.palette.divider}` },
          mt: 5,
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 600, mb: 1.5,color:"text.primary" }}>
          Saved for later ({savedItems.length})
        </Typography>

        <Divider sx={{ mb: 2 }} />

        {/* 🔥 SINGLE ROW CAROUSEL */}
        <Box
          sx={{
            display: "flex",
            flexWrap: "nowrap", // ✅ FORCE SAME ROW
            overflowX: savedItems.length > 4 ? "auto" : "hidden",
            gap: 2,
            width: "100%",

            "&::-webkit-scrollbar": { display: "none" },
          }}
        >
          {savedItems.map((item) => (
            <Box
              key={item?._id || item?.id}
              sx={{
                minWidth: 240,      // ✅ fixed width
                flexShrink: 0,      // ✅ prevent shrinking
              }}
            >
              <ProductCard
                item={item}
                theme={theme}
                addToCart={addToCart}
                toggleWishlist={toggleWishlist}
              />
            </Box>
          ))}
        </Box>
      </Box>
    </LayoutContainer>
  );
};

/* PRODUCT CARD */
const ProductCard = ({ item, theme, addToCart, toggleWishlist }) => {
  return (
    <Box
      sx={{
        border: "1px solid",
        borderColor: theme.palette.divider,
        borderRadius: "4px",
        p: 1.5,
        // bgcolor: "#fff",
      }}
    >
      <Box
        sx={{
          width: "100%",
          height: 180,
          position: "relative",
        }}
      >
        <Image
          src={item?.image || "/images/sample.jpg"}
          alt={item?.title}
          fill
          style={{ objectFit: "contain" }}
        />
      </Box>

      <Typography sx={{ fontWeight: 600, mt: 1,color:"text.primary" }}>
        ${Number(item?.price || 0).toFixed(2)}
      </Typography>

      <Typography
        sx={{
          fontSize: 14,
          color: "#8B96A5",
          height: 34,
          overflow: "hidden",
          display: "-webkit-box",
          WebkitLineClamp: 2,
          WebkitBoxOrient: "vertical",
        }}
      >
        {item?.title}
      </Typography>

      <Button
        fullWidth
        variant="outlined"
        startIcon={<ShoppingCartIcon />}
        onClick={async () => {
          await addToCart(item);
          toggleWishlist(item);
        }}
        sx={{ mt: 1, textTransform: "none" }}
      >
        Move to cart
      </Button>
    </Box>
  );
};

export default SavedForLater;