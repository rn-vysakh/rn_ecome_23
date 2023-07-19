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
  InputLabel,
  MenuItem,
  FormControl,
  Select,
} from '@mui/material';

import { postReq, getReq, patchReq, deleteRequest } from '../../data/ApiReq';

// components
import Page from '../../components/Page';

const queryString = require('query-string');

export default function AddTag() {
  const initialState = {
    title: '',
    value: '',
    unit: '',
    label: '',
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

  const [tag, setTag] = useState([]);
  const [state, setState] = useState(initialState);
  const [apiResult, setApiResult] = useState(initialResult);
  const [categories, setCategories] = useState([]);

  const handleChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const getCategories = async () => {
    const response = await getReq({ url: 'api/category' });
    if (!response.error) {
      setCategories(response.data);
      return 1;
    }
    return 0;
  };

  const getData = async () => {
    const query = queryString.parse(location.search);
    console.log('Location', query);

    if (params.id) {
      setState({
        ...state,
        type: 'edit',
        title: query.title,
        value: query.value,
        unit: query.unit,
        label: query.label,
      });
    }
    const response = await getReq({ url: 'api/tag' });
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
    getCategories();
  }, []);

  const createTag = async (e) => {
    setApiResult({ ...apiResult, loading: true, alert: true });
    e.preventDefault();
    const data = {
      title: state.title,
      value: state.value,
      unit: state.unit,
      label: state.label,
      category: state.category,
    };
    // if (state.brandDesc) {
    //   data.brandDesc = state.brandDesc;
    // } else {
    //   data.brandDesc = `${state.brandName} Products `;
    // }
    // if (state.logo) data.logo = state.logo;

    const response = await postReq({
      url: 'api/tag',
      data,
    });
    console.log('create tag==============>', response);

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
      console.log(apiResult.message);
    } else {
      setApiResult({
        ...apiResult,
        error: true,
        message: response.type,
        alert: true,
        loading: false,
      });
      toast.error(response.message);
    }
    setTimeout(() => {
      setApiResult({ ...apiResult, alert: false });
      // window.location.reload(false);
    }, 3000);
  };

  const updateTag = async (e) => {
    setApiResult({ ...apiResult, loading: true });
    e.preventDefault();
    const data = { id: params.id };
    if (state.title) data.title = state.title;
    if (state.value) data.value = state.value;
    if (state.unit) data.unit = state.unit;
    if (state.label) data.label = state.label;

    const response = await patchReq({
      url: 'api/tag/update',
      data,
    });
    // console.log("update tag========================>",response);
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

  const deleteTag = async (e) => {
    setApiResult({ ...apiResult, loading: true });
    e.preventDefault();
    console.log('id--', params.id);

    const response = await deleteRequest({ url: `api/tag/delete?id=${params.id}` });
    console.log(response.data.message);

    if (!response.error) {
      toast.success(response.data.message);
      setApiResult({ redirect: true });
    } else {
      toast.error(response.data.message);
      setApiResult({
        ...apiResult,
        error: true,
        alert: true,
        message: response.data.message,
        loading: false,
      });
    }
    setTimeout(() => {
      setApiResult({ ...apiResult, alert: false });
    }, 3000);
  };

  return (
    <Page title="Add Tag">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography
            variant="h4"
            gutterBottom
            sm="4"
            title={params.id ? 'Edit Tag' : 'Add Tag'}
            subtitle=" "
            className="text-sm-left"
          >
            {params.id ? 'Edit Tag' : 'Add Tag'}
          </Typography>
          <Button color="primary" variant="contained" component={RouterLink} to="/dashboard/inventory/tag">
            Tag List
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
                        <Stack spacing={2} style={{ width: '80%' }}>
                          <TextField
                            fullWidth
                            type={'text'}
                            label="Title"
                            name="title"
                            defaultValue={state.title}
                            value={state.title}
                            onChange={handleChange}
                          />

                          <TextField
                            fullWidth
                            type={'text'}
                            label="Value"
                            name="value"
                            defaultValue={state.value}
                            value={state.value}
                            onChange={handleChange}
                          />

                          <TextField
                            fullWidth
                            type={'text'}
                            label="Unit"
                            name="unit"
                            defaultValue={state.unit}
                            value={state.unit}
                            onChange={handleChange}
                          />

                          <TextField
                            fullWidth
                            type={'text'}
                            label="Label"
                            name="label"
                            defaultValue={state.label}
                            value={state.label}
                            onChange={handleChange}
                          />

                          <FormControl size="small" sx={{ m: 1, minWidth: 350 }}>
                            <InputLabel id="demo-simple-select-label">Select Category</InputLabel>

                            <Select
                              label="Category"
                              name="category"
                              onChange={handleChange}
                              displayEmpty
                              inputProps={{ 'aria-label': 'Without label' }}
                            >
                              <MenuItem value="clear">Default Category</MenuItem>
                              {categories.map((category, key) => (
                                <MenuItem key={key} value={category._id}>
                                  {category.categoryName}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        </Stack>
                      </Stack>
                    </Stack>

                    {state.type === 'new' ? (
                      <Box textAlign="center">
                        <Button className=" brand-buttons" variant="contained" color="primary" onClick={createTag}>
                          Submit
                        </Button>
                      </Box>
                    ) : (
                      <>
                        <Box textAlign="end">
                          <Button
                            sx={{ mr: 2 }}
                            onClick={deleteTag}
                            color="error"
                            className="brand-buttons"
                            variant="contained"
                          >
                            Delete
                          </Button>
                          <Button
                            onClick={updateTag}
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
