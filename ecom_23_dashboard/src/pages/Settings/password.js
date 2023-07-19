import React, { useState, useEffect } from 'react';
import { Link as RouterLink, useParams, useLocation } from 'react-router-dom';
import * as Yup from 'yup';
import { useFormik, Form, FormikProvider } from 'formik';
import { toast } from 'react-toastify';
import ReactLoading from 'react-loading';
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
  Button,
  CardContent,
  Grid,
} from '@mui/material';

import { postReq, getReq, patchReq, deleteRequest } from '../../data/ApiReq';

// components
import Page from '../../components/Page';

import Iconify from '../../components/Iconify';
import ApiUrl from '../../data/ApiUrl';

const queryString = require('query-string');

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

export default function Password() {
  const initialState = {
    firstName: "",
    lastName: "",
    logo: "",
    countryCode: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
  };
  const initialResult = {
    error: false,
    message: "",
    alert: false,
    loading: false,
    dataFetched: false,
    redirect: false,
  };
  const params = useParams();
  const location = useLocation();

  const [brandData, setBrand] = useState([]);
  const [state, setState] = useState(initialState);
  const [apiResult, setApiResult] = useState(initialResult);
  const [sellerData, setSeller] = useState([]);

  // Handle Change
  const handleChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };


//   const getData = async () => {
//     const query = queryString.parse(location.search);
//     console.log('Location', query);

//     if (params.id) {
//       setState({
//         ...state,
//         type: 'edit',
//         brandName: query.brand,
//         brandDesc: query.desc,
//         imgUrl: query.logo,
//       });
//     }
//     const response = await getReq({ url: 'brand/getall' });
//     console.log(response);
//     if (!response.error) {
//       setApiResult({
//         ...apiResult,
//         dataFetched: true,
//       });
//     }
//   };

//   useEffect(() => {
//     getData();
//   }, []);

  const [profileData, setProfile] = useState([]);

  const getData = async () => {
    const response = await getReq({url : `auth/api/user/62565b68ac9b667a7f46d2fd`});
    if (!response.error) {
      setProfile(response.data);
      console.log(response.data);
    }
  };
  useEffect(() => {
    getData();
  }, []);



  const [imgAddress, setImgAddress] = useState(
    'https://www.brightsidedental.co.uk/blog/wp-content/uploads/2020/08/Face-mask-1024x683.jpeg'
  );

  const imageUpload = async (e) => {
    try {
      let file;
      if (e.target.files) file = e.target.files[0]; // state.imagePath;
      if (!file) file = state.imagePath;
      console.log('file', file);
      if (!file) return;
      setApiResult({ ...apiResult, imgStatus: 'uploading' });

      const data = new FormData();
      data.append('image', file);
      data.append('type', 'brands');
      const response = await postReq({
        url: 'api/image/upload',
        data,
      });

      if (!response.error) {
        const logo = response.data.data._id;
        const imageData = response.data.data;

        setState({
          ...state,
          logo,
          imgUrl: imageData.mdUrl,
        });
        setApiResult({ ...apiResult, imgStatus: 'uploaded' });
      } else {
        setApiResult({ ...apiResult, imgStatus: 'error' });
      }
    } catch (error) {
      console.log(error);
      setApiResult({ ...apiResult, imgStatus: 'error' });
    }
  };


  const updateProfile = async (e) => {
    setApiResult({ ...apiResult, loading: true });
    e.preventDefault();
    const data = { sellerId: params.id };
    if (state.firstName) data.firstName = state.firstName;
    if (state.lastName) data.lastName = state.lastName;
    if (state.companyName) data.companyName = state.companyName;
    if (state.countryCode) data.countryCode = state.countryCode;
    if (state.address) data.address = state.address;
    if (state.email) data.email = state.email;
    if (state.password) data.password = state.password;
    if (state.confirmPassword) data.confirmPassword = state.confirmPassword;
    if (state.phone) data.phone = state.phone;
    if (state.sellerId) data.sellerId = state.sellerId;
    if (state.bankName) data.bankName = state.bankName;
    if (state.bankAccountNumber) data.bankAccountNumber = state.bankAccountNumber;
    if (state.ibanNumber) data.ibanNumber = state.ibanNumber;
   

    // only for making slug remove this
    data.slug = state.firstName;

    const response = await patchReq({
      url: "user/updateuser",
      data,
    });

    if (!response.error) {
      setApiResult({
        ...apiResult,
        error: false,
        // message: response.data.message,
        alert: true,
        loading: false,
      });
    } else {
      setApiResult({
        ...apiResult,
        error: true,
        // message: response.data.message,
        alert: true,
        loading: false,
      });
    }
    setTimeout(() => {
      setApiResult({ ...apiResult, alert: false });
      setState(initialState);
    }, 3000);
  };


  const getsingleuser = async () => {
    const response = await getReq({ url :`user/getsingleuser?id=${params.id}`});
    if (!response.error) {
      setState(response.data);
      console.log(response.data);
    }

  };
  useEffect(() => {
if(params.id) {
  getsingleuser();
}
  }, []);


  return (
    <Page title="Add  Seller">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography
            variant="h4"
            gutterBottom
            sm="4"
            subtitle=" "
            className="text-sm-left"
          >
            Update Password
          </Typography>
          
        </Stack>
        <Grid container spacing={0} alignItems="center" justifyContent="center">
          <Grid item xs={12} md={7}>
            <Card>
              <CardContent>
                <div>
                  <FormikProvider>
                    {/* <Form autoComplete="off" noValidate > */}
                    <Stack spacing={3}>
                      

                      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={4}>
                        
                        <Stack spacing={2} style={{ width: '100%' }}>
                          <TextField
                            fullWidth
                            type={'text'}
                            label="Current Password"
                            placeholder="firstName"
                            name="firstName"
                            defaultValue={profileData.firstName}
                            value={profileData.firstName}
                            onChange={handleChange}
                          />

                          <TextField
                            fullWidth
                            type={'text'}
                            label="New Password"
                            name="lastName"
                            value={state.lastName}
                            onChange={handleChange}
                          />
                           <TextField
                            fullWidth
                            type={'text'}
                            label="Confirm Password"
                            name="countryCode"
                            value={state.countryCode}
                            onChange={handleChange}
                           
                          />
                         
                        </Stack>
                      
                      </Stack>
                        
                    </Stack>
                      <>
                        <Button
                          onClick={updateProfile}
                          color="warning"
                          className="mr-4 brand-buttons"
                          variant="contained"
                        >
                          Update
                        </Button>
                        
                      </>
                  
                    {/* </Form> */}
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
