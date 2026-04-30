"use client";

import {
  Stack,
  TextField,
  Select,
  MenuItem,
  useTheme,
  useMediaQuery,
} from "@mui/material";

export default function ProductFilters({
  filter,
  setFilter,
  search,
  setSearch,
}) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Stack spacing={2} sx={{ width: "100%" }}>

      {/* 🔍 SEARCH BAR */}
      <TextField
        fullWidth
        placeholder="Search products..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        size="small"
      />

      {/* 📦 FILTERS ROW */}
      <Stack
        direction="row"
        spacing={{ xs: 1, md: 2 }}
        sx={{
          width: "100%",
        }}
      >
        {/* CATEGORY */}
        <Select
          value={filter.category}
          onChange={(e) =>
            setFilter({ ...filter, category: e.target.value })
          }
          displayEmpty
          size="small"
          renderValue={(selected) => {
            if (!selected) {
              return isMobile ? "Category" : "All Category";
            }
            return selected;
          }}
          sx={{
            flex: 1,
            minWidth: 0,
          }}
        >
          <MenuItem value="">All Category</MenuItem>
          <MenuItem value="Mobiles">Mobiles</MenuItem>
          <MenuItem value="Clothes and wear">Clothes</MenuItem>
          <MenuItem value="Home interiors">Home</MenuItem>
        </Select>

        {/* SECTION */}
        <Select
          value={filter.section}
          onChange={(e) =>
            setFilter({ ...filter, section: e.target.value })
          }
          displayEmpty
          size="small"
          renderValue={(selected) => {
            if (!selected) {
              return isMobile ? "Section" : "All Section";
            }
            return selected;
          }}
          sx={{
            flex: 1,
            minWidth: 0,
          }}
        >
          <MenuItem value="">All Section</MenuItem>
          <MenuItem value="deals">Deals</MenuItem>
          <MenuItem value="electronics">Electronics</MenuItem>
          <MenuItem value="home">Home</MenuItem>
        </Select>

        {/* STOCK */}
        <Select
          value={filter.stock}
          onChange={(e) =>
            setFilter({ ...filter, stock: e.target.value })
          }
          displayEmpty
          size="small"
          renderValue={(selected) => {
            if (!selected) {
              return isMobile ? "Stock" : "All Stock";
            }
            return selected;
          }}
          sx={{
            flex: 1,
            minWidth: 0,
          }}
        >
          <MenuItem value="">All Stock</MenuItem>
          <MenuItem value="in">In Stock</MenuItem>
          <MenuItem value="out">Out of Stock</MenuItem>
        </Select>
      </Stack>
    </Stack>
  );
}