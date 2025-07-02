import React, { FC } from 'react';
import { Box, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import dayjs from 'dayjs';


import type { ApiType } from '@/shared/types/utils/api';

type Props = {
  restaurant: ApiType['RestaurantResponse'];
};

export const RestaurantListingRow: FC<Props> = ({ restaurant }) => {
  const theme = useTheme();
  const {
    id,
    restaurantName,
    organization,
    phoneNumber,
    email,
    createdAt,
  } = restaurant;

  if (!id) return null;

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: '250px 250px 200px 200px 180px 80px',
        alignItems: 'center',
        px: 1.5,
        py: 1.25,
        [theme.breakpoints.down('md')]: {
          display: 'block',
        },
      }}
    >
      <Typography fontWeight={500} noWrap>{restaurantName}</Typography>
      <Typography fontWeight={500} noWrap>{organization?.organizationName}</Typography>
      <Typography fontWeight={500} noWrap>{email}</Typography>
      <Typography fontWeight={500} noWrap>{phoneNumber}</Typography>
      <Typography>{dayjs(createdAt).format('DD MMM YYYY')}</Typography>

      <Box display="flex" justifyContent="flex-end">
       
      </Box>
    </Box>
  );
};
