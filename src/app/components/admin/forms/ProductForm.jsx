"use client";

import { useState } from "react";
import { TextField, Button, Stack, Typography } from "@mui/material";

export default function ProductForm({ isEdit }) {
  const [form, setForm] = useState({
    name: "",
    price: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (isEdit) {
      console.log("Update product", form);
    } else {
      console.log("Add product", form);
    }
  };

  return (
    <Stack spacing={2} maxWidth={400}>
      <Typography variant="h6">
        {isEdit ? "Edit Product" : "Add Product"}
      </Typography>

      <TextField
        label="Product Name"
        name="name"
        onChange={handleChange}
      />

      <TextField
        label="Price"
        name="price"
        onChange={handleChange}
      />

      <Button variant="contained" onClick={handleSubmit}>
        {isEdit ? "Update" : "Add"}
      </Button>
    </Stack>
  );
}