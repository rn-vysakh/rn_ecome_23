import React, { useState,useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { toast } from 'react-toastify';
// @mui
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
    Button
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import Page from '../../components/Page';
import { postReq } from '../../data/ApiReq';


export default function ReimburseCost() {
    
  
    const initialState = {
        amount: "",
        reason: "",
        invoice: "",
    }
    const [state, setState] = useState(initialState)



    const handleChange = (e) => {

        setState({
            ...state,
            [e.target.name]: e.target.value
        })
        console.log(state)

    }
    const submitCost = async () => {
        const data = {
            amount: state.amount,
            reason: state.reason,
            invoice: state.invoice
        }
        const res = await postReq({ url: '/salary/reimburse', data });
        if (!res.error) {
            toast.success(' Cost Submited ');
            setState(initialState);
        } else {
            toast.error(res.message);
        }
    }

    const fileUpload = async e => {


        console.log(e.target.files[0])
        const file = e.target.files[0];
        const data = new FormData();
        data.append("file", file);
        data.append("type", "totalLeaves");

        const response = await postReq({
            url: "file/upload",
            data
        });
        console.log("file response", response);
        // if check
        if(!response.error){
            setState({
                ...state,
                document: response.data._id
            })
            toast.success(' Document Submited ');
           
        } else {
            toast.error(response.message);
        }
        

    };


    return (
        <Page title="Add New Cost Reimburse">
            <Container>
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                    <Typography variant="h4" gutterBottom>
                        Cost Reimburse
                    </Typography>
                </Stack>
                <Grid container spacing={0} alignItems="center" justifyContent="center">
                    <Grid item xs={12} md={7}>
                        <Card>
                            <CardContent>
                                <div>

                                    <div  >
                                        <Stack spacing={3}>
                                            <Typography variant="h5" gutterBottom>
                                                Basic Details
                                            </Typography>
                                            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>

                                                <Stack spacing={2} style={{ width: '100%' }}>
                                                    <TextField
                                                        fullWidth
                                                        label="Amount"
                                                        name="amount"
                                                        onChange={handleChange}
                                                        type="number"
                                                    />

                                                    <TextField
                                                        fullWidth
                                                        label="Reason"
                                                        name="reason"
                                                        onChange={handleChange}
                                                    />

                                                </Stack>

                                            </Stack>


                                            <Button variant="contained" component="label">
                                                Invoice
                                                <input hidden type="file" onChange={fileUpload} />
                                            </Button>


                                            <LoadingButton fullWidth size="large" type="button" onClick={submitCost} variant="contained">
                                                Upload
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
    )
}


