"use client";

import { Box, Container, Paper } from "@mui/material";
import ProductForm from "@/src/app/components/admin/forms/ProductForm";
import { useParams } from "next/navigation";

export default function EditProductPage() {
  const { id } = useParams();

  return (
    <Container maxWidth="sm">
      <Box mt={4}>
        <Paper
          sx={{
            p: 3,
            bgcolor: "background.paper", // ✅ important for dark mode
            color: "text.primary",
          }}
        >
          <ProductForm isEdit productId={id} />
        </Paper>
      </Box>
    </Container>
  );
}