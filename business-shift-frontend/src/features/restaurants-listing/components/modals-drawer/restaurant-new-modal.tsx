'use client';

import { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material';
import { Grid } from '@mui/material';
import { useAtom } from "jotai";

import { openNewRestaurantModalAtom } from "../../state/modals-drawers";
import { useMutationRestaurant } from "../../hooks/api/use-mutation-new-restaurant";

interface FormData {
  restaurantName: string;
  description: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  phoneNumber: string;
  email: string;
  openingHours: string;
}

export const NewRestaurantModal = () => {
  const [open, setOpen] = useAtom(openNewRestaurantModalAtom);
  const { trigger } = useMutationRestaurant();

  const [formData, setFormData] = useState<FormData>({
    restaurantName: '',
    description: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    phoneNumber: '',
    email: '',
    openingHours: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCreate = async () => {
    const response = await trigger({ ...formData });

    if (!response.data.success) {
      alert(response.data.message);
      return;
    }
    setOpen(false);
    setFormData({
      restaurantName: '',
      description: '',
      address: '',
      city: '',
      state: '',
      zipCode: '',
      country: '',
      phoneNumber: '',
      email: '',
      openingHours: '',
    });
  };

  return (
    <Dialog open={open} onClose={() => setOpen(false)} maxWidth="md" fullWidth>
      <DialogTitle>New Restaurant</DialogTitle>
      <DialogContent>
        <Grid container spacing={2} sx={{ mt: 1 }}>
          {Object.entries(formData).map(([key, value]) => (
            <Grid item xs={12} sm={6} key={key}>
              <TextField
                name={key}
                label={key}
                value={value}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
          ))}
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setOpen(false)}>Cancel</Button>
        <Button variant="contained" onClick={handleCreate}>
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
};
