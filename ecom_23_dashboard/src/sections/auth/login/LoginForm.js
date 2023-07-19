import * as Yup from 'yup';
import React, { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useFormik, Form, FormikProvider } from 'formik';
// material
import {
  Link,
  Stack,
  Checkbox,
  TextField,
  IconButton,
  InputAdornment,
  FormControlLabel,
  Snackbar,
  Alert,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
// component
import Iconify from '../../../components/Iconify';
import Signin from '../../../data/Auth';
// ----------------------------------------------------------------------

export default function LoginForm() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showSnackBar, setShowSnackBar] = React.useState(false);
  const [state, setState] = React.useState({
    error: false,
    message: '',
    auth: false,
  });
  const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Please enter a valid Email').required('Email is required'),
    password: Yup.string().min(6, 'Please enter a valid password').required('Password is required'),
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: LoginSchema,
    onSubmit: (values) => {
      handleLogin(values);
    },
  });

  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } = formik;

  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };

  const handleLogin = async (values) => {
    const response = await Signin(values);
    if (response.error) {
      setState({
        error: true,
        message: response.message,
        auth: false,
      });
      setShowSnackBar(true);
    } else {
      // console.log(response);
      setState({
        error: false,
        message: response.message,
        auth: true,
      });
      setShowSnackBar(true);
      navigate('/dashboard/app', { replace: true });
    }
  };

  return (
    <>
      <Snackbar
        autoHideDuration={6000}
        open={showSnackBar}
        onClose={() => setShowSnackBar(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert severity={state.error ? 'error' : 'success'}>{state.message}</Alert>
      </Snackbar>
      <FormikProvider value={formik}>
        <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
          <Stack spacing={3}>
            <TextField
              fullWidth
              autoComplete="email"
              type="email"
              label="Email "
              {...getFieldProps('email')}
              error={Boolean(touched.email && errors.email)}
              helperText={touched.email && errors.email}
            />

            <TextField
              fullWidth
              autoComplete="current-password"
              type={showPassword ? 'text' : 'password'}
              label="Password"
              {...getFieldProps('password')}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleShowPassword} edge="end">
                      <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              error={Boolean(touched.password && errors.password)}
              helperText={touched.password && errors.password}
            />
          </Stack>

          <Stack direction="row" alignItems="center" justifyContent="end" sx={{ my: 2 }}>
            {/* <FormControlLabel
            control={<Checkbox {...getFieldProps('remember')} checked={values.remember} />}
            label="Remember me"
          /> */}

            <Link component={RouterLink} variant="subtitle2" to="#" underline="hover">
              Forgot password?
            </Link>
          </Stack>

          <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={false}>
            Login
          </LoadingButton>
        </Form>
      </FormikProvider>
    </>
  );
}
