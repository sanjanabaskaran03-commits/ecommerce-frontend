"use client";
import { Box, Stack, Typography } from "@mui/material";
import { ShoppingBag } from "@mui/icons-material";

export default function AuthHeader({ title }) {
    return (
            <Box>
                
            <Typography variant="h3" fontWeight="40px" sx={{color: '#8CB7F5',fontSize:"34px",mb:3,textAlign:"center"}}>
                {title}
            </Typography>
        </Box>
    );
}