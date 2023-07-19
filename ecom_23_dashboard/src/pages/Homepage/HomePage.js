import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { toast } from 'react-toastify';
import { Link as RouterLink } from 'react-router-dom';

import {
  Card,
  Table,
  Stack,
  Avatar,
  Button,
  Checkbox,
  TableRow,
  TableBody,
  TableHead,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination,
  CardContent,
  Link,
  Grid,
  ImageList,
  TextField,
} from '@mui/material';
import { Icon } from '@iconify/react';
import Scrollbar from '../../components/Scrollbar';
import { getReq, patchReq } from '../../data/ApiReq';
import ApiUrl from '../../data/ApiUrl';
import noImg from '../../assets/no-img.jpg';
import Iconify from '../../components/Iconify';

function HomePage() {
  const [productData, setProduct] = useState([]);
  const [showResults, setShowResults] = useState(false)

  const getData = async () => {
    const res = await getReq({ url: '/inventory/api/home/home' });
    if (!res.error) {
      setProduct(res.data);
      console.log(res.data);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  console.log(productData)
  return (
    <div>
        <div style={{ paddingTop: '30px' }}>
      <Stack direction="column">
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Typography variant="h4" mt={3} gutterBottom>
          Homepage Section
        </Typography>

        <Button
          color="success"
          variant="contained"
          component={RouterLink}
          to="/dashboard/homepage/addhomepage"
          startIcon={<Iconify icon="eva:plus-fill" />}
        >
          Add Homepage
        </Button>
      </Stack>
        <Stack sx={{ marginTop: '20px' }} direction="row">
         
            <Card sx={{ minWidth: 500, marginTop: 3 }}>
              <CardContent>
              
                  <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                        {/* <Stack spacing={2}>
                          <div
                            className="img-upload-pre"
                            style={{
                              backgroundImage: `url(${imgAddress})`,
                            }}
                          />

                          <input
                            type="file"
                            className="custom-file-input"
                            onChange={(e) => setImgAddress(e.target.value)}
                          />
                        </Stack> */}
                        
                          <Stack spacing={2} style={{ width: '100%' }}>
                            {productData.map(( item, key ) => (
                          <div style={{marginBottom: "30px", display: "flex" , flexDirection: "column"}} key={key}>

                              <div style={{ marginTop: '10px', fontSize: "35px", fontWeight: "800" }} >
                                {item.title}
                              </div>
                            <div style={{ marginTop: '10px',fontSize: "20px", fontWeight: "600" }} >Type : {item.type}</div>

                              <div>
                              {item.products.map((item1, key1) => (
                                <div style={{marginBottom: "20px", marginTop: '10px', display: "flex", alignItems: "center", flexDirection: "row"}} key={key1}>
                                  <div style={{width: "50%"}}>
                                  {item1.title}
                                  </div>
                                  <div>
                                  {item1?.image[0]?.smUrl ? (
                          <img
                            height={200}
                            src={`${ApiUrl.img_url}/products/${item1?.image[0]?.smUrl}`}
                            alt="product"
                            className="product-list-img"
                          />
                      ) : (
                        <ImageList src={noImg} alt="no image" height="50px" />
                      )}
                                  </div>

                                  {/* <div style={{marginLeft: "30px"}} >
                                  { showResults ? <Button
                                    color="error"
                                    variant="contained"
                                    component={RouterLink}
                                    to="/dashboard/homepage/addhomepage"
                                    startIcon={<Iconify icon="material-symbols:close" />}
                                  >Remove</Button> : null }                                 
                                  </div> */}

                                </div>
                              ))}
                              </div>
                              <div>
                              <Stack direction="row" sx={{width: "40%"}}>
                  <Button
                        variant="contained"
                        component={RouterLink}
                        to={`single/${item._id}`}
                        // onClick={() => setShowResults(true)}
                        startIcon={<Iconify icon="carbon:edit" />}
                        color="warning"
                      >
                        Edit
                      </Button>

                      {/* {showResults ?
                      <Button sx={{marginLeft: "20px"}}
                      variant="contained"
                      component={RouterLink}
                      // to={`/dashboard/homepage/productedit`}
                      // onClick={() => setShowResults(true)}
                      startIcon={<Iconify icon="material-symbols:add" />}
                      color="success"
                    >
                      Add
                    </Button> 
                      : null } */}
                   
                    {/* <Button className=" brand-buttons" variant="contained" color="error" >
                      Delete
                    </Button>
                    <Button className=" brand-buttons" variant="contained" color="warning" component={RouterLink} to={
                      `/dashboard/homepage/productedit`
                    } >
                      Edit
                    </Button> */}
                </Stack>
                              </div>
                          </div>
                          ))}
                          </Stack>

                        
                      </Stack>
                {/* <Stack>
                  <Box textAlign="center">
                   
                    <Button className=" brand-buttons" variant="contained" color="error" >
                      Delete
                    </Button>
                    <Button className=" brand-buttons" variant="contained" color="warning" >
                      Edit
                    </Button>
                  </Box>
                </Stack> */}
              </CardContent>
            </Card>
        
        </Stack>
      </Stack>
    </div>
    </div>
  )
}

export default HomePage