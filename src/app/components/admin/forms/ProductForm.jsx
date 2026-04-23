"use client";

import { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Stack,
  Typography,
  Checkbox,
  FormControlLabel,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  useTheme
} from "@mui/material";

export default function ProductForm({ isEdit, productId }) {
  const theme = useTheme();

  const initialForm = {
    title: "",
    price: "",
    description: "",
    category: "",
    sectionTags: [],
    discountPercent: "",
    imageName: "",
    stock: "",
    dealStart: "",   
  dealEnd: "", 
    specifications: {
      Material: "",
      Type: "",
      Design: "",
      Customization: "",
      Protection: "",
      Warranty: ""
    }
  };

  const [form, setForm] = useState(initialForm);
  const [imageBase64, setImageBase64] = useState("");
  const [message, setMessage] = useState("");

  // FETCH PRODUCT (EDIT MODE)
  useEffect(() => {
    if (!isEdit || !productId) return;

    fetch(`http://localhost:5000/api/products/${productId}`)
      .then((res) => res.json())
      .then((data) => {
        setForm({
          title: data.title || "",
          price: data.price || "",
          description: data.description || "",
          category: data.category || "",
          sectionTags: data.sectionTags || [],
          discountPercent: data.discountPercent || "",
          imageName: data.imageName || "",
          stock: data.stock || "",
          specifications: {
            Material: data.specifications?.Material || "",
            Type: data.specifications?.Type || "",
            Design: data.specifications?.Design || "",
            Customization: data.specifications?.Customization || "",
            Protection: data.specifications?.Protection || "",
            Warranty: data.specifications?.Warranty || ""
          }
        });

        setImageBase64(data.image || "");
      })
      .catch(console.log);
  }, [isEdit, productId]);

  const categories = [
    "Mobiles",
    "Clothes and wear",
    "Home interiors",
    "Computer and tech",
    "Accessories",
    "Tools and machinery",
    "Sports and outdoor",
    "Animal and pets",
    "Machinery tools",
  ];

  // HANDLE INPUT CHANGE
  const handleChange = (e) => {
    const { name, value } = e.target;
    setMessage("");

    setForm((prev) => ({
      ...prev,
      [name]: value // ✅ always keep as string
    }));
  };

  // HANDLE SPEC CHANGE
  const handleSpecChange = (e) => {
    const { name, value } = e.target;
    setMessage("");

    setForm((prev) => ({
      ...prev,
      specifications: {
        ...prev.specifications,
        [name]: value
      }
    }));
  };

  // HANDLE SECTION CHECKBOX
  const handleSectionChange = (section) => {
    setMessage("");

    setForm((prev) => {
      const exists = prev.sectionTags.includes(section);
      return {
        ...prev,
        sectionTags: exists
          ? prev.sectionTags.filter((s) => s !== section)
          : [...prev.sectionTags, section]
      };
    });
  };

  // IMAGE UPLOAD
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setImageBase64(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
      setForm((prev) => ({
        ...prev,
        imageName: file.name
      }));
    }
  };

  // SUBMIT
  const handleSubmit = () => {
    const payload = {
      ...form,
      price: Number(form.price),
      stock: Number(form.stock),
      discountPercent: Number(form.discountPercent),
      dealStart: form.dealStart,
      dealEnd: form.dealEnd,
      image: imageBase64
    };

    const url = isEdit
      ? `http://localhost:5000/api/products/${productId}`
      : `http://localhost:5000/api/products`;

    const method = isEdit ? "PUT" : "POST";

    fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      credentials: "include"
    })
      .then((res) => res.json())
      .then((data) => {
        if (data._id) {
          setMessage(isEdit ? "✅ Updated successfully" : "✅ Added successfully");

          setTimeout(() => setMessage(""), 2000);

          if (!isEdit) {
            setForm(initialForm);
            setImageBase64("");
          }
        } else {
          setMessage(data.message || "❌ Failed");
          setTimeout(() => setMessage(""), 2000);
        }
      })
      .catch(() => {
        setMessage("❌ Error occurred");
        setTimeout(() => setMessage(""), 3000);
      });
  };

  return (
    <Stack spacing={2} maxWidth={420}>
      <Typography variant="h5" sx={{ textAlign: "center", fontWeight: 600 }}>
        {isEdit ? "Edit Product" : "Add Product"}
      </Typography>

      <TextField name="title" label="Title" value={form.title} onChange={handleChange} />
      <TextField name="price" label="Price" type="number" value={form.price} onChange={handleChange} />
      <TextField name="stock" label="Stock Quantity" type="text" value={form.stock} onChange={handleChange} />

      <FormControl fullWidth>
        <InputLabel id="category-label">Category</InputLabel>
        <Select
          labelId="category-label"
          name="category"
          value={form.category}
          label="Category"
          onChange={handleChange}
        >
          {categories.map((cat) => (
            <MenuItem key={cat} value={cat}>{cat}</MenuItem>
          ))}
        </Select>
      </FormControl>

      <TextField name="description" label="Description" multiline rows={3} value={form.description} onChange={handleChange} />
      <TextField name="discountPercent" label="Discount %" type="number" value={form.discountPercent} onChange={handleChange} />
      <TextField
  name="dealStart"
  label="Deal Start"
  type="datetime-local"
  value={form.dealStart}
  onChange={handleChange}
  InputLabelProps={{ shrink: true }}
/>

<TextField
  name="dealEnd"
  label="Deal End"
  type="datetime-local"
  value={form.dealEnd}
  onChange={handleChange}
  InputLabelProps={{ shrink: true }}
/>

      <Stack direction="row" spacing={2}>
        <TextField value={form.imageName} fullWidth InputProps={{ readOnly: true }} />
        <Button variant="contained" component="label">
          Upload
          <input hidden type="file" onChange={handleImageChange} />
        </Button>
      </Stack>

      <Typography>Sections</Typography>
      {["deals", "electronics", "home"].map((section) => (
        <FormControlLabel
          key={section}
          control={
            <Checkbox
              checked={form.sectionTags.includes(section)}
              onChange={() => handleSectionChange(section)}
            />
          }
          label={section}
        />
      ))}

      <Typography>Specifications</Typography>
      {Object.keys(form.specifications).map((key) => (
        <TextField
          key={key}
          name={key}
          label={key}
          value={form.specifications[key]}
          onChange={handleSpecChange}
        />
      ))}

      <Button variant="contained" onClick={handleSubmit}>
        {isEdit ? "Update" : "Add"}
      </Button>

      {message && <Typography>{message}</Typography>}
    </Stack>
  );
}