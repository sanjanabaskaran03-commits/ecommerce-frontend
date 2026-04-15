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

export default function RecentOrders() {
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
        boxShadow: 2,
      }}
    >
      <Typography variant="h6" mb={2}>
        Recent Orders
      </Typography>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>User</TableCell>
            <TableCell>Total</TableCell>
            <TableCell>Status</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.id}>
              <TableCell>{order.user}</TableCell>
              <TableCell>{order.total}</TableCell>
              <TableCell>
                <Chip
                  label={order.status}
                  color={
                    order.status === "Delivered"
                      ? "success"
                      : order.status === "Pending"
                      ? "warning"
                      : "error"
                  }
                  size="small"
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
}