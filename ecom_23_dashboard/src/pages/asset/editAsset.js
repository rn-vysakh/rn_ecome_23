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
import {  getReq, patchReq } from '../../data/ApiReq';
import { getUserRole } from '../../data/userData';

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

export default function EditAsset() {
  const userRole = getUserRole();
  const { userId } = useParams();
  const initialValues = {
    deviceName: '',
    description: '',
    dateOfAssigning: '',
    remarks: '',
   
  };
  const [viewOnly, setViewOnly] = useState(true);
  const [userData, setUserData] = useState(initialValues);


  const AssetSchema = Yup.object().shape({
    deviceName: Yup.string().min(3, 'Please enter a device name').required('Device Name is required'),
    description: Yup.string().min(3, 'Please enter a description').required('Description is required'),
    dateOfAssigning: Yup.date('Please enter valid date').required('Date is required'),
    remarks: Yup.string().min(3, 'Please add remarks').required('Remarks is required'),
  });

  const formik = useFormik({
    initialValues: userData,
    enableReinitialize: true,
    validationSchema: AssetSchema,
    onChange: (e) => {
      console.log(e);
    },
    onSubmit: (values, { resetForm }) => {
      // console.log(values);

      updateUser(values, resetForm);
    },
  });

  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } = formik;


  const { id } = useParams();



  const getUserData = async () => {
    const response = await getReq({ url: `/asset/${id}` });

    //  console.log('response--->');
    //  console.log(response);

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

    const res = await patchReq({ url: `/asset/respond/${id}`, data });

    // console.log(res);
    if (!res.error) {
      toast.success(' Asset Updated ');
      resetForm();
      getUserData();
      setViewOnly(true);
    } else {
      toast.error(res.message);
    }
  };
  return (
    <Page title="Update Asset">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Asset Details
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
                <Grid item xs={12} >
                  <Card>
                    <CardContent>
                      <Stack spacing={3}>
                       
                       
                        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                        <TextField
                              InputLabelProps={{ shrink: true }}
                              disabled={viewOnly}
                              fullWidth
                              label="Device Name"
                              {...getFieldProps('deviceName')}
                              error={Boolean(touched.deviceName && errors.deviceName)}
                              helperText={touched.deviceName && errors.deviceName}
                            />
                          

                        </Stack>
                        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                        <TextField
                              InputLabelProps={{ shrink: true }}
                              disabled={viewOnly}
                              fullWidth
                              label="Description"
                              {...getFieldProps('description')}
                              error={Boolean(touched.description && errors.description)}
                              helperText={touched.description && errors.description}
                            />
                          

                        </Stack>
                        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                        <TextField
                              InputLabelProps={{ shrink: true }}
                              disabled={viewOnly}
                              fullWidth
                              type="text"
                              label="Date Of Assigning"
                              {...getFieldProps('dateOfAssigning')}
                              error={Boolean(touched.dateOfAssigning && errors.dateOfAssigning)}
                              helperText={touched.dateOfAssigning && errors.dateOfAssigning}
                            />
                          

                        </Stack>
                        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                          <TextField
                            InputLabelProps={{ shrink: true }}
                            disabled={viewOnly}
                            fullWidth
                            type="text"
                            label="Remarks"
                            {...getFieldProps('remarks')}
                            error={Boolean(touched.remarks && errors.remarks)}
                            helperText={touched.remarks && errors.remarks}
                          />
                          

                        </Stack>
                      </Stack>
                    </CardContent>
                  </Card>
                </Grid>
                
                
               
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
