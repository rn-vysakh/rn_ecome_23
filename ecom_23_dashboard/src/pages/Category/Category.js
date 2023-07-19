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

export default function Brands() {
  const [brandData, setBrand] = useState([]);

  const getData = async () => {
    const res = await getReq({ url: 'category/getall' });
    if (!res.error) {
      setBrand(res.data);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  // let brandList =    [];
  const brandList = brandData;
  console.log(brandData);

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={3}>
        <Typography variant="h4" mt={3} gutterBottom>
          Category List
        </Typography>

        <Button
          color="success"
          variant="contained"
          component={RouterLink}
          to="/dashboard/category/addCategory"
          startIcon={<Iconify icon="eva:plus-fill" />}
        >
          Add Category
        </Button>
      </Stack>
      <Card>
        <Scrollbar>
          <TableContainer sx={{ minWidth: 800 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Sl.</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Type</TableCell>
                  <TableCell>Parent Category</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {brandList.map((items, key) => (
                  <TableRow hover key={key}>
                    <TableCell>{key + 1}</TableCell>

                    <TableCell>{items.categoryName}</TableCell>
                    <TableCell> {items.isSubCategory ? 'Sub Category' : 'Main Category'}</TableCell>
                    <TableCell>{items.isSubCategory ? items.parentName : 'Nil'}</TableCell>

                    <TableCell>
                      <Button
                        variant="contained"
                        component={RouterLink}
                        to={`editCategory/${items._id}`}
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
    </Container>
  );
}
