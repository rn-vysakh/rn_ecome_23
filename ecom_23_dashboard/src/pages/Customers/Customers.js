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

export default function Customers() {
    const initialState = {
        page: 1,
        limit: 20,
        totalCount: 0,
        totalPages: 0,
        hasNextPage: false,
        searchText: "",
        role: "user",
      };
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [empList, setEmpList] = useState([]);
  const [state, setState] = useState(initialState);

  const getData = async () => {
    const query = `role=${state.role}`
    const res = await getReq({ url: `auth/api/user/user?limit=20&page=1` });
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


  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={3}>
        <Typography variant="h4" mt={3} gutterBottom>
          Customer List
        </Typography>
      </Stack>

      <Card>
        <Scrollbar>
          <TableContainer sx={{ minWidth: 800 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Sl.</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Phone</TableCell>
                  <TableCell>Joined</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {empList.map((item, key) => (
                <TableRow hover key={key}>
                  <TableCell>{key + 1}</TableCell>
                  <TableCell> {item.firstName} {item.lastName}</TableCell>
                  <TableCell>
                    <div className="product-data">
                     
                      <div className="product-data-font">
                      
                       {item.email}
                      </div>
                     
                    </div>
                  </TableCell>
                  <TableCell> {item.countryCode} {item.phone}</TableCell>
                  <TableCell>{formateDate(item.createdAt)}</TableCell>

                  <TableCell>
                    <Button
                      variant="contained"
                      component={RouterLink}
                        // to={`user/${item._id}`}
                           to={`/dashboard/customers/details/${item._id}`}
                      startIcon={<Iconify icon="carbon:view" />}
                      color="warning"
                    >
                     Know more
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
