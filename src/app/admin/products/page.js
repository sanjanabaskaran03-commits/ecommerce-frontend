"use client";

import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Chip,
  Paper,
  TableContainer,
  Avatar,
  Stack
} from "@mui/material";
import { useRouter } from "next/navigation";
import ProductFilters from "@/src/app/components/admin/products/ProductFilters";

export default function ProductsPage() {
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState({
    category: "",
    section: "",
    stock: "",
  });

  useEffect(() => {
    fetch("http://localhost:5000/api/products?mode=admin")
      .then((res) => res.json())
      .then((data) => setProducts(data.data || []))
      .finally(() => setLoading(false))
      .catch((err) => console.error(err));
  }, []);

  const handleDelete = (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;

    fetch(`http://localhost:5000/api/products/${id}`, { method: "DELETE" })
      .then(() => {
        setProducts((prev) => prev.filter((p) => p._id !== id));
      })
      .catch((err) => console.log(err));
  };

  const filteredProducts = products.filter((p) => {
    const matchesSearch = p.title?.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = filter.category ? p.category === filter.category : true;
    const matchesSection = filter.section ? p.sectionTags?.includes(filter.section) : true;
    const matchesStock =
      filter.stock === "in"
        ? p.stock > 0
        : filter.stock === "out"
        ? p.stock === 0
        : true;

    return matchesSearch && matchesCategory && matchesSection && matchesStock;
  });

  if (loading) return <Typography sx={{ p: 4 }}>Loading products...</Typography>;

  return (
    <Box>

      {/* HEADER */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 4,
          flexWrap: "wrap",
          gap: 2,
        }}
      >
        <Typography variant="h4" fontWeight="bold" sx={{color:"text.primary"}}>
          Products
        </Typography>

        <Button
          variant="contained"
          onClick={() => router.push("/admin/add-product")}
          sx={{
            borderRadius: "8px",
            textTransform: "none",
          }}
        >
          + Add Product
        </Button>
      </Box>

      {/* FILTERS */}
      <Box sx={{ mb: 3 }}>
        <ProductFilters
          filter={filter}
          setFilter={setFilter}
          search={search}
          setSearch={setSearch}
        />
      </Box>

      {/* ================= MOBILE / TABLET ================= */}
      <Stack spacing={2} sx={{ display: { xs: "flex", md: "none" } }}>
        {filteredProducts.map((p) => (
          <Paper
            key={p._id}
            sx={{
              p: 2,
              borderRadius: 3,
              display: "flex",
              gap: 2,
              alignItems: "center",
              bgcolor: "background.paper",
              border: "1px solid",
              borderColor: "divider",
            }}
          >
            {/* IMAGE */}
            <Avatar
              src={p.image || "/images/sample.jpg"}
              variant="rounded"
              sx={{ width: 64, height: 64 }}
            />

            {/* CONTENT */}
            <Box sx={{ flex: 1, minWidth: 0 }}>

              {/* TITLE */}
              <Typography
                fontWeight={600}
                noWrap
                sx={{ fontSize: "0.95rem" }}
              >
                {p.title}
              </Typography>

              {/* STATUS */}
              <Chip
                label={p.stock > 0 ? "In Stock" : "Out of Stock"}
                color={p.stock > 0 ? "success" : "error"}
                size="small"
                sx={{ my: 0.5, borderRadius:"8px" }}
              />

              {/* PRICE + ACTIONS */}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography
                  sx={{
                    fontSize: "0.9rem",
                    color: "text.secondary",
                  }}
                >
                  ${p.price?.toLocaleString()}
                </Typography>

                <Stack direction="row" spacing={1}>
                  <Button
                    size="small"
                    variant="outlined"
                    onClick={() =>
                      router.push(`/admin/edit-product/${p._id}`)
                    }
                    sx={{ textTransform: "none", borderRadius: 2 }}
                  >
                    Edit
                  </Button>

                  <Button
                    size="small"
                    color="error"
                    variant="outlined"
                    onClick={() => handleDelete(p._id)}
                    sx={{ textTransform: "none", borderRadius: 2 }}
                  >
                    Delete
                  </Button>
                </Stack>
              </Box>

            </Box>
          </Paper>
        ))}
      </Stack>

      {/* ================= DESKTOP TABLE ================= */}
      <TableContainer
        component={Paper}
        sx={{
          borderRadius: "12px",
          boxShadow: 3,
          display: { xs: "none", md: "block" }
        }}
      >
        <Table sx={{ minWidth: 800 }}>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}>Image</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Title</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Price</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Stock</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Category</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Status</TableCell>
              <TableCell align="left" sx={{ fontWeight: "bold" }}>
                Actions
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {filteredProducts.map((p) => (
              <TableRow key={p._id} hover>

                <TableCell>
                  <Avatar
                    src={p.image || "/images/sample.jpg"}
                    variant="rounded"
                    sx={{ width: 48, height: 48 }}
                  />
                </TableCell>

                <TableCell>{p.title}</TableCell>
                <TableCell>${p.price?.toLocaleString()}</TableCell>
                <TableCell>{p.stock}</TableCell>
                <TableCell>{p.category}</TableCell>

                <TableCell>
                  <Chip
                    label={p.stock > 0 ? "In Stock" : "Out of Stock"}
                    size="small"
                    sx={{
                      bgcolor: p.stock > 0 ? "success.main" : "error.main",
                      color: "#fff", // ✅ always readable
                      fontWeight: 600,
                      borderRadius: "8px"
                    }}
                  />
                </TableCell>

                <TableCell align="right">
                  <Stack direction="row" spacing={1} sx={{justifyContent:"flex-start"}}>
                    <Button
                      size="small"
                      variant="outlined"
                      onClick={() =>
                        router.push(`/admin/edit-product/${p._id}`)
                      }
                    >
                      Edit
                    </Button>

                    <Button
                      size="small"
                      color="error"
                      variant="outlined"
                      onClick={() => handleDelete(p._id)}
                    >
                      Delete
                    </Button>
                  </Stack>
                </TableCell>

              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

    </Box>
  );
}
