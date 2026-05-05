"use client";

import React, { useEffect, useState } from "react";
import { Box, Typography, CircularProgress, Button } from "@mui/material";
import { useRouter } from "next/navigation";
import { useTheme } from '@mui/material/styles'; 
import LayoutContainer from "@/src/app/components/common/LayoutContainer";
import { useWishlist } from "@/src/app/context/WishlistContext";
import WishlistView from "@/src/app/components/wishlist/WishlistView";

export default function WishlistPage() {
  const router = useRouter();
  const { loading, refreshWishlist } = useWishlist();

  const [authChecked, setAuthChecked] = useState(false);
  const [isAuthed, setIsAuthed] = useState(false);
   const theme = useTheme();
    const isDark = theme.palette.mode === 'dark';

  useEffect(() => {
    const check = async () => {
      try {
        const res = await fetch(`/api/auth/me`, {
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
  }, [isAuthed]);

  /* LOADING */
  if (loading && !authChecked) {
    return (
      <LayoutContainer>
        <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
          <CircularProgress />
        </Box>
      </LayoutContainer>
    );
  }

  /* NOT LOGGED IN */
  if (!isAuthed) {
    return (
      <Box sx={{ bgcolor: "background.default", minHeight: "100vh",pt:3,pb:3}}>
      <LayoutContainer >
        <Box sx={{ py: 6 }}>
          <Typography variant="h5" fontWeight={700} sx={{ mb: 2 ,color:"text.primary"}}>
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
      </Box>
    );
  }

  /* MAIN */
  return (
    <Box sx={{ bgcolor: "background.default", minHeight: "100vh",pt:3,pb:3}}>
    <LayoutContainer>
        <Typography variant="h5" fontWeight={700} sx={{ mb: 2 ,color:"text.primary"}}>
          Wishlist
        </Typography>

        <WishlistView />
        </LayoutContainer>
      </Box>
    
  );
}