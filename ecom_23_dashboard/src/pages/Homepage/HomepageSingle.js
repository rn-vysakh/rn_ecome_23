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
  ImageList,
  Grid,
  Box,
} from '@mui/material';

import { postReq, getReq, patchReq, deleteRequest } from '../../data/ApiReq';

// components
import Page from '../../components/Page';
import noImg from '../../assets/no-img.jpg';
import Iconify from '../../components/Iconify';
import ApiUrl from '../../data/ApiUrl';
import SearchIcon from '@mui/icons-material/Search';

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

export default function HomepageSingle() {
  const initialState = {
    title: '',
    type: '',
    products: [],
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

  const [productData, setProduct] = useState([]);
  const [state, setState] = useState(initialState);
  const [oldList, setOldList] = useState([]);
  const [apiResult, setApiResult] = useState(initialResult);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const [title, setTitle] = useState('');
  const [searchMsg, setSearchMsg] = useState('');
  const [productList, setProductList] = useState([]);
  const [productId, setProductId] = useState([]);
  const [show, setShow] = useState();
  const [test, setTest] = useState();
  const [categoryData, setCategory] = useState([]);

  const toggleShow = () => {
    setShow(!show);
  };

  const handleChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  // const getData = async () => {
  //   if (params.id) {
  //   // const res = await getReq({ url: `/api/home/${params.id}` });
  //   const res = await getReq({ url: `/inventory/api/home/${params.id}` });
  //   if (!res.error) {
  //     setProduct(res.data);
  //     console.log("Haii", res.data);
  //   //   console.log(params.id);
  //   console.log(productData.title)
  //   }
  // }

  // };

  const getData = async () => {
    if (params.id) {
      const response = await getReq({ url: `/inventory/api/home/${params.id}` });

      console.log('old product list==============>', response.data.products);
      setState({
        ...state,
        type: response.data.type,
        title: response.data.title,
        products: response.data.products,
      });
      setApiResult({
        ...apiResult,
        loading: false,
      });
    }
  };

  const getOldData = async () => {
    if (params.id) {
      const response = await getReq({ url: `/inventory/api/home/${params.id}` });

      console.log('old product list==============>111111', response.data.products);
      setOldList({
        ...oldList,
        type: response.data.type,
        title: response.data.title,
        products: response.data.products,
      });
      setApiResult({
        ...apiResult,
        loading: false,
      });
    }
  };

  useEffect(() => {
    getData();
    getOldData();
  }, []);

  const [imgAddress, setImgAddress] = useState(
    'https://www.brightsidedental.co.uk/blog/wp-content/uploads/2020/08/Face-mask-1024x683.jpeg'
  );

  const createBrand = async (e) => {
    setApiResult({ ...apiResult, loading: true, alert: true });
    e.preventDefault();
    const data = {
      brandName: state.brandName,
    };
    // if (state.brandDesc) {
    //   data.brandDesc = state.brandDesc;
    // } else {
    //   data.brandDesc = `${state.brandName} Products `;
    // }
    // if (state.logo) data.logo = state.logo;

    const response = await postReq({
      url: 'inventory/api/brand',
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

  const updateTag = async (e) => {
    setApiResult({ ...apiResult, loading: true });
    e.preventDefault();
    // setProductList([...productList, ...oldList]);
    const data = { id: params.id };
    if (state.title) data.title = state.title;
    if (state.type) data.type = state.type;
    if (productId) data.products = productId;

    const response = await patchReq({
      url: `/inventory/api/home/update?id=${params.id}`,
      data,
    });
    console.log('update tag========================>', response);
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

  const deleteTag = async (e) => {
    setApiResult({ ...apiResult, loading: true });
    e.preventDefault();
    console.log('id--', params.id);

    const response = await deleteRequest({ url: `api/home/delete?id=${params.id}` });
    console.log(response);

    if (!response.error) {
      setApiResult({ redirect: true });
    } else {
      setApiResult({
        ...apiResult,
        error: true,
        alert: true,
        loading: false,
      });
    }
    setTimeout(() => {
      setApiResult({ ...apiResult, alert: false });
    }, 3000);
  };

  const handleSearch = async (e) => {
    const { value } = e.target;

    setSearchTerm(value);
    if (value.length > 2) {
      try {
        let response = await getReq({ url: `/inventory/api/product?searchText=${value}` });

        console.log(response.data);

        if (response.statusCode === 200) {
          if (response.data.length > 0) {
            setSearchResult(response.data);
            setSearchMsg('view-all');
          } else {
            setSearchResult([]);

            setSearchMsg('No result found');
          }
        }
      } catch (error) {
        setSearchMsg('Something went wrong !');
      }
    } else {
      setSearchResult([]);
      setSearchMsg('');
    }
  };

  const createHome = async (e) => {
    console.log('productId...?>');
    console.log(productId);
    setApiResult({ ...apiResult, loading: true, alert: true });
    e.preventDefault();
    const data = {
      type: state.type,
      title: title,
      products: productId,
      // products: state.products,
    };
    if (state.type) data.type = state.type;
    if (state.title) data.title = state.title;

    console.log(data);
    const response = await postReq({
      url: 'inventory/api/home',
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
      // 👇️ redirect to /dashboard/homepage/productlist
      navigate('/dashboard/homepage');
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

  console.log('home page product list New added===============>', productList);

  const handleClick = (product) => {
    productList.push(product);
    productId.push(product._id);
    // console.log(product.title)
  };
  var buttonText = show ? 'Hide product' : 'Add new product';

  // setProductList([...productList, ...oldList]);

  return (
    <Page title="Add Product">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography
            variant="h4"
            gutterBottom
            sm="4"
            title={params.id ? 'Edit Product' : 'Add Product'}
            subtitle=" "
            className="text-sm-left"
          >
            {params.id ? 'Edit Product' : 'Add Product'}
          </Typography>
          <Button color="primary" variant="contained" component={RouterLink} to="/dashboard/homepage">
            Homepage section
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
                      <Stack sx={{ marginTop: '20px' }} direction="row"></Stack>

                      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                        <Stack spacing={2}></Stack>
                        <Stack spacing={2} style={{ width: '100%' }}>
                          <TextField
                            fullWidth
                            type={'text'}
                            label="Title"
                            placeholder="Title"
                            name="Title"
                            defaultValue={state.title}
                            value={state.title}
                            onChange={handleChange}
                          />
                          <div style={{ marginTop: '10px', fontSize: '20px', fontWeight: '600' }}>
                            Type : {state.type}
                          </div>

                          {state?.products?.map((item, key) => (
                            <Card
                              variant="outlined"
                              style={{
                                marginBottom: '20px',
                                marginTop: '20px',
                                display: 'flex',
                                alignItems: 'center',
                                flexDirection: 'row',
                                paddingLeft: '15px',
                                paddingRight: '15px',
                              }}
                              key={key}
                            >
                              <div style={{ width: '100%', padding: '10px' }}>{item.title}</div>
                              <div style={{ width: '100%' }}>
                                {item?.image[0]?.smUrl ? (
                                  <img
                                    height={200}
                                    src={`${ApiUrl.img_url}/products/${item?.image[0]?.smUrl}`}
                                    alt="product"
                                    className="product-list-img"
                                  />
                                ) : (
                                  <ImageList src={noImg} alt="no image" height="50px" />
                                )}
                              </div>

                              <div>
                                <Button
                                  color="error"
                                  variant="contained"
                                  component={RouterLink}
                                  onClick={deleteTag}
                                  startIcon={<Iconify icon="material-symbols:close" />}
                                >
                                  Remove
                                </Button>
                              </div>
                            </Card>
                          ))}

                          {productList.map((item1, key1) => (
                            <Card
                              variant="outlined"
                              style={{
                                marginBottom: '20px',
                                marginTop: '20px',
                                display: 'flex',
                                alignItems: 'center',
                                flexDirection: 'row',
                                paddingLeft: '15px',
                                paddingRight: '15px',
                              }}
                              key={key1}
                            >
                              <div style={{ padding: '10px', width: '100%' }} key={key1}>
                                {item1.title}
                              </div>
                              <div style={{ width: '100%' }}>
                                {item1?.image[0]?.smUrl ? (
                                  <img
                                    height={200}
                                    src={`${ApiUrl.img_url}/products/${item1?.image[0]?.smUrl}`}
                                    alt="product"
                                    className="product-list-img"
                                  />
                                ) : (
                                  <ImageList src={noImg} alt="no image" height="50px" />
                                )}
                              </div>

                              <div>
                                <Button
                                  color="error"
                                  variant="contained"
                                  component={RouterLink}
                                  onClick={deleteTag}
                                  startIcon={<Iconify icon="material-symbols:close" />}
                                >
                                  Remove
                                </Button>
                              </div>
                              {/* <Stack>
                                        <Button
                                          className=" brand-buttons"
                                          variant="contained"
                                          color="primary"
                                          onClick={createHome}
                                        >
                                          Submit
                                        </Button>
                                      </Stack> */}
                            </Card>
                          ))}
                        </Stack>
                      </Stack>
                    </Stack>
                    <div style={{ marginBottom: '20px' }}>
                      {show ? (
                        <Button
                          fullWidth
                          variant="contained"
                          color="success"
                          startIcon={<Iconify icon="ic:baseline-minus" />}
                          onClick={toggleShow}
                        >
                          {buttonText}
                        </Button>
                      ) : (
                        <Button
                          fullWidth
                          variant="contained"
                          color="success"
                          startIcon={<Iconify icon="material-symbols:add" />}
                          onClick={toggleShow}
                        >
                          {buttonText}
                        </Button>
                      )}
                    </div>

                    <div>
                      {show ? (
                        <div style={{ marginTop: '20px', marginBottom: '20px' }}>
                          <TextField
                            sx={{ width: '93%' }}
                            id="search-bar"
                            className="text"
                            // onInput={handleInput}
                            onChange={handleSearch}
                            label="Add new product"
                            variant="outlined"
                            placeholder="Search..."
                            size="small"
                            value={searchTerm}
                          />
                          <IconButton type="submit" aria-label="search">
                            <SearchIcon style={{ fill: 'blue' }} />
                          </IconButton>

                          <ul
                            className={searchResult.length === 0 ? 'd-none' : 'search-li'}
                            style={{ listStyle: 'none' }}
                          >
                            {searchResult.map((product, key) => (
                              <li className="search-li" key={key}>
                                {/* <Link href="/products/[slug]" as={`/products/${product._id}`}>   */}
                                <div className="single-item">
                                  <div className="item-thumb">
                                    <img
                                      src={`${ApiUrl.img_url}/products/${product?.image[0]?.smUrl}`}
                                      alt={product.name}
                                    />
                                  </div>
                                  <span>{product.title}</span>
                                  <div>
                                    <Button
                                      onClick={() => handleClick(product)}
                                      sx={{ marginRight: '10px' }}
                                      component={RouterLink}
                                      size="small"
                                      variant="outlined"
                                    >
                                      +
                                    </Button>
                                  </div>
                                </div>
                                {/* </Link> */}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ) : null}
                    </div>

                    {state.type === 'new' ? (
                      <div>
                        <Button fullWidth variant="contained" color="primary" onClick={createBrand}>
                          Submit
                        </Button>
                      </div>
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
                            // onClick={() => updateTag(product)}
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
