'use client'

import LoadingButton from '@mui/lab/LoadingButton';
import {
  Dialog,
  DialogTitle,
  Typography,
  DialogContent,
  Button,
  DialogActions
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useAtomValue } from 'jotai';
import { deleteEmployeeIdAtom } from '@/features/employee-listing/state/common';
import { defaultStore } from '@/shared/libs/jotai/default-store';
import { useMutationDelete } from '@/features/employee-listing/hooks/api/use-mutation-delete-employee';
import toast from 'react-hot-toast';

export const DeleteEmployee = () => {
  const theme = useTheme();
  const employeeId = useAtomValue(deleteEmployeeIdAtom);

  const { trigger: deleteEmp, isMutating: deleteLoading } = useMutationDelete();

const handleDelete = () => {
  if (!employeeId) {
     console.log('Invalid employee ID');
    return;
  }
const deletePromise = deleteEmp({ id: employeeId });
  toast.promise(deletePromise, {
    loading: 'Deleting...',
    success: 'Employee successfully deleted!',
    error: 'Delete failed!',
  });
};


  const open = Boolean(employeeId);

  return (
    <Dialog open={open}>
      <DialogTitle
        sx={{
          flexFlow: 'row',
        }}
      >
        <Typography
          variant="body2"
          sx={{ color: theme.palette.text.primary }}
        >
          Delete Employee
        </Typography>
      </DialogTitle>
      <DialogContent
        sx={{
          width: 400,
          boxSizing: 'border-box',
          m: 0,
          p: 0,
        }}
      >
        <Typography sx={{ p: 3 }}>
          Are you sure you want to delete this employee? This action cannot be undone.
        </Typography>
      </DialogContent>
      <DialogActions sx={{ gap: 2 }}>
        <Button
          sx={{ px: 7 }}
          variant="contained"
          onClick={() => {
            defaultStore.set(deleteEmployeeIdAtom, null);
          }}
        >
          Cancel
        </Button>
        <LoadingButton
          sx={{ px: 7 }}
          loading={deleteLoading}
          onClick={handleDelete}
        >
          Confirm
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};