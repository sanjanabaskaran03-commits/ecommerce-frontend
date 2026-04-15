"use client";

import { Grid } from "@mui/material";
import StatsCard from "@/src/components/admin/dashboard/StatsCard";
import SalesChart from "@/src/components/admin/dashboard/SalesChart";
import RecentOrders from "@/src/components/admin/dashboard/RecentOrders";

export default function DashboardPage() {
  return (
    <Grid container spacing={3}>
      
      {/* Stats */}
      <Grid item xs={12} md={4}>
        <StatsCard title="Products" value="120" />
      </Grid>

      <Grid item xs={12} md={4}>
        <StatsCard title="Orders" value="45" />
      </Grid>

      <Grid item xs={12} md={4}>
        <StatsCard title="Revenue" value="$1200" />
      </Grid>

      {/* Chart */}
      <Grid item xs={12} md={8}>
        <SalesChart />
      </Grid>

      {/* Orders */}
      <Grid item xs={12} md={4}>
        <RecentOrders />
      </Grid>

    </Grid>
  );
}