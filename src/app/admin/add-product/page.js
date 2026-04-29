"use client";

import { Box, Paper } from "@mui/material";
import ProductForm from "@/src/app/components/admin/forms/ProductForm";

export default function AddProductPage() {
  return (
    <Box sx={{ mt: 4 }}>
      <Paper sx={{ p: 3 }}>
        <ProductForm isEdit={false} />
      </Paper>
    </Box>
  );
}
