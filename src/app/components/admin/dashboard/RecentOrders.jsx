"use client";

import {
  Box,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Chip,
} from "@mui/material";
import { useTheme } from "@mui/material";

export default function RecentOrders() {
  const theme = useTheme();
  const orders = [
    { id: 1, user: "Sanjana", total: "$120", status: "Delivered" },
    { id: 2, user: "Arun", total: "$80", status: "Pending" },
    { id: 3, user: "Kiran", total: "$200", status: "Cancelled" },
  ];

  return (
    <Box
      sx={{
        p: 3,
        borderRadius: 3,
        bgcolor: "background.paper",
        border: "1px solid",
        borderColor: "divider",
        height: "100%",
      }}
    >
      <Typography variant="h6" sx={{ mb: 2 }} style={{ color: theme.palette.text.primary }}>
        Recent Orders
      </Typography>

      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell style={{ color: theme.palette.text.primary, fontSize: 18, fontWeight: 200 }}>User</TableCell>
            <TableCell style={{ color: theme.palette.text.primary, fontSize: 18, fontWeight: 200 }}>Total</TableCell>
            <TableCell style={{ color: theme.palette.text.primary, fontSize: 18, fontWeight: 200 }}>Status</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.id}>
              <TableCell style={{ color: theme.palette.text.secondary }}>{order.user}</TableCell>
              <TableCell style={{ color: theme.palette.text.secondary }}>{order.total}</TableCell>
              <TableCell>
                <Chip
                  label={order.status}
                  size="small"
                  color={
                    order.status === "Delivered"
                      ? "success"
                      : order.status === "Pending"
                        ? "warning"
                        : "error"
                  }
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
}