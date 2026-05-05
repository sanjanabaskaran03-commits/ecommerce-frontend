"use client";

import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Divider,
  Stack,
} from "@mui/material";

const API = process.env.NEXT_PUBLIC_API_URL;

const OrdersView = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const res = await fetch(`${API}/api/order/my-orders`, {
        credentials: "include",
      });

      const data = await res.json();
      setOrders(data || []);
    };

    fetchOrders();
  }, []);

  return (
    <Box sx={{ maxWidth: 1000, mx: "auto", p: 3 }}>
      <Typography variant="h5" mb={3} fontWeight="bold">
        My Orders
      </Typography>

      {orders.length === 0 ? (
        <Typography>No orders found</Typography>
      ) : (
        orders.map((order) => (
          <Box
            key={order._id}
            sx={{
              p: 2,
              mb: 2,
              border: "1px solid",
              borderColor: "divider",
              borderRadius: 2,
            }}
          >
            <Typography fontWeight={600}>
              Order ID: {order._id}
            </Typography>

            <Typography color="text.secondary">
              Status: {order.status || "Paid"}
            </Typography>

            <Divider sx={{ my: 1 }} />

            {order.items.map((item, i) => (
              <Stack key={i} direction="row" justifyContent="space-between">
                <Typography>{item.title}</Typography>
                <Typography>Qty: {item.qty}</Typography>
              </Stack>
            ))}
          </Box>
        ))
      )}
    </Box>
  );
};

export default OrdersView;