'use client';

import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';

import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Typography,
  Paper,
  Fade,
} from '@mui/material';

export default function Dashboard() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = Cookies.get('token');
    if (!token) {
      router.push('/login');
    } else {
      setIsLoading(false);
    }
  }, [router]);

  if (isLoading) {
    return (
      <Box minHeight="100vh" display="flex" justifyContent="center" alignItems="center">
        <Typography variant="h6">Loading...</Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: 'linear-gradient(135deg, #fff8e1, #ffe0b2)',
        backgroundImage: 'url(https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=1920&q=80)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        py: 8,
      }}
    >
      <Container maxWidth="lg">
        <Paper
          elevation={6}
          sx={{
            position: 'relative',
            mb: 6,
            borderRadius: 5,
            overflow: 'hidden',
            background: 'rgba(0,0,0,0.6)',
            color: '#fff',
          }}
        >
          <CardMedia
            component="img"
            height="300"
            image="https://images.unsplash.com/photo-1551782450-a2132b4ba21d"
            alt="Restaurant Banner"
            sx={{ filter: 'brightness(40%)' }}
          />
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              px: 6,
              py: 4,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            <Typography variant="h3" fontWeight="bold" gutterBottom>
              Welcome Back, Chef!
            </Typography>
            <Typography variant="h6" sx={{ opacity: 0.8 }}>
              Manage your restaurants, track orders, and delight customers.
            </Typography>
          </Box>
        </Paper>
        <Grid container spacing={4} mb={5}>
          <Grid item xs={12} md={6}>
            <Card
              sx={{
                display: 'flex',
                alignItems: 'center',
                p: 3,
                borderRadius: 4,
                backdropFilter: 'blur(10px)',
                background: 'rgba(255, 255, 255, 0.9)',
                boxShadow: 5,
              }}
            >
              <Avatar
                src="https://i.pravatar.cc/150"
                sx={{ width: 72, height: 72, mr: 3 }}
              />
              <Box>
                <Typography variant="h6">Sumit Vikram</Typography>
                <Typography variant="body2" color="text.secondary">
                  Restaurant Owner
                </Typography>
              </Box>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card
              sx={{
                p: 3,
                borderRadius: 4,
                bgcolor: '#fef6e4',
                boxShadow: 5,
              }}
            >
              <Typography variant="h6" gutterBottom>
                Quick Overview
              </Typography>
              <Typography variant="body1">Restaurants: <strong>3</strong></Typography>
              <Typography variant="body1">Orders Today: <strong>14</strong></Typography>
              <Typography variant="body1">Total Reviews: <strong>124</strong></Typography>
            </Card>
          </Grid>
        </Grid>
        <Grid container spacing={4}>
          {[
            {
              title: 'Manage Restaurants',
              desc: 'Add, edit or delete your restaurant listings.',
              color: '#ffecb3',
              image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5',
              route: '/restaurants',
            },
            {
              title: 'View Orders',
              desc: 'Handle ongoing and completed orders.',
              color: '#c8e6c9',
              image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cmVzdGF1cmFudHxlbnwwfHwwfHx8MA%3D%3D',
              route: '/dashboard',
            },
            {
              title: 'Customer Feedback',
              desc: 'Check recent reviews and feedback.',
              color: '#b3e5fc',
              image: 'https://images.unsplash.com/photo-1556740749-887f6717d7e4',
              route: '/dashboard',
            },
          ].map((item, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Fade in timeout={600}>
                <Card
                  sx={{
                    backgroundColor: item.color,
                    borderRadius: 4,
                    overflow: 'hidden',
                    transition: '0.3s',
                    boxShadow: 4,
                    '&:hover': {
                      transform: 'translateY(-5px)',
                      boxShadow: 8,
                    },
                    cursor: 'pointer',
                  }}
                  onClick={() => router.push(item.route)}
                >
                  <CardMedia
                    component="img"
                    height="160"
                    image={item.image}
                    alt={item.title}
                  />
                  <CardContent>
                    <Typography variant="h6" fontWeight="bold" gutterBottom>
                      {item.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {item.desc}
                    </Typography>
                  </CardContent>
                </Card>
              </Fade>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
