import React, { useState, useEffect } from 'react';
import {Routes, Route, useNavigate} from 'react-router-dom';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { toast } from 'react-toastify';
import { Link as RouterLink, useParams, useLocation } from 'react-router-dom';
import { BrowserRouter as Router } from 'react-router-dom'


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
import { Icon } from '@iconify/react';
import Scrollbar from '../../components/Scrollbar';
import ApiUrl from '../../data/ApiUrl';
import noImg from '../../assets/no-img.jpg';
import Iconify from '../../components/Iconify';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import { postReq, getReq, patchReq, deleteRequest } from '../../data/ApiReq';
import ProductList from './ProductList';

function ProductSpace() {
  const initialState = {
    type: 'products',
    title: '',
    products: [],
  };
  const initialResult = {
    error: false,
    message: '',
    alert: false,
    loading: false,
    imgStatus: 'notSelected',
    dataFetched: false,
    redirect: false,
  };
  const params = useParams();
  const navigate = useNavigate();
  const locationn = useLocation();
  const [searchTerm, setSearchTerm] = useState('');
  const [searchMsg, setSearchMsg] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const [history, setHistory] = useState([]);
  const [productList, setProductList] = useState([]);
  const [productId, setProductId] = useState([]);
  const [title, setTitle] = useState('');
  const [state, setState] = useState(initialState);
  const [apiResult, setApiResult] = useState(initialResult);

  // const router = useRoutes();

  // const handleInput = (e) => {
  //   if (e.key === "Enter") {
  //     e.preventDefault();
  //     setSearchResult([]);
  //     setSearchMsg("");
  //     router.push(`/product-list?search=${searchTerm}&type=search`);
  //   }
  // };

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


  const handleClick = (product) => {
    productList.push(product);
    productId.push(product._id);
    // console.log(product.title)
  };

  const handleChange = (event) => {
    setTitle(event.target.value);
    console.log(title);
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




  return (
    <div style={{ padding: '50px' }}>
    
      <Stack direction="row">
      <Stack direction="column">
        <TextField
          sx={{ width: '300px' }}
          type={'text'}
          label="Title"
          name="Title"
          // defaultValue={state.brandName}
          onChange={handleChange}
        />
        <Stack sx={{ marginTop: '20px' }} direction="row">
          <div>
            <TextField
              sx={{ width: '400px' }}
              id="search-bar"
              className="text"
              // onInput={handleInput}
              onChange={handleSearch}
              label="Search your product"
              variant="outlined"
              placeholder="Search..."
              size="small"
              value={searchTerm}
            />
            <IconButton type="submit" aria-label="search">
              <SearchIcon style={{ fill: 'blue' }} />
            </IconButton>

            <ul className={searchResult.length === 0 ? 'd-none' : 'search-li'} style={{ listStyle: 'none' }}>
              {searchResult.map((product, key) => (
                <li className="search-li" key={key}>
                  {/* <Link href="/products/[slug]" as={`/products/${product._id}`}>   */}
                  <div className="single-item">
                    <div className="item-thumb">
                      <img src={`${ApiUrl.img_url}/products/${product?.image[0]?.smUrl}`} alt={product.name} />
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

            {searchResult.length === 0 && title === "" ? '' : (
              <Card sx={{ minWidth: 275, marginTop: 3 }}>
              <CardContent>
                <div>{title}</div>
                {productList.map((item1, key1) => (
                  <div style={{ padding: '10px' }} key={key1}>
                    {item1.title}
                  </div>
                ))}
                <Stack>
                <Button
                      className=" brand-buttons"
                      variant="contained"
                      color="primary"
                      onClick={createHome}
                    >
                      Submit
                    </Button>

                </Stack>
              </CardContent>
            </Card>
            )}
            
          </div>
        </Stack>
      </Stack>

      {/* <Stack sx={{width: "50%", marginLeft: "200px"}} >

        <Typography variant='h2' sx={{marginLeft: "35px"}} >
          Homepage Sections
        </Typography>
        <ProductList/>
      </Stack> */}

      </Stack>
    </div>
  );
}

export default ProductSpace;
