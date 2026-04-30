"use client";

import React, { useEffect, useState } from "react";
import { Box, Button, CircularProgress, Stack, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import LayoutContainer from "@/src/app/components/common/LayoutContainer";
import { useWishlist } from "@/src/app/context/WishlistContext";

export default function WishlistPage() {
  const router = useRouter();
  const { wishlist, loading, toggleWishlist, isInWishlist, refreshWishlist } =
    useWishlist();
  const [authChecked, setAuthChecked] = useState(false);
  const [isAuthed, setIsAuthed] = useState(false);

  useEffect(() => {
    const check = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/me`, {
          credentials: "include",
        });
        setIsAuthed(res.ok);
      } catch {
        setIsAuthed(false);
      } finally {
        setAuthChecked(true);
      }
    };
    check();
  }, []);

  useEffect(() => {
    if (isAuthed) refreshWishlist();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthed]);

  if (loading && !authChecked) {
    return (
      <LayoutContainer>
        <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
          <CircularProgress />
        </Box>
      </LayoutContainer>
    );
  }

  if (!isAuthed) {
    return (
      <LayoutContainer>
        <Box sx={{ py: 6 }}>
          <Typography variant="h5" fontWeight={700} sx={{ mb: 2 }}>
            Wishlist
          </Typography>
          <Typography sx={{ color: "text.secondary", mb: 3 }}>
            Please login to view your wishlist.
          </Typography>
          <Button
            variant="contained"
            onClick={() => router.push("/auth/login?next=/wishlist")}
            sx={{ textTransform: "none" }}
          >
            Go to login
          </Button>
        </Box>
      </LayoutContainer>
    );
  }

  const products = wishlist
    .map((w) => w?.productId)
    .filter(Boolean);

  return (
    <LayoutContainer>
      <Box sx={{ py: 4 }}>
        <Typography variant="h5" fontWeight={700} sx={{ mb: 2 }}>
          Wishlist ({products.length})
        </Typography>

        {products.length === 0 ? (
          <Typography sx={{ color: "text.secondary" }}>
            Your wishlist is empty.
          </Typography>
        ) : (
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
                  <Box
                    sx={{ display: "flex", alignItems: "center", gap: 2, minWidth: 0 }}
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
                        bgcolor: "#fff",
                        borderRadius: "6px",
                        border: "1px solid",
                        borderColor: "divider",
                        flexShrink: 0,
                      }}
                    />
                    <Box sx={{ minWidth: 0 }}>
                      <Typography fontWeight={600} noWrap>
                        {p.title}
                      </Typography>
                      <Typography sx={{ color: "text.secondary" }}>
                        ${p.price}
                      </Typography>
                    </Box>
                  </Box>

                  <Button
                    variant={saved ? "outlined" : "contained"}
                    onClick={() => toggleWishlist(p)}
                    sx={{ textTransform: "none", whiteSpace: "nowrap" }}
                  >
                    {saved ? "Remove" : "Save"}
                  </Button>
                </Box>
              );
            })}
          </Stack>
        )}
      </Box>
    </LayoutContainer>
  );
}

