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






export default function Purchases() {
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
  
  return (

                                <div>

                                    <div  >
                                    
                                        <Stack spacing={3}>
                                            <Stack >
                                                <Typography variant="h4" textAlign={'start'} gutterBottom >
                                                    Purchase Order
                                                </Typography>
                                            </Stack>

                                            <Card>
          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Item Name</TableCell>
                    <TableCell>Vendor</TableCell>
                    <TableCell>Total Amount</TableCell>
                    <TableCell>Payment Date</TableCell>
                    <TableCell>Pending Amount</TableCell>
                    <TableCell>View Order</TableCell>
                    {/* <TableCell>Email</TableCell>
                    <TableCell>Phone</TableCell>
                    <TableCell>Action</TableCell> */}
                  </TableRow>
                </TableHead>
                <TableBody>
                {empList.map((item, index) => (


                      <TableRow hover key={index}>
                        <TableCell>Item xxxx</TableCell>
                        <TableCell>Fujitsu</TableCell>
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
  )
}
