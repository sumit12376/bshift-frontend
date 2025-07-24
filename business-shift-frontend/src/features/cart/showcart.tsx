"use client";

import React, { useEffect, useState } from "react";
import { showcart } from "@/api/show.cart";
import {
  Box,
  CircularProgress,
  Typography,
  Card,
  CardContent,
  Grid,
  IconButton,
  Divider,
  Button,
} from "@mui/material";
import { useRouter } from 'next/navigation';


import DeleteIcon from "@mui/icons-material/Delete";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Cookies from "js-cookie";
import placeorder from "../placeOrders/placeorder";
interface CartItem {
  menuItemId: number;
  quantity: number;
  price: number;
}
// import placeorderss from "@/"
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
  const router = useRouter();
  const fetchCartData = async () => {
    try {
      setLoading(true);
      const res = await showcart(userId);
      setCart(res);
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
  const handlePayNow = () => {
    localStorage.setItem("cart", JSON.stringify(cart));
    router.push("/placeorderss");
  };

  

  const totalAmount = cart?.items?.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
console.log("cart state", cart)
  return (
    <Box sx={{ px: 2, py: 4, width: "100%", minHeight: "100vh", position: "relative" }}>
      <Box display="flex" justifyContent="center" alignItems="center" gap={1} mb={3}>
        <ShoppingCartIcon sx={{ fontSize: 40, color: "black" }} />
        <Typography variant="h4" fontWeight="bold" color="black">
          Your Cart
        </Typography>
      </Box>

      {loading ? (
        <Box display="flex" justifyContent="center" mt={4}>
          <CircularProgress />
        </Box>
      ) : cart?.items?.length ? (
        <>
          <Box sx={{ maxHeight: "calc(100vh - 200px)", overflowY: "auto", pr: 1 }}>
            <Grid container spacing={2}>
              {cart.items.map((item, index) => (
                <Grid item xs={12} key={index}>
                  <Card variant="outlined" sx={{ width: "100%" }}>
                    <CardContent>
                      <Box display="flex" justifyContent="space-between" alignItems="center">
                        <Box>
                          <Typography variant="h6"> {item.menuName}</Typography>
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
            </Grid>
          </Box>

          <Box
            sx={{
              position: "sticky",
              bottom: 0,
              left: 0,
              right: 0,
              backgroundColor: "white",
              borderTop: "1px solid #ccc",
              mt: 3,
              py: 2,
              px: 2,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              zIndex: 10,
            }}
          >
            <Typography variant="h6" fontWeight="bold">
              Total: ₹{totalAmount}
                  <Button
        variant="contained"
        color="primary"
        sx={{ ml: 4 }}
        onClick={handlePayNow}
      >
              Pay Now
            </Button>
            </Typography>
        
          </Box>
        </>
      ) : (
        <Typography variant="body1" color="text.secondary" align="center">
          Your cart is empty.
        </Typography>
      )}
    </Box>
  );
}
