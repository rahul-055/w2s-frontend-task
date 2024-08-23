
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { TextField, Button, Box, Typography } from '@mui/material';
import axios from 'axios';
import Swal from 'sweetalert2';

// Define the rules for validating the form inputs using Zod schema
const loginSchema = z.object({
  username: z
    .string()
    .min(3, "Username is required")
    .max(25, "Username must not be greater than 25 characters")
    .regex(/^[a-zA-Z0-9_]+$/, "The username must contain only letters, numbers, and underscore (_)"),
  password: z
    .string()
    .min(3, "Password  is required")
    .max(16, "Password must not be greater than 16 characters"),
});

// Infer the form data type from the schema
type LoginFormInputs = z.infer<typeof loginSchema>;

interface LoginFormProps {
  setAuthVal: (val: string) => void; // Function to set the authentication token
}
const LoginForm: React.FC<LoginFormProps> = ({ setAuthVal }) => {
  // Initialize the form with validation using react-hook-form and Zod
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
  });
  // Function to handle form submission
  const onSubmit = (data: LoginFormInputs) => {
    axios.post('https://dummyjson.com/auth/login', data) // Send form data to the login API
      .then(res => {
        localStorage.setItem('authToken', res.data.token);  // Save the token in local storage
        setAuthVal(res.data.token)  // Update authentication state
        Swal.fire({
          toast: true,
          title: 'Logged in successfully',  // Show success message
          icon: 'success',
          position: 'top-end',
          showCloseButton: true,
          customClass: {
            popup: 'colored-toast',
          },
          showConfirmButton: false,
          timer: 1500,
          timerProgressBar: true,

        })
      })
      .catch(error => {
        Swal.fire({
          toast: true,
          title: 'Invalid Credentials',  // Show error message
          icon: 'error',
          position: 'top-end',
          showCloseButton: true,
          customClass: {
            popup: 'colored-toast',
          },
          showConfirmButton: false,
          timer: 1500,
          timerProgressBar: true,
        })
      })
  };




  return (
    <section className='h-screen flex justify-center items-center z-0'>
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          width: '300px',
          margin: 'auto',
          padding: 2,
          borderRadius: 1,
          boxShadow: 3,
        }}
      >
        <Typography variant="h5" component="h1" gutterBottom>
          Login
        </Typography>
        <TextField
          margin="normal"
          fullWidth
          id="username"
          label="Username"
          autoComplete="username"
          autoFocus
          {...register('username')}
          error={!!errors.username}
          helperText={errors.username?.message}
        />
        <TextField
          margin="normal"
          fullWidth
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
          {...register('password')}
          error={!!errors.password}
          helperText={errors.password?.message}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Sign In
        </Button>
      </Box>
    </section>
  );
};

export default LoginForm;
