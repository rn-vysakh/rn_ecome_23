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

export default function GetAllLeaves() {
  const [leaveList, setLeaveList] = useState([]);

  const getData = async () => {
    const res = await getReq({ url: '/leave' });
    console.log(res);
    if (!res.error) {
        setLeaveList(res.data);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <Page title="Total Leave List">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            All Leaves List
          </Typography>
          
        </Stack>

        <Card>
          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Sl.</TableCell>
                    <TableCell>Id</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Type of Leave</TableCell>
                    <TableCell>Reason</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {leaveList.map((row, index) => {
                    return (
                      <TableRow hover key={index}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>{row.userId.employeeId}</TableCell>
                        <TableCell>{row.userId.firstName} {row.userId.lastName}</TableCell>
                        <TableCell>{row.type}</TableCell>
                        <TableCell>{row.reason}</TableCell>
                        <TableCell>
                          <Button
                            variant="contained"
                            component={RouterLink}
                            to={`/dashboard/leaves/single/${row._id}`}
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
