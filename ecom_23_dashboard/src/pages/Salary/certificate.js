import React, { useRef, useState, useEffect } from 'react';
import { Link as RouterLink, useParams } from 'react-router-dom';
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



export default function Certificate() {



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



    const [imgAddress, setImgAddress] = useState(
        'https://nanopixelmea.com/images/logo.svg'
    );

    return (

        <Page title="Salary certificate">
            <Container>

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
                                                Salary Certificate
                                            </Typography>
                                            <Stack >
                                                <Typography gutterBottom >
                                                    13th August 2022
                                                </Typography>
                                            </Stack>


                                            <Stack>
                                                <Typography variant="h4" gutterBottom textAlign={'center'} >
                                                    To Whom It May Concern
                                                </Typography>
                                            </Stack>

                                            <Stack >
                                                <Typography gutterBottom >
                                                    This is to certify that   of Mr.{salaryDetails.firstName}  { salaryDetails.lastName} nationality, holding passport number { salaryDetails.passportNo} is working with us since { salaryDetails.dateofjoining} as { salaryDetails.designation} and drawing a monthly salary of AED { salaryDetails.basic} inclusive of all allowances.
                                                </Typography>
                                            </Stack>
  {/* {gender === "male" ? "mr": mrs} */}
                                            <Stack >
                                                <Typography gutterBottom >
                                                    We confirm that his monthly salary is currently transferred to his bank account number { salaryDetails.bankAccNo } held with { salaryDetails . bankName}.                                             </Typography>
                                            </Stack>


                                            <Stack >
                                                <Typography gutterBottom >
                                                    This letter is issued upon the employee's request and does not constitute any financial guarantee or obligation on our part.                                             </Typography>
                                            </Stack>

                                            <Stack >
                                                <Typography gutterBottom >
                                                    Yours faithfully,
                                                </Typography>
                                            </Stack>

                                            <Stack >
                                                <Typography gutterBottom >
                                                    Meghna Prakash <br />
                                                    Human Resource
                                                </Typography>

                                            </Stack>

                                        </Stack>


                                    </div>

                                </div>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>

            </Container>

        </Page>
    )
}


