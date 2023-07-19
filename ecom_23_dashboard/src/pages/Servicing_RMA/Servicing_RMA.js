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

export default function ServicingRMA() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [empList, setEmpList] = useState([]);

  const getData = async () => {
    const res = await getReq({ url: 'order/getall' });
    if (!res.error) {
      setEmpList(res.data);
      console.log(res.data);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const formateDate = (date) => {
    const newDate = new Date(date);
    const day = newDate.getDate();
    const month = newDate.getMonth() + 1;
    const year = newDate.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const TableSec = () => (
    <Card>
      <Scrollbar>
        <TableContainer sx={{ minWidth: 800 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Sl.</TableCell>
                <TableCell>User Name</TableCell>
                <TableCell>Items</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {empList.map((item, index) => (
                <TableRow hover key={index}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{item.userId.firstName}</TableCell>
                  <TableCell>
                    <div className="product-data">
                      {item.items.map((item2, key2) => (
                        <div key={key2} className="product-data-font">
                          <img
                            style={{ height: '50px' }}
                            src={`${ApiUrl.img_url}/products/${item2.productId.image[0].smUrl}`}
                            alt={item2.productId.name}
                            className="order-product-img"
                          />
                          {item2.productId.name}
                        </div>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>{formateDate(item.createdAt)}</TableCell>
                  <TableCell>{item.totalPrice} AED</TableCell>

                  <TableCell>
                    <Button
                      variant="contained"
                      component={RouterLink}
                      to={`/dashboard/order/${item._id}`}
                      startIcon={<Iconify icon="carbon:view" />}
                      color="warning"
                    >
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Scrollbar>
    </Card>
  );

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={3}>
        <Typography variant="h4" mt={3} gutterBottom>
          Servicing/ServicingRMA
        </Typography>
        <Pagination count={3} />
      </Stack>
      <Card>
        <Scrollbar>
          <TableContainer sx={{ minWidth: 800 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Sl.</TableCell>
                  <TableCell>User Name</TableCell>
                  <TableCell>Items</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Amount</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {empList.map((item, index) => (
                  <TableRow hover key={index}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{item.userId.firstName}</TableCell>
                    <TableCell>
                      <div className="product-data">
                        {item.items.map((item2, key2) => (
                          <div key={key2} className="product-data-font">
                            <img
                              style={{ height: '50px' }}
                              src={`${ApiUrl.img_url}/products/${item2.productId.image[0].smUrl}`}
                              alt={item2.productId.name}
                              className="order-product-img"
                            />
                            {item2.productId.name}
                          </div>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>{formateDate(item.createdAt)}</TableCell>
                    <TableCell>{item.totalPrice} AED</TableCell>

                    <TableCell>
                      <Button
                        variant="contained"
                        component={RouterLink}
                        to={`/dashboard/servicing_RMA_details/${item._id}`}
                        startIcon={<Iconify icon="carbon:view" />}
                        color="warning"
                      >
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>
      </Card>
    </Container>
  );
}
