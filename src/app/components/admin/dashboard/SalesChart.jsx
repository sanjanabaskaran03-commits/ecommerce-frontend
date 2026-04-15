"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Box, Typography, useTheme } from "@mui/material";

export default function SalesChart() {
  const theme = useTheme();

  const data = [
    { name: "Jan", sales: 400 },
    { name: "Feb", sales: 700 },
    { name: "Mar", sales: 500 },
    { name: "Apr", sales: 900 },
    { name: "May", sales: 600 },
  ];

  return (
    <Box
      sx={{
        p: 3,
        borderRadius: 3,
        bgcolor: "background.paper",
        boxShadow: 2,
      }}
    >
      <Typography variant="h6" mb={2}>
        Sales Overview
      </Typography>

      <ResponsiveContainer width="100%" height={250}>
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
  );
}