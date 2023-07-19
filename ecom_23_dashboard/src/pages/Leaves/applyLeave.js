import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { styled } from '@mui/material/styles';
import { useState } from 'react';
import { toast } from 'react-toastify';
import Moment from 'react-moment';
import 'moment-timezone';

import { Link, Stack, TextField, Container, Typography, Card, CardContent, Grid, Button } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import Page from '../../components/Page';
import { postReq } from '../../data/ApiReq';

export default function BasicSelect() {
  const initialState = {
    type: '',
    reason: '',
    document: '',
    noOfDays: '',
    fromDate: '',
    endDate: '',
  };
  const [state, setState] = useState(initialState);

  const onChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
    console.log(e.target.value);
  };
  const submitLeave = async () => {
    const data = {
      type: state.type,
      reason: state.reason,
      document: state.document,
      noOfDays: state.noOfDays,
      fromDate: state.fromDate,
      endDate: state.endDate,
    };

    const res = await postReq({ url: '/leave/submit', data });
    if (!res.error) {
      toast.success(' Leave Submited ');
      setState(initialState);
    } else {
      toast.error(res.message);
    }
  };

  const fileUpload = async (e) => {
    console.log(e.target.files[0]);
    const file = e.target.files[0];
    const data = new FormData();
    data.append('file', file);
    data.append('type', 'leave');

    const response = await postReq({
      url: 'file/upload',
      data,
    });
    console.log('file response', response);
    // if check
    if (!response.error) {
      setState({
        ...state,
        document: response.data._id,
      });
      toast.success('Uploaded Medical Certificate');
    } else {
      toast.error(response.message);
    }
  };

  return (
    <Page title="Apply for Leave">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Apply For Leave
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
                        Leave Details
                      </Typography>
                      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                        <Stack spacing={5} style={{ width: '100%' }}>
                          <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                            <InputLabel id="demo-simple-select-standard-label">Type of leave</InputLabel>
                            <Select
                              labelId="demo-simple-select-filled-label"
                              id="demo-simple-select-filled"
                              autoWidth
                              label="Leave"
                              onChange={onChange}
                              name="type"
                              required
                            >
                              <MenuItem value="Sick Leave">Sick Leave</MenuItem>
                              <MenuItem value="Casual Leave">Casual Leave</MenuItem>
                              <MenuItem value="Loss Of Pay">Loss Of Pay</MenuItem>
                              <MenuItem value="Annual Leave">Annual Leave</MenuItem>
                              <MenuItem value="Maternity Leave">Maternity Leave</MenuItem>
                            </Select>
                          </FormControl>

                          <TextField fullWidth label="Reason" name="reason" onChange={onChange} />

                          <TextField
                            sx={{ mt: 2 }}
                            fullWidth
                            label="Number of days"
                            name="noOfDays"
                            onChange={onChange}
                            type="number"
                          />

                          <InputLabel id="demo-simple-select-standard-label">
                            Both Dates mentioned below are inclusive of leaves <span style={{ color: 'red' }}>*</span>{' '}
                          </InputLabel>

                          <TextField
                            id="outlined-number"
                            label="Leave Starting Date"
                            type="date"
                            name="fromDate"
                            onChange={onChange}
                            InputLabelProps={{
                              shrink: true,
                            }}
                          />

                          <TextField
                            id="outlined-number"
                            label="Leave Ending Date"
                            type="date"
                            name="endDate"
                            onChange={onChange}
                            InputLabelProps={{
                              shrink: true,
                            }}
                          />
                        </Stack>
                      </Stack>

                      <Button onChange={fileUpload} variant="contained" component="label">
                        Upload Medical Certificate
                        <input hidden type="file" />
                      </Button>

                      <LoadingButton fullWidth size="large" type="button" variant="contained" onClick={submitLeave}>
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
