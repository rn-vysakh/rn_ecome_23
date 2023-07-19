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

export default function AddNewst() {

    const [imgAddress, setImgAddress] = useState(
        'https://www.brightsidedental.co.uk/blog/wp-content/uploads/2020/08/Face-mask-1024x683.jpeg'
    );
    const initialState = {
        title: '',
        description: '',
        image: '',
       
    };
    const [state, setState] = useState(initialState);

    const onChange = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value,
        });
        console.log(e.target.value);
    };
    const submitNews = async () => {
        const data = {
            title: state.title,
            description: state.description,
            image: state.image,
            type:"news"
        };

        const res = await postReq({ url: '/news/submit', data });
        if (!res.error) {
            toast.success(' News Submited ');
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
        data.append('type', 'news');
    
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
          toast.success('Image uploaded');
        } else {
          toast.error(response.message);
        }
      };
    
    return (
        <Page title="Add News">
            <Container>
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                    <Typography variant="h4" gutterBottom>
                        Add News
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
                                                News Details
                                            </Typography>
                                            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                                                <Stack spacing={5} style={{ width: '100%' }}>

                                                    <TextField fullWidth label="Title" name="title" onChange={onChange} />


                                                    <TextField fullWidth label="Description" name="description" onChange={onChange} />


                                                </Stack>
                                            </Stack>


                                            <Button variant="contained" component="label"  onChange={fileUpload}>
                                                Upload Image
                                                <input hidden type="file" />
                                            </Button>


                                            <LoadingButton fullWidth size="large" type="button" variant="contained" onClick={submitNews}>
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
