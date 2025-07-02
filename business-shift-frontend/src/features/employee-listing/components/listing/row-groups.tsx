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
  console.log('Full API Response:', data);
  console.log('Error:', error);
const allEmployees = (!data)
  ? []
  : data.flatMap((page) => page?.data?.data?.nodes ?? []);


  console.log('Processed Employees:', allEmployees);

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

  if (!allEmployees || allEmployees.length === 0) {
    return (
      <Box display="flex" justifyContent="center" p={4}>
        <Typography>No employees found.</Typography>
      </Box>
    );
  }

  return (
    <Box display="flex" flexDirection="column" gap={2}>
      {allEmployees.map((employee) => {
        console.log(employee.id)
        if (!employee?.id) {
          console.error('Invalid employee data:', employee);
          return null;
        }
        return <RowGroup key={employee.id} employee={employee} />;
      })}

      {isFetchingMore ? (
        <Box display="flex" justifyContent="center" p={2}>
          <CircularProgress size={24} />
        </Box>
      ) : (
        <Box display="flex" justifyContent="center" p={2}>
          <Button onClick={loadMore}>Load More</Button>
        </Box>
      )}
    </Box>
  );
} 