import * as React from 'react';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { useState, useEffect } from 'react';
import { Container, Typography, Card, CardContent, Link, Stack, Button, CardMedia, CardActions, Divider } from '@mui/material';
import Grid from '@mui/material/Grid'; // Grid version 1
import Items from '../../assets/dashbord/items.svg';
import { ProductSort, ProductList, ProductCartWidget, ProductFilterSidebar } from '../../sections/@dashboard/products';
import PRODUCTS from '../../_mock/products';
import ShopProductCard from '../../sections/@dashboard/products/ProductCard';
import Iconify from '../../components/Iconify';
import { getReq } from '../../data/ApiReq';
import ProductCard from "../../components/Products/ProductCard";





export default function Inventory() {
  const initialState = {
    productCount: 0,
    loading: true,
    error: false,
  };

  const [productData, setProductData] = useState([]);
  const [state, setState] = useState(initialState);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);

  const getData = async () => {
    const query = `page=1&limit=7`;

    const response = await getReq({url: `product/getall?${query}`});
    if (!response.error) {
      // console.log(response.pagination.totalCount); 
      setProductData(response.data);
      console.log(response.data)
      setState({
        ...state,
        productCount: response.pagination.totalCount,
        loading: false,
      });
    }
  };

  const getCategories = async () => {
    const response = await getReq({url: "category/getall"});
    // console.log(response.data.data.length);
    if (!response.error) {
      setCategories(response.data);

      return 1;
    }
      // console.log(response.error);
      return 0;
    
  };

  const getBrands = async () => {
    const response = await getReq({url: "brand/getall"});
    // console.log(response.data.data.length);
    if (!response.error) {
      setBrands(response.data);

      return 1;
    }
      // console.log(response.error);
      return 0;
    
  };


  useEffect(() => {
    getCategories();
    getBrands();
    getData();
  }, []);

  const [imgAddress, setImgAddress] = useState(
    'https://www.brightsidedental.co.uk/blog/wp-content/uploads/2020/08/Face-mask-1024x683.jpeg'
  );


// const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

  return (
    <div>
      <Typography variant="h2" sx={{ mb: 5, color: '#7474bf' }}>
        Inventory
      </Typography>

      <Container>
        <Grid container spacing={3} justifyContent="center" alignItems="stretch">
          <Stack direction="row" spacing={{ xs: 1, sm: 2, md: 4 }}>
            <Grid item xs={4}>
              <Link href="inventory/products" underline="none" color={'black'}>
                <Button style={{ padding: '35px' }} variant="outlined" size="large">
                <Iconify sx={{mr: 1}} icon="dashicons:products"  width="30px" height="30px" />
                  Products  <Typography sx={{ml: 5}}>{state.productCount}</Typography>
                </Button>
              </Link>
            </Grid>

            <Grid item xs={4}>
              <Link href="inventory/categories" underline="none" color={'black'}>
                <Button style={{ padding: '35px' }} variant="outlined" size="large">
                <Iconify sx={{mr:1}} icon="bx:category" width="30px" height="30px" />
                  Categories <Typography sx={{ml: 5}}>{categories.length}</Typography>
                </Button>
              </Link> 
            </Grid>

            <Grid item xs={4}>
              <Link href="inventory/brands" underline="none" color={'black'}>
                <Button style={{ padding: '35px' }} variant="outlined" size="large">
                <Iconify sx={{mr:1}} icon="tabler:brand-asana" width="30px" height="30px" />
                  Brands <Typography sx={{ml: 5}}>{brands.length}</Typography>
                </Button>
              </Link>
            </Grid>
          </Stack>
        </Grid>
      </Container>

      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h2" sx={{ mb: 5, mt: 5, color: '#7474bf' }}>
          Products
        </Typography>
        <Link href="inventory/products">
          <Button variant="contained">View All Products</Button>
        </Link>
      </Stack>


      <Grid container spacing={4}>
      {/* {products.map((product) => ( */}
        <Grid item xs={3} sm={6} md={3} sx={{margin: "auto"}}>
        <Card sx={{ maxWidth: 280, height: 310, margin: "auto"}}>
      <Stack alignItems="center" sx={{margin: "auto"}}>
      <Link href='inventory/addproduct'>
      <Iconify sx={{mt:8}} icon="carbon:add-alt" color="text.secondary" width="150px" height="150px"  /></Link>
      </Stack>
      <CardContent style={{color:  "black"}}>
        <Link href='inventory/addproduct' style={{textDecoration: "none"}}>
        <Typography textAlign="center" gutterBottom variant="h5" component="div" color="text.secondary">
          Add New Product
        </Typography></Link>
      </CardContent>

    </Card>
    
        </Grid>

        {productData.map((item, key) => (
          <Grid sx={{ margin: "auto"}} item xs={3} sm={6} md={3} key={key}>
          <ProductCard  product={item} />
        </Grid>
        ))}

</Grid>








      {/* <ProductList products={PRODUCTS} /> */}
        {/* <ProductCartWidget /> */}

      <Stack direction={{sm:"column", md: "row"}}>
        <Box sx={{ width: '50%', pr:5 }} style={{margin: "auto"}}>
        <Stack direction={{sm:"column", md: "row"}} sx={{mt:10, mb:5}} alignItems="center" justifyContent="space-between" style={{width: "100%"}}>
              <Typography variant="h2" sx={{ mb: 3, mt: 5, ml:3, color: '#7474bf', margin: "auto" }}>
              Categories
            </Typography>
        <Button variant="contained" sx={{mr:5, mb: 3, mt: 5, margin: "auto"}}>View All Categories</Button>
      </Stack>
      <Grid container rowSpacing={4} columnSpacing={{ xs: 13, sm: 2, md: 3 }} alignItems="center">
      {categories.map((item, key) => (
        
        <Grid item xs={3}>
          <Item key={key}>
          <Link style={{textDecoration: "none"}}
                    to={`/categorydetails/${item._id}`}
                    className="cat-list-item"
                    
                  >
                    {item.categoryName}
                  </Link>
          </Item>
        </Grid>
        ))}
        
      </Grid>
    </Box>
    <Box sx={{ width: '50%', pl:5 }} style={{margin: "auto"}}>
    <Stack direction={{sm:"column", md: "row"}} sx={{mt:10, mb:5}} alignItems="center" justifyContent="space-between" style={{width: "100%"}}>
              <Typography variant="h2" sx={{ mb: 3, mt: 5, ml:3, color: '#7474bf', margin: "auto" }}>
              Brands
            </Typography>
        <Button variant="contained" sx={{mr:5, mb: 3, mt: 5, margin: "auto"}}>View All Brands</Button>
      </Stack>
      <Grid container rowSpacing={4} columnSpacing={{ xs: 12, sm: 2, md: 3 }}>
      {brands.map((item, key) => (

      <Grid item xs={3}>
          <Item key={key}>
            <Link style={{textDecoration: "none"}}
                    to={`/branddetails/${item._id}/${item.brandName}/${item.description}`}
                    className="cat-list-item"
                    
                  >
                    {item.brandName}
                  </Link>
                  </Item>
        </Grid>
                ))}
      </Grid>
    </Box>
        </Stack>
    </div>
  );
}
