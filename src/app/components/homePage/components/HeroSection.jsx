"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  Box,
  Typography,
  Stack,
  List,
  ListItem,
  ListItemText,
  Button,
  Paper,
  IconButton,
  Container,
} from "@mui/material";
import { Person } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import { useRouter } from "next/navigation";

import Banner from "@/public/images/homepage/herosection/Banner.png";
import Banner1 from "@/public/images/homepage/herosection/Banner1.webp";
import Banner2 from "@/public/images/homepage/herosection/Banner2.webp";
import Banner5 from "@/public/images/homepage/herosection/Banner5.webp";

const HeroSection = () => {
  const theme = useTheme();
  const router = useRouter();
  const isDark = theme.palette.mode === "dark";

  const slides = [
    {
      title: "Electronic items",
      subtitle: "Latest trending",
      img: Banner,
      buttonText: "Learn more",
    },
    {
      title: "Clothing & Wear",
      subtitle: "Classic summer",
      img: Banner1,
      buttonText: "Shop now",
    },
    {
      title: "Sports & Outdoor",
      subtitle: "New equipment",
      img: Banner2,
      buttonText: "Explore",
    },
    {
      title: "Home Interiors",
      subtitle: "Modern design",
      img: Banner5,
      buttonText: "View collection",
    },
  ];

  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) =>
        prev === slides.length - 1 ? 0 : prev + 1
      );
    }, 3000);

    return () => clearInterval(timer);
  }, [slides.length]);

  const categories = [
    "Mobiles",
    "Clothes and wear",
    "Home interiors",
    "Computer and tech",
    "Tools and machinery",
    "Sports and outdoor",
    "Animal and pets",
    "Machinery tools",
    "More category",
  ];

  const handleCategoryClick = (category) => {
    const urlFriendlyCategory = category.toLowerCase().replace(/\s+/g, '-');
    router.push(`/shop?category=${urlFriendlyCategory}`);
  };

  return (
    <Box sx={{ mt: 2, width: "100%" }}>
      <Container
        maxWidth={false}
        sx={{
          maxWidth: "1280px",
          margin: "0 auto",
          px: 2,
        }}
      >
        <Paper
          variant="outlined"
          sx={{
            width: "100%",
            p: { xs: 0, md: 2 },
            borderRadius: "8px",
            bgcolor: "background.paper",
            borderColor: isDark ? "divider" : "#DEE2E7",
            boxShadow: "none",
            overflow: "hidden",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              gap: { xs: 0, md: 2 },
              flexDirection: { xs: "column", md: "row" },
            }}
          >
            <Box
              sx={{
                width: { xs: "100%", md: "200px" },
                flexShrink: 0,
                borderBottom: {
                  xs: `1px solid ${isDark ? "#333" : "#E0E7EE"}`,
                  md: "none",
                },
                overflowX: { xs: "auto", md: "visible" },
                whiteSpace: { xs: "nowrap", md: "normal" },
                "&::-webkit-scrollbar": { display: "none" },
              }}
            >
              <List
                component="nav"
                sx={{
                  p: { xs: 1, md: 0 },
                  display: { xs: "flex", md: "block" },
                }}
              >
                {categories.map((item, index) => (
                  <ListItem
                    key={item}
                    onClick={() => handleCategoryClick(item)}
                    sx={{
                      borderRadius: "6px",
                      mb: { xs: 0, md: 0.8 },
                      mr: { xs: 1, md: 0 },
                      py: 0.8,
                      px: { xs: 2, md: 1.5 },
                      width: { xs: "auto", md: "100%" },
                      cursor: "pointer",
                      bgcolor: {
                        xs: isDark
                          ? "rgba(255,255,255,0.05)"
                          : "#EFF2F4",
                        md: "transparent",
                      },
                      border: {
                        xs: `1px solid ${isDark ? "#444" : "#DEE2E7"}`,
                        md: "none",
                      },
                      "&:hover": {
                        bgcolor: isDark
                          ? "rgba(255,255,255,0.08)"
                          : "#E5F1FF",
                      },
                    }}
                  >
                    <ListItemText
                      primary={item}
                      slotProps={{
                        primary: {
                          fontSize: "14px",
                          fontWeight: 500,
                          color: isDark ? "#e0e0e0" : "#465166",
                        },
                      }}
                    />
                  </ListItem>
                ))}
              </List>
            </Box>

            <Box
              sx={{
                height: { xs: "200px", sm: "300px", md: "430px" },
                flexGrow: 1,
                maxWidth: { md: "670px" },
                position: "relative",
                overflow: "hidden",
                borderRadius: { xs: 0, md: "4px" },
              }}
            >
              <Image
                src={slides[activeSlide].img}
                alt="banner"
                fill
                priority
                sizes="(max-width: 900px) 100vw, 670px"
                style={{
                  objectFit: "cover",
                }}
              />

              <Box
                sx={{
                  position: "relative",
                  zIndex: 2,
                  p: { xs: 2, md: 5 },
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: { xs: "flex-start", md: "center" },
                  pt: { xs: 4, md: 4 },
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    color: "#1c1c1c",
                    mb: 1,
                    fontSize: { xs: "1rem", md: "1.5rem" },
                  }}
                >
                  {slides[activeSlide].subtitle}
                </Typography>

                <Typography
                  sx={{
                    fontWeight: "bold",
                    color: "#1c1c1c",
                    mb: 2,
                    fontSize: { xs: "1.5rem", md: "2.5rem" },
                    lineHeight: 1.2,
                  }}
                >
                  {slides[activeSlide].title}
                </Typography>

                <Button
                  variant="contained"
                  sx={{
                    bgcolor: "#fff",
                    color: "#1c1c1c",
                    width: "fit-content",
                    textTransform: "none",
                    "&:hover": { bgcolor: "#f5f5f5" }
                  }}
                >
                  {slides[activeSlide].buttonText}
                </Button>
              </Box>
            </Box>

            <Box
              sx={{
                width: { md: "250px" },
                display: { xs: "none", md: "block" },
                flexShrink: 0,
              }}
            >
              <Stack spacing={1.5}>
                <Box
                  sx={{
                    bgcolor: isDark ? "#1f2a38" : "#E3F0FF",
                    p: 2,
                    borderRadius: "8px",
                  }}
                >
                  <Stack
                    direction="row"
                    spacing={1.5}
                    sx={{ mb: 2, alignItems: "center" }}
                  >
                    <IconButton
                      sx={{
                        bgcolor: "#0D6EFD",
                        color: "#fff",
                        "&:hover": { bgcolor: "#0b5ed7" }
                      }}
                    >
                      <Person />
                    </IconButton>

                    <Box>
  <Typography sx={{ fontWeight: 500, fontSize: "16px" }}>
    Hi, user
  </Typography>

  <Typography sx={{ fontWeight: 500, fontSize: "16px" }}>
    {"let's get started"}
  </Typography>
</Box>
                  </Stack>

                  <Stack spacing={1}>
                    <Button
                      variant="contained"
                      fullWidth
                      sx={{
                        textTransform: "none",
                        bgcolor: "#0D6EFD",
                      }}
                    >
                      Join now
                    </Button>

                    <Button
                      variant="outlined"
                      fullWidth
                      sx={{
                        textTransform: "none",
                        bgcolor: "#fff",
                        color: "#0D6EFD",
                        borderColor: "#DEE2E7"
                      }}
                    >
                      Log in
                    </Button>
                  </Stack>
                </Box>

                <Box
                  sx={{
                    bgcolor: "#F38332",
                    p: 2,
                    borderRadius: "8px",
                    color: "#fff",
                  }}
                >
                  <Typography sx={{ fontSize: "18px", width: "140px" }}>
                    Get US $10 off with a new supplier
                  </Typography>
                </Box>

                <Box
                  sx={{
                    bgcolor: "#55BDC3",
                    p: 2,
                    borderRadius: "8px",
                    color: "#fff",
                  }}
                >
                  <Typography sx={{ fontSize: "18px", width: "140px" }}>
                    Send quotes with supplier preferences
                  </Typography>
                </Box>
              </Stack>
            </Box>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default HeroSection;
