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
  Box,
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

export default function AddBrand() {
  const initialState = {
    brandName: '',
    brandDesc: '',
    logo: '',
    type: 'new',
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

  const [brandData, setBrand] = useState([]);
  const [state, setState] = useState(initialState);
  const [apiResult, setApiResult] = useState(initialResult);

  const handleChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const getData = async () => {
    const query = queryString.parse(location.search);
    console.log('Location', query);

    if (params.id) {
      setState({
        ...state,
        type: 'edit',
        brandName: query.brand,
        brandDesc: query.desc,
        imgUrl: query.logo,
      });
    }
    const response = await getReq({ url: 'api/brand' });
    console.log(response);
    if (!response.error) {
      setApiResult({
        ...apiResult,
        dataFetched: true,
      });
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const [imgAddress, setImgAddress] = useState(null);
  const demoImg = 'https://amdmediccentar.rs/wp-content/plugins/uix-page-builder/includes/uixpbform/images/no-logo.png';

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
      console.log('response', response);
      if (!response.error) {
        toast.success(response.message);
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
        toast.error(response.message);
        setApiResult({ ...apiResult, imgStatus: 'error' });
      }
    } catch (error) {
      toast.error(error);
      console.log(error);
      setApiResult({ ...apiResult, imgStatus: 'error' });
    }
  };

  const createBrand = async (e) => {
    setApiResult({ ...apiResult, loading: true, alert: true });
    e.preventDefault();
    const data = {
      brandName: state.brandName,
    };
    if (state.brandDesc) {
      data.brandDesc = state.brandDesc;
    } else {
      data.brandDesc = `${state.brandName} Products `;
    }
    if (state.logo) data.logo = state.logo;

    const response = await postReq({
      url: 'api/brand',
      data,
    });

    if (!response.error) {
      toast.success(response.message);
      setState(initialState);
      setApiResult({
        ...apiResult,
        error: false,
        message: response.message,
        alert: true,
        loading: false,
      });
    } else {
      toast.error(response.message);
      setApiResult({
        ...apiResult,
        error: true,
        message: response.message,
        alert: true,
        loading: false,
      });
      console.log(response.message);
    }
    setTimeout(() => {
      setApiResult({ ...apiResult, alert: false });
      // window.location.reload(false);
    }, 3000);
  };

  const updateBrand = async (e) => {
    setApiResult({ ...apiResult, loading: true });
    e.preventDefault();
    const data = { brandId: params.id };
    if (state.brandName) data.brandName = state.brandName;

    if (state.brandDesc) data.brandDesc = state.brandDesc;

    if (state.logo) data.logo = state.logo;

    // only for making slug remove this
    data.slug = state.brandName;

    const response = await patchReq({
      url: 'api/brand',
      data,
    });

    if (!response.error) {
      toast.success(response.message);
      setApiResult({
        ...apiResult,
        error: false,
        message: response.message,
        alert: true,
        loading: false,
      });
    } else {
      toast.error(response.message);
      setApiResult({
        ...apiResult,
        error: true,
        message: response.message,
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
    <Page title="Add  Brand">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography
            variant="h4"
            gutterBottom
            sm="4"
            title={params.id ? 'Edit Brand' : 'Add Brand'}
            subtitle=" "
            className="text-sm-left"
          >
            {params.id ? 'Edit Brand' : 'Add Brand'}
          </Typography>
          <Button color="primary" variant="contained" component={RouterLink} to="/dashboard/inventory/brands">
            Brand List
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
                          <div
                            className="img-upload-pre"
                            style={{
                              backgroundImage: `url(${
                                imgAddress ? `${ApiUrl.img_url}/brands/${imgAddress}` : demoImg
                              })`,
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
                            label="BrandName"
                            placeholder="Name"
                            name="brandName"
                            defaultValue={state.brandName}
                            value={state.brandName}
                            onChange={handleChange}
                          />

                          <TextField
                            fullWidth
                            type={'text'}
                            label="Description"
                            name="brandDesc"
                            value={state.brandDesc}
                            onChange={handleChange}
                          />
                        </Stack>
                      </Stack>
                    </Stack>
                    {state.type === 'new' ? (
                      <Box textAlign="center">
                        <Button className=" brand-buttons" variant="contained" color="primary" onClick={createBrand}>
                          Submit
                        </Button>
                      </Box>
                    ) : (
                      <>
                        <Box textAlign="end">
                          <Button
                            onClick={updateBrand}
                            color="warning"
                            className="mr-4 brand-buttons"
                            variant="contained"
                          >
                            Update
                          </Button>
                        </Box>
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
