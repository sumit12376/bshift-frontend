'use client';

import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button
} from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { useMutationEdit } from '@/features/employee-listing/hooks/api/use-mutation-update-employee';
import { useAtomValue, useSetAtom } from 'jotai';
import { EditEmployeeIdAtom } from '@/features/employee-listing/state/common';
import toast from 'react-hot-toast';

interface FormData {
  name: string | null;
  email: string | null;
  password: string | null;
}

const initialInput: FormData = {
  name: '',
  email: '',
  password: ''
};

export const UpdateEmployee = () => {
  const employeeId = useAtomValue(EditEmployeeIdAtom);
  const setEditEmployeeId = useSetAtom(EditEmployeeIdAtom);

  const { trigger: editEmp, isMutating: isLoading } = useMutationEdit();

  const [formData, setFormData] = useState<FormData>(initialInput);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (employeeId) {
      setOpen(true);
    }
  }, [employeeId]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleEdit = () => {
    if (!employeeId) {
      console.log('Invalid employee ID');
      return;
    }

    const updatePromise = editEmp({ id: employeeId, ...formData });

    toast.promise(updatePromise, {
      loading: 'Updating...',
      success: 'Employee successfully updated!',
      error: 'Update failed!',
    }).then(() => {
      setOpen(false);
      setFormData(initialInput);
      setEditEmployeeId(null);
    });
  };

  const handleClose = () => {
    setOpen(false);
    setFormData(initialInput);
    setEditEmployeeId(null);
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle>Edit Employee</DialogTitle>

      <DialogContent dividers>
        <TextField
          fullWidth
          label="Name"
          name="name"
          value={formData.name ?? ''}
          onChange={handleInputChange}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Email"
          name="email"
          value={formData.email ?? ''}
          onChange={handleInputChange}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Password"
          name="password"
          type="password"
          value={formData.password ?? ''}
          onChange={handleInputChange}
          margin="normal"
        />
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose} color="inherit">
          Cancel
        </Button>
        <LoadingButton
          onClick={handleEdit}
          loading={isLoading}
          variant="contained"
          color="primary"
        >
          Save Changes
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};
