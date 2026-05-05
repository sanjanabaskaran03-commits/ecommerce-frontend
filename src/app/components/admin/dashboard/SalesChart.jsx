"use client";

import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Box, Typography, useTheme } from "@mui/material";
import { unwrapProductsResponse } from "@/src/app/utils/productFilters";

export default function SalesChart() {
  const theme = useTheme();
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/products", { credentials: "include" });
        const json = await res.json();
        const products = unwrapProductsResponse(json);

        const chartData = products.map((p, i) => ({
          name: p.title?.slice(0, 10) || `Item ${i + 1}`,
          sales: p.orders || Math.floor(Math.random() * 100),
        }));

        setData(chartData);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  return (
    <Box
      sx={{
        p: 3,
        borderRadius: 3,
        bgcolor: "background.paper",
        border: "1px solid",
        borderColor: "divider",
      }}
    >
      <Typography variant="h6" sx={{ mb: 2 }} style={{ color: theme.palette.text.primary }}>
        Sales Overview
      </Typography>

      <Box sx={{ width: "100%", height: 300, minWidth: 0, minHeight: 0 }}>
        <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
          <LineChart data={data}>
            <XAxis dataKey="name" stroke={theme.palette.text.secondary} />
            <YAxis stroke={theme.palette.text.secondary} />
            <Tooltip />

            <Line
              type="monotone"
              dataKey="sales"
              stroke={theme.palette.primary.main}
              strokeWidth={3}
            />
          </LineChart>
        </ResponsiveContainer>
      </Box>
    </Box>
  );
}
