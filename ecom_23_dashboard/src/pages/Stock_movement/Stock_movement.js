import { Link as RouterLink } from 'react-router-dom';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import * as React from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

// @mui
import { styled } from '@mui/material/styles';
import {
  Card,
  Table,
  Stack,
  TextField,
  Avatar,
  InputLabel,
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
import UserImg from '../../assets/images/kodak.jpg';

export default function StockMovement() {
  const initialState = {
    page: 1,
    limit: 20,
    totalCount: 0,
    totalPages: 0,
    hasNextPage: false,
    searchText: '',
  };

  const [orderData, setOrderData] = useState([]);
  const [brandData, setBrandData] = useState([]);
  const [state, setState] = useState(initialState);
  const [value, setValue] = React.useState(null);

  const getSellers = async () => {
    const response = await getReq({ url: 'user/getalluser' });
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
    const response = await getReq({ url: `user/getalluser?role=seller` });
    if (!response.error) {
      console.log(response.data);
      setOrderData(response.data);
    } else {
      console.log(response.error);
      return 0;
    }
  };
  useEffect(() => {
    getData();
    getSellers();
  }, []);

  // let productList =    [];
  const productList = orderData;

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={3}>
        <Typography variant="h4" mt={3} gutterBottom>
          Stock Movements
        </Typography>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 1, sm: 2, md: 4 }}>
          <Stack justifyContent="space-between">
            <TextField
              sx={{ width: '600px' }}
              id="outlined-basic"
              label="Search"
              size="large"
              variant="outlined"
              onChange={(e) =>
                // setState({ ...state, searchText: e.target.value })
                getData(1, state.limit, e.target.value)
              }
            />
          </Stack>
          <Stack spacing={3}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Date"
                value={value}
                onChange={(newValue) => {
                  setValue(newValue);
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </Stack>
        </Stack>
      </Stack>

      <Grid container spacing={4} direction="row" justify="flex-start" alignItems="flex-start" mt={4}>
        <Card item xs={12} sm={6} md={3} sx={{ margin: 'auto', mb: 5 }}>
          <CardMedia component="img" height="250px" src={UserImg} alt="green iguana" />

          <CardContent>
            <Typography gutterBottom variant="h5" component="div" textAlign={'center'}>
              Kodak Alaris S2080W Scanner
              <br />
              Order Id: 8452123
            </Typography>

            <InputLabel>
              Arrived at sort fascility:<i> 21/10/2022-01:02 PM</i>{' '}
            </InputLabel>
            <br />
            <InputLabel>
              Departed:<i> 21/10/2022-01:02 PM</i>
            </InputLabel>
            <br />
            <InputLabel>
              {' '}
              Departed:<i> 21/10/2022-01:02 PM</i>{' '}
            </InputLabel>
          </CardContent>
          <CardActions>
            <Button
              fullWidth
              variant="contained"
              component={RouterLink}
              to={'editSeller'}
              startIcon={<Iconify icon="carbon:edit" />}
              color="primary"
            >
              View
            </Button>
          </CardActions>
        </Card>

        <Card item xs={12} sm={6} md={3} sx={{ minWidth: '350px', margin: 'auto', mb: 5 }}>
          <CardMedia
            component="img"
            height="250px"
            // image="/static/images/cards/contemplative-reptile.jpg"
            src={UserImg}
            alt="green iguana"
          />

          <CardContent>
            <Typography gutterBottom variant="h5" component="div" textAlign={'center'}>
              Kodak Alaris S2080W Scanner
              <br />
              Order Id: 8452134
            </Typography>
            <InputLabel>
              Arrived at sort fascility:<i> 21/10/2022-01:02 PM</i>{' '}
            </InputLabel>
            <br />
            <InputLabel>
              Departed:<i> 21/10/2022-01:02 PM</i>
            </InputLabel>
            <br />
            <InputLabel>
              {' '}
              Departed:<i> 21/10/2022-01:02 PM</i>{' '}
            </InputLabel>
          </CardContent>
          <CardActions>
            <Button
              fullWidth
              variant="contained"
              component={RouterLink}
              to={'editSeller'}
              startIcon={<Iconify icon="carbon:edit" />}
              color="primary"
            >
              View
            </Button>
          </CardActions>
        </Card>

        <Card item xs={12} sm={6} md={3} sx={{ minWidth: '350px', margin: 'auto', mb: 5 }}>
          <CardMedia
            component="img"
            height="250px"
            // image="/static/images/cards/contemplative-reptile.jpg"
            src={UserImg}
            alt="green iguana"
          />

          <CardContent>
            <Typography gutterBottom variant="h5" component="div" textAlign={'center'}>
              Kodak Alaris S2080W Scanner
              <br />
              Order Id: 8452124
            </Typography>
            <InputLabel>
              Arrived at sort fascility:<i> 21/10/2022-01:02 PM</i>{' '}
            </InputLabel>
            <br />
            <InputLabel>
              Departed:<i> 21/10/2022-01:02 PM</i>
            </InputLabel>
            <br />
            <InputLabel>
              {' '}
              Departed:<i> 21/10/2022-01:02 PM</i>{' '}
            </InputLabel>
          </CardContent>
          <CardActions>
            <Button
              fullWidth
              variant="contained"
              component={RouterLink}
              to={'editSeller'}
              startIcon={<Iconify icon="carbon:edit" />}
              color="primary"
            >
              View
            </Button>
          </CardActions>
        </Card>
      </Grid>
    </Container>
  );
}
