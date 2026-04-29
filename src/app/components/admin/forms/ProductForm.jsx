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
          dealStart: data.dealStart || "",
          dealEnd: data.dealEnd || "",
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMessage("");
    setForm((prev) => ({ ...prev, [name]: value }));
  };

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

  const handleSectionChange = (section) => {
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

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => setImageBase64(reader.result);

    if (file) {
      reader.readAsDataURL(file);
      setForm((prev) => ({ ...prev, imageName: file.name }));
    }
  };

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
        }
      })
      .catch(() => setMessage("❌ Error occurred"));
  };

  // Row component
  const Row = ({ children }) => (
    <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
      {children}
    </Stack>
  );

  // ✅ FIXED Field component
  const Field = ({ label, children, sx, labelSx }) => (
    <Stack spacing={0.5} sx={{ flex: 1, ...sx }}>
      <Typography sx={{ fontWeight: "bold", ...labelSx }}>
        {label}
      </Typography>
      {children}
    </Stack>
  );

  return (
    <Stack spacing={2} sx={{ maxWidth: 1280, mx: "auto" }}>
      <Typography variant="h5" textAlign="center" fontWeight={600}>
        {isEdit ? "Edit Product" : "Add Product"}
      </Typography>

      <Row>
        <Field label="Title">
          <TextField name="title" value={form.title} onChange={handleChange} fullWidth />
        </Field>
        <Field label="Price">
          <TextField name="price" type="number" value={form.price} onChange={handleChange} fullWidth />
        </Field>
      </Row>

      <Row>
        {/* ✅ NOW sx works */}
        <Field label="Stock Quantity" sx={{}}>
          <TextField name="stock" value={form.stock} onChange={handleChange} fullWidth />
        </Field>

        <Field label="Category">
          <Select name="category" value={form.category} onChange={handleChange} fullWidth>
            {categories.map((cat) => (
              <MenuItem key={cat} value={cat}>{cat}</MenuItem>
            ))}
          </Select>
        </Field>
      </Row>

      <Row>
        <Field label="Description">
          <TextField multiline rows={3} name="description" value={form.description} onChange={handleChange} fullWidth />
        </Field>

        <Field label="Discount %">
          <TextField name="discountPercent" type="number" value={form.discountPercent} onChange={handleChange} fullWidth />
        </Field>
      </Row>

      <Row>
        <Field label="Deal Start">
          <TextField type="datetime-local" name="dealStart" value={form.dealStart} onChange={handleChange} fullWidth />
        </Field>

        <Field label="Deal End">
          <TextField type="datetime-local" name="dealEnd" value={form.dealEnd} onChange={handleChange} fullWidth />
        </Field>
      </Row>

      <Row>
        <Field label="Product Image">
          <Stack direction="row" spacing={2}>
            <TextField value={form.imageName} fullWidth InputProps={{ readOnly: true }} />
            <Button variant="contained" component="label">
              Upload
              <input hidden type="file" onChange={handleImageChange} />
            </Button>
          </Stack>
        </Field>

        <Field label="Sections">
          <Stack
            direction="row"
            flexWrap="wrap"   // ✅ correct spelling
            spacing={{xs:1.5,md:10}}           // ✅ controls space BETWEEN groups
            sx={{ width: "100%" }}
          >
            {[ { label: "Deals", value: "deals" },
  { label: "Electronics", value: "electronics" },
  { label: "Home", value: "home" }].map((section) => (
              <Stack
                key={section.value}
                direction="row"
                alignItems="center"
                spacing={0}   // ✅ space BETWEEN checkbox & text
              >
                <Checkbox
                  size="small"
                  sx={{ p: 0.5 }}
                  key={section.value}
checked={form.sectionTags.includes(section.value)}
onChange={() => handleSectionChange(section.value)}
                />

                <Typography
                  sx={{
                    fontSize: { xs: "0.75rem",sm:"1.25rem", md: "1rem" },
                    lineHeight: 3.5   // ✅ fix vertical alignment
                  }}
                >
                  {section.label}
                </Typography>
              </Stack>
            ))}
          </Stack>
        </Field>
      </Row>

      <Typography sx={{ fontWeight: "bold", fontSize: "1.15rem" }}>
        Specifications:
      </Typography>

      {Object.keys(form.specifications).reduce((rows, key, index, arr) => {
        if (index % 2 === 0) rows.push(arr.slice(index, index + 2));
        return rows;
      }, []).map((pair, i) => (
        <Stack key={i} direction={{ xs: "column", md: "row" }} spacing={2}>
          {pair.map((key) => (
            <Stack key={key} spacing={0.5} sx={{ flex: 1 }}>
              <Typography sx={{ fontWeight: "bold" }}>{key}</Typography>
              <TextField
                name={key}
                value={form.specifications[key]}
                onChange={handleSpecChange}
                fullWidth
              />
            </Stack>
          ))}
        </Stack>
      ))}

      <Button variant="contained" onClick={handleSubmit}>
        {isEdit ? "Update" : "Add"}
      </Button>

      {message && <Typography>{message}</Typography>}
    </Stack>
  );
}