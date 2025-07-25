'use client';

import {
  Box,
  Button,
  TextField,
  Typography,
  MenuItem,
  CircularProgress,
  FormControl,
  InputLabel,
  FormHelperText,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import axios from 'axios';

type FormFields = {
  name: string;
  price: string;
  description: string;
  category: string;
};

export default function AddMenuPage() {
  const { restaurantId } = useParams();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormFields>();

  const [loading, setLoading] = useState(false);
  const [responseMsg, setResponseMsg] = useState('');
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [imageError, setImageError] = useState('');

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    const newFiles = Array.from(files);
    setSelectedImages((prev) => [...prev, ...newFiles]);
    setImageError(''); // clear error
  };

  const onSubmit = async (data: FormFields) => {
    if (!restaurantId) {
      setResponseMsg('Restaurant ID is missing in URL');
      return;
    }

    if (selectedImages.length === 0) {
      setImageError('At least one image is required.');
      return;
    }

    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('price', data.price);
    formData.append('description', data.description);
    formData.append('category', data.category);
    formData.append('restaurantId', restaurantId.toString());

    selectedImages.forEach((file) => {
      formData.append('Image', file); // assuming backend expects 'Image'
    });

    try {
      setLoading(true);
      const response = await axios.post(
        'http://localhost:8005/api/Menu/CreateMenu',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      setResponseMsg(response.data?.message || 'Menu created successfully');
      reset();
      setSelectedImages([]);
    } catch (err) {
      console.error(err);
      setResponseMsg('Failed to create menu item.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box maxWidth={600} mx="auto" mt={4}>
      <Typography variant="h4" gutterBottom>
        Add New Menu Item
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
        <TextField
          label="Name"
          fullWidth
          margin="normal"
          {...register('name', { required: 'Name is required' })}
          error={!!errors.name}
          helperText={errors.name?.message}
        />

        <TextField
          label="Price"
          fullWidth
          margin="normal"
          {...register('price', { required: 'Price is required' })}
          error={!!errors.price}
          helperText={errors.price?.message}
        />

        <TextField
          label="Description"
          fullWidth
          multiline
          rows={3}
          margin="normal"
          {...register('description', { required: 'Description is required' })}
          error={!!errors.description}
          helperText={errors.description?.message}
        />

        <TextField
          select
          label="Category"
          fullWidth
          margin="normal"
          {...register('category', { required: 'Category is required' })}
          error={!!errors.category}
          helperText={errors.category?.message}
        >
          <MenuItem value="Starter">Starter</MenuItem>
          <MenuItem value="Main Course">Main Course</MenuItem>
          <MenuItem value="Dessert">Dessert</MenuItem>
          <MenuItem value="Drinks">Drinks</MenuItem>
        </TextField>

        <FormControl fullWidth margin="normal" error={!!imageError}>
          <InputLabel shrink>Upload Images</InputLabel>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageChange}
            style={{ marginTop: 8 }}
          />
          <FormHelperText>{imageError}</FormHelperText>
        </FormControl>

        {/* Preview selected image names */}
        {selectedImages.length > 0 && (
          <Box mt={1}>
            <Typography variant="body2">Selected Images:</Typography>
            <ul>
              {selectedImages.map((file, idx) => (
                <li key={idx}>{file.name}</li>
              ))}
            </ul>
          </Box>
        )}

        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          disabled={loading}
          sx={{ mt: 2 }}
        >
          {loading ? <CircularProgress size={24} /> : 'Create Menu'}
        </Button>
      </form>

      {responseMsg && (
        <Typography mt={2} color="success.main">
          {responseMsg}
        </Typography>
      )}
    </Box>
  );
}
