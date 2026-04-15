"use client";

import { Box, Typography, Grid, Paper, useTheme } from "@mui/material";

export default function AdminDashboard() {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  const stats = [
    { label: "Products", value: 120 },
    { label: "Orders", value: 45 },
    { label: "Revenue", value: "$1200" },
  ];

  const orders = [
    { name: "Sanjana", total: "$120", status: "Delivered" },
    { name: "Arun", total: "$80", status: "Pending" },
    { name: "Kiran", total: "$200", status: "Cancelled" },
  ];

  const getStatusColor = (status) => {
    if (status === "Delivered") return "success.main";
    if (status === "Pending") return "warning.main";
    return "error.main";
  };

  return (
    <Box sx={{ p: 3, bgcolor: "background.default", minHeight: "100vh" }}>
      
      <Typography variant="h5" fontWeight={600} mb={3}>
        Admin Dashboard
      </Typography>

      {/* STATS */}
      <Grid container spacing={2}>
        {stats.map((item, index) => (
          <Grid item xs={12} sm={4} key={index}>
            <Paper
              elevation={0}
              sx={{
                p: 3,
                borderRadius: "16px",
                bgcolor: "background.paper",
                border: `1px solid ${theme.palette.divider}`,
                textAlign: "center",
              }}
            >
              <Typography variant="body2" color="text.secondary">
                {item.label}
              </Typography>
              <Typography variant="h5" fontWeight={700}>
                {item.value}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* MAIN CONTENT */}
      <Grid container spacing={2} mt={1}>
        
        {/* SALES CHART (Placeholder) */}
        <Grid item xs={12} md={6}>
          <Paper
            sx={{
              p: 3,
              borderRadius: "16px",
              bgcolor: "background.paper",
              border: `1px solid ${theme.palette.divider}`,
            }}
          >
            <Typography fontWeight={600} mb={2}>
              Sales Overview
            </Typography>

            <Box
              sx={{
                height: 200,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "text.secondary",
              }}
            >
              Chart goes here 📊
            </Box>
          </Paper>
        </Grid>

        {/* RECENT ORDERS */}
        <Grid item xs={12} md={6}>
          <Paper
            sx={{
              p: 3,
              borderRadius: "16px",
              bgcolor: "background.paper",
              border: `1px solid ${theme.palette.divider}`,
            }}
          >
            <Typography fontWeight={600} mb={2}>
              Recent Orders
            </Typography>

            {orders.map((order, index) => (
              <Box
                key={index}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  py: 1,
                  borderBottom:
                    index !== orders.length - 1
                      ? `1px solid ${theme.palette.divider}`
                      : "none",
                }}
              >
                <Typography>{order.name}</Typography>
                <Typography>{order.total}</Typography>
                <Typography
                  sx={{
                    px: 1.5,
                    borderRadius: "12px",
                    fontSize: "12px",
                    bgcolor: getStatusColor(order.status),
                    color: "#fff",
                  }}
                >
                  {order.status}
                </Typography>
              </Box>
            ))}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}