// 'use client';

// import axios from 'axios';
// import { useEffect, useState } from 'react';
// import { useAtomValue } from 'jotai';
// import { Button } from '@mui/material';
// import { useSetAtom } from 'jotai';
// import { useRouter } from 'next/navigation'
// import {
//   Box,
//   Typography,
//   Card,
//   CardContent,
//   CardMedia,
//   Grid,
//   CircularProgress,
//   Chip,
//   Stack,
// } from '@mui/material';
// import { useParams } from 'next/navigation';
// import { GetMenu } from '@/features/menuListing/state/common';
// import { CreateMenu } from '@/features/menuListing/state/common';
// import Router from 'next/router';
// export default function RestaurantDetailsPage() {
//   // const { id } = useParams();
//     const setGetMenu = useSetAtom(GetMenu); 
//     const router = useRouter()
// const selectedRestaurantId = useAtomValue(GetMenu);
//   const [loading, setLoading] = useState(true);
//   const [restaurant, setRestaurant] = useState<any>(null);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchRestaurantData = async () => {
//       try {
//         const res = await axios.get(
//           `http://localhost:8005/api/Menu/ListMenu/${selectedRestaurantId}`
//         );
//         setRestaurant(res.data?.data);
//       } catch (err) {
//         console.error(err);
//         setError('Failed to fetch restaurant data');
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (selectedRestaurantId) fetchRestaurantData();
//   }, [selectedRestaurantId]);

//   if (loading) {
//     return (
//       <Box display="flex" justifyContent="center" p={4}>
//         <CircularProgress />
//       </Box>
//     );
//   }

//   if (error || !restaurant) {
//     return (
//       <Box p={4} textAlign="center">
//         <Typography color="error">{error || 'Restaurant not found.'}</Typography>
//       </Box>
//     );
//   }

//   const { restaurantName, address, phone, email, menus } = restaurant;

//   return (
//     <Box p={{ xs: 2, md: 4 }}>
//       <Box mb={4}>
//         <Typography variant="h4" fontWeight={600} gutterBottom>
//           {restaurantName}
//         </Typography>
//         <Typography variant="subtitle1" gutterBottom>
//           {address}
//         </Typography>
//         <Typography variant="body2" color="textSecondary">
//           {email} | {phone}
//         </Typography>
//       </Box>
// <Button
//   sx={{ color: 'red', fontWeight: 'bold', mb: 2 }}
//   onClick={() => {
//     setGetMenu(selectedRestaurantId); 
//     console.log('menu edit id', selectedRestaurantId)
//     router.push(`/menuedit/${selectedRestaurantId}`);

//   }}
// >
//   Add Menu
// </Button>

//       <Box>
//         <Typography variant="h5" fontWeight={600} gutterBottom>
//           Menu
//         </Typography>

//         {menus?.length > 0 ? (
//           <Grid container spacing={3}>
//             {menus.map((menu: any) => (
//               <Grid item xs={12} sm={6} md={4} key={menu.id}>
//                 <Card
//                   sx={{
//                     borderRadius: 3,
//                     boxShadow: 3,
//                     transition: '0.3s',
//                     '&:hover': { boxShadow: 6 },
//                   }}
//                 >
//                   {menu.Image?.length > 0 && (
//                     <Box
//                       display="flex"
//                       gap={1}
//                       overflow="auto"
//                       px={1}
//                       pt={1}
//                     >
//                       {menu.Image.map((imgUrl: string, index: number) => (
//                         <CardMedia
//                           key={index}
//                           component="img"
//                           height="140"
//                           image={imgUrl}
//                           alt={`${menu.name} image ${index + 1}`}
//                           sx={{
//                             width: 150,
//                             borderRadius: 2,
//                             objectFit: 'cover',
//                           }}
//                         />
//                       ))}
//                     </Box>
//                   )}

//                   <CardContent>
//                     <Typography variant="h6" fontWeight={600} gutterBottom noWrap>
//                       {menu.name}
//                     </Typography>

//                     <Stack
//                       direction="row"
//                       justifyContent="space-between"
//                       alignItems="center"
//                       spacing={1}
//                     >
//                       <Typography variant="body2" color="text.secondary">
//                         ₹{menu.price}
//                       </Typography>
//                       <Chip label={menu.category} size="small" />
//                     </Stack>

//                     <Typography
//                       variant="body2"
//                       color="text.secondary"
//                       mt={1}
//                       sx={{
//                         display: '-webkit-box',
//                         WebkitLineClamp: 2,
//                         WebkitBoxOrient: 'vertical',
//                         overflow: 'hidden',
//                       }}
//                     >
//                       {menu.description}
//                     </Typography>
//                   </CardContent>
//                 </Card>
//               </Grid>
//             ))}
//           </Grid>
//         ) : (
//           <Typography>No menu items available.</Typography>
//         )}
//       </Box>
//     </Box>
//   );
// }
