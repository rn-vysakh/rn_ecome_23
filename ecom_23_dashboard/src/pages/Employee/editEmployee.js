import React, { useState, useEffect } from 'react';
import moment from 'moment';

import { Link as RouterLink, useParams } from 'react-router-dom';
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
  MenuItem,
  Button,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import Page from '../../components/Page';
import Iconify from '../../components/Iconify';
import { postReq, getReq, patchReq } from '../../data/ApiReq';
import { getUserRole } from '../../data/userData';

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

export default function EditEmployee() {
  const userRole = getUserRole();
  const { userId } = useParams();
  const initialValues = {
    firstName: '',
    lastName: '',
    employeeId: '',
    image: '',
    email: '',
    phone: '',
    password: '',
    remember: true,
    gender: 'Male',
    matStatus: 'Unmarried',
  };
  const [viewOnly, setViewOnly] = useState(true);
  const [userData, setUserData] = useState(initialValues);
  const [imgAddress, setImgAddress] = useState(
    'https://www.brightsidedental.co.uk/blog/wp-content/uploads/2020/08/Face-mask-1024x683.jpeg'
  );

  const UserSchema = Yup.object().shape({
    firstName: Yup.string().min(3, 'Please enter a valid name').required('First Name is required'),
    lastName: Yup.string().min(3, 'Please enter a valid name').required('Last Name is required'),
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    employeeId: Yup.string().min(3, 'Please enter a valid Employee ID').required('Employee ID is required'),
    phone: Yup.string().min(10, 'Please enter a valid Phone No').required('Phone Number is required'),
  });

  const formik = useFormik({
    initialValues: userData,
    enableReinitialize: true,
    validationSchema: UserSchema,
    onChange: (e) => {
      console.log(e);
    },
    onSubmit: (values, { resetForm }) => {
      // console.log(values);

      updateUser(values, resetForm);
    },
  });

  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } = formik;

  const getUserData = async () => {
    const response = await getReq({ url: `/user/getsingleuser?id=${userId}` });

    // console.log('response--->');
    // console.log(response);

    if (response.data) {
      const { data } = response;
      // const today = new Date();

      // Formating the date for the date picker
      if (data.dob) data.dob = moment(new Date(data.dob)).format('YYYY-MM-DD');
      if (data.doj) data.doj = moment(new Date(data.doj)).format('YYYY-MM-DD');
      if (data.passportValidity) data.passportValidity = moment(new Date(data.passportValidity)).format('YYYY-MM-DD');
      if (data.EIdValidity) data.EIdValidity = moment(new Date(data.EIdValidity)).format('YYYY-MM-DD');
      if (data.molCardValidity) data.molCardValidity = moment(new Date(data.molCardValidity)).format('YYYY-MM-DD');
      if (data.drLicenceValidity)
        data.drLicenceValidity = moment(new Date(data.drLicenceValidity)).format('YYYY-MM-DD');
      if (data.visaValidity) data.visaValidity = moment(new Date(data.visaValidity)).format('YYYY-MM-DD');
      if (data.insValidity) data.insValidity = moment(new Date(data.insValidity)).format('YYYY-MM-DD');

      setUserData(data);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  const updateUser = async (values, resetForm) => {
    const data = values;
    data.id = userId;

    const res = await patchReq({ url: '/user', data });

    // console.log(res);
    if (!res.error) {
      toast.success(' User Updated ');
      resetForm();
      getUserData();
      setViewOnly(true);
    } else {
      toast.error(res.message);
    }
  };
  return (
    <Page title="Add New Employee">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Employee Date
          </Typography>
          <Button
            variant="contained"
            onClick={() => setViewOnly(!viewOnly)}
            startIcon={<Iconify icon={viewOnly ? 'bx:edit-alt' : 'icons8:cancel'} />}
            color={viewOnly ? 'primary' : 'warning'}
          >
            {viewOnly ? 'Edit' : 'Cancel'}
          </Button>
        </Stack>

        <div>
          <FormikProvider value={formik}>
            <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
              <Grid container spacing={2} justifyContent="center">
                {/* Basic Details ⬇️ */}
                <Grid item xs={12} md={7}>
                  <Card>
                    <CardContent>
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
                              InputLabelProps={{ shrink: true }}
                              disabled={viewOnly}
                              fullWidth
                              label="First name"
                              {...getFieldProps('firstName')}
                              error={Boolean(touched.firstName && errors.firstName)}
                              helperText={touched.firstName && errors.firstName}
                            />

                            <TextField
                              InputLabelProps={{ shrink: true }}
                              disabled={viewOnly}
                              fullWidth
                              label="Last name"
                              {...getFieldProps('lastName')}
                              error={Boolean(touched.lastName && errors.lastName)}
                              helperText={touched.lastName && errors.lastName}
                            />
                            <TextField
                              InputLabelProps={{ shrink: true }}
                              disabled={viewOnly}
                              fullWidth
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
                            InputLabelProps={{ shrink: true }}
                            disabled={viewOnly}
                            fullWidth
                            type="email"
                            label="Email address"
                            {...getFieldProps('email')}
                            error={Boolean(touched.email && errors.email)}
                            helperText={touched.email && errors.email}
                          />

                          <TextField
                            InputLabelProps={{ shrink: true }}
                            disabled={viewOnly}
                            fullWidth
                            type="number"
                            label="Phone Number"
                            {...getFieldProps('phone')}
                            error={Boolean(touched.phone && errors.phone)}
                            helperText={touched.phone && errors.phone}
                          />
                        </Stack>
                      </Stack>
                    </CardContent>
                  </Card>
                </Grid>
                {/* Other Details ⬇️ */}
                <Grid item xs={12} md={5}>
                  <Card style={{ minHeight: '100%' }}>
                    <CardContent>
                      <Stack spacing={2}>
                        <Typography variant="h5" gutterBottom>
                          Other Details
                        </Typography>
                        <TextField
                          InputLabelProps={{ shrink: true }}
                          disabled={viewOnly}
                          type="date"
                          label="Date of joining"
                          {...getFieldProps('doj')}
                          error={Boolean(touched.doj && errors.doj)}
                          helperText={touched.doj && errors.doj}
                        />

                        <TextField
                          InputLabelProps={{ shrink: true }}
                          disabled={viewOnly}
                          fullWidth
                          label="Designation"
                          {...getFieldProps('designation')}
                          error={Boolean(touched.designation && errors.designation)}
                          helperText={touched.designation && errors.designation}
                        />
                        <TextField
                          InputLabelProps={{ shrink: true }}
                          disabled={viewOnly}
                          fullWidth
                          label="Nationality"
                          {...getFieldProps('nationality')}
                          error={Boolean(touched.nationality && errors.nationality)}
                          helperText={touched.nationality && errors.nationality}
                        />
                      </Stack>
                    </CardContent>
                  </Card>
                </Grid>
                {/* Personal Details ⬇️` */}
                <Grid item xs={12} md={4}>
                  <Card style={{ minHeight: '100%' }}>
                    <CardContent>
                      <Stack spacing={2}>
                        <Typography variant="h5" gutterBottom>
                          Personal Details
                        </Typography>
                        <TextField
                          InputLabelProps={{ shrink: true }}
                          disabled={viewOnly}
                          type="date"
                          label="Date of Birth"
                          // value="1998-05-29"
                          {...getFieldProps('dob')}
                          error={Boolean(touched.dob && errors.dob)}
                          helperText={touched.dob && errors.dob}
                        />

                        <TextField
                          InputLabelProps={{ shrink: true }}
                          disabled={viewOnly}
                          fullWidth
                          select
                          label="Gender"
                          {...getFieldProps('gender')}
                          error={Boolean(touched.gender && errors.gender)}
                          helperText={touched.gender && errors.gender}
                        >
                          <MenuItem value="Male">Male</MenuItem>

                          <MenuItem value="Female">Female</MenuItem>
                        </TextField>
                        <TextField
                          InputLabelProps={{ shrink: true }}
                          disabled={viewOnly}
                          fullWidth
                          select
                          label="Maritial Status"
                          {...getFieldProps('matStatus')}
                          error={Boolean(touched.matStatus && errors.matStatus)}
                          helperText={touched.matStatus && errors.matStatus}
                        >
                          <MenuItem value="Married">Married</MenuItem>
                          <MenuItem value="Unmarried">Unmarried</MenuItem>
                          <MenuItem value="Other">Other</MenuItem>
                        </TextField>
                        <TextField
                          InputLabelProps={{ shrink: true }}
                          disabled={viewOnly}
                          fullWidth
                          label="Personal Email ID"
                          {...getFieldProps('persEmail')}
                          error={Boolean(touched.persEmail && errors.persEmail)}
                          helperText={touched.persEmail && errors.persEmail}
                        />
                        <TextField
                          InputLabelProps={{ shrink: true }}
                          disabled={viewOnly}
                          fullWidth
                          label="UAE Address"
                          {...getFieldProps('uaeAddress')}
                          multiline
                          rows={4}
                          error={Boolean(touched.uaeAddress && errors.uaeAddress)}
                          helperText={touched.uaeAddress && errors.uaeAddress}
                        />
                      </Stack>
                    </CardContent>
                  </Card>
                </Grid>
                {/* Document Details ⬇️ */}
                <Grid item xs={12} md={8}>
                  <Card style={{ minHeight: '100%' }}>
                    <CardContent>
                      <Stack spacing={2}>
                        <Typography variant="h5" gutterBottom>
                          Document Details
                        </Typography>
                        <Stack direction={'row'} spacing={2}>
                          <TextField
                            InputLabelProps={{ shrink: true }}
                            disabled={viewOnly}
                            fullWidth
                            label="Passport No"
                            {...getFieldProps('passportNo')}
                            error={Boolean(touched.passportNo && errors.passportNo)}
                            helperText={touched.passportNo && errors.passportNo}
                            style={{ width: '60%' }}
                          />
                          <TextField
                            InputLabelProps={{ shrink: true }}
                            disabled={viewOnly}
                            type="date"
                            label="Passport Validity"
                            {...getFieldProps('passportValidity')}
                            error={Boolean(touched.passportValidity && errors.passportValidity)}
                            helperText={touched.passportValidity && errors.passportValidity}
                            style={{ width: '40%' }}
                          />
                        </Stack>
                        <Stack direction={'row'} spacing={2}>
                          <TextField
                            InputLabelProps={{ shrink: true }}
                            disabled={viewOnly}
                            fullWidth
                            label="Emirates ID No"
                            {...getFieldProps('EIdNo')}
                            error={Boolean(touched.EIdNo && errors.EIdNo)}
                            helperText={touched.EIdNo && errors.EIdNo}
                            style={{ width: '60%' }}
                          />
                          <TextField
                            InputLabelProps={{ shrink: true }}
                            disabled={viewOnly}
                            type="date"
                            label="Emirates ID Validity"
                            {...getFieldProps('EIdValidity')}
                            error={Boolean(touched.EIdValidity && errors.EIdValidity)}
                            helperText={touched.EIdValidity && errors.EIdValidity}
                            style={{ width: '40%' }}
                          />
                        </Stack>

                        <TextField
                          InputLabelProps={{ shrink: true }}
                          disabled={viewOnly}
                          type="date"
                          fullWidth
                          label="Driving Licence Validity"
                          {...getFieldProps('drLicenceValidity')}
                          error={Boolean(touched.drLicenceValidity && errors.drLicenceValidity)}
                          helperText={touched.drLicenceValidity && errors.drLicenceValidity}
                        />
                        <TextField
                          InputLabelProps={{ shrink: true }}
                          disabled={viewOnly}
                          fullWidth
                          label="Bank Name"
                          {...getFieldProps('bankName')}
                          error={Boolean(touched.bankName && errors.bankName)}
                          helperText={touched.bankName && errors.bankName}
                        />
                        <TextField
                          InputLabelProps={{ shrink: true }}
                          disabled={viewOnly}
                          fullWidth
                          label="Bank Account No."
                          {...getFieldProps('bankAccNo')}
                          error={Boolean(touched.bankAccNo && errors.bankAccNo)}
                          helperText={touched.bankAccNo && errors.bankAccNo}
                        />
                        <TextField
                          InputLabelProps={{ shrink: true }}
                          disabled={viewOnly}
                          fullWidth
                          label="IBAN No."
                          {...getFieldProps('ibanNo')}
                          error={Boolean(touched.ibanNo && errors.ibanNo)}
                          helperText={touched.ibanNo && errors.ibanNo}
                        />
                      </Stack>
                    </CardContent>
                  </Card>
                </Grid>
                {/* Emergency Contact - UAE ⬇️ */}
                <Grid item xs={12} md={6}>
                  <Card style={{ minHeight: '100%' }}>
                    <CardContent>
                      <Stack spacing={2}>
                        <Typography variant="h5" gutterBottom>
                          Emergency Contact - UAE
                        </Typography>
                        <TextField
                          InputLabelProps={{ shrink: true }}
                          disabled={viewOnly}
                          fullWidth
                          type="text"
                          label="Contact Person Name"
                          {...getFieldProps('contactNameUae')}
                          error={Boolean(touched.contactNameUae && errors.contactNameUae)}
                          helperText={touched.contactNameUae && errors.contactNameUae}
                        />

                        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                          <TextField
                            InputLabelProps={{ shrink: true }}
                            disabled={viewOnly}
                            fullWidth
                            label="Relationship"
                            {...getFieldProps('relationShipUae')}
                            error={Boolean(touched.relationShipUae && errors.relationShipUae)}
                            helperText={touched.relationShipUae && errors.relationShipUae}
                          />

                          <TextField
                            InputLabelProps={{ shrink: true }}
                            disabled={viewOnly}
                            fullWidth
                            type="number"
                            label="Phone Number"
                            {...getFieldProps('contactUaeNo')}
                            error={Boolean(touched.contactUaeNo && errors.contactUaeNo)}
                            helperText={touched.contactUaeNo && errors.contactUaeNo}
                          />
                        </Stack>
                        <TextField
                          InputLabelProps={{ shrink: true }}
                          disabled={viewOnly}
                          fullWidth
                          label="Address"
                          {...getFieldProps('contactUaeAddress')}
                          multiline
                          rows={4}
                          error={Boolean(touched.contactUaeAddress && errors.contactUaeAddress)}
                          helperText={touched.contactUaeAddress && errors.contactUaeAddress}
                        />
                      </Stack>
                    </CardContent>
                  </Card>
                </Grid>
                {/* Emergency Contact - Home Country⬇️ */}
                <Grid item xs={12} md={6}>
                  <Card style={{ minHeight: '100%' }}>
                    <CardContent>
                      <Stack spacing={2}>
                        <Typography variant="h5" gutterBottom>
                          Emergency Contact - Home Country
                        </Typography>
                        <TextField
                          InputLabelProps={{ shrink: true }}
                          disabled={viewOnly}
                          fullWidth
                          type="text"
                          label="Contact Person Name"
                          {...getFieldProps('contactNameHome')}
                          error={Boolean(touched.contactNameHome && errors.contactNameHome)}
                          helperText={touched.contactNameHome && errors.contactNameHome}
                        />

                        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                          <TextField
                            InputLabelProps={{ shrink: true }}
                            disabled={viewOnly}
                            fullWidth
                            label="Relationship"
                            {...getFieldProps('relationShipHome')}
                            error={Boolean(touched.relationShipHome && errors.relationShipHome)}
                            helperText={touched.relationShipHome && errors.relationShipHome}
                          />

                          <TextField
                            InputLabelProps={{ shrink: true }}
                            disabled={viewOnly}
                            fullWidth
                            type="number"
                            label="Phone Number"
                            {...getFieldProps('contactHomeNo')}
                            error={Boolean(touched.contactHomeNo && errors.contactHomeNo)}
                            helperText={touched.contactHomeNo && errors.contactHomeNo}
                          />
                        </Stack>
                        <TextField
                          InputLabelProps={{ shrink: true }}
                          disabled={viewOnly}
                          fullWidth
                          label="Address"
                          {...getFieldProps('contactHomeAddress')}
                          multiline
                          rows={4}
                          error={Boolean(touched.contactHomeAddress && errors.contactHomeAddress)}
                          helperText={touched.contactHomeAddress && errors.contactHomeAddress}
                        />
                      </Stack>
                    </CardContent>
                  </Card>
                </Grid>
                {userRole === 'admin' && (
                  <>
                    {/* Employement Details Section ⬇️ */}
                    <Grid item xs={12} md={6}>
                      <Card style={{ minHeight: '100%' }}>
                        <CardContent>
                          <Stack spacing={2}>
                            <Typography variant="h5" gutterBottom>
                              Employement Details
                            </Typography>

                            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                              <TextField
                                InputLabelProps={{ shrink: true }}
                                disabled={viewOnly}
                                fullWidth
                                label="Company"
                                {...getFieldProps('company')}
                                error={Boolean(touched.company && errors.company)}
                                helperText={touched.company && errors.company}
                              />

                              <TextField
                                InputLabelProps={{ shrink: true }}
                                disabled={viewOnly}
                                fullWidth
                                label="Type of Contract"
                                {...getFieldProps('typeOfContract')}
                                error={Boolean(touched.typeOfContract && errors.typeOfContract)}
                                helperText={touched.typeOfContract && errors.typeOfContract}
                              />
                            </Stack>
                            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                              <TextField
                                InputLabelProps={{ shrink: true }}
                                disabled={viewOnly}
                                fullWidth
                                label="MOL Card No."
                                {...getFieldProps('molCardNo')}
                                error={Boolean(touched.molCardNo && errors.molCardNo)}
                                helperText={touched.molCardNo && errors.molCardNo}
                              />

                              <TextField
                                InputLabelProps={{ shrink: true }}
                                disabled={viewOnly}
                                type="date"
                                fullWidth
                                label="MOL Card Validity"
                                {...getFieldProps('molCardValidity')}
                                error={Boolean(touched.molCardValidity && errors.molCardValidity)}
                                helperText={touched.molCardValidity && errors.molCardValidity}
                              />
                            </Stack>
                            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                              <TextField
                                InputLabelProps={{ shrink: true }}
                                disabled={viewOnly}
                                fullWidth
                                label="Visa Status"
                                {...getFieldProps('visaStatus')}
                                error={Boolean(touched.visaStatus && errors.visaStatus)}
                                helperText={touched.visaStatus && errors.visaStatus}
                              />

                              <TextField
                                InputLabelProps={{ shrink: true }}
                                type="date"
                                disabled={viewOnly}
                                fullWidth
                                label="Visa Validity"
                                {...getFieldProps('visaValidity')}
                                error={Boolean(touched.visaValidity && errors.visaValidity)}
                                helperText={touched.visaValidity && errors.visaValidity}
                              />
                            </Stack>
                            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                              <TextField
                                InputLabelProps={{ shrink: true }}
                                disabled={viewOnly}
                                fullWidth
                                label="Ins. Card No."
                                {...getFieldProps('insCardNo')}
                                error={Boolean(touched.insCardNo && errors.insCardNo)}
                                helperText={touched.insCardNo && errors.insCardNo}
                              />

                              <TextField
                                InputLabelProps={{ shrink: true }}
                                disabled={viewOnly}
                                type="date"
                                fullWidth
                                label="Insurance Validity"
                                {...getFieldProps('insValidity')}
                                error={Boolean(touched.insValidity && errors.insValidity)}
                                helperText={touched.insValidity && errors.insValidity}
                              />
                            </Stack>
                          </Stack>
                        </CardContent>
                      </Card>
                    </Grid>
                    {/* Salary section ⬇️ */}
                    <Grid item xs={12} md={6}>
                      <Card style={{ minHeight: '100%' }}>
                        <CardContent>
                          <Stack spacing={2}>
                            <Typography variant="h5" gutterBottom>
                              Salary Details
                            </Typography>

                            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                              <TextField
                                InputLabelProps={{ shrink: true }}
                                disabled={viewOnly}
                                fullWidth
                                label="Basic Salary"
                                {...getFieldProps('basic')}
                                error={Boolean(touched.basic && errors.basic)}
                                helperText={touched.basic && errors.basic}
                              />

                              <TextField
                                InputLabelProps={{ shrink: true }}
                                disabled={viewOnly}
                                fullWidth
                                label="HRA"
                                {...getFieldProps('hra')}
                                error={Boolean(touched.hra && errors.hra)}
                                helperText={touched.hra && errors.hra}
                              />
                            </Stack>
                            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                              <TextField
                                InputLabelProps={{ shrink: true }}
                                disabled={viewOnly}
                                fullWidth
                                label="Tell A."
                                {...getFieldProps('tellA')}
                                error={Boolean(touched.tellA && errors.tellA)}
                                helperText={touched.tellA && errors.tellA}
                              />

                              <TextField
                                InputLabelProps={{ shrink: true }}
                                disabled={viewOnly}
                                fullWidth
                                label="Travel A."
                                {...getFieldProps('travA')}
                                error={Boolean(touched.travA && errors.travA)}
                                helperText={touched.travA && errors.travA}
                              />
                            </Stack>

                            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                              <TextField
                                InputLabelProps={{ shrink: true }}
                                disabled={viewOnly}
                                fullWidth
                                label="Transport."
                                {...getFieldProps('transportA')}
                                error={Boolean(touched.transportA && errors.transportA)}
                                helperText={touched.transportA && errors.transportA}
                              />

                              <TextField
                                InputLabelProps={{ shrink: true }}
                                disabled={viewOnly}
                                fullWidth
                                label="Other."
                                {...getFieldProps('otherA')}
                                error={Boolean(touched.otherA && errors.otherA)}
                                helperText={touched.otherA && errors.otherA}
                              />
                            </Stack>

                            <TextField
                              InputLabelProps={{ shrink: true }}
                              disabled={viewOnly}
                              fullWidth
                              label="Gross"
                              {...getFieldProps('gross')}
                              error={Boolean(touched.relationShipHome && errors.relationShipHome)}
                              helperText={touched.relationShipHome && errors.relationShipHome}
                            />
                          </Stack>
                        </CardContent>
                      </Card>
                    </Grid>
                  </>
                )}

                <Grid item xs={12} md={4}>
                  <LoadingButton fullWidth size="large" type="submit" variant="contained" disabled={viewOnly}>
                    Update
                  </LoadingButton>
                </Grid>
              </Grid>
            </Form>
          </FormikProvider>
        </div>
      </Container>
    </Page>
  );
}
