import React, { useRef, useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';

import {
    Link,
    Stack,
    TextField,
    Container,
    Typography,
    Card,
    CardContent,
  TableContainer,
  TableRow,
  TableBody,
  TableHead,
  TableCell,
  Table,
    Grid,
    Button,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    Box,
} from '@mui/material';
import { Icon } from '@iconify/react';
import Page from '../../components/Page';
import Iconify from '../../components/Iconify';

import { getReq } from '../../data/ApiReq';
import { getUserData } from '../../data/userData';
import Scrollbar from '../../components/Scrollbar';






export default function Accounts() {
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


  // const initialState = {
  //   error: false,
  //   loading: true,
  //   location: '',
  // };
  // const initialUserData = {
  //   id: '',
  //   bankName: '',
  //   items: [
  //     {
  //       productId: {
  //         image: [{ smUrl: '' }],
  //       },
  //     },
  //   ],
  //   address: {},
  // };
  // const [orderData, setOrderData] = useState(initialUserData);
  // const [state, setState] = useState(initialState);

  // const getOrderData = async () => {
  //   try {
  //     // const response = await getReq(`order/single?orderId=${params.id}`);
  //     const res = await getReq({ url: '/user/getalluser' });
  //     console.log(res.data[0].bankName);
  //     if (!res.error) {
  //       setOrderData(res.data);
  //       setState({
  //         ...state,
  //         loading: false,
  //       });
  //     } else {
  //       console.log(res.error);
  //       setState({
  //         ...state,
  //         error: true,
  //       });
  //       return 0;
  //     }
  //   } catch (error) {
  //     setState({
  //       ...state,
  //       error: true,
  //     });
  //   }
  // };
  // useEffect(() => {
  //   getOrderData();
  // }, []);
  
  return (
    // <Page title="Salary certificate">
    //         <Container>

    //             <Grid container spacing={0} alignItems="center" justifyContent="center">
    //                 <Grid item xs={12} md={10}>
    //                     <Card>
    //                         <CardContent>
                                <div>

                                    <div  >
                                    
                                        <Stack spacing={3}>
                                            <Stack >
                                                <Typography variant="h4" textAlign={'start'} gutterBottom >
                                                    Account Order
                                                </Typography>
                                            </Stack>

                                            <Stack>
                                            <Grid container justifyContent={"flex-end"}>
                                            <Box sx={{ minWidth: 120 }}>
                                              <FormControl sx={{width: "190px", alignText:"end"}}>
                                                <InputLabel id="demo-simple-select-label" >Type</InputLabel>
                                                <Select
                                                  labelId="demo-simple-select-label"
                                                  id="demo-simple-select"
                                                  // value={age}
                                                  label="Age"
                                                >
                                                  <MenuItem value={10}>Payment Done</MenuItem>
                                                  <MenuItem value={20}>Payment Awaiting</MenuItem>
                                                  {/* <MenuItem value={30}>Thirty</MenuItem> */}
                                                </Select>
                                              </FormControl>
                                            </Box>
                                            </Grid>
                                            </Stack>

                                            <Card>
          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Order ID</TableCell>
                    <TableCell>Payment Type</TableCell>
                    <TableCell>Total Amount</TableCell>
                    <TableCell>Received Amount</TableCell>
                    <TableCell>Pending</TableCell>
                    <TableCell>View Order</TableCell>
                    {/* <TableCell>Email</TableCell>
                    <TableCell>Phone</TableCell>
                    <TableCell>Action</TableCell> */}
                  </TableRow>
                </TableHead>
                <TableBody>
                {empList.map((item, index) => (


                      <TableRow hover key={index}>
                        <TableCell>1234</TableCell>
                        <TableCell>e-Fund Transfer</TableCell>
                        <TableCell>500 AED</TableCell>
                        <TableCell>400 AED</TableCell>
                        <TableCell>100 AED</TableCell>
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
                                            

                                        </Stack>

                                    </div>

                                </div>
        //                     </CardContent>
        //                 </Card>
        //             </Grid>
        //         </Grid>

        //     </Container>

        // </Page>
  )
}
