import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { toast } from 'react-toastify';
import { Link as RouterLink } from 'react-router-dom';

import {
  Card,
  Table,
  Stack,
  Avatar,
  Button,
  Checkbox,
  TableRow,
  TableBody,
  TableHead,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination,
  CardContent,
  Link,
  Grid,
  ImageList,
  TextField,
} from '@mui/material';
import Pagination from '@mui/material/Pagination';
import { Icon } from '@iconify/react';
import Scrollbar from '../../components/Scrollbar';
import { getReq, patchReq } from '../../data/ApiReq';
import ApiUrl from '../../data/ApiUrl';
import noImg from '../../assets/no-img.jpg';
import Iconify from '../../components/Iconify';
import Loading from '../../components/loading';

export default function Products() {
  const [page, setPage] = React.useState(1);
  const handleChange = (event, value) => {
    setPage(value);
  };

  const initialState = {
    page: 1,
    limit: 20,
    totalCount: 0,
    totalPages: 0,
    hasNextPage: false,
    searchText: '',
    sort: '',
    qEdit: false,
  };

  const initialResult = {
    error: false,
    message: '',
    alert: false,
    loading: false,
  };

  const [productData, setProductData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [state, setState] = useState(initialState);
  const [loading, setLoading] = useState(false);

  const [brands, setBrands] = useState([]);
  const [quikEdit, setQuikEdit] = useState({
    id: '',
  });
  const [apiResult, setApiResult] = useState(initialResult);
  const [filterState, setFilterState] = useState({});

  const getCategories = async () => {
    const response = await getReq({ url: 'inventory/api/category' });
    if (!response.error) {
      setCategories(response.data);
      return 1;
    }
    return 0;
  };

  const getBrands = async () => {
    const response = await getReq({ url: 'inventory/api/brand' });
    if (!response.error) {
      setBrands(response.data);
      return 1;
    }
    return 0;
  };

  const setEditItem = (id, name) => {
    if (id) {
      setState({
        ...state,
        qEdit: true,
      });
      setQuikEdit({
        ...quikEdit,
        id,
        name,
      });
    } else {
      setState({
        ...state,
        qEdit: false,
      });
      setQuikEdit({
        ...quikEdit,
        id: '',
      });
    }
  };

  const clearAll = () => {
    setFilterState({});
    setState({ ...initialState });
    getData();
  };

  // const getData = async () => {
  //   const res = await getReq({ url: 'product/getall' });
  //   if (!res.error) {
  //     setProductData(res.data);
  //     console.log(res.data);
  //   }
  // };

  const getData = async (pg, lm, isSearch, filter) => {
    setLoading(true);

    const p = pg || state.page;
    const l = lm || state.limit;

    let query = `page=${p}&limit=${l}`;
    if (isSearch) {
      query = `page=${p}&limit=${l}&searchText=${isSearch}`;
      if (filter) {
        query += `&${filter}`;
      }
      setFilterState({ ...filterState, searchText: isSearch });
    }
    if (filter) {
      query = `page=${p}&limit=${l}&${filter}`;
      if (filterState.searchText) {
        query += `&searchText=${filterState.searchText}`;
      }
    }
    const response = await getReq({ url: `api/product?${query}` });
    if (!response.error) {
      setProductData(response.data);
      setState({
        ...state,
        page: response.pagination.page,
        limit: response.pagination.limit,
        totalCount: response.pagination.totalCount,
        totalPages: response.pagination.totalPages,
        hasNextPage: response.pagination.hasNextPage,
        qEdit: false,
      });
      setLoading(false);
    }
  };
  useEffect(() => {
    getData();
    getCategories();
    getBrands();
  }, []);

  const handleFilterChange = (e) => {
    console.log(e.target.value);
    let query = `${e.target.name}=${e.target.value}`;
    if (filterState.catId && e.target.name !== 'catId') {
      query += `&catId=${filterState.catId}`;
    }
    if (filterState.brandId && e.target.name !== 'brandId') {
      query += `&brandId=${filterState.brandId}`;
    }
    if (filterState.sort && e.target.name !== 'stock') {
      query += `&sort=${filterState.sort}`;
    }

    setFilterState({
      ...filterState,
      [e.target.name]: e.target.value,
      query,
    });

    getData(1, state.limit, false, query);
  };

  const productList = productData;

  const changePage = (event, value) => {
    setState({
      ...state,
      page: value,
    });
    getData(value, state.limit, filterState.searchText, filterState.query);
  };

  return (
    <div>
      <Stack direction="row" justifyContent="space-between" padding={5}>
        <Typography>
          <h2>Product List</h2>
        </Typography>
        <Button
          variant="contained"
          component={RouterLink}
          to="/dashboard/inventory/addproduct"
          startIcon={<Iconify icon="eva:plus-fill" />}
        >
          Add Product
        </Button>
      </Stack>
      <Stack sx={{ alignItems: 'end' }}>
        <Pagination count={state?.totalPages} color="primary" onChange={changePage} />
      </Stack>
      <Stack direction="row" justifyContent="space-between">
        <TextField
          sx={{ mb: 3, mt: 3, width: '22.5%' }}
          id="outlined-basic"
          label="Search"
          size="small"
          variant="outlined"
          onChange={(e) =>
            // setState({ ...state, searchText: e.target.value })
            getData(1, state.limit, e.target.value)
          }
        />
        {/* <Paginations paginate={paginate}/> */}
      </Stack>

      <Stack direction={{ xs: 'column', sm: 'row' }} sx={{ mb: 3 }}>
        <Stack direction="row">
          <Box sx={{ minWidth: 300 }}>
            <FormControl size="small" sx={{ m: 1, minWidth: 350 }}>
              <InputLabel id="demo-simple-select-label">Brands</InputLabel>
              <Select
                label="Brands"
                name="brandId"
                onChange={handleFilterChange}
                displayEmpty
                inputProps={{ 'aria-label': 'Without label' }}
              >
                {brands.map((category, key) => (
                  <MenuItem value={category._id} key={key}>
                    {category.brandName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </Stack>

        <Stack direction="row">
          <Box sx={{ minWidth: 300 }}>
            <FormControl size="small" sx={{ m: 1, minWidth: 350 }}>
              <InputLabel id="demo-simple-select-label">Categories</InputLabel>

              <Select
                label="Categories"
                name="catId"
                onChange={handleFilterChange}
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
          </Box>
        </Stack>

        <Stack direction="row">
          <Box>
            <FormControl size="small" sx={{ m: 1, minWidth: 350 }}>
              <InputLabel id="demo-simple-select-label">Stock</InputLabel>
              <Select
                label="Stock"
                name="stock"
                onChange={handleFilterChange}
                displayEmpty
                inputProps={{ 'aria-label': 'Without label' }}
              >
                <MenuItem value="inStock">In Stock</MenuItem>
                <MenuItem value="outOfStock">Out of Stock</MenuItem>
                <MenuItem value="all"> All </MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Stack>

        <Stack display="flex" justifyContent="center">
          <Button onClick={clearAll} variant="outlined">
            Clear
          </Button>
        </Stack>
      </Stack>

      <Card>
        {/* {loading && <Loading />} */}
        {loading ? (
          <Loading />
        ) : (
          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Sl.</TableCell>
                    <TableCell>Image</TableCell>
                    <TableCell>Title</TableCell>
                    <TableCell>Quantity</TableCell>
                    <TableCell>Price(AED)</TableCell>
                    <TableCell>Seller</TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {productList.map((item, key) => (
                    <TableRow hover key={key}>
                      <TableCell>{state.limit * state.page + key + 1 - state.limit}</TableCell>
                      <TableCell>
                        {item.image[0] ? (
                          <Link href={`/dashboard/inventory/products/${item._id}`}>
                            <img
                              height={100}
                              src={`${ApiUrl.img_url}/products/${item.image[0].smUrl}`}
                              alt="product"
                              className="product-list-img"
                            />
                          </Link>
                        ) : (
                          <ImageList src={noImg} alt="no image" height="50px" />
                        )}
                      </TableCell>
                      <TableCell width={'20%'}>
                        <Link
                          style={{ textDecoration: 'none', color: 'black' }}
                          href={`/dashboard/inventory/products/${item._id}`}
                        >
                          {item.title}
                        </Link>
                      </TableCell>
                      <TableCell>{item?.seller[0]?.qty}</TableCell>
                      <TableCell>{item?.seller[0]?.sellPrice}</TableCell>
                      <TableCell>Rookie Ninja</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Scrollbar>
        )}
      </Card>
    </div>
  );
}
