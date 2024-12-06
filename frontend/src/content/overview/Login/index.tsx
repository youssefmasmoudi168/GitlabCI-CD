import {
  Alert,
  Box,
  Button,
  Container,
  CssBaseline,
  Grid,
  Snackbar,
  TextField,
  Typography
} from '@mui/material';

import { NavLink, Link as RouterLink, useNavigate } from 'react-router-dom';
import { object, string, TypeOf } from 'zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useLoginUserMutation } from '../../../services/api/authApi';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { normalizeRole, setUser } from '../../../services/slices/authSlice';
import { Helmet } from 'react-helmet-async';
import { setRole } from 'src/services/slices/roleSlice';

const loginSchema = object({
  email: string()
    .min(1, 'Email address is required')
    .email('Email address is invalid'),
  password: string().min(1, 'Password is required')
});

export type LoginInput = TypeOf<typeof loginSchema>;

function Login() {
  const navigate = useNavigate();
  const methods = useForm<LoginInput>({
    resolver: zodResolver(loginSchema)
  });

  const [loginUser, { isLoading, isSuccess, error, isError, data }] =
    useLoginUserMutation();

  const [openSuccess, setOpenSuccess] = useState<boolean>(false);
  const [openError, setOpenError] = useState<boolean>(false);

  const handleCloseSuccess = () => {
    setOpenSuccess(false);
  };

  const handleCloseError = () => {
    setOpenError(false);
  };

  const {
    reset,
    register,
    handleSubmit,
    formState: { isSubmitSuccessful, errors }
  } = methods;

  const dispatch = useDispatch();

  useEffect(() => {
    if (isSuccess) {
      dispatch(setUser({ token: data.token, user: data.user }));
      dispatch(setRole(normalizeRole((data.user as any).roles[0])));
      localStorage.setItem('currentUser', JSON.stringify(data?.user));
      localStorage.setItem('token', data?.token as string);
      setOpenSuccess(true);
      navigate('/dashboards/projects');
    }
    if (isError) {
      setOpenError(true);
    }
  }, [isLoading]);

  const onSubmitHandler: SubmitHandler<LoginInput> = async (values) => {
    loginUser(values);
  };
  return (
    <Container component="main" maxWidth="xs">
      <Helmet>
        <title>Login | SiFAST</title>
      </Helmet>
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <Snackbar
          open={openSuccess}
          onClose={handleCloseSuccess}
          autoHideDuration={6000}
        >
          <Alert onClose={handleCloseSuccess} severity="success">
            Logged in successfully
          </Alert>
        </Snackbar>
        <Snackbar
          open={openError}
          onClose={handleCloseError}
          autoHideDuration={6000}
        >
          <Alert onClose={handleCloseError} severity="error">
            Something wrong occured
          </Alert>
        </Snackbar>
        <Typography component="h1" variant="h3">
          Login
        </Typography>
        <Box
          component="form"
          noValidate
          sx={{ mt: 1 }}
          onSubmit={handleSubmit(onSubmitHandler)}
        >
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
            disabled={isLoading}
            fullWidth
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
            Login
          </Button>
          <Grid container>
            <Grid item>
              <NavLink to="/register">
                {"Don't have an account? Sign Up"}
              </NavLink>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}

export default Login;
