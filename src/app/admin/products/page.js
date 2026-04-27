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
  Avatar
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
    const matchesStock = filter.stock === "in" ? p.stock > 0 : filter.stock === "out" ? p.stock === 0 : true;
    return matchesSearch && matchesCategory && matchesSection && matchesStock;
  });

  if (loading) return <Typography sx={{ p: 4 }}>Loading products...</Typography>;

  return (
    <Box sx={{ p: 3 }}>
      {/* HEADER SECTION */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 4,
          flexWrap: "wrap", // ✅ prevents breaking on small screens
          gap: 2,
        }}
      >
        <Typography
          variant="h4"
          fontWeight="bold"
          sx={{ color: "text.primary" }}
        >
          Products
        </Typography>

        <Button
          variant="contained"
          onClick={() => router.push("/admin/add-product")}
          sx={{
            borderRadius: "8px",
            textTransform: "none",
            px: 3,
            whiteSpace: "nowrap",
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

      {/* TABLE SECTION */}
      <TableContainer component={Paper} sx={{ borderRadius: "12px", boxShadow: 3 }}>
        <Table sx={{ minWidth: 800 }}>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold",fontSize:16 }}>Image</TableCell>
              <TableCell sx={{ fontWeight: "bold",fontSize:16  }}>Title</TableCell>
              <TableCell sx={{ fontWeight: "bold" ,fontSize:16 }}>Price</TableCell>
              <TableCell sx={{ fontWeight: "bold",fontSize:16  }}>Stock</TableCell>
              <TableCell sx={{ fontWeight: "bold",fontSize:16  }}>Category</TableCell>
              <TableCell sx={{ fontWeight: "bold" ,fontSize:16 }}>Status</TableCell>
              <TableCell align="right" sx={{ fontWeight: "bold", pr: 4 }}>Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {filteredProducts.map((p) => (
              <TableRow key={p._id} hover sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>

                {/* IMAGE - Using Avatar for consistent sizing */}
                <TableCell>
                  <Avatar
                    src={p.image || "/images/sample.jpg"}
                    variant="rounded"
                    sx={{ width: 48, height: 48, border: "1px solid #eee" }}
                  />
                </TableCell>

                {/* TITLE */}
                <TableCell sx={{ fontWeight: 500 }}>{p.title}</TableCell>

                {/* PRICE */}
                <TableCell>${p.price?.toLocaleString()}</TableCell>

                {/* STOCK */}
                <TableCell>{p.stock}</TableCell>

                {/* CATEGORY */}
                <TableCell>
                  <Typography variant="body2" color="text.secondary">
                    {p.category || "Uncategorized"}
                  </Typography>
                </TableCell>

                {/* STATUS */}
                <TableCell>
                  <Chip
                    label={p.stock > 0 ? "In Stock" : "Out of Stock"}
                    color={p.stock > 0 ? "success" : "error"}
                    size="small"
                    sx={{ fontWeight: "bold", borderRadius: "6px" }}
                  />
                </TableCell>

                {/* ACTIONS */}
                <TableCell align="right">
                  <Box sx={{ display: "flex", gap: 1, justifyContent: "flex-end" }}>
                    <Button
                      size="small"
                      variant="outlined"
                      sx={{
                        borderColor: "main",
                        textTransform: "none",
                      }}
                      onClick={() => router.push(`/admin/edit-product/${p._id}`)}
                    >
                      Edit
                    </Button>

                    <Button
                      size="small"
                      variant="outlined"
                      color="error"
                      sx={{
                        textTransform: "none",
                      }}
                      onClick={() => handleDelete(p._id)}
                    >
                      Delete
                    </Button>
                  </Box>
                </TableCell>

              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}