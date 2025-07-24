import React, { useState } from 'react';
import { createOrder } from '@/api/order.api';
import { useRouter } from 'next/navigation';
import {
  Box,
  Button,
  MenuItem,
  Select,
  TextField,
  Typography,
  FormControl,
  InputLabel,
} from '@mui/material';

function PlaceOrder({ cart }) {
  const router = useRouter();

  const [order, setOrder] = useState({
    address: '',
    paymentMethod: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOrder((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!order.address || !order.paymentMethod) {
      alert('Please fill all fields');
      return;
    }

    const payload = {
      status: 'pending',
      userId: cart.userId,
      items: cart.items.map((item) => ({
        menuId: item.menuItemId,
        totalAmount: item.quantity* item.price,
      })),
      address: order.address,
      paymentMethod: order.paymentMethod,
    };

    try {
      await createOrder(payload);
      alert('Order placed successfully');
      setOrder({ address: '', paymentMethod: '' });
      router.push('/order');
    } catch (err) {
      console.error('Error placing order:', err);
      alert('Failed to place order');
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 3,
        p: 4,
        maxWidth: 500,
        mx: 'auto',
      }}
    >
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        Place Your Order
      </Typography>

      <TextField
        fullWidth
        label="Address"
        name="address"
        variant="outlined"
        value={order.address}
        onChange={handleChange}
      />

      <FormControl fullWidth>
        <InputLabel id="payment-method-label">Payment Method</InputLabel>
        <Select
          labelId="payment-method-label"
          name="paymentMethod"
          value={order.paymentMethod}
          onChange={handleChange}
          label="Payment Method"
        >
          <MenuItem value="">Select payment method</MenuItem>
          <MenuItem value="cod">Cash on Delivery</MenuItem>
          <MenuItem value="net banking">Net Banking</MenuItem>
        </Select>
      </FormControl>

      <Button type="submit" variant="contained" color="primary">
        Submit Order
      </Button>
    </Box>
  );
}

export default PlaceOrder;
