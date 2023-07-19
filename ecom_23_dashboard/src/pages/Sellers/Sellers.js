import { Link as RouterLink } from 'react-router-dom';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import * as React from 'react';

// @mui
import { styled } from '@mui/material/styles';
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
  Pagination,
  TableContainer,
  TablePagination,
  CardContent,
  CardMedia,
  CardActions,
  Link,
  Grid,
} from '@mui/material';
import Iconify from '../../components/Iconify';
// components
import Page from '../../components/Page';
import Scrollbar from '../../components/Scrollbar';
import { getReq } from '../../data/ApiReq';
import ApiUrl from '../../data/ApiUrl';

export default function Sellers() {
  const initialState = {
    page: 1,
    limit: 20,
    totalCount: 0,
    totalPages: 0,
    hasNextPage: false,
    searchText: '',
  };

  const [sellerData, setSellerData] = useState([]);
  const [brandData, setBrandData] = useState([]);
  const [state, setState] = useState(initialState);

  const getSellers = async () => {
    const response = await getReq({url :'/auth/api/user/seller?page=1&limit=20'});
    console.log(response.data);
    if (!response.error) {
      setBrandData(response.data);
    } else {
      console.log(response.error);
      return 0;
    }
  };

  const getData = async (pg, lm, isSearch) => {
    // const p = pg  : state.page;
    // const l = lm : state.limit;

    // let query = `page=${p}&limit=${l}`;
    // if (isSearch) {
    //   query = `page=${p}&limit=${l}&search=${isSearch}`;
    // }
    const response = await getReq({url : `/auth/api/user/seller?page=1&limit=20`});
    if (!response.error) {
      console.log(response.data);
      setSellerData(response.data);
     
    }
    else {
      console.log(response.error);
      return 0;
    }
  };
  useEffect(() => {
    getData();
    getSellers();
  }, []);

  // let productList =    [];
  // const productList = orderData;

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={3}>
        <Typography variant="h4" mt={3} gutterBottom>
          Seller List
        </Typography>

        <Button
          color="success"
          variant="contained"
          component={RouterLink}
          to="/dashboard/sellers/addSeller"
          startIcon={<Iconify icon="eva:plus-fill" />}
        >
          Add Seller
        </Button>
      </Stack>
      <Card>
        <Scrollbar>
          <TableContainer sx={{ minWidth: 800 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Sl.</TableCell>
                  <TableCell>First Name</TableCell>
                  <TableCell>Last Name</TableCell>
                  <TableCell>Phone</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {sellerData.map((items, key) => (
                  <TableRow hover key={key}>
                    <TableCell>{key + 1}</TableCell>

                    <TableCell>{items.firstName}</TableCell>
                    <TableCell>{items.lastName}</TableCell>
                    <TableCell>{items.phone}</TableCell>

                    <TableCell>
                      <Button
                        variant="contained"
                        component={RouterLink}
                        to={`editSeller/${items._id}?brand=${
                            items.brandName
                          }&desc=${items.brandDesc}${
                            items.logo ? `&logo=${items.logo.mdUrl}` : ""
                          }`}
                        startIcon={<Iconify icon="carbon:edit" />}
                        color="primary"
                      >
                        Edit
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>
      </Card>

      {/* <Grid container spacing={2} direction="row" justify="flex-start" alignItems="flex-start">

      {productList.map((items, key) => (
          <Card item xs={12} sm={6} md={3} sx={{minWidth: "350px", margin: "auto", mb: 5}} >
            <CardMedia
              component="img"
              height="140"
              image="/static/images/cards/contemplative-reptile.jpg"
              alt="green iguana"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {items.firstName} {items.lastName}
                Sample
              </Typography>
            </CardContent>
            <CardActions>
              <Button
                variant="contained"
                component={RouterLink}
                to={`editSeller/${items._id}`}
                startIcon={<Iconify icon="carbon:edit" />}
                color="primary"
              >
                Edit
              </Button>
            </CardActions>
          </Card>
            ))} 
      </Grid> */}
        

    
    </Container>
  );
}
