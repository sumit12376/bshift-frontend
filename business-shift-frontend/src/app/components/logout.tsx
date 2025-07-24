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










// "use client";

// import Link from "next/link";
// import {
//   AppBar,
//   Box,
//   Button,
//   Container,
//   Toolbar,
//   Typography,
// } from "@mui/material";
// import { useEffect, useState } from "react";
// import Cookies from "js-cookie";
// import { usePathname, useRouter } from "next/navigation";
// import { toast } from "react-toastify"; // or use "react-hot-toast" if you switched
// import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
// import HomeIcon from "@mui/icons-material/Home";
// import RestaurantIcon from "@mui/icons-material/Restaurant";
// import PeopleIcon from "@mui/icons-material/People";
// import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
// import LoginIcon from "@mui/icons-material/Login";
// import PersonAddIcon from "@mui/icons-material/PersonAdd";

// export const Navbar = () => {
//   const [hasToken, setHasToken] = useState(false);
//   const pathname = usePathname();
//   const router = useRouter();

//   useEffect(() => {
//     const token = Cookies.get("token");
//     setHasToken(!!token);
//   }, [pathname]);

//   const handleLogout = () => {
//     Cookies.remove("token");
//     Cookies.remove("user");
//     toast.success("Logged out. Redirecting to /login");
//     setHasToken(false);
//     router.push("/login");
//   };

//   if (pathname === "/login" || pathname === "/signup") return null;

//   return (
//     <AppBar
//       position="sticky"
//       elevation={0}
//       sx={{
//         backgroundColor: "#f8f9fa",
//         borderBottom: "1px solid #e0e0e0",
//         color: "black",
//       }}
//     >
//       <Container maxWidth="lg">
//         <Toolbar disableGutters sx={{ justifyContent: "space-between" }}>
//           <Typography
//             variant="h6"
//             component={Link}
//             href="/dashboard"
//             sx={{
//               textDecoration: "none",
//               color: "#1976d2",
//               fontWeight: "bold",
//               fontSize: "1.5rem",
//             }}
//           >
//             DeRestaurant
//           </Typography>

//           <Box>
//             <NavButton href="/dashboard" icon={<HomeIcon />} label="Home" />
//             <NavButton
//               href="/restaurants"
//               icon={<RestaurantIcon />}
//               label="Restaurants"
//             />
//             <NavButton
//               href="/employee"
//               icon={<PeopleIcon />}
//               label="Employee"
//             />
//             <NavButton href="/cart" icon={<ShoppingCartIcon />} label="Cart" />
//             <NavButton
//               href="/order"
//               icon={<ReceiptLongIcon />}
//               label="Orders"
//             />

//             {!hasToken ? (
//               <>
//                 <NavButton href="/login" icon={<LoginIcon />} label="Login" />
//                 <NavButton
//                   href="/signup"
//                   icon={<PersonAddIcon />}
//                   label="Signup"
//                 />
//               </>
//             ) : (
//               <Button
//                 onClick={handleLogout}
//                 startIcon={<LoginIcon />}
//                 sx={{
//                   mx: 1,
//                   color: "#d32f2f",
//                   fontWeight: 500,
//                   textTransform: "none",
//                   "&:hover": {
//                     backgroundColor: "#fce4ec",
//                     color: "#c62828",
//                   },
//                 }}
//               >
//                 Logout
//               </Button>
//             )}
//           </Box>
//         </Toolbar>
//       </Container>
//     </AppBar>
//   );
// };

// const NavButton = ({
//   href,
//   icon,
//   label,
// }: {
//   href: string;
//   icon: React.ReactNode;
//   label: string;
// }) => (
//   <Button
//     component={Link}
//     href={href}
//     startIcon={icon}
//     sx={{
//       mx: 1,
//       color: "#333",
//       fontWeight: 500,
//       textTransform: "none",
//       "&:hover": {
//         backgroundColor: "#e3f2fd",
//         color: "#1976d2",
//       },
//     }}
//   >
//     {label}
//   </Button>
// );