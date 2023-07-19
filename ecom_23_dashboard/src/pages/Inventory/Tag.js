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

export default function Tag() {
  const [tagData, setTag] = useState([]);

  const getData = async () => {
    const res = await getReq({ url: 'api/tag' });
    if (!res.error) {
      setTag(res.data);
      // console.log(res.data);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  // let tagList =    [];
  const tagList = tagData;
  // console.log('tag===========================>', tagData);

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={3}>
        <Typography variant="h4" mt={3} gutterBottom>
          Tag List
        </Typography>

        <Button
          color="success"
          variant="contained"
          component={RouterLink}
          to="/dashboard/inventory/tag/addTag"
          startIcon={<Iconify icon="eva:plus-fill" />}
        >
          Add Tag
        </Button>
      </Stack>
      <Card>
        <Scrollbar>
          <TableContainer sx={{ minWidth: 800 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Sl.</TableCell>
                  <TableCell>Title</TableCell>
                  <TableCell>Value</TableCell>
                  <TableCell>Unit</TableCell>
                  <TableCell>Label</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {tagList.map((items, key) => (
                  <TableRow hover key={key}>
                    <TableCell>{key + 1}</TableCell>
                    <TableCell>{items.title}</TableCell>
                    <TableCell>{items.value}</TableCell>
                    <TableCell>{items.unit}</TableCell>
                    <TableCell>{items.label}</TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        component={RouterLink}
                        to={`editTag/${items._id}?title=${items.title}&value=${items.value}&unit=${items.unit}&label=${items.label}`}
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
