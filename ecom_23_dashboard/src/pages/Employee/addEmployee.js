import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import * as Yup from 'yup';
import { useFormik, Form, FormikProvider } from 'formik';
import { toast } from 'react-toastify';
// @mui
import { styled } from '@mui/material/styles';
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
  Container,
  Typography,
  Card,
  CardActions,
  CardContent,
  Grid,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import Page from '../../components/Page';
import Iconify from '../../components/Iconify';
import { postReq } from '../../data/ApiReq';

// ----------------------------------------------------------------------

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------
const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
export default function NewEmployee() {
  const [showPassword, setShowPassword] = useState(false);
  const [imgAddress, setImgAddress] = useState(
    'https://www.brightsidedental.co.uk/blog/wp-content/uploads/2020/08/Face-mask-1024x683.jpeg'
  );
  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };
  const UserSchema = Yup.object().shape({
    firstName: Yup.string().min(3, 'Please enter a valid name').required('First Name is required'),
    lastName: Yup.string().min(3, 'Please enter a valid name').required('Last Name is required'),
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    password: Yup.string().min(6, 'Please enter a valid password').required('Password is required'),
    employeeId: Yup.string().min(3, 'Please enter a valid Employee ID').required('Employee ID is required'),
    phone: Yup.string().min(10, 'Please enter a valid Phone No').required('Phone Number is required'),
  });

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      employeeId: '',
      image: '',
      email: '',
      phone: '',
      password: '',
      remember: true,
    },
    validationSchema: UserSchema,
    onSubmit: (values, { resetForm }) => {
      createUser(values, resetForm);
    },
  });

  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } = formik;

  const createUser = async (values, resetForm) => {
    const res = await postReq({ url: '/user', data: values });

    console.log(res);
    if (!res.error) {
      toast.success(' User Created');
      resetForm();
    } else {
      toast.error(res.message);
    }
  };
  return (
    <Page title="Add New Employee">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            New Employee
          </Typography>
        </Stack>
        <Grid container spacing={0} alignItems="center" justifyContent="center">
          <Grid item xs={12} md={7}>
            <Card>
              <CardContent>
                <div>
                  <FormikProvider value={formik}>
                    <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
                      <Stack spacing={3}>
                        <Typography variant="h5" gutterBottom>
                          Basic Details
                        </Typography>
                        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                          <Stack spacing={2}>
                            <div
                              className="img-upload-pre"
                              style={{
                                backgroundImage: `url(${imgAddress})`,
                              }}
                            />

                            <input
                              type="file"
                              className="custom-file-input"
                              onChange={(e) => setImgAddress(e.target.value)}
                            />
                          </Stack>
                          <Stack spacing={2} style={{ width: '80%' }}>
                            <TextField
                              fullWidth
                              label="First name"
                              {...getFieldProps('firstName')}
                              error={Boolean(touched.firstName && errors.firstName)}
                              helperText={touched.firstName && errors.firstName}
                            />

                            <TextField
                              fullWidth
                              label="Last name"
                              {...getFieldProps('lastName')}
                              error={Boolean(touched.lastName && errors.lastName)}
                              helperText={touched.lastName && errors.lastName}
                            />
                            <TextField
                              fullWidth
                              autoComplete="username"
                              type="text"
                              label="Employee ID"
                              {...getFieldProps('employeeId')}
                              error={Boolean(touched.employeeId && errors.employeeId)}
                              helperText={touched.employeeId && errors.employeeId}
                            />
                          </Stack>
                        </Stack>
                        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                          <TextField
                            fullWidth
                            autoComplete="username"
                            type="email"
                            label="Email address"
                            {...getFieldProps('email')}
                            error={Boolean(touched.email && errors.email)}
                            helperText={touched.email && errors.email}
                          />

                          <TextField
                            fullWidth
                            autoComplete="username"
                            type="number"
                            label="Phone Number"
                            {...getFieldProps('phone')}
                            error={Boolean(touched.phone && errors.phone)}
                            helperText={touched.phone && errors.phone}
                          />
                        </Stack>

                      

                        <TextField
                          fullWidth
                          autoComplete="current-password"
                          type={showPassword ? 'text' : 'password'}
                          label="Password"
                          {...getFieldProps('password')}
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <IconButton edge="end" onClick={() => setShowPassword((prev) => !prev)}>
                                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                                </IconButton>
                              </InputAdornment>
                            ),
                          }}
                          error={Boolean(touched.password && errors.password)}
                          helperText={touched.password && errors.password}
                        />

                        <LoadingButton fullWidth size="large" type="submit" variant="contained">
                          Register
                        </LoadingButton>
                      </Stack>
                    </Form>
                  </FormikProvider>
                </div>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
