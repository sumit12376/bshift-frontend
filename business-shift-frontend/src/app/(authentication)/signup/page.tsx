'use client';

import { Box, FormControl, FormLabel, Paper, TextField, Typography } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { useTheme } from '@mui/material/styles';
import { useRouter } from 'next/navigation';

import { useForm } from 'react-hook-form';

import { useMutation } from '@/shared/hook/api/core/use-mutation';
import { authApi } from '@/features/authentication/api/auth-api';
import { API_CACHE_KEY } from '@/shared/components/constants/api-cache-key';
import toast from 'react-hot-toast';
type SignupFields = {
  name: string;
  email: string;
  password: string;
};

export default function SignupPage() {
  const theme = useTheme();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isDirty },
  } = useForm<SignupFields>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  const { trigger, isMutating } = useMutation(API_CACHE_KEY.SIGNUP, authApi.signup, {
    onSuccess: () => {
        toast.success('Signup successful, Welcome');
      router.push('/login');
    },
    onError: () => {
      setError('password', {
        type: 'manual',
        message: 'Something went wrong. Try again.',
      });
    },
  });

  const onSubmit = (data: SignupFields) => {
    trigger({
      name: data.name,
      email: data.email,
      password: data.password,
    });
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        height: 1,
        width: 1,
        display: 'grid',
        gap: 3,
        gridTemplateColumns: '1fr auto 1fr',
        [theme.breakpoints.down('md')]: {
          gap: 0,
        },
      }}
    >
      <Paper
        sx={{
          width: 360,
          backgroundColor: theme.palette.background.paper,
          gridColumn: 2,
          p: 4,
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
        }}
      >
        <Typography fontSize={24} fontWeight={600} textAlign="center">
          Signup
        </Typography>

        <FormControl fullWidth>
          <FormLabel>Name</FormLabel>
          <TextField
            type="text"
            placeholder="Your Name"
            error={Boolean(errors.name)}
            helperText={errors.name?.message}
            {...register('name')}
          />
        </FormControl>

        <FormControl fullWidth>
          <FormLabel>Email</FormLabel>
          <TextField
            type="email"
            placeholder="Your Email"
            error={Boolean(errors.email)}
            helperText={errors.email?.message}
            {...register('email')}
          />
        </FormControl>

        <FormControl fullWidth>
          <FormLabel>Password</FormLabel>
          <TextField
            type="password"
            placeholder="Your Password"
            error={Boolean(errors.password)}
            helperText={errors.password?.message}
            {...register('password')}
          />
        </FormControl>

        <LoadingButton
          type="submit"
          loading={isMutating}
          disabled={!isDirty}
          variant="contained"
        >
          Signup
        </LoadingButton>
      </Paper>
    </Box>
  );
}
