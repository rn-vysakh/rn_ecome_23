import * as React from 'react';
import { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import {
  Stack,
  Checkbox,
  Container,
  Grid,
  Box,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Card,
  CardActions,
  CardMedia,
  Item,
  Button,
} from '@mui/material';

import TextField from '@mui/material/TextField';

import { BrowserRouter as Router, Switch, Route, Link, useParams } from 'react-router-dom';
import Iconify from '../../components/Iconify';
// components
import Page from '../../components/Page';
import Scrollbar from '../../components/Scrollbar';
import { getReq } from '../../data/ApiReq';
import { getUserRole } from '../../data/userData';

export default function GetTodayAttendance() {
  const [uRoll, setRoll] = useState('employee');

  const userRole = async () => {
    const role = await getUserRole();
    console.log(role);
    setRoll(role);
    console.log('hyu68i686========');
  };

  useEffect(() => {
    userRole();
  }, []);

  const [attendanceList, setAttendanceList] = useState([]);
  const [absentList, setAbsentList] = useState([]);
  const [value, setValue] = React.useState(null);

  const onSetValue = (event) => {
    onSetValue(new Date(event.target.value));
  };

  const getData = async () => {
    const date = new Date();
    const formatedDate = `${date.getMonth() + 1}-${date.getDate()}-${date.getFullYear()}`;
    console.log(formatedDate, '-------');
    const res = await getReq({ url: `/attendance/${formatedDate}` });
    console.log(res);
    if (!res.error) {
      setAttendanceList(res.data.attendanceData);
      setAbsentList(res.data.notSignedUser);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const islate = (timeStamp) => {
    const date = new Date(timeStamp);
    const hr = date.getHours();
    if (hr < 9) return true;
    const min = date.getMinutes();
    if (min > 5) return true;

    return false;
  };

  const earlyLeave = (timeStamp) => {
    if (!timeStamp) return false;
    const date = new Date(timeStamp);
    const hr = date.getHours();

    if (hr < 16) return true;
    // const min = date.getMinutes();
    // if (min < 58) return true;

    return false;
  };
  return (
    <div>
      <Grid container spacing={2} textAlign={'center'}>
        <Grid item xs={6}>
          <Link to="/dashboard/leaves/apply" style={{ textDecoration: 'none', color: 'black' }}>
            <Button variant="outlined" sx={{ px: 4, py: 2 }}>
              {' '}
              <h3>Apply for Leave</h3>{' '}
            </Button>
          </Link>
        </Grid>
        {uRoll === 'admin' && (
          <Grid item xs={6}>
            <Link to="/dashboard/leaves/total" style={{ textDecoration: 'none', color: 'black' }}>
              <Button variant="outlined" sx={{ px: 4, py: 2 }}>
                <h3>List Leaves</h3>
              </Button>
            </Link>
          </Grid>
        )}
      </Grid>

      {uRoll === 'admin' && (
        <Box mt={5}>
          <Page title="Today Attendance">
            <Container>
              <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                <Typography variant="h4" gutterBottom>
                  Attendance List
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
                          <TableCell>Work Type</TableCell>
                          <TableCell>Check In</TableCell>
                          <TableCell>Check Out</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {attendanceList.map((row, index) => (
                          <TableRow hover key={index} className={islate(row.checkIntimeStamp) ? 'bg-waring' : ''}>
                            <TableCell>{index + 1}</TableCell>
                            <TableCell>{row.userId.employeeId}</TableCell>
                            <TableCell>
                              {row.userId.firstName} {row.userId.lastName}
                            </TableCell>
                            <TableCell>{row.workingType}</TableCell>
                            <TableCell className={islate(row.checkIntimeStamp) ? 'bg-waring-2' : ''}>
                              {row.checkInLocalTime}
                            </TableCell>
                            <TableCell className={earlyLeave(row.checkOuttimeStamp) ? 'bg-waring-2' : ''}>
                              {row.checkOutLocalTime}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>

                      <Typography variant="h4" gutterBottom m={2}>
                        Absent List
                      </Typography>
                      <TableBody>
                        {absentList.map((row, index) => (
                          <TableRow hover key={index} className={islate(row.checkIntimeStamp) ? 'bg-waring' : ''}>
                            <TableCell>{index + 1}</TableCell>
                            <TableCell>{row.employeeId}</TableCell>
                            <TableCell>
                              {row.firstName} {row.lastName}
                            </TableCell>
                            <TableCell>Nill</TableCell>
                            <TableCell>Nill</TableCell>
                            <TableCell>Nill</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Scrollbar>
              </Card>
            </Container>
          </Page>
        </Box>
      )}
    </div>
  );
}
