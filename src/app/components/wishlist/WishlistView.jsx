"use client";

import React from "react";
import { Box, Button, Stack, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { useWishlist } from "@/src/app/context/WishlistContext";

const WishlistView = () => {
  const router = useRouter();
  const { wishlist, toggleWishlist, isInWishlist } = useWishlist();

  const products = wishlist
    .map((w) => w?.productId)
    .filter(Boolean);

  if (products.length === 0) {
    return (
      <Typography sx={{ color: "text.secondary" }}>
        Your wishlist is empty.
      </Typography>
    );
  }

  return (
    <Stack spacing={2}>
      {products.map((p) => {
        const img = p.image || p.img || "/images/sample.jpg";
        const saved = isInWishlist(p._id);

        return (
          <Box
            key={p._id}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              p: 2,
              borderRadius: "8px",
              bgcolor: "background.paper",
              border: "1px solid",
              borderColor: "divider",
              gap: 2,
            }}
          >
            {/* LEFT */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
                minWidth: 0,
                cursor: "pointer",
              }}
              onClick={() => router.push(`/detail/${p._id}`)}
            >
              <Box
                component="img"
                src={img}
                alt={p.title}
                sx={{
                  width: 72,
                  height: 72,
                  objectFit: "contain",
                  borderRadius: "6px",
                  border: "1px solid",
                  borderColor: "divider",
                  flexShrink: 0,
                }}
              />

              <Box sx={{ minWidth: 0 }}>
                <Typography fontWeight={600} sx={{color:"text.primary"}} noWrap>
                  {p.title}
                </Typography>

                <Typography sx={{ color: "text.secondary" }}>
                  ${p.price}
                </Typography>
              </Box>
            </Box>

            {/* RIGHT BUTTON */}
            <Button
              variant={saved ? "outlined" : "contained"}
              onClick={() => toggleWishlist(p)}
              sx={{ textTransform: "none" }}
            >
              {saved ? "Remove" : "Save"}
            </Button>
          </Box>
        );
      })}
    </Stack>
  );
};

export default WishlistView;