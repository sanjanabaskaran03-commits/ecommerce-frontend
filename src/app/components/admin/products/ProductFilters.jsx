"use client";

import { Box, Select, MenuItem, TextField } from "@mui/material";

export default function ProductFilters({
  filter,
  setFilter,
  search,
  setSearch,
}) {
  return (
    <Box display="flex" gap={2} mb={2}>

      {/* SEARCH */}
      <TextField
        label="Search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        size="small"
      />

      {/* CATEGORY FILTER */}
      <Select
        value={filter.category}
        onChange={(e) =>
          setFilter((prev) => ({ ...prev, category: e.target.value }))
        }
        displayEmpty
        size="small"
      >
        <MenuItem value="">All Categories</MenuItem>
        <MenuItem value="Mobiles">Mobiles</MenuItem>
        <MenuItem value="Clothes and wear">Clothes and wear</MenuItem>
        <MenuItem value="Home interiors">Home interiors</MenuItem>
        <MenuItem value="Computer and tech">Computer and tech</MenuItem>
        <MenuItem value="Accessories">Accessories</MenuItem>
        <MenuItem value="Tools and machinery">Tools and machinery</MenuItem>
        <MenuItem value="Sports and outdoor">Sports and outdoor</MenuItem>
        <MenuItem value="Animal and pets">Animal and pets</MenuItem>
        <MenuItem value="Machinery tools">Machinery tools</MenuItem>
      </Select>

      {/* SECTION FILTER */}
      <Select
        value={filter.section}
        onChange={(e) =>
          setFilter((prev) => ({ ...prev, section: e.target.value }))
        }
        displayEmpty
        size="small"
      >
        <MenuItem value="">All Sections</MenuItem>
        <MenuItem value="deals">Deals</MenuItem>
        <MenuItem value="electronics">Electronics</MenuItem>
        <MenuItem value="home">Home</MenuItem>
      </Select>

      {/* STOCK FILTER */}
      <Select
        value={filter.stock}
        onChange={(e) =>
          setFilter((prev) => ({ ...prev, stock: e.target.value }))
        }
        displayEmpty
        size="small"
      >
        <MenuItem value="">All Stock</MenuItem>
        <MenuItem value="in">In Stock</MenuItem>
        <MenuItem value="out">Out of Stock</MenuItem>
      </Select>

    </Box>
  );
}