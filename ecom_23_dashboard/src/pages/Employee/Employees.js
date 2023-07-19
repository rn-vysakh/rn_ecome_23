import { Link as RouterLink } from 'react-router-dom';
import { useState, useEffect } from 'react';

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
  Typography,
  TableContainer,
  TablePagination,
} from '@mui/material';
import Iconify from '../../components/Iconify';
// components
import Page from '../../components/Page';
import Scrollbar from '../../components/Scrollbar';
import { getReq } from '../../data/ApiReq';

export default function Employee() {
  const [empList, setEmpList] = useState([]);

  const getData = async () => {
    const res = await getReq({ url: '/user/getalluser' });
    if (!res.error) {
      setEmpList(res.data);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <Page title="Employee">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Employee
          </Typography>
          <Button
            variant="contained"
            component={RouterLink}
            to="/dashboard/employees/new"
            startIcon={<Iconify icon="eva:plus-fill" />}
          >
            New Employee
          </Button>
        </Stack>

        <Card>
          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Sl.</TableCell>
                    <TableCell>Employee ID</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Phone</TableCell>
                    <TableCell>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {empList.map((row, index) => {
                    return (
                      <TableRow hover key={index}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>{row.employeeId}</TableCell>
                        <TableCell>{row.firstName}</TableCell>
                        <TableCell>{row.email}</TableCell>
                        <TableCell>{row.phone}</TableCell>
                        <TableCell>
                          <Button
                            variant="contained"
                            component={RouterLink}
                            to={`/dashboard/employees/edit/${row._id}`}
                            startIcon={<Iconify icon="carbon:view" />}
                            color="warning"
                          >
                            View
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </Scrollbar>
        </Card>
      </Container>
    </Page>
  );
}
