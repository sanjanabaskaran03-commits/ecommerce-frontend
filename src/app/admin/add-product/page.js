"use client";
import { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Box,
  Stack,
  Paper,
} from "@mui/material";
export default function AddProductPage() {
  const [form, setForm] = useState({
    title: "",
    price: "",
    category: "",
    description: "",
    image: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    fetch("http://localhost:5000/api/products", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data._id) {
          setMessage("✅ Product added successfully");
        } else {
          setMessage(data.message || "❌ Failed");
        }
      })
      .catch(() => {
        setMessage("❌ Error occurred");
      });
  };

  return (
    <Paper sx={{ p: 3, maxWidth: 500 }}>
      <Typography variant="h6" mb={2}>
        Add Product
      </Typography>

      <Stack spacing={2}>
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
          label="Category"
          name="category"
          onChange={handleChange}
        />

        <TextField
          label="Image URL"
          name="image"
          onChange={handleChange}
        />

        <TextField
          label="Description"
          name="description"
          multiline
          rows={3}
          onChange={handleChange}
        />

        <Button variant="contained" onClick={handleSubmit}>
          Add Product
        </Button>

        {message && (
          <Typography color="primary">{message}</Typography>
        )}
      </Stack>
    </Paper>
  );
}