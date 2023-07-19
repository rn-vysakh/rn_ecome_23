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

export default function Asset() {
  const [assetList, setAssetList] = useState([]);

  const getData = async () => {
    const res = await getReq({ url: '/asset' });
    if (!res.error) {
        setAssetList(res.data);
    }
    console.log(res.data);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <Page title="Asset">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Assets
          </Typography>
          <Button
            variant="contained"
            component={RouterLink}
            to="/dashboard/asset/addasset"
            startIcon={<Iconify icon="eva:plus-fill" />}
          >
            New Asset
          </Button>
        </Stack>

        <Card>
          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Sl.</TableCell>
                    <TableCell>Device Name</TableCell>
                    <TableCell>Description</TableCell>
                    <TableCell>Date Of Assigning</TableCell>
                    <TableCell>Remarks</TableCell>
                    <TableCell>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {assetList.map((row, index) => {
                    return (
                      <TableRow hover key={index}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>{row.deviceName}</TableCell>
                        <TableCell>{row.description}</TableCell>
                        <TableCell>{row.dateOfAssigning}</TableCell>
                        <TableCell>{row.remarks}</TableCell>
                        <TableCell>
                          <Button
                            variant="contained"
                            component={RouterLink}
                            to={`/dashboard/asset/single/${row._id}`}
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
