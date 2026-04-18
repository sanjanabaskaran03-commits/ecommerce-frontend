"use client";

import { Box } from "@mui/material";
import { useEffect, useState } from "react";

import StatsCard from "@/src/app/components/admin/dashboard/StatsCard";
import SalesChart from "@/src/app/components/admin/dashboard/SalesChart";
import RecentOrders from "@/src/app/components/admin/dashboard/RecentOrders";

export default function DashboardPage() {
  const [stats, setStats] = useState({
    total: 0,
    active: 0,
    inactive: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/products");
        const data = await res.json();

        console.log("PRODUCTS FROM API:", data); // 🔍 debug

        const total = data.length;

        // ✅ STOCK is the real source of truth in your app
        const active = data.filter((p) => Number(p.stock) > 0).length;

        const inactive = data.filter((p) => Number(p.stock) === 0).length;

        setStats({
          total,
          active,
          inactive,
        });
      } catch (err) {
        console.log("Dashboard fetch error:", err);
      }
    };

    fetchStats();
  }, []);

  return (
    <Box
      sx={{
        p: { xs: 2, sm: 3, md: 4 },
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        gap: 3,
        bgcolor: "background.default",
      }}
    >
      {/* STATS ROW */}
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 2,
        }}
      >
        <Box sx={{ flex: "1 1 250px" }}>
          <StatsCard title="Total Products" value={stats.total} />
        </Box>

        <Box sx={{ flex: "1 1 250px" }}>
          <StatsCard title="Active Products" value={stats.active} />
        </Box>

        <Box sx={{ flex: "1 1 250px" }}>
          <StatsCard title="Inactive Products" value={stats.inactive} />
        </Box>
      </Box>

      {/* CHART */}
      <Box>
        <SalesChart />
      </Box>

      {/* RECENT ORDERS */}
      <Box>
        <RecentOrders />
      </Box>
    </Box>
  );
}