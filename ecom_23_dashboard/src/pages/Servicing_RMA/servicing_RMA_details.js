import { React, useState, useEffect } from 'react';
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

export default function ServicingRMADetails() {
  const initialState = {
    error: false,
    loading: true,
    location: '',
  };
  const initialUserData = {
    id: '',
    userId: {},
    items: [
      {
        productId: {
          image: [{ smUrl: '' }],
        },
      },
    ],
    address: {},
  };
  const [orderData, setOrderData] = useState(initialUserData);
  const [state, setState] = useState(initialState);

  const params = useParams();

  const getOrderData = async () => {
    try {
      // const response = await getReq(`order/single?orderId=${params.id}`);
      const res = await getReq({ url: `order/single?orderId=${params.id}` });
      console.log(res.data);
      if (!res.error) {
        setOrderData(res.data);
        setState({
          ...state,
          loading: false,
        });
      } else {
        console.log(res.error);
        setState({
          ...state,
          error: true,
        });
        return 0;
      }
    } catch (error) {
      setState({
        ...state,
        error: true,
      });
    }
  };
  useEffect(() => {
    getOrderData();
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
      url: `order/invoice?id=${orderData._id}`,
      fileName: `invoice_${orderData.orderId}.pdf`,
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

  const [age, setAge] = useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  }

  const handleOrderEdit = async (e) => {
    setState({
      ...state,
      loading: true,
    });
    // console.log(e.target.value);
    const data = {
      id: orderData._id,
      orderStatus: e.target.value,
    };
    const response = await patchRequest({
      url: "order/update",
      data,
    });

    console.log(response);

    getOrderData();
    setState({
      ...state,
      loading: false,
    });
  };

  return (
    <Page title="Order Details">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={3}>
          <Typography variant="h4" gutterBottom>
            Servicing/RMA Details
          </Typography>
          <div className="d-flex order-select">
            <div>
              {/* <span>
                <i class="material-icons ">edit</i>
              </span> */}

              {/* <div className="dropdown">
                Change Status 
               
              </div> */}

            
            </div>
          </div>
        </Stack>
        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={12} md={6}>
            <Card style={{ minHeight: '100%' }}>
              <CardContent>
                <Stack spacing={2}>
                  <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                    <Stack spacing={2}>
                      {/* <div
                        className="img-upload-pre"
                        style={
                          {
                            // backgroundImage: `url(${imgAddress})`,
                          }
                        }
                      /> */}
                      <img src={UserImg} className="img-upload-pre" alt="user" />
                    </Stack>
                    <Stack spacing={2} style={{ width: '80%' }}>
                      <Typography variant="h5" gutterBottom>
                        Name : {orderData.userId.firstName}
                      </Typography>

                      <Typography variant="h5" gutterBottom>
                        Email : {orderData.userId.email}
                      </Typography>
                      <Typography variant="h5" gutterBottom>
                        Phone : {orderData.userId.phone}
                      </Typography>
                    </Stack>
                  </Stack>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
          <>
            <Grid item xs={12} md={6}>
              <Card style={{ minHeight: '100%' }}>
                <CardContent>
                  <Stack spacing={2}>
                    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                      <Stack spacing={2}>
                        {/* <div
                          className="img-upload-pre"
                          style={
                            {
                              // backgroundImage: `url(${imgAddress})`,
                            }
                          }
                        /> */}
                        <img src={StatusImg} className="img-upload-pre" alt="user" />
                      </Stack>
                      <Stack spacing={2} style={{ width: '80%' }}>
                        <Typography variant="h5" gutterBottom>
                          Order Status : {orderData.orderStatus}
                          <br />
                          Date : {formateDate(orderData.updatedAt)}
                          <br />
                          Time : {formateDate(orderData.updatedAt)}
                          <br />
                          Payment Method : {orderData.paymentMethod}
                        </Typography>
                        <Typography variant="h5" mt={2} color={'green'} gutterBottom>
                          <li className={orderData.isPaymentDone ? 'text-success' : 'text-danger'}>
                            {orderData.isPaymentDone ? 'Payment Done' : 'Payment Not Done'} <br />
                          </li>
                        </Typography>
                      </Stack>
                    </Stack>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          </>
        </Grid>

        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={3} mt={4}>
          <Typography variant="h4" gutterBottom>
            Order Details
          </Typography>
         
        </Stack>

        <TableContainer sx={{ minWidth: 800, color: 'blue' }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Sl.</TableCell>
                <TableCell>Product</TableCell>
                <TableCell> Available Quantity</TableCell>
                <TableCell>Quantity</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Total</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orderData.items.map((item, key) => (
                <TableRow hover key={key}>
                  <TableCell>{key + 1}</TableCell>
                  <TableCell>
                    <Stack spacing={2}>
                      <div className="product-data  ">
                        <div className=' product-data-font'>
                        <img
                          style={{ height: '50px' }}
                          src={`${ApiUrl.img_url}/products/${item.productId.image[0].smUrl}`}
                          alt={item.productId.name}
                          className="order-product-img"
                        />
                        {item.productId.name}
                        <br />
                        {item.productId.sellingPrice} AED
                      </div>
                      </div>
                    </Stack>
                  </TableCell>

                  <TableCell>{item.productId.qty}</TableCell>
                  <TableCell>{item.qty}</TableCell>
                  <TableCell>{item.price / item.qty}</TableCell>
                  <TableCell>{item.price} </TableCell>
                </TableRow>
              ))}
              <TableRow hover>
                <TableCell> </TableCell>
                <TableCell> </TableCell>
                <TableCell> </TableCell>
                <TableCell> </TableCell>
                <TableCell>Total Quantity : {orderData.totalQty} </TableCell>
                <TableCell>Total Price : {orderData.totalPrice}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={3} mt={4}>
          <Typography variant="h4" gutterBottom>
            Delivery Details
          </Typography>
        </Stack>
        <Grid container spacing={2} justifyContent="center">
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
                          {orderData.address.name} <br />
                          {orderData.address.addressLine1} <br />
                          {orderData.address.addressLine2} <br />
                          {orderData.address.city}, {orderData.address.state}, {orderData.address.country},{' '}
                          {orderData.address.pinCode} <br />
                          {orderData.address.mobile1},{orderData.address.mobile2} <br />
                          Type : {orderData.address.type}
                        </Typography>
                      </Stack>
                    </Stack>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          </>
        </Grid>
      </Container>
    </Page>
  );
}
