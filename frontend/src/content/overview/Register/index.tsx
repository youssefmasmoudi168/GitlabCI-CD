import { Alert, Box, Button, Container, CssBaseline, Grid, Snackbar, TextField, Typography } from '@mui/material';
import { object, string, TypeOf } from 'zod';
import { NavLink, Link as RouterLink, useNavigate } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRegisterUserMutation } from '../../../services/api/authApi';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
const registerSchema = object({
	firstName: string().min(1, 'First Name is required').max(100),
	lastName: string().min(1, 'Last name is required').max(100),
	email: string()
		.min(1, 'Email address is required')
		.email('Email address is invalid'),
	password: string()
		.min(1, 'Password is required')
		.min(8, 'Password must be more than 8 characters')
		.max(32, 'Password must be less than 32 characters'),
});

export type RegisterInput = TypeOf<typeof registerSchema>;

function Register() {
    const methods = useForm<RegisterInput>({
		resolver: zodResolver(registerSchema),
	});

  const navigate = useNavigate();

	const [registerUser, { isLoading, isSuccess, isError }] = useRegisterUserMutation();

  const [openSuccess, setOpenSuccess] = useState<boolean>(false);
  const [openError, setOpenError] = useState<boolean>(false);

  const handleCloseSuccess = () => {
    setOpenSuccess(false);
  }

  const handleCloseError = () => {
    setOpenError(false);
  }

	const {
		reset,
		handleSubmit,
		register,
		formState: { isSubmitSuccessful, errors },
	} = methods;

	useEffect(() => {
		if (isSuccess) {
			setOpenSuccess(true);
      navigate('/login');
		}
    if (isError) {
      setOpenError(true);
    }
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isLoading]);

	const onSubmitHandler: SubmitHandler<RegisterInput> = (values) => {
		registerUser(values);
	};
  return (
      
  <Container component="main" maxWidth="xs">
    <Helmet>
        <title>Register | SiFAST</title>
      </Helmet>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Snackbar open={openSuccess} onClose={handleCloseSuccess} autoHideDuration={6000}>
            <Alert onClose={handleCloseSuccess} severity="success">User registered successfully</Alert>
          </Snackbar>
          <Snackbar open={openError} onClose={handleCloseError} autoHideDuration={6000}>
            <Alert onClose={handleCloseError} severity="error">Something wrong occured</Alert>
          </Snackbar>
           <Typography component="h1" variant='h3'>
            Register
          </Typography>
          <Box component="form" noValidate sx={{ mt: 1 }} onSubmit={handleSubmit(onSubmitHandler)}>
          <TextField
              margin="normal"
              required
              fullWidth
              disabled={isLoading}
              id="firstName"
              label="First Name"
              name="firstName"
              autoComplete="firstName"
              autoFocus
              {...register('firstName')}
            />
             <TextField
              margin="normal"
              required
              fullWidth
              disabled={isLoading}
              id="lasttName"
              label="Last Name"
              name="lastName"
              autoComplete="lastName"
              autoFocus
              {...register('lastName')}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              disabled={isLoading}
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              {...register('email')}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              disabled={isLoading}
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              {...register('password')}
            />
            <Button
              type="submit"
              fullWidth
              disabled={isLoading}
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Register
            </Button>
            <Grid container>
              <Grid item>
                <NavLink to="/login">
                  {"Already have an account? Login"}
                </NavLink>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
 
  );
}

export default Register;
