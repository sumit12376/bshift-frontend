"use client";

import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Grid,
  CircularProgress,
  Chip,
  Stack,
  Button,
  IconButton,
  Tooltip,
  Snackbar,
  Alert,
} from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getMenuByRestaurantId } from "@/api/menu.api";
import axios from "axios";
import Cookies from "js-cookie";
const BASE_URL = process.env.NEXT_PUBLIC_BASE_API || "http://localhost:8005";

interface MenuItem {
  id: number;
  name: string;
  price: number;
  category: string;
  description: string;
  Image: string[];
}

interface RestaurantData {
  restaurantName: string;
  address: string;
  phone: string;
  email: string;
  menus: MenuItem[];
}

interface CartItem {
  menuItemId: number;
  quantity: number;
  price: number;
}

export default function RestaurantDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [cartLoading, setCartLoading] = useState(false);
  const [restaurant, setRestaurant] = useState<RestaurantData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [countMap, setCountMap] = useState<Record<string, number>>({});
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success" as "success" | "error",
  });

  useEffect(() => {
    const fetchRestaurantData = async () => {
      try {
        const data = await getMenuByRestaurantId(id);
        setRestaurant(data);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch restaurant data");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchRestaurantData();
  }, [id]);

const handleCreateCart = async () => {
  try {
    setCartLoading(true);
    
const itemss = Object.entries(countMap)
console.log("itemssss",itemss)
    const items = Object.entries(countMap)
      .filter(([_, quantity]) => quantity > 0)
      .map(([menuItemId, quantity]) => {
        const menu = restaurant?.menus.find(m => m.id === parseInt(menuItemId));
        if (!menu) {
          throw new Error(`Menu item ${menuItemId} not found`);
        }
        return {
          menuItemId: parseInt(menuItemId), 
          quantity: Number(quantity),     
          price: Number(menu.price)*quantity     
        };
      });

    if (items.length === 0) {
      setSnackbar({
        open: true,
        message: "Please add at least one item to the cart",
        severity: "error",
      });
      return;
    }
    const userid = Cookies.get('userid')
    console.log("Cart payload:", {
      userId: Number(userid),
      items
    });

    const response = await axios.post(`${BASE_URL}/api/cart/createcart`, {
      userId: Number(userid),
      items
    }, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    setSnackbar({
      open: true,
      message: "Cart created successfully!",
      severity: "success",
    });
    setCountMap({});
    
  } catch (error) {
    console.error("Failed to create cart", error);
    
    if (axios.isAxiosError(error)) {
      setSnackbar({
        open: true,
        message: `Error: ${error.response?.data?.error || error.message}`,
        severity: "error",
      });
    } else {
      setSnackbar({
        open: true,
        message: `Failed to create cart: ${error instanceof Error ? error.message : 'Unknown error'}`,
        severity: "error",
      });
    }
  } finally {
    setCartLoading(false);
  }
};

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" p={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (error || !restaurant) {
    return (
      <Box p={4} textAlign="center">
        <Typography color="error">
          {error || "Restaurant not found."}
        </Typography>
      </Box>
    );
  }

  const { restaurantName, address, phone, email, menus } = restaurant;

  return (
    <Box p={{ xs: 2, md: 4 }}>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity}>
          {snackbar.message}
        </Alert>
      </Snackbar>

      <Box mb={4}>
        <Typography variant="h4" fontWeight={600} gutterBottom>
          {restaurantName}
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          {address}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {email} | {phone}
        </Typography>
      </Box>

      <Button
        sx={{
          color: "white",
          backgroundColor: "green",
          fontWeight: "bold",
          mb: 2,
          mr: 2,
          "&:disabled": { opacity: 0.7 },
        }}
        onClick={() => router.push(`/menuedit/${id}`)}
      >
        Add Menu
      </Button>

      <Button
        sx={{
          color: "white",
          backgroundColor: "blue",
          fontWeight: "bold",
          mb: 2,
          "&:disabled": { opacity: 0.7 },
        }}
        onClick={handleCreateCart}

      >
        {cartLoading ? (
          <CircularProgress size={24} color="inherit" />
        ) : (
          "Submit Cart"
        )}
      </Button>

      <Box>
        <Typography variant="h5" fontWeight={600} gutterBottom>
          Menu
        </Typography>

        {menus?.length > 0 ? (
          <Grid container spacing={3}>
            {menus.map((menu) => (
              <Grid item xs={12} sm={6} md={4} key={menu.id}>
                <Card
                  sx={{
                    borderRadius: 3,
                    boxShadow: 3,
                    transition: "0.3s",
                    "&:hover": { boxShadow: 6 },
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  {menu.Image?.length > 0 && (
                    <Box display="flex" gap={1} overflow="auto" px={1} pt={1}>
                      {menu.Image.slice(0, 2).map((imgUrl, index) => (
                        <CardMedia
                          key={index}
                          component="img"
                          height="140"
                          image={imgUrl}
                          alt={`${menu.name} image ${index + 1}`}
                          sx={{
                            width: 150,
                            borderRadius: 2,
                            objectFit: "cover",
                          }}
                        />
                      ))}
                    </Box>
                  )}

                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography
                      variant="h6"
                      fontWeight={600}
                      gutterBottom
                      noWrap
                    >
                      {menu.name}
                    </Typography>

                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                      spacing={1}
                    >
                      <Typography variant="body2" color="text.secondary">
                        ₹{menu.price}
                      </Typography>
                      <Chip label={menu.category} size="small" />
                    </Stack>

                    <Stack
                      direction="row"
                      alignItems="center"
                      justifyContent="space-between"
                      spacing={1}
                      mt={1}
                    >
                      <Tooltip title="Add to Cart">
                        <IconButton
                          onClick={() =>
                            setCountMap((prev) => ({
                              ...prev,
                              [menu.id]: (prev[menu.id] || 0) + 1,
                            }))
                          }
                          color="primary"
                          disabled={cartLoading}
                        >
                          <AddShoppingCartIcon />
                        </IconButton>
                      </Tooltip>

                      <Typography>Qty: {countMap[menu.id] || 0}</Typography>

                      <Tooltip title="Remove from Cart">
                        <IconButton
                          onClick={() =>
                            setCountMap((prev) => ({
                              ...prev,
                              [menu.id]: Math.max((prev[menu.id] || 0) - 1, 0),
                            }))
                          }
                          color="error"
                          disabled={cartLoading || !countMap[menu.id]}
                        >
                          <RemoveShoppingCartIcon />
                        </IconButton>
                      </Tooltip>
                    </Stack>

                    <Typography
                      variant="body2"
                      color="text.secondary"
                      mt={1}
                      sx={{
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                      }}
                    >
                      {menu.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        ) : (
          <Typography>No menu items available.</Typography>
        )}
      </Box>
    </Box>
  );
}
