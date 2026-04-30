"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import {
  Box,
  Typography,
  Stack,
  Rating,
  Divider,
  Button,
  useTheme,
} from "@mui/material";

import DoneIcon from "@mui/icons-material/Done";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import LanguageIcon from "@mui/icons-material/Language";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

import { useCart } from "@/src/app/context/CartContext";
import { useWishlist } from "@/src/app/context/WishlistContext";
import LayoutContainer from "@/src/app/components/common/LayoutContainer";

import {
  getProductById,
  getProducts,
} from "@/src/app/services/productService";

const HeroSection = ({ productId }) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const router = useRouter();
  const params = useParams();

  const { addToCart, isInCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const id = productId || params?.id;

  const [activeProduct, setActiveProduct] = useState(null);
  const [relatedThumbnails, setRelatedThumbnails] = useState([]);
  const isAdded = isInCart(activeProduct?._id);

  useEffect(() => {
  if (!id) return;

  const loadData = async () => {
    try {
      const current = await getProductById(id);
      setActiveProduct(current);

      if (current.category) {
        const data = await getProducts({ category: current.category });

        const related = data
          .filter((item) => item._id !== current._id)
          .slice(0, 5);

        setRelatedThumbnails(related);
      }

    } catch (err) {
      console.error("HeroSection fetch error", err);
    }
  };

  loadData();
}, [id]); // ✅ FIXED

  if (!activeProduct) return null;

  const isSaved = isInWishlist(activeProduct._id);
  const inStock = activeProduct.stock > 0;

  const handleCartAction = async () => {
    if (isAdded) {
      router.push("/cart");
      return;
    }
    await addToCart(activeProduct, 1);
  };

  return (
    <LayoutContainer>
      <Box
        sx={{
          p: 3,
          borderRadius: "6px",
          bgcolor: "background.paper",
          border: "1px solid",
          borderColor: "divider",
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: 4,
        }}
      >
        {/* LEFT: IMAGE */}
        <Box sx={{ flex: 1 }}>
          <Box
            sx={{
              border: "1px solid",
              borderColor: "divider",
              borderRadius: "6px",
              height: 380,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              bgcolor: "background.paper",
              position: "relative",
            }}
          >
            <Image
              src={
                activeProduct.image ||
                activeProduct.img ||
                "/images/sample.jpg"
              }
              alt={activeProduct.title}
              fill
              style={{ objectFit: "contain" }}
            />
          </Box>

          {/* Thumbnails */}
          <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
            {relatedThumbnails.map((item) => (
              <Box
                key={item._id}
                onClick={() => router.push(`/detail/${item._id}`)}
                sx={{
                  width: 70,
                  height: 70,
                  cursor: "pointer",
                  border: "1px solid",
                  borderColor: "divider",
                  borderRadius: "4px",
                  bgcolor: "background.paper",
                  position: "relative",
                }}
              >
                <Image
                  src={item.image || item.img || "/images/sample.jpg"}
                  alt={item.title}
                  fill
                  style={{ objectFit: "contain", padding: 4 }}
                />
              </Box>
            ))}
          </Stack>
        </Box>

        {/* MIDDLE: DETAILS */}
        <Box sx={{ flex: 1.5 }}>
          <Stack spacing={1.5}>
            {/* Stock */}
            <Stack direction="row" alignItems="center" spacing={0.5}>
              <DoneIcon
                sx={{ color: inStock ? "#00B517" : "red", fontSize: "20px" }}
              />
              <Typography
                sx={{ color: inStock ? "#00B517" : "red", fontWeight: 500 }}
              >
                {inStock ? "In stock" : "Out of stock"}
              </Typography>
            </Stack>

            {/* Title */}
            <Typography variant="h5" fontWeight={600} sx={{ color: "text.primary" }}>
              {activeProduct.title}
            </Typography>

            {/* Rating */}
            <Stack direction="row" alignItems="center" spacing={1}>
              <Rating
                value={Number(activeProduct.rating || 0)}
                readOnly
                sx={{ color: "text.secondary" }}
                size="small"
              />

              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                {activeProduct.numReviews || 0} reviews
              </Typography>

              <Box
                sx={{
                  display: { xs: "none", md: "flex" },
                  alignItems: "center",
                  gap: 0.5,
                  color: "text.secondary",
                }}
              >
                <ShoppingBasketIcon fontSize="small" />
                <Typography variant="body2">
                  {activeProduct.reviews?.length || 0} sold
                </Typography>
              </Box>
            </Stack>

            {/* PRICE + DISCOUNT */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                bgcolor: isDark ? "#2c2c2c" : "#FFF4E6",
                p: 2,
                borderRadius: "8px",
                border: "1px solid",
                borderColor: "divider",
              }}
            >
              {/* Left: Price */}
              <Stack direction="row" alignItems="center" spacing={1.5}>
                <Typography
                  variant="h5"
                  sx={{
                    color: "#FA3434",
                    fontWeight: 700,
                  }}
                >
                  ${activeProduct.price}
                </Typography>

                {activeProduct.discountPercent > 0 && (
                  <Typography
                    sx={{
                      fontSize: "0.8rem",
                      fontWeight: 600,
                      color: "#00B517",
                      bgcolor: isDark ? "#1e3a1e" : "#E9F8EE",
                      px: 1.2,
                      display: "flex",
                      alignItems: "center",
                      py: 0.3,
                      borderRadius: "20px",
                    }}
                  >
                    {activeProduct.discountPercent}% OFF
                  </Typography>
                )}
              </Stack>

              {/* Right: Optional label */}
              <Typography
                variant="caption"
                sx={{ color: "text.secondary", fontWeight: 500 }}
              >
                Limited deal
              </Typography>
            </Box>

            {/* SPECIFICATIONS */}
            <Stack spacing={1}>
              {Object.entries(activeProduct.specifications || {}).map(
                ([key, value]) => (
                  <Box
                    key={key}
                    sx={{
                      display: "flex",
                      pb: 1,
                      borderBottom: "1px solid",
                      borderColor: "divider",
                      alignItems: "flex-start",
                    }}
                  >
                    <Typography sx={{ width: 120, color: "#8B96A5" }}>
                      {key}:
                    </Typography>

                    <Typography sx={{ flex: 1, color: "text.primary" }}>
                      {value || "-"}
                    </Typography>
                  </Box>
                )
              )}
            </Stack>
          </Stack>
        </Box>

        {/* RIGHT: SUPPLIER */}
        <Box sx={{ flex: 0.8, minWidth: 250 }}>
          <Box
            sx={{
              p: 2,
              borderRadius: "6px",
              border: "1px solid",
              borderColor: "divider",
            }}
          >
            <Stack direction="row" spacing={2} alignItems="center">
              <Box
                sx={{
                  width: 48,
                  height: 48,
                  bgcolor: "#C6F3F1",
                  borderRadius: "4px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: 700,
                }}
              >
                {activeProduct.supplier?.name?.[0] || "S"}
              </Box>

              <Box>
                <Typography variant="caption" sx={{ fontSize: "14px", display: 'block', color: "text.primary" }}>Supplier</Typography>
                <Typography variant="caption" sx={{ color: "text.primary" }}>
                  {activeProduct.supplier?.name || "Admin Store"}
                </Typography>
              </Box>
            </Stack>

            <Divider sx={{ my: 2 }} />

            <Stack spacing={1}>
              <Stack direction="row" spacing={1}>
                <VerifiedUserIcon fontSize="small" color="disabled" />
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  {activeProduct.supplier?.verified
                    ? "Verified Seller"
                    : "Seller"}
                </Typography>
              </Stack>

              <Stack direction="row" spacing={1}>
                <LanguageIcon fontSize="small" color="disabled" />
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  {activeProduct.supplier?.location ||
                    "Worldwide shipping"}
                </Typography>
              </Stack>
            </Stack>

            <Stack spacing={1} sx={{ mt: 2 }}>
              <Button variant="contained" fullWidth>
                Send inquiry
              </Button>
              <Button variant="outlined" fullWidth>
                Seller&apos;s profile
              </Button>
            </Stack>
          </Box>

          {/* Wishlist */}
          <Button
  fullWidth
  startIcon={isSaved ? <FavoriteIcon /> : <FavoriteBorderIcon />}
  onClick={() => toggleWishlist(activeProduct)}
  sx={{ mt: 2 }}
>
  {isSaved ? "Saved" : "Save for later"}
</Button>
          {/* Cart */}
          <Button
            fullWidth
            startIcon={
              isAdded ? <ShoppingCartIcon /> : <AddShoppingCartIcon />
            }
            onClick={handleCartAction}
            sx={{ mt: 1 }}
          >
            {isAdded ? "Go to cart" : "Add to cart"}
          </Button>
        </Box>
      </Box>
    </LayoutContainer>
  );
};

export default HeroSection;
