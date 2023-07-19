import React, { useState, useEffect } from 'react';
import { Link as RouterLink, useParams } from 'react-router-dom';
import Moment from 'react-moment';

import { toast } from 'react-toastify';
// @mui

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

import { styled } from '@mui/material/styles';
import { Link, Stack, TextField, Container, Typography, Card, CardContent, Grid, Button } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import Page from '../../components/Page';

import { getReq, patchReq } from '../../data/ApiReq';

export default function LeaveSingle() {
  const { id } = useParams();

  const [leaveDetails, setLeaveDetails] = useState([]);

  const getData = async () => {
    const res = await getReq({ url: `/leave/${id}` });
    console.log(res);
    if (!res.error) {
      setLeaveDetails(res.data);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const initialState = {
    remark: '',
    state: '',
  };
  const [state, setState] = useState(initialState);

  const handleChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
    console.log(state);
  };
  const submitLeave = async () => {
    const data = {
      remark: state.remark,
      state: state.state,
    };
    const res = await patchReq({ url: `/leave/respond/${id}`, data });
    if (!res.error) {
      toast.success(' Leave Submited ');
      setState(initialState);
    } else {
      toast.error(res.message);
    }
  };
  return (
    <Page title="Leave Form">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Leave Form
          </Typography>
        </Stack>
        <Grid container spacing={0} alignItems="center" justifyContent="center">
          <Grid item xs={12} md={7}>
            <Card>
              <CardContent>
                <div>
                  <div>
                    <Stack spacing={3}>
                      <Typography variant="h5" gutterBottom>
                        Details
                      </Typography>

                      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                        <Stack spacing={2} style={{ width: '100%' }}>
                          <h4>Leave Type : {leaveDetails.type}</h4>
                          <h4>Reason : {leaveDetails.reason}</h4>
                          <h4>Number of days : {leaveDetails.noOfDays}</h4>
                          <h4>Leave Starting Date : <Moment format="YYYY/MM/DD">{leaveDetails.fromDate}</Moment> </h4>
                          <h4>Leave Ending Date : <Moment format="YYYY/MM/DD">{leaveDetails.endDate}</Moment> </h4>
                          <h4>Medical Certificate : <a href={leaveDetails.document?.url} rel="noreferrer" target='_blank' >Download Medical Certificate Here</a></h4>
                        </Stack>
                      </Stack>

                      <div>
                        <FormControl fullWidth size="large" type="button">
                          <InputLabel id="demo-simple-select-autowidth-label">State</InputLabel>
                          <Select
                            labelId="demo-simple-select-autowidth-label"
                            id="demo-simple-select-autowidth"
                            name="state"
                            onChange={handleChange}
                            autoWidth
                            label="State"
                          >
                            <MenuItem value="">
                              <em>None</em>
                            </MenuItem>
                            <MenuItem value="accepted">Accepted</MenuItem>
                            <MenuItem value="rejected">Rejected</MenuItem>
                          </Select>
                        </FormControl>
                      </div>

                      <Stack spacing={2} style={{ width: '100%' }}>
                        <TextField fullWidth label="Remark" name="remark" onChange={handleChange} />
                      </Stack>

                      <LoadingButton fullWidth size="large" type="button" onClick={submitLeave} variant="contained">
                        Submit
                      </LoadingButton>
                    </Stack>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
