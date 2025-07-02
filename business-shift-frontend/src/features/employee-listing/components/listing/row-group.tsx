'use client';

import { FC } from 'react';
import { Box, Divider, useTheme } from '@mui/material';
import type { SxProps, Theme } from '@mui/material';
import EmployeeListingRow from './employee-listing-row';

export type Employee = {
  id: number;
  name: string;
  email: string;
  role: string;
  createdAt: string;
  updatedAt: string;
};

export type RowGroupProps = {
  sx?: SxProps<Theme>;
  employee: Employee;
};

export const RowGroup: FC<RowGroupProps> = ({ sx, employee }) => {
  const theme = useTheme();

  console.log('employee', employee);

  return (
    <Box sx={{ px: 1, py: 1.5, ...sx }}>
      <EmployeeListingRow employee={employee} />
      <Divider sx={{ my: 1, borderColor: theme.palette.divider }} />
    </Box>
  );
};
