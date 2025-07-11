'use client';

import {
  Box,
  FormControl,
  FormLabel,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import { customSignup } from '@/utils/api';
import LoadingButton from '@mui/lab/LoadingButton';
import { useTheme } from '@mui/material/styles';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import { useMutation } from '@/shared/hook/api/core/use-mutation';
import { authApi } from '@/features/authentication/api/auth-api';
import { API_CACHE_KEY } from '@/shared/components/constants/api-cache-key';

type SignupFields = {
  name: string;
  email: string;
  password: string;
  profile: FileList; 
};

export default function SignupPage() {
  const [otpStep, setOtpStep] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [signupData, setSignupData] = useState<SignupFields | null>(null);

  const theme = useTheme();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm<SignupFields>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      profile: undefined as unknown as FileList, 
    },
  });

  const { trigger: signupTrigger, isMutating } = useMutation(
    API_CACHE_KEY.SIGNUP,
    customSignup,
    {
      onSuccess: () => {
        toast.success('Signup successful. Welcome!');
        router.push('/login');
      },
      onError: () => {
        toast.error('Signup failed. Please try again.');
      },
    }
  );

  const onSubmit = async (data: SignupFields) => {
    try {
      setUserEmail(data.email);
      setSignupData(data);

      // Send OTP
      await authApi.sendOtp({ email: data.email, purpose: 'register' });
      setOtpStep(true);
      toast.success('OTP sent to your email');
    } catch (error) {
      console.error('OTP sending error:', error);
      toast.error('Failed to send OTP. Please try again.');
    }
  };

  const handleVerifyOtp = async () => {
    try {
      const result = await authApi.verifyOtp({
        identifier: userEmail,
        otp,
        purpose: 'register',
      });

      if (result?.data?.success && signupData) {
        const formData = new FormData();
        formData.append('name', signupData.name);
        formData.append('email', signupData.email);
        formData.append('password', signupData.password);
        formData.append('profile', signupData.profile[0]); // file

        await signupTrigger(formData);
      } else {
        toast.error('OTP verification failed. Please try again.');
      }
    } catch (error) {
      toast.error('Invalid OTP. Please try again.');
    }
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

        {!otpStep ? (
          <>
            <FormControl fullWidth>
              <FormLabel>Name</FormLabel>
              <TextField
                type="text"
                placeholder="Your Name"
                error={Boolean(errors.name)}
                helperText={errors.name?.message}
                {...register('name', { required: 'Name is required' })}
              />
            </FormControl>

            <FormControl fullWidth>
              <FormLabel>Email</FormLabel>
              <TextField
                type="email"
                placeholder="Your Email"
                error={Boolean(errors.email)}
                helperText={errors.email?.message}
                {...register('email', { required: 'Email is required' })}
              />
            </FormControl>

            <FormControl fullWidth>
              <FormLabel>Password</FormLabel>
              <TextField
                type="password"
                placeholder="Your Password"
                error={Boolean(errors.password)}
                helperText={errors.password?.message}
                {...register('password', {
                  required: 'Password is required',
                  minLength: {
                    value: 6,
                    message: 'Password must be at least 6 characters',
                  },
                })}
              />
            </FormControl>

            <FormControl fullWidth>
              <FormLabel>Profile Photo</FormLabel>
              <TextField
                type="file"
                inputProps={{ accept: 'image/*' }}
                error={Boolean(errors.profile)}
                helperText={errors.profile?.message}
                {...register('profile', {
                  required: 'Profile image is required',
                  validate: (files) =>
                    files.length > 0 || 'Please upload a profile image',
                })}
              />
            </FormControl>

            <LoadingButton
              type="submit"
              loading={isMutating}
              disabled={!isDirty}
              variant="contained"
            >
              Send OTP
            </LoadingButton>
          </>
        ) : (
          <>
            <FormControl fullWidth>
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
              loading={isMutating}
            >
              Verify OTP & Signup
            </LoadingButton>
          </>
        )}
      </Paper>
    </Box>
  );
}
