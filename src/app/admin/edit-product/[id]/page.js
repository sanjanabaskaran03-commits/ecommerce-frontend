"use client";

import { Box, Paper } from "@mui/material";
import ProductForm from "@/src/app/components/admin/forms/ProductForm";
import { useParams } from "next/navigation";

export default function EditProductPage() {
  const { id } = useParams();

  return (
    <Box sx={{ mt: 4 }}>
      <Paper
        sx={{
          p: 3,
          bgcolor: "background.paper",
          color: "text.primary"
        }}
      >
        <ProductForm isEdit productId={id} />
      </Paper>
    </Box>
  );
}
