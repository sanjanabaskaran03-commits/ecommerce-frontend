"use client";

import { Box, Container, Typography, Paper } from "@mui/material";
import ProductForm from "@/src/app/components/admin/forms/ProductForm"; // ⚠️ adjust path if needed

export default function AddProductPage() {
  return (
    <Container maxWidth="sm">
      <Box mt={4}>
        <Paper sx={{ p: 3 }}>

          {/* ✅ Product Form */}
          <ProductForm isEdit={false} />
        </Paper>
      </Box>
    </Container>
  );
}