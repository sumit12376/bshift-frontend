'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import LoadingButton from '@mui/lab/LoadingButton';
import {
  Box,
  Divider,
  FormControl,
  FormLabel,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useRouter } from 'next/navigation';
import { useForm, type SubmitHandler } from 'react-hook-form';
import Cookies from 'js-cookie';
import toast from 'react-hot-toast';
import { useState } from 'react';

import { authApi } from '@/features/authentication/api/auth-api';
import type { LoginSchemaFields } from '@/features/authentication/form-validators/login-schema';
import { loginSchema } from '@/features/authentication/form-validators/login-schema';
import { useMutation } from '@/shared/hook/api/core/use-mutation';
import { API_CACHE_KEY } from '@/shared/components/constants/api-cache-key';

export default function PageLogin() {
  const theme = useTheme();
  const router = useRouter();

  const [otpStep, setOtpStep] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [userInfo, setUserInfo] = useState<any>(null);

  const {
    handleSubmit,
    register,
    setError,
    formState: { errors, isDirty },
  } = useForm<LoginSchemaFields>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      identifier: '',
      password: '',
    },
  });

  const { trigger, isMutating } = useMutation(
    API_CACHE_KEY.LOGIN,
    authApi.logIn,
    {
      onError: () => {
        setError('password', {
          type: 'manual',
          message: 'Invalid credentials. Please try again.',
        });
      },
      onSuccess: async (response) => {
  // const user = response?.data?.user;

  // if (!user) {
  //   toast.error('Unexpected response from server. Please try again.');
  //   return;
  // }

 const { email, name, id, token } = response.data.user;

console.log("iiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiicxsknxioasndioasdnojsdioasoci", id)
Cookies.set("userid",id)
  setUserEmail(email);
  setUserInfo({ email, name, id, token });

  try {
    await authApi.sendOtp({ email, purpose: 'login' });
    setOtpStep(true);
    toast.success('OTP sent to your email');
  } catch (err) {
    toast.error('Failed to send OTP. Try again.');
  }
}

    }
  );

  const handleLogin: SubmitHandler<LoginSchemaFields> = (formData) => {
    trigger({
      identifier: formData.identifier.trim().toLowerCase(),
      password: formData.password.trim(),
    });
  };

  const handleVerifyOtp = async () => {
    try {
      await authApi.verifyOtp({
        identifier: userEmail,
        otp,
        purpose: 'login',
      });

      const { token, email, name, id } = userInfo;

      Cookies.set('token', token, {
        expires: 7,
        path: '/',
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
      });

      Cookies.set('user', JSON.stringify({ email, name, id }), {
        expires: 7,
        path: '/',
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
      });

      toast.success('You are logged in');
      router.push('/dashboard');
    } catch (err) {
      toast.error('Invalid OTP. Please try again.');
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(handleLogin)}
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
    >      <Box
        sx={{
          textAlign: 'right',
          my: 'auto',
          gridColumn: 1,
          [theme.breakpoints.down('md')]: {
            display: 'none',
          },
        }}
      >
        <Box sx={{ textAlign: 'center' }}>
          <Typography fontSize={28} fontWeight={500} color={theme.palette.primary.main}>
            Log into
            <br />
            your account
          </Typography>
          <Divider
            sx={{
              width: 24,
              my: 3.5,
              mx: 'auto',
              borderWidth: 2,
              borderColor: theme.palette.primary.main,
            }}
          />
          <Typography fontSize={18} fontWeight={500} sx={{ color: 'red' }}>
            Alpha Version 1.0
          </Typography>
        </Box>
      </Box>

      <Paper
        sx={{
          width: 360,
          backgroundColor: theme.palette.background.paper,
          gridColumn: 2,
          p: 4,
          display: 'flex',
          flexFlow: 'column',
          [theme.breakpoints.down('md')]: {
            width: 340,
            p: 3,
          },
        }}
      >
        <Typography
          sx={{
            fontWeight: 500,
            fontSize: 18,
            textAlign: 'center',
            display: 'none',
            mb: 1,
            [theme.breakpoints.down('md')]: {
              display: 'block',
            },
          }}
        >
          Log into your account
        </Typography>

        {!otpStep ? (
          <>
      
            <FormControl fullWidth sx={{ mb: 1.5 }}>
              <FormLabel>Email</FormLabel>
              <TextField
                autoFocus
                type="email"
                placeholder="email"
                error={Boolean(errors.identifier)}
                helperText={errors.identifier?.message}
                {...register('identifier')}
              />
            </FormControl>

           
            <FormControl fullWidth>
              <FormLabel>Password</FormLabel>
              <TextField
                type="password"
                placeholder="password"
                error={Boolean(errors.password)}
                helperText={errors.password?.message}
                {...register('password')}
              />
            </FormControl>
            <LoadingButton
              fullWidth
              disabled={!isDirty}
              loading={isMutating}
              type="submit"
              sx={{ mt: 2 }}
            >
              Login
            </LoadingButton>
          </>
        ) : (
          <>
            <FormControl fullWidth sx={{ mt: 2 }}>
              <FormLabel>Enter OTP sent to your email</FormLabel>
              <TextField
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
            </FormControl>

            <LoadingButton
              fullWidth
              sx={{ mt: 2 }}
              onClick={handleVerifyOtp}
              variant="contained"
            >
              Verify OTP & Login
            </LoadingButton>
          </>
        )}
      </Paper>
    </Box>
  );
}
