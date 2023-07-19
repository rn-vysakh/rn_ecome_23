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

export default function AddSeller() {
  const initialState = {
    firstName: "",
    lastName: "",
    companyName: "",
    logo: "",
    countryCode: "",
    address: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    sellerId: "",
    bankName: "",
    bankAccountNumber: "",
    ibanNumber: "",
    type: "new",
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


  const getData = async () => {
    const query = queryString.parse(location.search);
    // console.log('Location', query);

    if (params.id) {
      setState({
        ...state,
        type: 'edit',
        brandName: query.brand,
        brandDesc: query.desc,
        imgUrl: query.logo,
      });
    }
    // const response = await getReq({ url: 'brand/getall' });
    // console.log(response);
    // if (!response.error) {
    //   setApiResult({
    //     ...apiResult,
    //     dataFetched: true,
    //   });
    // }
  };

  useEffect(() => {
    getData();
  }, []);

  const [imgAddress, setImgAddress] = useState(
    'https://www.brightsidedental.co.uk/blog/wp-content/uploads/2020/08/Face-mask-1024x683.jpeg'
  );

  // const imageUpload = async (e) => {
  //   try {
  //     let file;
  //     if (e.target.files) file = e.target.files[0]; // state.imagePath;
  //     if (!file) file = state.imagePath;
  //     console.log('file', file);
  //     if (!file) return;
  //     setApiResult({ ...apiResult, imgStatus: 'uploading' });

  //     const data = new FormData();
  //     data.append('image', file);
  //     data.append('type', 'brands');
  //     const response = await postReq({
  //       url: 'inventory/api/image/upload',
  //       data,
  //     });

  //     if (!response.error) {
  //       const logo = response.data.data._id;
  //       const imageData = response.data.data;

  //       setState({
  //         ...state,
  //         logo,
  //         imgUrl: imageData.mdUrl,
  //       });
  //       setApiResult({ ...apiResult, imgStatus: 'uploaded' });
  //     } else {
  //       setApiResult({ ...apiResult, imgStatus: 'error' });
  //     }
  //   } catch (error) {
  //     console.log(error);
  //     setApiResult({ ...apiResult, imgStatus: 'error' });
  //   }
  // };

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
      data.append('type', 'sellers');
      const response = await postReq({
        url: 'inventory/api/image/upload',
        data,
      });
      console.log('response', response);
      if (!response.error) {
        const logo = response.data._id;
        const imageData = response.data;
        setImgAddress(imageData.mdUrl);
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

  const createSeller = async (e) => {
    setApiResult({ ...apiResult, loading: true, alert: true });
    e.preventDefault();
    const data = {
        role: 'seller',
      firstName: state.firstName,
      lastName: state.lastName,
      companyName: state.companyName,
      countryCode: state.countryCode,
      address: state.address,
      email: state.email,
      password: state.password,
      confirmPassword: state.confirmPassword,
      phone: state.phone,
      sellerId: state.sellerId,
      bankName: state.bankName,
      bankAccountNumber: state.bankAccountNumber,
      ibanNumber: state.ibanNumber,
    };
  

    const response = await postReq({
      url: "/auth/api/user/signup",
      data,
    });

    if (!response.error) {
      setState(initialState);
      setApiResult({
        ...apiResult,
        error: false,
        message: response.data.message,
        alert: true,
        loading: false,
      });
    } else {
      setApiResult({
        ...apiResult,
        error: true,
        message: response.data,
        alert: true,
        loading: false,
      });
    }
    setTimeout(() => {
      setApiResult({ ...apiResult, alert: false });
      // window.location.reload(false);
    }, 3000);
  };


  const updateSeller = async (e) => {
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
    data.id = params.id;
    const response = await patchReq({
      url: `/auth/api/user/${params.id}`,
      data,
    });
    // console.log(data);

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

  const deleteCategory = async (e) => {
    setApiResult({ ...apiResult, loading: true });
    e.preventDefault();
    // console.log("id--", params.id);

    const response = await deleteRequest({url:`auth/api/user/${params.id}`});

    if (!response.error) {
      setApiResult({ redirect: true });
    } else {
      setApiResult({
        ...apiResult,
        error: true,
        message: response.data.message,
        alert: true,
        loading: false,
      });
    }
    setTimeout(() => {
      setApiResult({ ...apiResult, alert: false });
    }, 3000);
  };


  const getsingleuser = async () => {
    const response = await getReq({ url :`/auth/api/user/single/${params.id}`});
    if (!response.error) {
      setState(response.data);
      // console.log(response.data);
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
            title={params.id ? 'Edit Seller' : 'Add Seller'}
            subtitle=" "
            className="text-sm-left"
          >
            {params.id ? 'Edit Seller' : 'Add Seller'}
          </Typography>
          <Button color="primary" variant="contained" component={RouterLink} to="/dashboard/sellers">
            Seller List
          </Button>
        </Stack>
        <Grid container spacing={0} alignItems="center" justifyContent="center">
          <Grid item xs={12} md={7}>
            <Card>
              <CardContent>
                <div>
                  <FormikProvider>
                    {/* <Form autoComplete="off" noValidate > */}
                    <Stack spacing={3}>
                      <Typography variant="h5" gutterBottom>
                        Basic Details
                      </Typography>

                      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                        <Stack spacing={2}>
                          {/* <div className="img-input">
                          <div className="img-prev">
                            {apiResult.imgStatus === "uploading" ? (
                              <div className=" d-flex  mt-4 pt-2">
                                Uploading Image &nbsp;&nbsp;&nbsp;
                                <Stack
                                  type="spin"
                                  color="#007BFF"
                                  height={25}
                                  width={25}
                                />
                              </div>
                            ) : state.imgUrl ? (
                              <div>
                                <img
                                  src={`${ApiUrl.img_url}/brands/${state.imgUrl}`}
                                  alt="img"
                                  // className="img-fluid"
                                  loading="lazy"
                                  style={{
                                    width: "100%",
                                    height: "110px",
                                    overflow: "hidden",
                                    objectFit: "cover",
                                    // aspectRatio: "16/9"
                                  }}
                                />
                                <Button
                                  // className="btn btn-danger btn-sm ml-4"
                                  size="sm"
                                  onClick={() => {
                                    // removeImage(state.imageUrl[0], 0);
                                  }}
                                  outline
                                  squared
                                  theme="danger"
                                  block
                                >
                                 hii
                                </Button>
                              </div>
                            ) : apiResult.imgStatus === "error" ? (
                              "Something went wrong"
                            ) : (
                              <div className="no-img">
                                <strong>No Image Selected</strong>
                                <FormInput
                                  type="file"
                                  placeholder="Image"
                                  name="imagePath"
                                  // onChange={handlUpload}
                                  onChange={imageUpload}
                                  accept=".png, .jpg, .jpeg, .webp, .svg"
                                />
                              </div>
                            )}
                          </div>
                        </div> */}

                          <div
                            className="img-upload-pre"
                            style={{
                              backgroundImage: `url(${imgAddress})`,
                            }}
                          />

                          <input
                            type="file"
                            className="custom-file-input"
                            // onChange={(e) => setImgAddress(e.target.value)}
                            onChange={imageUpload}
                          />
                        </Stack>
                        <Stack spacing={2} style={{ width: '80%' }}>
                          <TextField
                            fullWidth
                            type={'text'}
                            label="First Name"
                            placeholder="firstName"
                            name="firstName"
                            defaultValue={state.firstName}
                            value={state.firstName}
                            onChange={handleChange}
                          />

                          <TextField
                            fullWidth
                            type={'text'}
                            label="Last Name"
                            name="lastName"
                            value={state.lastName}
                            onChange={handleChange}
                          />

                          <TextField
                            fullWidth
                            type={'text'}
                            label="Company Name"
                            name="companyName"
                            value={state.companyName}
                            onChange={handleChange}
                          />

                         
                        </Stack>
                      
                      </Stack>
                      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                          <TextField
                            fullWidth
                            type={'text'}
                            label="Country Code"
                            name="countryCode"
                            value={state.countryCode}
                            onChange={handleChange}
                           
                          />

                          <TextField
                            fullWidth
                            type={'text'}
                            label="Address"
                            name="address"
                            value={state.address}
                            onChange={handleChange}
                          
                          />
                        </Stack>
                        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                          <TextField
                            fullWidth
                            type={'text'}
                            label="Email"
                            name="email"
                            value={state.email}
                            onChange={handleChange}
                           
                          />
                            <TextField
                             fullWidth
                             type={'text'}
                             label="Phone"
                             name="phone"
                             value={state.phone}
                             onChange={handleChange}
                          />
                          
                        </Stack>

                        {state.type === 'new' ? (
                              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                              <TextField
                                   fullWidth
                                   type={'text'}
                                   label="Password"
                                   name="password"
                                   value={state.password}
                                   onChange={handleChange}
                                />
                                <TextField
                                   fullWidth
                                   type={'text'}
                                   label="Confirm Password"
                                   name="confirmPassword"
                                   value={state.confirmPassword}
                                   onChange={handleChange}
                                />                          
                              </Stack>
                            ) : (
                              ""
                            )}
                        
                        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                          <TextField
                             fullWidth
                             type={'text'}
                             label="Seller Id"
                             name="sellerId"
                             value={state.sellerId}
                             onChange={handleChange}
                          />

                          <TextField
                            fullWidth
                            type={'text'}
                            label="Bank Name"
                            name="bankName"
                            value={state.bankName}
                            onChange={handleChange}
                          />
                        </Stack>
                        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                          <TextField
                           fullWidth
                           type={'text'}
                           label="Bank Account Number"
                           name="bankAccountNumber"
                           value={state.bankAccountNumber}
                           onChange={handleChange}
                          />

                          <TextField
                           fullWidth
                           type={'text'}
                           label="IBAN number"
                           name="ibanNumber"
                           value={state.ibanNumber}
                           onChange={handleChange}
                          />
                        </Stack>
                        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                          <TextField
                           fullWidth
                           type={'text'}
                           label="Current Location"
                           name="currentLocation"
                           value={state.currentLocation}
                           onChange={handleChange}
                          />

                          <TextField
                           fullWidth
                           type={'text'}
                           label="TRN Number"
                           name="trnNumber"
                           value={state.trnNumber}
                           onChange={handleChange}
                          />
                        </Stack>
                        
                    </Stack>
                    {state.type === 'new' ? (
                      <Button className=" brand-buttons" variant="contained" color="primary" onClick={createSeller}>
                        Submit
                      </Button>
                    ) : (
                      <>
                        <Button onClick={deleteCategory} color="error" className="brand-buttons" variant="contained">
                          Delete
                        </Button>
                        <Button
                          onClick={updateSeller}
                          color="warning"
                          className="mr-4 brand-buttons"
                          variant="contained"
                        >
                          Update
                        </Button>
                      </>
                    )}
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
