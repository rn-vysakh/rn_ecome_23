import { Link as RouterLink } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { faker } from '@faker-js/faker';
// @mui
import { styled } from '@mui/material/styles';
import { blue } from '@mui/material/colors';
import { max } from 'lodash';

import {
    Card,
    Stack,
    Avatar,
    Button,
    Container,
    Typography,
    Grid,
    Item,
    Box, Link, Divider, CardHeader,
} from '@mui/material';




import Iconify from '../../components/Iconify';
// components
import Page from '../../components/Page';

import { getReq } from '../../data/ApiReq';



export default function News() {
    const [newsList, setNewsList] = useState([]);

    const getData = async () => {
        const res = await getReq({ url: '/news/news' });
        if (!res.error) {
            setNewsList(res.data);
        }
      
    };

    useEffect(() => {
        getData();
    }, []);



    return (

        <Page title="News">
            <Container>
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                    <Typography variant="h4" gutterBottom>
                        News
                    </Typography>
                    <Button
                        variant="contained"
                        component={RouterLink}
                        to="/dashboard/news/addnews"
                        startIcon={<Iconify icon="eva:plus-fill" />}
                    >
                        Add News
                    </Button>
                </Stack>

                {newsList.map((item, key) => (
                    <Card spacing={2} sx={{ mb: 1 }} key={key}>

                        <Grid container spacing={2} m={2}  >

                            <Grid item xs={2} flexShrink={0} >
                                <Typography variant="h5" gutterTop>
                                    {item.title}
                                </Typography>
                                <Box component="img" alt={'image'} height={150} width={200} borderRadius={1} src={'https://images.unsplash.com/photo-1596073419667-9d77d59f033f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=435&q=80'} />

                            </Grid>
                            <Grid item xs={10} mt={5} textAlign={'start'}>
                                <Typography gutterBottom>
                                    {item.description}
                                </Typography>
                                <Box sx={{ mr: 20 }}>
                                    <Button
                                        variant="contained"
                                        component={RouterLink}
                                        to={`/dashboard/news/single/${item._id}`}
                                        startIcon={<Iconify icon="carbon:view" />}
                                        color="warning"
                                    >
                                        View
                                    </Button>
                                </Box>
                            </Grid>
                        </Grid>

                    </Card>

                ))}


            </Container>
        </Page>

    );
}

