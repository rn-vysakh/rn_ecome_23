import React, { useState, useEffect } from 'react';
import moment from 'moment';

import { Link as RouterLink, useParams } from 'react-router-dom';
import * as Yup from 'yup';
import { useFormik, Form, FormikProvider } from 'formik';
import { toast } from 'react-toastify';
// @mui
import { styled } from '@mui/material/styles';
import {
    Link,
    Stack,
    Checkbox,
    TextField,
    IconButton,
    InputAdornment,
    FormControlLabel,
    Snackbar,
    Alert,
    Container,
    Typography,
    Card,
    CardActions,
    CardContent,
    Grid,
    MenuItem,
    Button,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import Page from '../../components/Page';
import Iconify from '../../components/Iconify';
import { getReq, patchReq } from '../../data/ApiReq';
import { getUserRole } from '../../data/userData';

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------



export default function EditNews() {

    const [imgAddress, setImgAddress] = useState(
        'https://www.brightsidedental.co.uk/blog/wp-content/uploads/2020/08/Face-mask-1024x683.jpeg'
    );
    const userRole = getUserRole();
    const { userId } = useParams();
    const initialValues = {
        title: '',
        description: '',
  //      image: '',

    };
    const [viewOnly, setViewOnly] = useState(true);
    const [newsData, setNewsData] = useState(initialValues);


    const NewsSchema = Yup.object().shape({
        title: Yup.string().min(3, 'Please enter a title').required('title is required'),
        description: Yup.string().min(3, 'Please enter a description').required('Description is required'),
   //     image: Yup.mixed('Please add image').required('image is required'),
    });

    const formik = useFormik({
        initialValues: newsData,
        enableReinitialize: true,
        validationSchema: NewsSchema,
        onChange: (e) => {
            console.log(e);
        },
        onSubmit: (values, { resetForm }) => {
            console.log(values);

            updateNews(values, resetForm);
        },
    });

    const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } = formik;


    const { id } = useParams();



    const getNewsData = async () => {
        const response = await getReq({ url: `/news/news/${id}` });

        if (response.data) {
            const { data } = response;
            setNewsData(data);
        }
        // console.log('response--->');
        // console.log(response);


    };

    useEffect(() => {
        getNewsData();
    }, []);

    const updateNews = async (values, resetForm) => {
        const data = values;
        data.id = userId;

        const res = await patchReq({ url: `/news/respond/${id}`, data });

         console.log(res);
        if (!res.error) {
            toast.success(' News Updated ');
            resetForm();
            getNewsData();
            setViewOnly(true);
        } else {
            toast.error(res.message);
        }
    };

    return (
        <Page title="Update News">
            <Container>
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                    <Typography variant="h4" gutterBottom>
                        News Details
                    </Typography>
                    <Button
                        variant="contained"
                        onClick={() => setViewOnly(!viewOnly)}
                        startIcon={<Iconify icon={viewOnly ? 'bx:edit-alt' : 'icons8:cancel'} />}
                        color={viewOnly ? 'primary' : 'warning'}
                    >
                        {viewOnly ? 'Edit' : 'Cancel'}
                    </Button>
                </Stack>

                <div>
                    <FormikProvider value={formik}>
                        <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
                            <Grid container spacing={2} justifyContent="center">
                                {/* Basic Details ⬇️ */}
                                <Grid item xs={12} >
                                    <Card>
                                        <CardContent>
                                            <Stack spacing={3}>


                                                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                                                    <TextField
                                                        InputLabelProps={{ shrink: true }}
                                                        disabled={viewOnly}
                                                        fullWidth
                                                        label="Title"
                                                        {...getFieldProps('title')}
                                                        error={Boolean(touched.title && errors.title)}
                                                        helperText={touched.title && errors.title}
                                                    />

                                                </Stack>
                                                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                                                    <TextField
                                                        InputLabelProps={{ shrink: true }}
                                                        disabled={viewOnly}
                                                        fullWidth
                                                        label="Description"
                                                        {...getFieldProps('description')}
                                                        error={Boolean(touched.description && errors.description)}
                                                        helperText={touched.description && errors.description}
                                                    />
                                                </Stack>

                                            </Stack>
                                        </CardContent>
                                    </Card>
                                </Grid>
                                <Button variant="contained" component="label" onChange={(e) => setImgAddress(e.target.value)} disabled={viewOnly} sx={{ mt: 2 }}>
                                    Upload Image
                                    <input hidden type="file" />
                                </Button>

                               

                                <Grid item xs={12} md={4}>
                                    <LoadingButton fullWidth size="large" type="submit" variant="contained" disabled={viewOnly}>
                                        Update
                                    </LoadingButton>
                                   
                                </Grid>
                               
                            </Grid>
                        </Form>
                    </FormikProvider>
                </div>
            </Container>
        </Page>
    );
}
