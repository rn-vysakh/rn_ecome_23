import { React, useState, useEffect } from 'react';
import moment from 'moment';
import { Link as RouterLink, useParams } from 'react-router-dom';
import * as Yup from 'yup';
import { faker } from '@faker-js/faker';

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
  TextField,
  Grid,
  Button,
  PlayArrowIcon,
  CardMedia,
  FormControl,
  InputLabel,
  Select,
  Divider,
  MenuItem,
  FormHelperText,
} from '@mui/material';

// components
import Page from '../../components/Page';
import Iconify from '../../components/Iconify';
import { getReq, downloadFile, patchRequest } from '../../data/ApiReq';
// import { getUserRole } from '../../data/userData';
import Scrollbar from '../../components/Scrollbar';
import ApiUrl from '../../data/ApiUrl';
import UserImg from '../../assets/images/user.webp';
import StatusImg from '../../assets/images/project-status.png';
import Loading from '../../components/loading';
import TimeLine from 'src/components/TimeLine';

import { AppOrderTimeline } from '../../sections/@dashboard/app';
// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

export default function SingleOrder() {
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
  const [show, setShow] = useState();
  const [showe, setShowe] = useState();

  // function to toggle the boolean value
  function toggleShow() {
    setShow(!show);
  }
  // function to toggle the boolean value
  function toggleShowe() {
    setShowe(!showe);
  }

  var buttonText = show ? (
    <FormControl style={{ width: 160 }} sx={{ marginTop: 1 }}>
      <InputLabel id="demo-simple-select-label"> Payment Terms </InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={''}
        label="Payment Terms"
        name="status"
        // onChange={handleOrderEdit}
      >
        <MenuItem value="Bank Transfer">Bank Transfer</MenuItem>
        <MenuItem value="Cash on delivery">Cash on delivery </MenuItem>
      </Select>
    </FormControl>
  ) : (
    ''
  );

  var buttonTexte = showe ? (
    <FormControl style={{ width: 160 }} sx={{ marginTop: 1 }}>
      <InputLabel id="demo-simple-select-label"> Delivery Terms </InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={''}
        label="Payment Terms"
        name="status"
        // onChange={handleOrderEdit}
      >
        <MenuItem value="Delivery">Delivery</MenuItem>
        <MenuItem value="Self Collection">Self Collection </MenuItem>
      </Select>
    </FormControl>
  ) : (
    ''
  );

  const params = useParams();

  const getOrderData = async () => {
    try {
      // const response = await getReq(`order/single?orderId=${params.id}`);
      const res = await getReq({ url: `order/api/order/single?orderId=${params.id}` });
      console.log(res.data);
      if (!res.error) {
        setOrderData(res.data);
        setState({
          ...state,
          loading: false,
        });
        setOrderStatusState({
          ...orderStatusState,
          currentSts: res.data.orderStatusSeller,
          prevSts: res.data.orderStatusSeller,
          orderId: res.data._id,
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
    const time = newDate.toLocaleTimeString();
    return `${day}/${month}/${year} - ${time}`;
  };

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

  const getSellerdetails = ({ sellerId, sellerArray, out }) => {
    if (!sellerArray) return '';
    const seller = sellerArray.find((item) => item.sellerId === sellerId);
    if (!seller) {
      return 'Seller Not Found';
    }
    if (out === 'name') {
      return seller.companyName;
    }
    if (out === 'qty') {
      return seller.qty;
    }
    if (out === 'price') {
      return seller.sellPrice;
    }
  };

  const [orderStatusState, setOrderStatusState] = useState({
    prevSts: '',
    currentSts: '',
    orderId: '',
    comments: '',
  });

  const handleChange = (event) => {
    setOrderStatusState({
      ...orderStatusState,
      [event.target.name]: event.target.value,
    });

    // console.log(orderStatusState);
    // console.log(orderData);
  };

  const handleOrderEdit = async () => {
    setState({
      ...state,
      loading: true,
    });
    const data = {
      id: orderStatusState.orderId,
      orderStatusSeller: orderStatusState.currentSts,
      prevSts: orderStatusState.prevSts,
      comments: orderStatusState.comments,
    };
    const response = await patchRequest({
      url: 'order/api/order/update',
      data,
    });

    console.log(response);

    getOrderData();
    setState({
      ...state,
      loading: false,
    });
  };

  if (state.loading) {
    return <Loading />;
  }

  return (
    <Page title={`Order Details - ${orderData.orderId}`}>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={3}>
        <div className="alert-normal"> Order Status : {orderData.orderStatusSeller}</div>

        <Stack direction="row" gap={3}>
          <Button variant="contained" onClick={'downloadInvoice'}>
            Add Credit Note
          </Button>
          <Button variant="contained" onClick={downloadInvoice}>
            Download Invoice
          </Button>
          <Button variant="contained" onClick={'downloadInvoice'}>
            Print Packing Slip
          </Button>
          <Button variant="contained" color="success" onClick={'downloadInvoice'}>
            Save
          </Button>
          <div>
            {/* <span>
      <div className="alert-normal"> Order Status : {orderData.orderStatusSeller}</div>
      <div>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={3}>
          <Typography variant="h4" gutterBottom>
            {`Order Details - ${orderData.orderId.toUpperCase()}`}
          </Typography>
          <Stack direction="row" gap={3}>
              <Button variant="contained" onClick={downloadInvoice}>
                Download Invoice
              </Button>
              <Button variant="contained" onClick={"downloadInvoice"}>
                Print Packing Slip
              </Button>
              <Button variant="contained" color='success' onClick={"downloadInvoice"}>
                Save
              </Button>
            <div>
              {/* <span>
                <i class="material-icons ">edit</i>
              </span> */}

            {/* <div className="dropdown">
                Change Status 
               
              </div> */}
          </div>
        </Stack>
      </Stack>

      <Typography variant="h4" gutterBottom>
        {`Order Details - ${orderData.orderId.toUpperCase()}`}
      </Typography>
      <div>
        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={12} md={7}>
            <Card>
              <CardContent>
                <Stack
                  direction="row"
                  spacing={2}
                  justifyContent="space-around"
                  divider={<Divider orientation="vertical" flexItem />}
                >
                  <div>
                    <Typography variant="h6" gutterBottom>
                      User Details
                    </Typography>
                    Email : {orderData.userId.email} <br />
                    Name : {orderData.userId.firstName} <br />
                    Phone : {orderData.userId.phone} <br />
                    Payment Terms : {orderData.paymentMethod}{' '}
                    <Button
                      sx={{ marginBottom: 1 }}
                      size="small"
                      variant="contained"
                      component={RouterLink}
                      startIcon={<Iconify icon="carbon:edit" />}
                      color="primary"
                      onClick={toggleShow}
                    >
                      Edit
                    </Button>
                    <br />
                    <div>{buttonText}</div>
                    Delivery Terms: Delivery
                    <Button
                      size="small"
                      variant="contained"
                      component={RouterLink}
                      startIcon={<Iconify icon="carbon:edit" />}
                      color="primary"
                      onClick={toggleShowe}
                    >
                      Edit
                    </Button>{' '}
                    <br />
                    <div>{buttonTexte}</div>
                    Expected Delivery : 2 Jan , 10 PM{orderData.deliveryStatus}
                  </div>

                  <div>
                    <Typography variant="h6" gutterBottom>
                      Address
                    </Typography>
                    {orderData.address.name} <br />
                    {orderData.address.addressLine1} <br />
                    {orderData.address.addressLine2 ? (
                      <>
                        {' '}
                        {orderData.address.addressLine2} <br />{' '}
                      </>
                    ) : (
                      ''
                    )}
                    {orderData.address.city}, {orderData.address.emirates} {orderData.address.country},{' '}
                    {orderData.address.pinCode} <br />
                    {orderData.address.mobile1},{orderData.address.mobile2} <br />
                    Type : {orderData.address.type}
                  </div>
                </Stack>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={5}>
            <div className="side-bar-history">
              <TimeLine data={orderData.OrderStsHistory.reverse()} title="Order Status History" />
            </div>
            <Card marginTop={3}>
              <CardContent>
                <Stack spacing={2}>
                  <FormControl>
                    <InputLabel id="demo-simple-select-label"> Change Status </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      label=" Change Status"
                      name="currentSts"
                      onChange={handleChange}
                      value={state.currentSts}
                    >
                      <MenuItem value="Awaiting confirmation">Awaiting confirmation</MenuItem>
                      <MenuItem value="Contact customer">Contact customer </MenuItem>
                      <MenuItem value="Offer Alternative">Offer Alternative</MenuItem>
                      <MenuItem value="Pending for cancellation">Pending for cancellation</MenuItem>
                      <MenuItem value="Awaiting fulfilment">Awaiting fulfillment</MenuItem>
                      <MenuItem value="Awaiting Item from supplier">Awaiting Item from supplier</MenuItem>
                      <MenuItem value="Ready for shipment">Ready for shipment</MenuItem>
                      <MenuItem value="Shipped">Shipped</MenuItem>
                      <MenuItem value="Shipment return">Shipment return</MenuItem>
                      <MenuItem value="Canceled">Cancelled</MenuItem>
                      <MenuItem value="Completed">Completed</MenuItem>
                    </Select>
                  </FormControl>
                  <FormControl>
                    <TextField
                      type={'text'}
                      label="Comments"
                      placeholder="Comments"
                      name="comments"
                      multiline
                      minRows={4}
                      // defaultValue={state.brandName}
                      // value={state.brandName}
                      onChange={handleChange}
                    />
                  </FormControl>
                  <Button variant="contained" onClick={handleOrderEdit}>
                    Update
                  </Button>
                </Stack>
              </CardContent>
            </Card>
          </Grid>

          {/* <Grid item xs={12} md={4}>
            <Card style={{ minHeight: '100%' }}>
              <CardContent>
                <Stack spacing={2}>
                  <div>Order Status : {orderData.orderStatusSeller}</div>
                  <div> Date : {formateDate(orderData.updatedAt)}</div>
                  <div> Payment Method : {orderData.paymentMethod}</div>{' '}
                  <span className={orderData.isPaymentDone ? 'badge-green' : 'badge-red'}>
                    {orderData.isPaymentDone ? 'Payment Done' : 'Payment Not Done'} <br />
                  </span>
                </Stack>
              </CardContent>
            </Card>
          </Grid> */}
        </Grid>

        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={3} mt={4}>
          <Typography variant="h4" gutterBottom>
            Order Details
          </Typography>
          {/* <div>
                    <Typography variant="h6" gutterBottom>
                      Address
                    </Typography>
                    {orderData.address.name} <br />
                    {orderData.address.addressLine1} <br />
                    {orderData.address.addressLine2 ? (
                      <>
                        {' '}
                        {orderData.address.addressLine2} <br />{' '}
                      </>
                    ) : (
                      ''
                    )}
                    {orderData.address.city}, {orderData.address.emirates} {orderData.address.country},{' '}
                    {orderData.address.pinCode} <br />
                    {orderData.address.mobile1},{orderData.address.mobile2} <br />
                    Type : {orderData.address.type}
                  </div> */}
        </Stack>

        <TableContainer sx={{ minWidth: 800, color: 'blue' }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Sl.</TableCell>
                <TableCell sx={{ minWidth: '100px' }}>Product</TableCell>
                <TableCell>Quantity</TableCell>
                {/* <TableCell sx={{ minWidth: '200px' }}> Seller Detail </TableCell> */}
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
                        <div className=" product-data-font">
                          <img
                            style={{ height: '50px' }}
                            src={`${ApiUrl.img_url}/products/${item.productId.image[0].smUrl}`}
                            alt={item.productId.name}
                            className="order-product-img"
                          />
                          {item.productId.title}
                          {/* <br />  {item.price} AED */}
                          <br /> Sold by
                          {getSellerdetails({
                            sellerId: item.sellerId,
                            sellerArray: item?.productId?.seller,
                            out: 'name',
                          })}{' '}
                          <br />
                        </div>
                        <Stack sx={{ marginLeft: '70px' }}>
                          <TextField
                            sx={{ width: '25%' }}
                            type={'text'}
                            label="Serial No"
                            placeholder="Serial No"
                            name="Serial No"
                            // defaultValue={state.brandName}
                            // value={state.brandName}
                            // onChange={handleChange}
                          />
                        </Stack>
                      </div>
                    </Stack>
                  </TableCell>

                  <TableCell>{item.qty}</TableCell>
                  {/* <TableCell>
                    <div className="p-seller-data  ">
                      <div>
                        {' '}
                        Seller :
                        {getSellerdetails({
                          sellerId: item.sellerId,
                          sellerArray: item?.productId?.seller,
                          out: 'name',
                        })}
                      </div>
                      <div
                        className={
                          getSellerdetails({
                            sellerId: item.sellerId,
                            sellerArray: item?.productId?.seller,
                            out: 'qty',
                          }) < item.qty
                            ? 'badge-red'
                            : 'badge-green'
                        }
                      >
                        Available Quantity :{' '}
                        {getSellerdetails({
                          sellerId: item.sellerId,
                          sellerArray: item?.productId?.seller,
                          out: 'qty',
                        })}
                      </div>
                      <div>
                        Current Price:
                        {getSellerdetails({
                          sellerId: item.sellerId,
                          sellerArray: item?.productId?.seller,
                          out: 'price',
                        })}{' '}
                        AED
                      </div>
                    </div>
                  </TableCell> */}

                  <TableCell>{item.price / item.qty} AED</TableCell>
                  <TableCell>{item.price} AED </TableCell>
                </TableRow>
              ))}
              <TableRow hover className="total-tr">
                <TableCell> Total </TableCell>
                <TableCell> </TableCell>
                <TableCell colspan="2"> Quantity : {orderData.totalQty} </TableCell>
                <TableCell colspan="2"> Price : {orderData.totalPrice} AED</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        {/* 
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={3} mt={4}>
          <Typography variant="h4" gutterBottom>
            Delivery Details
          </Typography>
        </Stack>
        <Grid container spacing={2} justifyContent="center">
          <>
            <Grid item xs={12}>

            </Grid>
          </>
        </Grid> */}
        <Grid container spacing={2} justifyContent="justify-between" marginTop={3} marginBottom={3}></Grid>
      </div>
    </Page>
  );
}
