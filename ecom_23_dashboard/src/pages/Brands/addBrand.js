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
    const response = await getReq({ url: 'brand/getall' });
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
        message: response.data.message,
        alert: true,
        loading: false,
      });
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
      url: 'brand/update',
      data,
    });

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

  const deleteBrand = async (e) => {
    setApiResult({ ...apiResult, loading: true });
    e.preventDefault();
    const response = await deleteRequest({ url: `brand/delete?id=${params.id}` });
    console.log('id--', params.id);
    if (!response.error) {
      setApiResult({ redirect: true });
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
          <Button color="primary" variant="contained" component={RouterLink} to="/dashboard/brands">
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
                            onChange={(e) => setImgAddress(e.target.value)}
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
                      <Button className=" brand-buttons" variant="contained" color="primary" onClick={createBrand}>
                        Submit
                      </Button>
                    ) : (
                      <>
                        <Button onClick={deleteBrand} color="error" className="brand-buttons" variant="contained">
                          Delete
                        </Button>
                        <Button
                          onClick={updateBrand}
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
