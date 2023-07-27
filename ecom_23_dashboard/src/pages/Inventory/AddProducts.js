import { Link as RouterLink, useParams, Navigate } from 'react-router-dom';

import { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import * as React from 'react';
import { CKEditor } from 'ckeditor4-react';
import { useDropzone } from 'react-dropzone';
// @mui
import slugify from 'slugify';
import { styled } from '@mui/material/styles';
import {
  Card,
  Table,
  Stack,
  Avatar,
  Autocomplete,
  Button,
  Checkbox,
  TableRow,
  TableBody,
  TableHead,
  TableCell,
  Container,
  Pagination,
  FormControl,
  Select,
  MenuItem,
  TextField,
  TableContainer,
  TablePagination,
  CardContent,
  Link,
  Grid,
  InputLabel,
  CircularProgress,
} from '@mui/material';
// import { useMutation } from 'react-query';

import Iconify from '../../components/Iconify';
// components
import Page from '../../components/Page';
import Scrollbar from '../../components/Scrollbar';
import { getReq, postReq, patchReq } from '../../data/ApiReq';
import ApiUrl from '../../data/ApiUrl';
import Loading from '../../components/loading';

const fileTypes = ['JPG', 'PNG'];
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const getObjectFromArr = (arr, id) => {
  return arr.find((item) => item._id === id);
};

const BasicProductInfo = ({
  handleBasicDetails,
  autoComHndl,
  editorHandle,
  handleSubmit,
  state,
  catData,
  brandData,
  editorState,
}) => {
  const [touched, setTouched] = useState({
    title: false,
    partNumber: false,
    category: false,
    brand: false,
  });

  // console.log(state.brandId);
  // console.log(state.categoryId);

  return (
    <Stack spacing={4}>
      <TextField
        error={touched.title && !state.title}
        fullWidth
        label="Product Title*"
        InputLabelProps={{
          shrink: true,
        }}
        name="title"
        multiline
        variant="outlined"
        onChange={handleBasicDetails}
        defaultValue={state.title}
        helperText="Title is Mandatory"
        onFocus={() => setTouched({ ...touched, title: true })}
      />
      <Stack direction="row" alignItems="center" spacing={4}>
        <TextField
          label="Part Number*"
          sx={{
            width: { md: 600 },
          }}
          variant="outlined"
          name="partNumber"
          onChange={handleBasicDetails}
          value={state.partNumber}
          InputLabelProps={{
            shrink: true,
          }}
          onFocus={() => setTouched({ ...touched, partNumber: true })}
          error={touched.partNumber && !state.partNumber}
          helperText="Part Number is Mandatory"
        />
        <span>URL : {slugify(state.title?.slice(0, 50) || 'product-no')}...</span>
      </Stack>
      <Stack direction="row" alignItems="center" spacing={4}>
        <TextField
          label="Dimension"
          fullWidth
          variant="outlined"
          name="dimension"
          onChange={handleBasicDetails}
          value={state.dimension}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          label="Weight"
          fullWidth
          variant="outlined"
          name="weight"
          onChange={handleBasicDetails}
          value={state.weight}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </Stack>

      <Stack direction="row" alignItems="center" spacing={4}>
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={catData}
          fullWidth
          renderInput={(params) => (
            <TextField
              {...params}
              label="Categories*"
              onFocus={() => setTouched({ ...touched, category: true })}
              error={touched.category && !state.categoryId}
              helperText="Category is Mandatory"
            />
          )}
          name="category"
          getOptionSelected={(option, value) => option._id === value._id}
          getOptionLabel={(option) => option.categoryName}
          onChange={(event, values) => autoComHndl('categoryId', values?._id)}
          value={getObjectFromArr(catData, state.categoryId)}
        />
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={brandData}
          fullWidth
          renderInput={(params) => (
            <TextField
              {...params}
              label="Brands*"
              onFocus={() => setTouched({ ...touched, brand: true })}
              error={touched.brand && !state.brandId}
              helperText="Brand is Mandatory"
            />
          )}
          getOptionLabel={(option) => option.brandName}
          onChange={(event, values) => autoComHndl('brandId', values?._id)}
          value={getObjectFromArr(brandData, state.brandId)}
        />
      </Stack>

      {/* <TextField
        fullWidth
        label="Product Short Description"
        multiline
        variant="outlined"
        minRows={3}
        onChange={handleBasicDetails}
        name="shortDescription"
      /> */}
      <Typography style={{ color: '#616161' }}>Product Description</Typography>
      <CKEditor
        type="inline"
        initData={editorState.description}
        onChange={(event, editor) => editorHandle(event, event?.editor?.getData(), 'description', 'basicInfo')}
        name="description"
      />
    </Stack>
  );
};

const ProductSpec = ({ handleBasicDetails, editorHandle, editorState }) => (
  <div>
    <Stack spacing={4}>
      <Typography style={{ color: '#616161' }}>Product Specifications</Typography>
      <CKEditor
        type="inline"
        initData={editorState.specifications}
        name="specifications"
        onChange={(event, editor) => editorHandle(event, event?.editor?.getData(), 'specifications', 'techSpec')}
      />
    </Stack>
  </div>
);

const GTIN = ({ handleBasicDetails, state }) => (
  <div>
    <Stack spacing={4}>
      <TextField
        label="UPC"
        name="upc"
        type="number"
        onChange={handleBasicDetails}
        variant="outlined"
        defaultValue={state.upc}
        error={Boolean(state?.upc?.length < 13)}
        helperText={Boolean(state?.upc?.length < 13) && 'Min length is 13'}
      />
      <TextField
        label="EAN"
        name="ean"
        type="number"
        onChange={handleBasicDetails}
        variant="outlined"
        minLength="13"
        defaultValue={state.ean}
        error={Boolean(state?.ean?.length < 13)}
        helperText={Boolean(state?.ean?.length < 13) && 'Min length is 13'}
      />
    </Stack>
  </div>
);

// eslint-disable-next-line arrow-body-style
const imageUpload = async (file) => {
  return new Promise((resolve, reject) => {
    const data = new FormData();
    data.append('image', file);
    data.append('type', 'product');
    postReq({
      url: 'api/image/upload',
      data,
    })
      .then((response) => {
        console.log(response);
        if (!response.error) {
          resolve(response.data);
        } else {
          reject(response.error);
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
};

const ImgUploadSection = ({ handleUpload, imgResArr, removeImg, setImg }) => {
  const [imgLoading, setImgLoading] = useState(false);

  const onDrop = useCallback(async (acceptedFiles) => {
    // Do something with the files
    setImgLoading(true);

    const imgArr = [];
    const imgIdArr = [];

    const imgRes = await imageUpload(acceptedFiles[0]);
    imgArr.push(imgRes);

    handleUpload(imgRes._id);
    setTimeout(() => {
      let tempArr = imgResArr;
      setImg((oldImgs) => [...oldImgs, ...imgArr]);
    }, 1000);
    setImgLoading(false);
  }, []);
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      'image/png': ['.png', '.jpg', '.jpeg', '.webp'],
    },
    maxFiles: 10,
  });

  return (
    // create a div with upload button and image preview
    <>
      <div className="product-img-wrap">
        {imgResArr.map((file, index) => (
          <div key={index} className="img-pre-box">
            <button className="img-closs-btn" onClick={() => removeImg(file._id)}>
              <Iconify icon="gridicons:cross-circle" width={22} height={22} />
            </button>
            <img src={`${ApiUrl.img_url}/products/${file.smUrl}`} alt="img" className="img-prewview" />
          </div>
        ))}
        {imgLoading ? (
          <div className="file-dropzone-wrap">
            <CircularProgress />
          </div>
        ) : (
          <div
            {...getRootProps({ className: 'file-dropzone-wrap img-pre-box' })}
            style={{ padding: '20px', marginTop: '20px', cursor: 'pointer' }}
          >
            <input {...getInputProps()} />
            <p style={{ textAlign: 'center' }}>
              <Iconify icon="bx:bx-image-add" width={50} height={50} /> <br />
              <i style={{ fontSize: '12px', color: '#848282' }}> Click to select images </i>
            </p>
          </div>
        )}
      </div>
    </>
  );
};

const ProductTags = ({ autoComHndl, state, productTags }) => (
  <>
    <Stack spacing={4}>
      <Autocomplete
        multiple
        id="tags-standard"
        options={productTags}
        getOptionLabel={(option) => option?.label}
        renderInput={(params) => (
          <TextField {...params} variant="standard" label="Multiple values" placeholder="Favorites" />
        )}
        onChange={(event, values) => autoComHndl('tags', values)}
        // defaultValue={[productTags[0]]}
      />
    </Stack>
  </>
);

const PriceAndQty = ({ handleBasicDetails, state, autoComHndl, sellerDetails }) => (
  <div>
    <Stack spacing={4}>
      <Typography variant="h6">
        Sold & fulfilled by <span style={{ color: '#3f51b5' }}> Rookie Ninja LLC </span>
      </Typography>

      <Stack direction="row" alignItems="center" spacing={4}>
        <TextField
          label="Price"
          fullWidth
          variant="outlined"
          name="price"
          onChange={handleBasicDetails}
          defaultValue={sellerDetails.price}
        />
        <TextField
          label="Selling Price"
          fullWidth
          variant="outlined"
          name="sellPrice"
          onChange={handleBasicDetails}
          defaultValue={sellerDetails.sellPrice}
          error={Boolean(sellerDetails.sellPrice > sellerDetails.price)}
          helperText={
            Boolean(sellerDetails.sellPrice > sellerDetails.price) &&
            'Selling price is greater than price. please check the pricing'
          }
        />
        <TextField
          label="Quantity"
          fullWidth
          variant="outlined"
          name="qty"
          onChange={handleBasicDetails}
          defaultValue={sellerDetails.qty}
        />
      </Stack>
      <Stack direction="row" alignItems="center" spacing={4}>
        <TextField
          label="Warranty"
          fullWidth
          variant="outlined"
          name="warranty"
          onChange={handleBasicDetails}
          defaultValue={state.warrenty}
        />
        <Autocomplete
          id="combo-box-demo"
          options={['New', 'Used', 'Refurbished']}
          fullWidth
          renderInput={(params) => <TextField {...params} label="Condition" />}
          onChange={(event, values) => autoComHndl('conditions', values)}
          defaultValue={sellerDetails.conditions}
        />
      </Stack>
    </Stack>
  </div>
);

export default function AddProducts() {
  const [value, setValue] = React.useState(0);
  const [basicDetails, setBasicDetails] = React.useState({});
  const [ckEditorText, setCkEditorText] = React.useState({});
  const [sellerDetails, setSellerDetails] = React.useState({});
  const [imgArr, setImgArr] = useState([]);
  const [brandData, setBrand] = useState([]);
  const [catData, setCategory] = useState([]);
  // const [productId, setProductId] = useState('6362184fbb7f8c6f4430e386');
  const [productId, setProductId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [ErrorState, setErrorState] = useState({
    isError: false,
    msg: '',
  });
  const [imgState, setImgState] = useState([]);
  const [type, setType] = useState('new');
  const [productTags, setProductTags] = useState([]);
  const params = useParams();

  const getData = async () => {
    setLoading(true);
    const res = await getReq({ url: 'api/brand' });
    if (!res.error) {
      setBrand(res.data);
    }

    const catRes = await getReq({ url: 'api/category' });
    if (!catRes.error) {
      setCategory(catRes.data);
    }

    const tagRes = await getReq({ url: 'api/tag' });
    if (!tagRes.error) {
      setProductTags(tagRes.data);
    }

    if (params.id) {
      setProductId(params.id);
      const response = await getReq({ url: `api/product/${params.id}` });
      if (!response.error) {
        setBasicDetails({
          ...response.data,
          brandId: response?.data?.brandId?._id,
          categoryId: response?.data?.categoryId?._id,
        });
        setCkEditorText({ description: response?.data?.description, specifications: response?.data?.specifications });
        setSellerDetails(response?.data?.seller[0]);
        setImgState(response?.data?.image);
        console.log(response.data);
      }
    }

    setLoading(false);
  };
  useEffect(() => {
    getData();
    if (params.id) {
      setType('edit');
    }
  }, []);
  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };

  // remove img from array
  const removeImg = async (id) => {
    // api call
    const newImgArr = imgState.filter((item) => item._id !== id);
    setImgState(newImgArr);
    try {
      res = await patchReq({
        url: 'api/product/updateimg',
        data: {
          productId,
          imgId: id,
          type: 'remove',
        },
      });
    } catch (error) {
      return 0;
    }
  };

  const handleImgUpload = async (img) => {
    if (type === 'new') {
      // push img to state array
      let imgArray = imgArr;
      imgArray.push(img);
      setImgArr(imgArray);
    } else {
      try {
        res = await patchReq({
          url: 'api/product/updateimg',
          data: {
            productId,
            imgId: img,
            type: 'add',
          },
        });
      } catch (error) {
        return 0;
      }
    }
  };

  const handleCkEditor = (event, editor, name, section) => {
    console.log('event', event);
    setCkEditorText({ ...ckEditorText, [name]: editor });
  };

  const handleBasicDetails = (e) => {
    if (e.target.name === 'price' || e.target.name === 'sellPrice' || e.target.name === 'qty') {
      setSellerDetails({ ...sellerDetails, [e.target.name]: e.target.value });
      return;
    }
    setBasicDetails({ ...basicDetails, [e.target.name]: e.target.value });
  };

  const handleBasicAutoCom = (name, values) => {
    if (name === 'conditions') {
      setSellerDetails({ ...sellerDetails, conditions: values });
      return;
    }

    setBasicDetails({ ...basicDetails, [name]: values });
  };

  const handleMultiAutoCom = (name, values) => {
    // console.log('values', values);
    // console.log('name', name);
    const arr = [];
    values.forEach((element) => {
      arr.push(element._id);
    });

    setBasicDetails({ ...basicDetails, productTag: arr });
  };

  // const mutation = useMutation((data) => {
  //   postQuery('product', data);
  // });

  const handleSubmit = async () => {
    setLoading(true);
    const data = { ...basicDetails, ...ckEditorText, image: imgArr, seller: [sellerDetails] };
    // console.log('BasickInfo', data);
    // mutation.mutate(data);
    let response;
    if (productId) {
      response = await patchReq({
        url: 'api/product',
        data: { ...data, productId },
      });

      if (!response.error) {
        setValue(value + 1);
        setLoading(false);
      } else {
        setErrorState({ isError: true, msg: response.error });
        setLoading(false);
      }
    } else {
      response = await postReq({
        url: 'api/product',
        data,
      });

      if (!response.error) {
        setProductId(response.data._id);
        setValue(value + 1);
        setLoading(false);
      } else {
        setErrorState({ isError: true, msg: response.message });
        setLoading(false);
      }
    }
  };

  if (loading) {
    return (
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" className="sticky-headers" mb={3}>
          <Typography variant="h4" mt={3} gutterBottom>
            Add Products
          </Typography>
          <Stack gap={2} alignItems="center" justifyContent="space-between">
            <Button
              variant="contained"
              color="primary"
              sx={{ mr: 1 }}
              size="large"
              onClick={handleSubmit}
              disabled={
                !basicDetails.title || !basicDetails.brandId || !basicDetails.categoryId || !basicDetails.partNumber
              }
            >
              Save & Continue
            </Button>
            {!basicDetails.title || !basicDetails.brandId || !basicDetails.categoryId || !basicDetails.partNumber ? (
              <Typography variant="caption" color="error">
                *Please fill all the required fields
              </Typography>
            ) : null}
          </Stack>
        </Stack>
        {loading ? <Loading /> : null}
      </Container>
    );
  }

  if (value === 6) {
    // redirect to list page

    return <Navigate to="/dashboard/inventory/products/" />;
  }
  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" className="sticky-headers" mb={3}>
        <Typography variant="h4" mt={3} gutterBottom>
          Add Products
        </Typography>
        <Stack direction="row" gap={2} alignItems="center" justifyContent="space-between">
          <Button
            variant="contained"
            color="success"
            sx={{ mr: 1 }}
            size="large"
            href={`https://ecom-frontend-flax.vercel.app/products/admin/${params.id}`}
            startIcon={<Iconify icon="ic:outline-remove-red-eye" />}
          >
            Show Online
          </Button>
          <Button
            variant="contained"
            color="primary"
            sx={{ mr: 1 }}
            size="large"
            onClick={handleSubmit}
            disabled={
              !basicDetails.title || !basicDetails.brandId || !basicDetails.categoryId || !basicDetails.partNumber
            }
          >
            Save & Continue
          </Button>
          {!basicDetails.title || !basicDetails.brandId || !basicDetails.categoryId || !basicDetails.partNumber ? (
            <Typography variant="caption" color="error">
              *Please fill all the required fields
            </Typography>
          ) : null}
        </Stack>
      </Stack>

      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleTabChange} aria-label="basic tabs example">
            <Tab label="Basic Product Info" {...a11yProps(0)} />
            <Tab label="Technical Details " {...a11yProps(1)} />
            <Tab label="GTIN" {...a11yProps(2)} />
            <Tab label="Product Images" {...a11yProps(3)} />
            <Tab label="Tags" {...a11yProps(4)} />
            <Tab label="Stock & Price" {...a11yProps(5)} />
            {/* <Tab label="Confirm" {...a11yProps(6)} />vasfhtwert */}
            {/* <Tab label="Keywords & filters" {...a11yProps(3)} /> */}
            {/* <Tab label="Product Datasheet" {...a11yProps(4)} /> */}
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <BasicProductInfo
            handleBasicDetails={handleBasicDetails}
            autoComHndl={handleBasicAutoCom}
            editorHandle={handleCkEditor}
            handleSubmit={handleSubmit}
            state={basicDetails}
            brandData={brandData}
            catData={catData}
            editorState={ckEditorText}
          />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <ProductSpec
            handleBasicDetails={handleBasicDetails}
            editorHandle={handleCkEditor}
            editorState={ckEditorText}
          />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <GTIN handleBasicDetails={handleBasicDetails} state={basicDetails} />
        </TabPanel>

        <TabPanel value={value} index={3}>
          <ImgUploadSection
            handleUpload={handleImgUpload}
            imgResArr={imgState}
            removeImg={removeImg}
            setImg={setImgState}
          />
        </TabPanel>

        <TabPanel value={value} index={4}>
          <ProductTags autoComHndl={handleMultiAutoCom} state={basicDetails} productTags={productTags} />
        </TabPanel>
        <TabPanel value={value} index={5}>
          <PriceAndQty
            handleBasicDetails={handleBasicDetails}
            autoComHndl={handleBasicAutoCom}
            sellerDetails={sellerDetails}
            state={basicDetails}
          />
        </TabPanel>
        {/* <TabPanel value={value} index={6}>
          <h1>Confirm</h1>
        </TabPanel> */}
      </Box>
    </Container>
  );
}