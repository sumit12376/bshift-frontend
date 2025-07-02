'use client'

import { Box, Button, CircularProgress, Typography } from '@mui/material';
import { useAtomValue } from 'jotai';

import { queryParamsAtom } from '@/features/restaurants-listing/state/filter';
import { RestaurantListingApi } from '@/features/restaurants-listing/api/restaurent-listing-api';
import { RowGroup } from './row-group';
import { API_CACHE_KEY } from '@/shared/components/constants/api-cache-key';
import { useInfinitePagination } from '@/shared/hook/api/core/use-infinite-pagination';
import { groupRestaurantBySortType } from '@/features/restaurants-listing/utils/group-restaurant-by-name';

export const RowGroups = () => {
  const queryParams = useAtomValue(queryParamsAtom);

  const { 
    data, 
    isFetchingMore, 
    loadMore, 
    isLoading, 
    error 
  } = useInfinitePagination(
    [API_CACHE_KEY.GET_RESTAURANT_LIST, queryParams],//(1) KEY
    (page) =>//(2) FETCHER
      RestaurantListingApi.getRestaurants({
        ...queryParams,
        metadata: {
          ...queryParams.metadata,
          page,
        },
      }),
    {
      parallel: true,
    }
  );

  console.log('API Data:', data);
  console.log('Error:', error);

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" p={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box p={4} textAlign="center">
        <Typography color="error">
          Failed to load restaurants. Please try again.
        </Typography>
        <Button onClick={loadMore} variant="outlined" sx={{ mt: 2 }}>
          Retry
        </Button>
      </Box>
    );
  }

  const allRestaurants = data?.flatMap((page) => page?.data?.data?.nodes || []) || [];
  const groupedRestaurant = groupRestaurantBySortType(allRestaurants);

  if (allRestaurants.length === 0) {
    return (
      <Box p={4} textAlign="center">
        <Typography>No restaurants found</Typography>
      </Box>
    );
  }

  return (
    <>
      {Object.entries(groupedRestaurant).map(([label, restaurants]) => (
        <Box key={label}>
          <RowGroup groupLabel={label} restaurants={restaurants} />
        </Box>
      ))}

      <Box display="flex" justifyContent="center" mt={3}>
        <Button 
          onClick={loadMore} 
          disabled={isFetchingMore}
          variant="outlined"
        >
          {isFetchingMore ? <CircularProgress size={24} /> : 'Load More'}
        </Button>
      </Box>
    </>
  );
};