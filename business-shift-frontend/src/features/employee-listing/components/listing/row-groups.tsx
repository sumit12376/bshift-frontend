'use client';
import React from 'react';
import { Box, Button, CircularProgress, Typography } from '@mui/material';
import { queryParamsAtoms } from '../../filter/filter';
import { useAtomValue } from 'jotai';
import { RowGroup } from '@/features/employee-listing/components/listing/row-group';
import { API_CACHE_KEY } from '@/shared/components/constants/api-cache-key';
import { useInfinitePagination } from '@/shared/hook/api/core/use-infinite-pagination';
import { employeeApi } from '../../api/empoloyee-listing-api';

export const RowGroups = () => {
  const queryParams = useAtomValue(queryParamsAtoms);

  const {
    data,
    isFetchingMore,
    loadMore,
    isLoading,
    error,
    hasMore,
    totalLoaded,
    totalDocs,
  } = useInfinitePagination(
    [API_CACHE_KEY.GET_EMPLOYEE_LIST, queryParams],
    (page) =>
      employeeApi.getEmployee({
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

  const allEmployees = data?.flatMap((page) => page?.data?.data?.nodes ?? []) ?? [];

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" p={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" p={4}>
        <Typography color="error">Failed to load employee data: {error.message}</Typography>
      </Box>
    );
  }

  if (allEmployees.length === 0) {
    return (
      <Box display="flex" justifyContent="center" p={4}>
        <Typography>No employees found.</Typography>
      </Box>
    );
  }

  return (
    <Box display="flex" flexDirection="column" gap={2}>
      {allEmployees.map((employee) => (
        <RowGroup key={employee.id} employee={employee} />
      ))}

      {hasMore ? (
        <Box display="flex" justifyContent="center" p={2}>
          <Button 
            onClick={loadMore} 
            disabled={isFetchingMore}
            startIcon={isFetchingMore && <CircularProgress size={20} />}
          >
            {isFetchingMore ? 'Loading...' : `Load More (${totalLoaded} of ${totalDocs})`}
          </Button>
        </Box>
      ) : (
        <Box display="flex" justifyContent="center" p={2}>
          <Typography variant="body2" color="textSecondary">
            All {totalDocs} employees loaded
          </Typography>
        </Box>
      )}
    </Box>
  );
};