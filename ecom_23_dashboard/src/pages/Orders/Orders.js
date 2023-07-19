import { Link as RouterLink } from 'react-router-dom';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import * as React from 'react';
import TimeAgo from 'react-timeago';
import { DataGrid } from '@mui/x-data-grid';
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
  Link,
  Grid,
} from '@mui/material';
import Iconify from '../../components/Iconify';
// components
import Page from '../../components/Page';
import Scrollbar from '../../components/Scrollbar';
import { getReq } from '../../data/ApiReq';
import ApiUrl from '../../data/ApiUrl';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function Orders() {
  const [value, setValue] = React.useState(0);
  const [status, setStatus] = React.useState(null);
  const [loading, setLoading] = useState(false);

  const handleChanges = (event, value) => {
    setPage(value);
  };

  const getData = async (status, pg) => {
    setLoading(true);

    const p = pg || state.page;
    const l = state.limit;

    let query = `page=${p}&limit=${l}`;

    let url = `order/api/order/getall?${query}`;
    if (status) {
      url = url + `&orderStatusSeller=${status}`;
    }
    const res = await getReq({ url });

    if (!res.error) {
      setOrderList(res.data);
      setState({
        ...state,
        page: res.pagination.page,
        limit: res.pagination.limit,
        totalCount: res.pagination.totalCount,
        totalPages: res.pagination.totalPages,
        hasNextPage: res.pagination.hasNextPage,
      });
      setLoading(false);
    }
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
    if (newValue === 0) {
      getData();
    } else if (newValue === 1) {
      getData('Awaiting confirmation,Contact customer,Offer Alternative,Pending for cancellation', 1);
      setStatus('Awaiting confirmation,Contact customer,Offer Alternative,Pending for cancellation');
    } else if (newValue === 2) {
      getData('Awaiting fulfilment,Awaiting Item from supplier', 1);
      setStatus('Awaiting fulfilment,Awaiting Item from supplier');
    } else if (newValue === 3) {
      getData('Ready for shipment,Shipped,Shipment return,', 1);
      setStatus('Ready for shipment,Shiped,Shipment return,');
    } else if (newValue === 4) {
      getData('Canceled,Completed', 1);
      setStatus('Canceled,Completed');
    }
  };

  const [ordersList, setOrderList] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const [currentPage, setCurrentPage] = useState();
  const [totalPosts, setTotalPosts] = useState(206);
  const [postsPerPage, setPostsPerPage] = useState(20);

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

  const formateDate = (date) => {
    const newDate = new Date(date);
    const day = newDate.getDate();
    const month = newDate.getMonth() + 1;
    const year = newDate.getFullYear();
    const time = newDate.toLocaleTimeString();
    return (
      <div>
        <TimeAgo date={date} /> <br />
        {day}-{month}-{year} <br />
        {time} <br />
      </div>
    );
  };

  const OrderStatus = ({ status }) => {
    if (
      status === 'Awaiting confirmation' ||
      status === 'Contact customer' ||
      status === 'Offer Alternative' ||
      status === 'Pending for cancellation'
    ) {
      return <div className="badge-yellow">{status}</div>;
    } else if (status === 'Awaiting fulfilment' || status === 'Awaiting Item from supplier') {
      return <div className="badge-purple">{status}</div>;
    } else if (status === 'Ready for shipment' || status === 'Shiped' || status === 'Shipment return') {
      return <div className="badge-blue">{status}</div>;
    } else if (status === 'Completed') {
      return <div className="badge-green">{status}</div>;
    } else if (status === 'Canceled' || status === 'Refunded') {
      return <div className="badge-red">{status}</div>;
    } else {
      return <div className="badge-gray">{status}</div>;
    }
  };
  const TableSec = ({ data }) => (
    <Card>
      <Scrollbar>
        <TableContainer sx={{ minWidth: 800 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Order Id</TableCell>
                <TableCell sx={{ width: '120px' }}>Time</TableCell>
                <TableCell>User details</TableCell>
                <TableCell className="text-center">Items</TableCell>
                <TableCell>Status</TableCell>
                <TableCell style={{ width: '10%' }}>Amount</TableCell>
                {/* <TableCell>Action</TableCell> */}
              </TableRow>
            </TableHead>

            <TableBody>
              {data.map((item, index) => (
                <TableRow
                  hover
                  key={index}
                  component={RouterLink}
                  to={`/dashboard/order/${item._id}`}
                  className={index % 2 === 1 ? 'dark-bg' : ''}
                >
                  <TableCell className="product-data-cell">{item.orderId.toUpperCase()}</TableCell>
                  <TableCell className="product-data-cell">{formateDate(item.createdAt)}</TableCell>
                  <TableCell className="product-data-cell">
                    {item.address.name} <br />
                    {item.address.mobile1} <br />
                    {item.address.emirates} <br />
                  </TableCell>
                  <TableCell className="product-data-cell">
                    <div className="product-data">
                      {item.items.map((item2, key2) => (
                        <div key={key2}>
                          <div className="order-product-lists">
                            <div className="product-data-font">
                              <img
                                style={{ height: '30px' }}
                                src={`${ApiUrl.img_url}/products/${item2.productId?.image[0]?.smUrl}`}
                                alt={item2.productId.name}
                                className="order-product-img"
                              />
                              {item2.productId.title}
                            </div>
                            <div className="pro-seller-details">
                              <div className="order-product-qty">
                                {' '}
                                Quantity : {item2.qty} <br />
                                Unit Price : {item2.productId.seller[0].sellPrice} AED
                              </div>
                              <div>
                                Sold by{' '}
                                <span
                                  style={{
                                    backgroundColor: '#49aae8',
                                    padding: '2px',
                                    color: 'white',
                                    borderRadius: '3px',
                                  }}
                                >
                                  Rookie Ninja
                                </span>{' '}
                                & Fulfilled by Rookie Ninja <br />
                                {/* Sold By {item2.productId.seller[0].companyName} <br /> */}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell className="product-data-cell">
                    <OrderStatus status={item.orderStatusSeller} />
                  </TableCell>
                  <TableCell className="product-data-cell">
                    <div>
                      <p style={{ fontSize: '16px' }}>AED {item.totalPrice}</p>
                    </div>
                    {item.paymentMethod === 'cod' ? (
                      <div className="badge-red amount-font mb-5"> Balance {item.totalPrice}</div>
                    ) : (
                      <div className="badge-green amount-font mb-5">Balance 0 </div>
                    )}
                    {item.paymentMethod === 'cod' ? (
                      <div className="badge-red amount-font"> Cash on delivery</div>
                    ) : (
                      <div className="badge-green amount-font">Card Payment </div>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Scrollbar>
    </Card>
  );

  const changePage = (event, value) => {
    setState({
      ...state,
      page: value,
    });
    getData(status, value);
  };

  return (
    <div>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={3}>
        <Typography variant="h4" mt={3} gutterBottom>
          Orders
        </Typography>
        {/* <Pagination postsPerPage={postsPerPage} totalPosts={totalPosts} paginate={paginate}  count={10}/> */}

        <div className="App">
          <div
            className="head"
            style={{
              width: 'fit-content',
              margin: 'auto',
            }}
          ></div>
          <br />
          <Box
            sx={{
              margin: 'auto',
              width: 'fit-content',
              alignItems: 'center',
            }}
          >
            <Pagination count={state.totalPages} color="primary" onChange={changePage} />
          </Box>
        </div>
      </Stack>

      <Stack direction={{ xs: 'column', sm: 'row' }} sx={{ mb: 2, ml: 2 }}></Stack>

      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
            <Tab label="All Orders" {...a11yProps(0)} />
            <Tab label="Awaiting Verification" {...a11yProps(1)} />
            <Tab label="Item Not Ready" {...a11yProps(2)} />
            <Tab label="Logistics" {...a11yProps(3)} />
            <Tab label="Closed Orders" {...a11yProps(4)} />
          </Tabs>
        </Box>

        <TabPanel value={value} index={0}>
          <TableSec data={ordersList} />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <TableSec data={ordersList} />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <TableSec data={ordersList} />
        </TabPanel>
        <TabPanel value={value} index={3}>
          <TableSec data={ordersList} />
        </TabPanel>
        <TabPanel value={value} index={4}>
          <TableSec data={ordersList} />
        </TabPanel>
      </Box>
    </div>
  );
}
