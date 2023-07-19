import { useState, useEffect } from 'react';
import * as React from 'react';
import moment from 'moment';
import { Link as RouterLink, useParams } from 'react-router-dom';
import * as Yup from 'yup';
import { useFormik, Form, FormikProvider } from 'formik';
import { toast } from 'react-toastify';
// @mui
import { styled } from '@mui/material/styles';
import {
  Link,
  Stack,
  Container,
  Typography,
  Card,
  CardContent,
  TableContainer,
  TableHead,
  TableRow,
  Table,
  TableCell,
  TableBody,
  Grid,
  Button,
  PlayArrowIcon,
  CardMedia,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';

// components
import Page from '../../components/Page';
import Iconify from '../../components/Iconify';
import { getReq, downloadFile, patchRequest } from '../../data/ApiReq';
// import { getUserRole } from '../../data/userData';
import Scrollbar from '../../components/Scrollbar';
import ApiUrl from '../../data/ApiUrl';
import UserImg from '../../assets/images/user.webp';
import StatusImg from '../../assets/images/project-status.png';

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

export default function SingleOrder() {
  const initialState = {
    page: 1,
    limit: 20,
    totalCount: 0,
    totalPages: 0,
    hasNextPage: false,
    searchText: '',
    role: 'user',
  };
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [empList, setEmpList] = useState([]);
  const [state, setState] = useState(initialState);
  const [orderList, setOrderList] = useState([]);
  const [address, setAddress] = useState([]);

  const params = useParams();

  const getData = async () => {
    const res = await getReq({ url: `auth/api/user/single/63733666fcf6ea0001e7f9d9` });
    if (!res.error) {
      setEmpList(res.data);
      console.log(res.data);
    }
  };

  const getTable = async () => {
    const res = await getReq({
      url: `order/api/order/getall-single-user?limit=20&page=1&userId=6375dd3212d29e358cc7599f`,
    });
    console.log(res.data);
    console.log('id================>', params.id);
    if (!res.error) {
      setOrderList(res.data);
      console.log(res.data);
    }
  };

  // const getAddress = async () => {
  //   const res = await getReq({ url: `api/address/getall` });
  //   if (!res.error) {
  //       setAddress(res.data);
  //     console.log(res.data);
  //   }
  // };

  useEffect(() => {
    getData();
    getTable();
    // getAddress();
  }, []);

  const formateDate = (date) => {
    const newDate = new Date(date);
    const day = newDate.getDate();
    const month = newDate.getMonth() + 1;
    const year = newDate.getFullYear();
    return `${day}/${month}/${year}`;
  };
  // const formateTime = (time) => {
  //   const date = new Date(time);
  //   const hours = date.getHours();
  //   let minutes = date.getMinutes();
  //   const ampm = hours >= 12 ? "PM" : "AM";
  //   hours %= hours % 12;
  //   hours %= hours ? hours : 12; // the hour '0' should be '12'
  //   minutes %= minutes < 10 ? "0" + minutes : minutes;
  //   const strTime = hours + ":" + minutes + " " + ampm;
  //   return strTime;
  // };

  const downloadInvoice = async () => {
    downloadFile({
      url: `/api/order/invoice?id=626b9784ca98ce1e411182c2`,
      fileName: `invoice_${empList.orderId}.pdf`,
      onDownload: () => {
        setState({
          ...state,
          loading: true,
        });
      },
      onDone: () => {
        setState({
          ...state,
          loading: false,
        });
      },
    });
  };

  //   const [age, setAge] = useState('');

  //   const handleChange = (event) => {
  //     setAge(event.target.value);
  //   }

  return (
    <Page title="Customer Details">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={3}>
          <Typography variant="h4" gutterBottom>
            Customer Details
          </Typography>
        </Stack>
        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={12}>
            <Card style={{ minHeight: '100%' }}>
              <CardContent>
                <Stack spacing={2}>
                  <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                    <Stack spacing={2}>
                      <img src={UserImg} className="img-upload-pre" alt="user" />
                    </Stack>

                    <Stack spacing={2} style={{ width: '80%' }}>
                      <Typography variant="h5" gutterBottom>
                        Name :{empList.firstName} {empList.lastName}
                      </Typography>

                      <Typography variant="h5" gutterBottom>
                        Email : {empList.email}
                      </Typography>
                      <Typography variant="h5" gutterBottom>
                        Phone : {empList.countryCode} {empList.phone}
                      </Typography>
                      <Typography variant="h5" gutterBottom>
                        Join Date : {formateDate(empList.createdAt)}
                      </Typography>
                    </Stack>
                  </Stack>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={3} mt={4}>
          <Typography variant="h4" gutterBottom>
            Order Details
          </Typography>
          <div className="d-flex order-select">
            <div>
              <Button variant="contained" onClick={downloadInvoice}>
                Download Invoice
              </Button>
            </div>
          </div>
        </Stack>

        <TableContainer sx={{ minWidth: 800, color: 'blue' }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Sl.</TableCell>
                <TableCell>Product</TableCell>
                <TableCell>Quantity</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Total</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orderList.map((item, key) => (
                <TableRow hover key={key}>
                  <TableCell>{key + 1}</TableCell>
                  <TableCell>
                    {item.items.map((item1, key1) => (
                      <Stack spacing={2}>{item1.productName}</Stack>
                    ))}
                  </TableCell>
                  <TableCell>
                    {item.items.map((item1, key1) => (
                      <Stack spacing={2}>{item1.qty}</Stack>
                    ))}
                  </TableCell>
                  <TableCell>
                    {item.items.map((item1, key1) => (
                      <Stack spacing={2}>{item1.price}</Stack>
                    ))}
                  </TableCell>
                  <TableCell>{item.totalPrice}</TableCell>
                </TableRow>
              ))}
              {/* <TableRow hover>
                <TableCell> </TableCell>
                <TableCell> </TableCell>
                <TableCell> </TableCell>
                <TableCell> </TableCell>
                <TableCell>Total Quantity :  </TableCell>
                <TableCell>Total Price :</TableCell>
              </TableRow> */}
            </TableBody>
          </Table>
        </TableContainer>

        {/* <Stack direction="row" alignItems="center" justifyContent="space-between" mb={3} mt={4}>
          <Typography variant="h4" gutterBottom>
            Delivery Details
          </Typography>
        </Stack> */}
        {/* <Grid container spacing={2} justifyContent="center">
          <>
            <Grid item xs={12}>
              <Card style={{ minHeight: '100%' }}>
                <CardContent>
                  <Stack spacing={2}>
                    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                      <Stack spacing={2} style={{ width: '100%' }}>
                        <Typography variant="h5" gutterBottom>
                          Address
                        </Typography>
                        <Typography variant="h5" gutterBottom>
                          {address.firstName} {address.lastName}<br />
                          {address.addressLine1} <br />
                          {address.addressLine2} <br />
                          {address.city}, {address.state}, {address.country},{' '}
                          {address.pinCode} <br />
                          {address.mobile1},{address.mobile2} <br />
                          Type : {address.type}
                        </Typography>
                      </Stack>
                    </Stack>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          </>
        </Grid> */}
      </Container>
    </Page>
  );
}
