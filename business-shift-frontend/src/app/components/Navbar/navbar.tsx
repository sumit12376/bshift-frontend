'use client';

import Link from 'next/link';
import { AppBar, Box, Button, Container, Toolbar, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { usePathname } from 'next/navigation';
import { LogoutButton } from '../logout';

export const Navbar = () => {
  const [hasToken, setHasToken] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const token = Cookies.get('token');
    setHasToken(!!token);
  }, [pathname]);

  return (
    <AppBar position="sticky" color="default" elevation={1}>
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
          <Typography
            variant="h6"
            component={Link}
            href="/dashboard"
            sx={{
              textDecoration: 'none',
              color: 'black',
              fontWeight: 'bold',
            }}
          >
            DeRestaurant
          </Typography>

          <Box>
            <Button component={Link} href="/dashboard" sx={{ mx: 1 }}>
              Home
            </Button>
            <Button component={Link} href="/restaurants" sx={{ mx: 1 }}>
              Restaurants
            </Button>
            <Button component={Link} href="/employee" sx={{ mx: 1 }}>
              Employee
            </Button>

            {!hasToken && (
              <>
                <Button component={Link} href="/login" sx={{ mx: 1 }}>
                  Login
                </Button>
                <Button component={Link} href="/signup" sx={{ mx: 1 }}>
                  Signup
                </Button>
              </>
            )}

            {hasToken && <LogoutButton />}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
