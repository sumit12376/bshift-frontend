"use client";

import {
  Box,
  Typography,
  CircularProgress,
  Divider,
  Paper,
  Chip,
  Grid,
} from "@mui/material";
import { useEffect, useState } from "react";
import { getOrder } from "@/api/order.api";
import Cookies from "js-cookie";
export default function OrderFunction() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    async function fetchOrders() {
      try {
      const userId = Cookies.get("userid");
        const response = await getOrder(userId);
        console.log(response);
        setOrders(response.Orders || []);
      } catch (error) {
        console.error("Failed to fetch orders:", error);
        setOrders([]);
      } finally {
        setLoading(false);
      }
    }

    fetchOrders();
  }, []);

  if (loading)
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );

  if (!orders.length) {
    return (
      <Typography textAlign="center" mt={4}>
        No orders found.
      </Typography>
    );
  }

  return (
    <Box p={3}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Your Orders
      </Typography>

      {orders.map((order, index) => {
        const totalAmount = order.items?.reduce(
          (sum, item) => sum + item.totalAmount,
          0
        ) ?? 0;

        return (
          <Paper
            key={index}
            elevation={3}
            sx={{
              mb: 4,
              p: 3,
              borderRadius: 3,
              transition: "0.3s",
              ":hover": { boxShadow: 6 },
            }}
          >
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Typography variant="h6">Order ID: {order.id}</Typography>
              <Chip
                label={order.status}
                color={order.status === "Delivered" ? "success" : "warning"}
                variant="outlined"
              />
            </Box>

            <Typography mt={1}>Payment Method: {order.paymentMethod}</Typography>
            <Typography>Address: {order.address}</Typography>

            <Divider sx={{ my: 2 }} />

            <Typography variant="subtitle1" fontWeight="bold">
              Ordered Items:
            </Typography>

            <Grid container spacing={2} mt={1}>
              {order.items?.map((item, idx) => (
                <Grid item xs={12} sm={6} md={4} key={idx}>
                  <Paper variant="outlined" sx={{ p: 2, borderRadius: 2 }}>
                    <Typography variant="body2">Menu ID: {item.menuId}</Typography>
                    <Typography fontWeight="bold" color="primary">
                      ₹{item.totalAmount}
                    </Typography>
                  </Paper>
                </Grid>
              ))}
            </Grid>

            <Divider sx={{ my: 2 }} />

            <Box display="flex" justifyContent="flex-end">
              <Typography fontWeight="bold" fontSize="1.2rem" color="green">
                Total Amount: ₹{totalAmount}
              </Typography>
            </Box>
          </Paper>
        );
      })}
    </Box>
  );
}
