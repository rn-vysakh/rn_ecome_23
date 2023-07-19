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

import { postReq, getReq, patchReq } from '../../data/ApiReq';

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

export default function Profile() {
  const initialState = {
    firstName: '',
    lastName: '',
    countryCode: '',
    phone: '',
    email: '',
    logo: '',
  };
  const initialResult = {
    error: false,
    message: '',
    alert: false,
    loading: false,
    dataFetched: false,
    redirect: false,
  };
  const params = useParams();
  const location = useLocation();

  const [tag, setTag] = useState([]);
  const [state, setState] = useState(initialState);
  const [apiResult, setApiResult] = useState(initialResult);

  const handleChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };
  console.log(state);

  const getData = async () => {
    const query = queryString.parse(location.search);
    console.log('Location', query);

    // if (params.id) {
    //   setState({
    //     ...state,
    //     type: 'edit',
    //     firstName: query.firstName,
    //     lastName: query.lastName,
    //     countryCode: query.countryCode,
    //     phone: query.phone,
    //     email: query.email,
    //     logo: query.logo,
    //   });
    // }
    const response = await getReq({ url: '/auth/api/user/single/6375dd3212d29e358cc7599f' });
    console.log(response.data);
    if (!response.error) {
      if (!response.error) {
        setState(response.data);
      }
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
    const data = { id: params.id };
    if (state.firstName) data.firstName = state.firstName;
    if (state.lastName) data.lastName = state.lastName;
    if (state.countryCode) data.countryCode = state.countryCode;
    if (state.email) data.email = state.email;
    if (state.phone) data.phone = state.phone;
    if (state.logo) data.logo = state.logo;

    // // only for making slug remove this
    // data.slug = state.firstName;

    const response = await patchReq({
      url: '/auth/api/user/6375dd3212d29e358cc7599f',
      data,
    });
    console.log('id check==================================>', data);
    if (!response.error) {
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
        message: response.data.message,
        alert: true,
        loading: false,
      });
    }
    setTimeout(() => {
      setApiResult({ ...apiResult, alert: false });
      setState(initialState);
    }, 3000);
  };

  return (
    <Page title="Add  Seller">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom sm="4" subtitle=" " className="text-sm-left">
            Profile
          </Typography>
        </Stack>
        <Grid container spacing={0} alignItems="center" justifyContent="center">
          <Grid item xs={12} md={10}>
            <Card>
              <CardContent>
                <div>
                  <FormikProvider>
                    {/* <Form autoComplete="off" noValidate > */}
                    <Stack spacing={3}>
                      <Typography variant="h5" gutterBottom>
                        Details
                      </Typography>

                      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={4}>
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
                            className="img-upload-pre-profile"
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
                            type={'text'}
                            label="First Name"
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
                            defaultValue={state.lastName}
                            value={state.lastName}
                            onChange={handleChange}
                          />
                          <TextField
                            fullWidth
                            type={'text'}
                            label="Country Code"
                            name="countryCode"
                            defaultValue={state.countryCode}
                            value={state.countryCode}
                            onChange={handleChange}
                          />
                        </Stack>
                      </Stack>

                      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                        <TextField
                          fullWidth
                          type={'text'}
                          label="Phone"
                          name="phone"
                          defaultValue={state.phone}
                          value={state.phone}
                          onChange={handleChange}
                        />

                        <TextField
                          fullWidth
                          type={'text'}
                          label="Email"
                          name="email"
                          defaultValue={state.email}
                          value={state.email}
                          onChange={handleChange}
                        />
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
                      <Button
                        to="/dashboard/profile/update-password"
                        color="primary"
                        component={RouterLink}
                        className="mr-4 brand-buttons"
                        variant="contained"
                      >
                        Update Password
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
