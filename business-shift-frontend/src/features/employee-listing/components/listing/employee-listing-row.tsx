'use client';

import { FC, useState } from 'react';
import {
  Box,
  Typography,
  IconButton,
  Menu,
  MenuItem,
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Employee } from './row-group';
import {
  deleteEmployeeIdAtom,
  EditEmployeeIdAtom,
} from '../../state/common';
import { getDefaultStore } from 'jotai';

type Props = {
  employee: Employee;
};

const EmployeeListingRow: FC<Props> = ({ employee }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = () => {
    getDefaultStore().set(deleteEmployeeIdAtom, employee.id);
    console.log('Set deleteEmployeeIdAtom to:', employee.id);
    console.log('Current atom value:', getDefaultStore().get(deleteEmployeeIdAtom));
    handleMenuClose();
  };

  const handleEdit = () => {
    getDefaultStore().set(EditEmployeeIdAtom, employee.id);
    handleMenuClose();
  };

  return (
    <Box
      p={2}
      borderRadius={2}
      sx={{
        backgroundColor: '#f9f9f9',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        position: 'relative',
      }}
    >
      <Box display="flex" alignItems="center" gap={2}>
        {/* Left: Profile Image */}
        <img
          src={employee.profile}
          alt="Employee"
          style={{
            width: 64,
            height: 64,
            borderRadius: '50%',
            objectFit: 'cover',
            border: '2px solid #ddd',
          }}
        />

        {/* Right: Content */}
        <Box flex="1">
          <Typography variant="h6" fontWeight={600}>
            {employee.name} (ID: {employee.id})
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Email: {employee.email}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Role: {employee.role}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Created At: {new Date(employee.createdAt).toLocaleString()}
          </Typography>
        </Box>

        {/* Top Right: Menu Button */}
        <IconButton onClick={handleMenuOpen}>
          <MoreVertIcon />
        </IconButton>
        <Menu anchorEl={anchorEl} open={open} onClose={handleMenuClose}>
          <MenuItem onClick={handleDelete}>Delete</MenuItem>
          <MenuItem onClick={handleEdit}>Edit</MenuItem>
        </Menu>
      </Box>
    </Box>
  );
};

export default EmployeeListingRow;
