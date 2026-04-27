"use client";

import React from "react";
import { Pagination, Select, MenuItem, Stack, Box, useMediaQuery, useTheme } from "@mui/material";

const PaginationSection = ({ page, setPage, totalPages, limit, setLimit }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Box sx={{ width: "100%" }}>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={2}
        sx={{
          width: "100%",
          mt: 4,
          mb: 6,
          alignItems: "center",
          justifyContent: { xs: "center", md: "flex-end" },
        }}
      >
        {/* ✅ LIMIT SELECT */}
        <Select
          value={limit}
          size="small"
          onChange={(e) => {
            setLimit(e.target.value);
            setPage(1); // reset page
          }}
          sx={{ bgcolor: "background.paper", minWidth: "120px" }}
        >
          <MenuItem value={5}>Show 5</MenuItem>
          <MenuItem value={10}>Show 10</MenuItem>
          <MenuItem value={20}>Show 20</MenuItem>
        </Select>

        {/* ✅ PAGINATION */}
        <Pagination
          count={totalPages}
          page={page}
          onChange={(e, value) => setPage(value)}
          variant="outlined"
          shape="rounded"
          color="primary"
          size={isMobile ? "small" : "medium"}
        />
      </Stack>
    </Box>
  );
};

export default PaginationSection;
