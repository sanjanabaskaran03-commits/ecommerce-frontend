"use client";

import { useState } from "react";
import { TextField, Button, Stack, Typography } from "@mui/material";

export default function ProductForm({ isEdit }) {
  const [form, setForm] = useState({
    title: "",
    price: "",
    description: "",
    category: "",
  });

  const [image, setImage] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
  const formData = new FormData();

  formData.append("title", form.title);
  formData.append("price", form.price);
  formData.append("description", form.description);
  formData.append("category", form.category);

  if (image) {
    formData.append("image", image);
  }

  try {
    const res = await fetch("http://localhost:5000/api/products", {
      method: "POST",
      credentials: "include", // IMPORTANT
      body: formData,
    });

    const data = await res.json();
    console.log(data);
  } catch (err) {
    console.log(err);
  }
};

  return (
    <Stack spacing={2} maxWidth={400}>
      <Typography variant="h6">
        {isEdit ? "Edit Product" : "Add Product"}
      </Typography>

      <TextField
        label="Title"
        name="title"
        onChange={handleChange}
      />

      <TextField
        label="Price"
        name="price"
        onChange={handleChange}
      />

      <TextField
        label="Description"
        name="description"
        onChange={handleChange}
      />

      <TextField
        label="Category"
        name="category"
        onChange={handleChange}
      />

      {/* IMAGE UPLOAD */}
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImage(e.target.files[0])}
      />

      <Button variant="contained" onClick={handleSubmit}>
        {isEdit ? "Update" : "Add"}
      </Button>
    </Stack>
  );
}