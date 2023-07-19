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

export default function AddAsset() {
    const initialState = {
        deviceName: '',
        description: '',
        dateOfAssigning: '',
        remarks: '',
    };
    const [state, setState] = useState(initialState);

    const onChange = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value,
        });
        console.log(e.target.value);
    };
    const submitAsset = async () => {
        const data = {
            deviceName: state.deviceName,
            description: state.description,
            dateOfAssigning: state.dateOfAssigning,
            remarks: state.remarks,
        };

        const res = await postReq({ url: '/asset/submit', data });
        if (!res.error) {
            toast.success(' Asset Submited ');
            setState(initialState);
        } else {
            toast.error(res.message);
        }
    };


    return (
        <Page title="Add Asset">
            <Container>
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                    <Typography variant="h4" gutterBottom>
                        Add Asset
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
                                                Asset Details
                                            </Typography>
                                            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                                                <Stack spacing={5} style={{ width: '100%' }}>
                                                    
                                                    <TextField fullWidth label="Device Name" name="deviceName" onChange={onChange} />


                                                    <TextField fullWidth label="Description" name="description" onChange={onChange} />

                                                    <TextField fullWidth label="User" name="user" onChange={onChange} />


                                                    <TextField
                                                        id="outlined-number"
                                                        label="Date Of Assigning"
                                                        type="date"
                                                        name="dateOfAssigning"
                                                        onChange={onChange}
                                                        InputLabelProps={{
                                                            shrink: true,
                                                        }}
                                                    />
                                                    <TextField fullWidth label="Remarks" name="remarks" onChange={onChange} />
                                                </Stack>
                                            </Stack>



                                            <LoadingButton fullWidth size="large" type="button" variant="contained" onClick={submitAsset}>
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
