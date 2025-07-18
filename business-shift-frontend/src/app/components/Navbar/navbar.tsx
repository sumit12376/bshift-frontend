'use client';

import Link from 'next/link';
import { AppBar, Box, Button, Container, Toolbar, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { usePathname } from 'next/navigation';
import { LogoutButton } from '../logout';

// Icons
import HomeIcon from '@mui/icons-material/Home';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import PeopleIcon from '@mui/icons-material/People';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LoginIcon from '@mui/icons-material/Login';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

export const Navbar = () => {
  const [hasToken, setHasToken] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const token = Cookies.get('token');
    setHasToken(!!token);
  }, [pathname]);

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        backgroundColor: '#f8f9fa',
        borderBottom: '1px solid #e0e0e0',
        color: 'black',
      }}
    >
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
          <Typography
            variant="h6"
            component={Link}
            href="/dashboard"
            sx={{
              textDecoration: 'none',
              color: '#1976d2',
              fontWeight: 'bold',
              fontSize: '1.5rem',
            }}
          >
            DeRestaurant
          </Typography>

          <Box>
            <NavButton href="/dashboard" icon={<HomeIcon />} label="Home" />
            <NavButton href="/restaurants" icon={<RestaurantIcon />} label="Restaurants" />
            <NavButton href="/employee" icon={<PeopleIcon />} label="Employee" />
            <NavButton href="/cart" icon={<ShoppingCartIcon />} label="Cart" />

            {!hasToken ? (
              <>
                <NavButton href="/login" icon={<LoginIcon />} label="Login" />
                <NavButton href="/signup" icon={<PersonAddIcon />} label="Signup" />
              </>
            ) : (
              <LogoutButton />
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

const NavButton = ({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) => (
  <Button
    component={Link}
    href={href}
    startIcon={icon}
    sx={{
      mx: 1,
      color: '#333',
      fontWeight: 500,
      textTransform: 'none',
      '&:hover': {
        backgroundColor: '#e3f2fd',
        color: '#1976d2',
      },
    }}
  >
    {label}
  </Button>
);
