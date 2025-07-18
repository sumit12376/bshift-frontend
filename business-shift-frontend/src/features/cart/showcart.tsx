"use client";

import React, { useEffect, useState } from "react";
import { showcart } from "@/api/show.cart";
import {
  Box,
  CircularProgress,
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  IconButton,
  Divider,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Cookies from "js-cookie";
interface CartItem {
  menuItemId: number;
  quantity: number;
  price: number;
}

interface Cart {
  id: number;
  userId: number;
  items: CartItem[];
  createdAt: string;
  updatedAt: string;
}

export default function ShowCart() {
  const [cart, setCart] = useState<Cart | null>(null);
  const [loading, setLoading] = useState(true);
const userId = Cookies.get("userid");
console.log(userId)
//   const userId = localStorage.getItem("userId") || "2";

  const fetchCartData = async () => {
    try {
      setLoading(true);
      const res = await showcart(userId);
      setCart(res);
      console.log("res",res)
    } catch (err) {
      console.error("Error fetching cart:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCartData();
  }, []);

  const handleRemoveItem = (menuItemId: number) => {
    alert(`Remove functionality not yet implemented for item ${menuItemId}`);
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
<Box display="flex" justifyContent="center" alignItems="center" gap={1} mb={2}>
  <ShoppingCartIcon sx={{ fontSize: 40, color: 'black' }} />
  <Typography variant="h4" color="black" fontWeight="bold">
    Your Cart
  </Typography>
</Box>

      {loading ? (
        <Box display="flex" justifyContent="center" mt={4}>
          <CircularProgress />
        </Box>
      ) : cart?.items?.length ? (
        <Grid container spacing={2}>
          {cart.items.map((item, index) => (
            <Grid item xs={12} key={index}>
              <Card variant="outlined">
                <CardContent>
                  <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Box>
                      <Typography variant="h6">Menu ID: {item.menuItemId}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        Quantity: {item.quantity}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Price per unit: ₹{item.price}
                      </Typography>
                    </Box>

                    <Box textAlign="right">
                      <Typography variant="h6" color="success.main">
                        ₹{item.quantity * item.price}
                      </Typography>
                      <IconButton
                        onClick={() => handleRemoveItem(item.menuItemId)}
                        color="error"
                        size="small"
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}

          <Grid item xs={12}>
            <Divider sx={{ my: 2 }} />
            <Typography variant="h6" align="right">
              Total: ₹
              {cart.items.reduce((acc, item) => acc + item.price * item.quantity, 0)}
            </Typography>
          </Grid>
        </Grid>
      ) : (
        <Typography variant="body1" color="text.secondary" align="center">
          Your cart is empty.
        </Typography>
      )}
    </Container>
  );
}