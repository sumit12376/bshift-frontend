'use client';

import { Fragment, type FC } from 'react';
import { Box, Divider, Paper, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import type { SxProps, Theme } from '@mui/material';

import { RestaurantListingRow } from './restaurant-listing-row';

import type { ApiType } from '@/shared/types/utils/api';

export type RowGroupProps = {
  sx?: SxProps<Theme>;
  groupLabel: string;
  restaurants: ApiType['RestaurantResponse'][];
};

export const RowGroup: FC<RowGroupProps> = ({ sx, groupLabel, restaurants }) => {
  const theme = useTheme();

  return (
    <Box sx={{ px: 1, py: 1.5, ...sx }}>
      <Typography
        sx={{
          fontSize: 14,
          fontWeight: 600,
          color: theme.palette.primary.main,
          mb: 1,
        }}
      >
        {groupLabel}
      </Typography>

      <Paper
        sx={{
          px: 1.5,
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: theme.palette.background.paper,
          boxShadow: theme.shadows[1],
          borderRadius: 1,
          [theme.breakpoints.down('md')]: {
            px: 0,
            backgroundColor: 'transparent',
            boxShadow: 'none',
          },
        }}
      >
        {restaurants.map((restaurant) => (
          <Fragment key={restaurant.id}>
            <RestaurantListingRow restaurant={restaurant} />
            <Divider
              sx={{
                [theme.breakpoints.down('md')]: {
                  display: 'none',
                },
              }}
            />
          </Fragment>
        ))}
      </Paper>
    </Box>
  );
};
