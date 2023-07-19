import React, { useRef, useState,useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { toast } from 'react-toastify';
// @mui
import { useReactToPrint } from 'react-to-print';
import { styled } from '@mui/material/styles';
import {
    Link,
    Stack,
    TextField,
    Container,
    Typography,
    Card,
    CardContent,
    Grid,
    Button,
    Box,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import Page from '../../components/Page';
import { getReq } from '../../data/ApiReq';
import { getUserData } from '../../data/userData';



export default function Payroll() {

    const [imgAddress, setImgAddress] = useState(
        'https://nanopixelmea.com/images/logo.svg'
    );

    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,

    });




    const [salaryDetails, setSalaryDetails] = useState({});

    const getData = async () => {
        const userData = await getUserData()

        console.log(userData._id);
        console.log(userData.firstName);
        const res = await getReq({ url: `/user/getsingleuser?id=${userData._id}` });
        
   
        if (!res.error) {
            setSalaryDetails(res.data);
      
        }
        console.log(res);
    };

    useEffect(() => {
        getData();
    }, []);





    const ids = ['1']
    return (

        <Page title="Payroll">
            <Container>
                <componentToPrint ref={componentRef} >
                    <Grid container spacing={0} alignItems="center" justifyContent="center">
                        <Grid item xs={12} md={10}>
                            <Card>
                                <CardContent>
                                    <div>

                                        <div  >
                                            <Stack spacing={3}>
                                                <Stack spacing={2}>
                                                    <div
                                                        className="img-logo"
                                                        style={{
                                                            backgroundImage: `url(${imgAddress})`,
                                                        }}
                                                    />
                                                </Stack>
                                                <Typography variant="h5" gutterBottom textAlign={'center'} >
                                                    Rookie Ninja Salary  Details
                                                </Typography>
                                                <Stack >
                                                    <Typography gutterBottom >
                                                        Employee No  : {salaryDetails.EIdNo}<br />
                                                        Employee Name  : {salaryDetails.firstName} {salaryDetails.lastName}<br />
                                                        Designation : {salaryDetails.designation}
                                                    </Typography>
                                                </Stack>
                                                <Grid container spacing={1} textAlign={"center"} >
                                                    <Grid item xs={2}>
                                                        <Card sx={{ maxWidth: 180 }}>
                                                            <CardContent>
                                                                <Typography gutterBottom  component="div">
                                                                    HRA
                                                                </Typography>
                                                                <br/>
                                                                Amount : {salaryDetails.hra}
                                                            </CardContent>
                                                        </Card>
                                                    </Grid>
                                                    <Grid item xs={2}>
                                                        <Card sx={{ maxWidth: 180 }}>
                                                            <CardContent>
                                                                <Typography gutterBottom  component="div">
                                                                    Telephone Allowance.
                                                                </Typography>
                                                                Amount : {salaryDetails.tellA}
                                                            </CardContent>
                                                        </Card>
                                                    </Grid>
                                                    <Grid item xs={2}>
                                                        <Card sx={{ maxWidth: 180 }}>
                                                            <CardContent>
                                                                <Typography gutterBottom  component="div">
                                                                    Travel Allowance.
                                                                </Typography>
                                                                Amount : {salaryDetails.travA}
                                                            </CardContent>
                                                        </Card>
                                                    </Grid>
                                                    <Grid item xs={2} >
                                                        <Card sx={{ maxWidth: 180 }} >
                                                            <CardContent>
                                                                <Typography gutterBottom  component="div">
                                                                    Transportation Allowance.
                                                                </Typography>
                                                                Amount : {salaryDetails.transportA}
                                                            </CardContent>
                                                        </Card>
                                                    </Grid>
                                                    <Grid item xs={2}>
                                                        <Card sx={{ maxWidth: 180 }}>
                                                            <CardContent>
                                                                <Typography gutterBottom  component="div">
                                                                    Other Allowance.
                                                                </Typography>
                                                                Amount : {salaryDetails.otherA}
                                                            </CardContent>
                                                        </Card>
                                                    </Grid>
                                                    <Grid item xs={2} >
                                                        <Card sx={{ maxWidth: 180 }} >
                                                            <CardContent>
                                                                <Typography gutterBottom  component="div">
                                                                    Gross Allowance.
                                                                </Typography>
                                                                Amount : {salaryDetails.gross}
                                                            </CardContent>
                                                        </Card>
                                                    </Grid>
                                                   
                                                </Grid>
                                                <Stack >
                                                    <Typography variant="h5" gutterBottom >
                                                        Deductions
                                                    </Typography>
                                                    1 . Leave - 100 <br />
                                                    2 . Advance - 1000
                                                </Stack>
                                                <Stack >
                                                    <Typography variant="h5" gutterBottom >
                                                        NET Salary
                                                    </Typography>
                                                    {salaryDetails.hra+salaryDetails.tellA+salaryDetails.travA+salaryDetails.transportA+salaryDetails.otherA+salaryDetails.gross}
                                                </Stack>
                                            </Stack>
                                        </div>

                                    </div>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </componentToPrint>
            </Container>
            <div >
                <Box
                    mr={15}
                    mt={3}
                    display="flex"
                    justifyContent="flex-end"
                    alignItems="flex-end"

                >
                    <Button size="large" type="button" onClick={handlePrint} variant="contained">Print </Button>
                </Box>
            </div>
        </Page>
    )
}


