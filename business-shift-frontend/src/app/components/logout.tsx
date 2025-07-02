'use client';

import { useRouter, usePathname } from 'next/navigation';
import Cookies from 'js-cookie';
import { Button } from '@mui/material';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

export function LogoutButton() {
  const pathname = usePathname();
  const router = useRouter();
  const [hasToken, setHasToken] = useState(false);

  useEffect(() => {
    const token = Cookies.get('token');
 if (token) {
  setHasToken(true);
} else {
  setHasToken(false);
}

  }, []);

  const handleLogout = () => {
    Cookies.remove('token');
    Cookies.remove('user');
    toast.success('Logged out. Redirecting to /login');
    
    setHasToken(false); 
    router.push('/login');
  };
  if (!hasToken || pathname === '/signup') return null;

  return (
    <Button
      variant="contained"
      color="error"
      onClick={handleLogout}
      sx={{
        position: 'fixed',
        top: 16,
        right: 16,
        zIndex: 9999,
      }}
    >
      Logout
    </Button>
  );
}
