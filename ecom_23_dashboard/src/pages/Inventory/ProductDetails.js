import { Link as RouterLink, useParams } from 'react-router-dom';
import { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import * as React from 'react';
import { CKEditor } from 'ckeditor4-react';
import { useDropzone } from 'react-dropzone';
import UserImg from '../../assets/images/kodak.jpg';
import { getUserData } from '../../data/userData';
import CloseIcon from '@mui/icons-material/Close';
import Modal from '@mui/material/Modal';

// @mui
import slugify from 'slugify';
import { styled } from '@mui/material/styles';
import {
  Card,
  CardMedia,
  Table,
  Stack,
  Avatar,
  Autocomplete,
  Button,
  CardHeader,
  IconButton,
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
import { getReq, postReq, patchReq, deleteReq } from '../../data/ApiReq';
import ApiUrl from '../../data/ApiUrl';
import productTags from '../../data/productTags';

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

const BasicProductInfo = ({
  handleBasicDetails,
  autoComHndl,
  editorHandle,
  handleSubmit,
  state,
  catData,
  brandData,
  editorState,
  sellerDetails,
}) => {
  const [touched, setTouched] = useState({
    title: false,
    partNumber: false,
    category: false,
    brand: false,
  });
  return (
    <Stack spacing={4}>
      <TextField
        fullWidth
        label="Product Title*"
        shrink
        name="title"
        multiline
        variant="outlined"
        onChange={handleBasicDetails}
        InputLabelProps={{ shrink: true }}
        defaultValue={state.title}
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
          InputLabelProps={{ shrink: true }}
          defaultValue={state.partNumber}
          shrink
          onFocus={() => setTouched({ ...touched, partNumber: true })}
        />
        <span>URL : {slugify(state.title?.slice(0, 50) || 'product-no')}...</span>
      </Stack>
      <Stack direction="row" alignItems="center" spacing={4}>
        <TextField
          label="Dimension"
          fullWidth
          variant="outlined"
          name="dimension"
          InputLabelProps={{ shrink: true }}
          onChange={handleBasicDetails}
          value={state.dimension}
        />
        <TextField
          label="Weight"
          fullWidth
          variant="outlined"
          name="weight"
          InputLabelProps={{ shrink: true }}
          onChange={handleBasicDetails}
          value={state.weight}
        />
      </Stack>

      <Stack direction="row" alignItems="center" spacing={4}>
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={catData}
          fullWidth
          renderInput={(params) => (
            <TextField {...params} label="Categories*" onFocus={() => setTouched({ ...touched, category: true })} />
          )}
          name="category"
          getOptionSelected={(option, value) => option._id === value._id}
          getOptionLabel={(option) => option.categoryName}
          onChange={(event, values) => autoComHndl('categoryId', values?._id)}
          defaultValue={catData[0]}
        />

        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={brandData}
          fullWidth
          renderInput={(params) => (
            <TextField {...params} label="Brands *" onFocus={() => setTouched({ ...touched, brand: true })} />
          )}
          name="brands"
          getOptionSelected={(option, value) => option._id === value._id}
          getOptionLabel={(option) => option.brandName}
          onChange={(event, values) => autoComHndl('brandId', values?._id)}
          defaultValue={brandData[2]}
        />
      </Stack>

      <CKEditor
        type="inline"
        initData={state.description}
        onChange={(event, editor) => editorHandle(event, event?.editor?.getData(), 'description', 'basicInfo')}
        name="description"
      />
    </Stack>
  );
};

const ProductSpec = ({ handleBasicDetails, editorHandle, editorState, state }) => (
  <div>
    <Stack spacing={4}>
      <CKEditor
        type="inline"
        initData={state.specifications}
        name="specifications"
        onChange={(event, editor) => editorHandle(event, event?.editor?.getData(), 'specifications', 'techSpec')}
      />
    </Stack>
  </div>
);

const GTIN = ({ handleBasicDetails, state }) => (
  <div>
    <Stack spacing={4}>
      <TextField label="UPC" name="upc" onChange={handleBasicDetails} variant="outlined" value={state.upc} />
      <TextField label="EAN" name="ean" onChange={handleBasicDetails} variant="outlined" value={state.ean} />
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
      url: 'inventory/api/image/upload',
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

const ImgUploadSection = ({ handleUpload }) => {
  const [imgState, setImgState] = useState([]);
  const [loading, setLoading] = useState(false);
  const [imgFiles, setImgFiles] = useState([]);
  const [imgIds, setImgIds] = useState([]);

  const onDrop = useCallback(async (acceptedFiles) => {
    // Do something with the files
    // console.log(acceptedFiles);
    setImgFiles(acceptedFiles);
    setLoading(true);

    const imgArr = [];
    const imgIdArr = [];

    acceptedFiles.forEach(async (file) => {
      const imgRes = await imageUpload(file);

      imgArr.push(imgRes);
      imgIdArr.push(imgRes._id);
    });
    setImgState(imgArr);
    handleUpload(imgIdArr);
    setImgIds(imgIdArr);
  }, []);
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      'image/png': ['.png', '.jpg', '.jpeg'],
    },
    maxFiles: 5,
  });
  let ImgPreview;

  return (
    // create a div with upload button and image preview
    <>
      <div {...getRootProps({ className: 'file-dropzone-wrap' })}>
        <input {...getInputProps()} />
        <p style={{ textAlign: 'center' }}>
          Drag 'n' drop image here, or click to select images <br />
          <i style={{ fontSize: '12px', color: '#848282' }}>
            {' '}
            * Upto 5 Images and Only .png, .jpg and .jpeg image will be accepted{' '}
          </i>
        </p>
      </div>
      {loading && imgIds.length === 0 ? (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
          <CircularProgress />
        </div>
      ) : (
        ''
      )}

      <Stack direction={'row'} alignItems="center" gap={4} justifyContent="center" margin={2}>
        {imgState.map((file) => (
          <>
            <img src={`${ApiUrl.img_url}/products/${file.smUrl}`} alt="img" className="img-prewview-upload" />
          </>
        ))}
      </Stack>

      {/* <Stack direction={'row'} alignItems="center" gap={4} justifyContent="center" margin={10}>
        {imgFiles.map((file) => (
          <>
            <img src={URL.createObjectURL(file)} alt="img" className="img-prewview-upload" />
          </>
        ))}
      </Stack> */}
      <Stack direction={'row'} alignItems="center" gap={4} justifyContent="center">
        <Card sx={{ maxWidth: 345 }}>
          <CardHeader action={<CloseIcon />} />
          <CardMedia component="img" height="320" src={UserImg} alt={'product image'} />
        </Card>
        <Card sx={{ maxWidth: 345 }}>
          <CardHeader action={<CloseIcon />} />
          <CardMedia component="img" height="320" src={UserImg} alt={'product image'} />
        </Card>
        <Card sx={{ maxWidth: 345 }}>
          <CardHeader action={<CloseIcon />} />
          <CardMedia component="img" height="320" src={UserImg} alt={'product image'} />
        </Card>
        <Card sx={{ maxWidth: 345 }}>
          <CardHeader action={<CloseIcon />} />
          <CardMedia component="img" height="320" src={UserImg} alt={'product image'} />
        </Card>
      </Stack>
    </>
  );
};

const ProductTags = ({ autoComHndl }) => (
  <>
    <Stack spacing={4}>
      <Autocomplete
        multiple
        id="tags-standard"
        options={productTags}
        getOptionLabel={(option) => option.label}
        renderInput={(params) => (
          <TextField {...params} variant="standard" label="Multiple values" placeholder="Favorites" />
        )}
        onChange={(event, values) => autoComHndl('tags', values)}
      />
    </Stack>
  </>
);

const PriceAndQty = ({ handleBasicDetails, state, sellerDetails, autoComHndl }) => (
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
          value={sellerDetails?.price}
        />
        <TextField
          label="Selling Price"
          fullWidth
          variant="outlined"
          name="sellPrice"
          onChange={handleBasicDetails}
          value={sellerDetails?.sellPrice}
        />
        <TextField
          label="Quantity"
          fullWidth
          variant="outlined"
          name="qty"
          onChange={handleBasicDetails}
          value={sellerDetails?.qty}
        />
      </Stack>
      <Stack direction="row" alignItems="center" spacing={4}>
        <TextField
          label="Warrenty"
          fullWidth
          variant="outlined"
          name="warrenty"
          onChange={handleBasicDetails}
          defaultValue={state?.warrenty}
        />
        <Autocomplete
          id="combo-box-demo"
          options={['New', 'Used', 'Refurbished']}
          fullWidth
          renderInput={(params) => <TextField {...params} label="Condition" />}
          onChange={(event, values) => autoComHndl('conditions', values)}
          defaultValue={sellerDetails?.conditions}
        />
      </Stack>
    </Stack>
  </div>
);

export default function AddProducts() {
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const userData = getUserData();
  // console.log('==========================================>', userData);
  const params = useParams();
  const initialState = {
    name: '',
    categoryId: [],
    categoryName: '',
    brandId: '',
    brandName: '',
    shortPoints: [],
    shortFeaturePoint: '',
    description: '',
    specifications: [],
    qty: 10,
    image: [],
    imageUrl: [],
    file: [],
    fileUrl: [],
    keywords: [],
    filters: [],
    filters2: {},
    keywordText: '',
    seoDesc: '',
    specDesc: '',
    order: 0,
    type: 'new',
  };
  const initialResult = {
    error: false,
    message: '',
    alert: false,
    loading: false,
    imgStatus: params.id ? 'uploaded' : 'notSelected',
    fileStatus: params.id ? 'uploaded' : 'notSelected',
    dataFetched: false,
    redirect: false,
  };

  const [value, setValue] = React.useState(0);
  const [basicDetails, setBasicDetails] = React.useState({});
  const [ckEditorText, setCkEditorText] = React.useState({});
  const [sellerDetails, setSellerDetails] = React.useState({});
  const [imgArr, setImgArr] = useState([]);

  const [brandData, setBrand] = useState([]);
  const [catData, setCategory] = useState([]);
  // const [productId, setProductId] = useState('6362184fbb7f8c6f4430e386');
  const [productId, setProductId] = useState(null);
  const [productData, setProduct] = useState([]);
  const [state, setState] = useState([initialState]);
  const [apiResult, setApiResult] = useState(initialResult);
  const [sellerData, setSeller] = useState([]);

  const handleChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const getData = async () => {
    const res = await getReq({ url: 'inventory/api/brand' });
    if (!res.error) {
      setBrand(res.data);
      console.log('brand====================>', res.data);
    }

    const catRes = await getReq({ url: 'inventory/api/category' });
    if (!catRes.error) {
      setCategory(catRes.data);
      console.log('category=================================>', catRes.data);
    }

    // if (params.id) {
    const response = await getReq({ url: `api/product/${params.id}` });
    if (!response.error) {
      setBasicDetails(response.data);
      // console.log(response.data);
    }
    // }

    const sellerObj = response?.data?.seller.find((o) => o.sellerId === userData._id);
    if (!response.error) {
      setSellerDetails(sellerObj);
      // console.log(sellerObj);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  const handleTabChange = (event, newValue) => {
    setValue(newValue);
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
    console.log('values', values);
    console.log('name', name);
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
    const data = { ...basicDetails, ...ckEditorText, image: imgArr, seller: [sellerDetails] };

    delete data.categoryId;
    delete data.brandId;
    delete data.filters;
    delete data.seller;
    // console.log('BasickInfo', data);
    // mutation.mutate(data);
    let response;
    const productId = params.id;
    response = await patchReq({
      url: 'inventory/api/product',
      data: { ...{ productId }, ...data },
    });

    // }

    console.log(response);
  };

  const deleteSubmit = async () => {
    const data = { ...basicDetails, ...ckEditorText, image: imgArr, seller: [sellerDetails] };

    delete data.categoryId;
    delete data.brandId;
    delete data.filters;
    delete data.seller;

    let response;
    const productId = params.id;
    response = await deleteReq({
      url: 'inventory/api/product',
      data: { ...{ productId } },
    });

    // }

    console.log(response);
  };

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" className="sticky-headers" mb={3}>
        <Typography variant="h4" mt={3} gutterBottom>
          Product Details
        </Typography>
        <Stack gap={2} alignItems="center">
          <Button variant="contained" color="warning" sx={{ mr: 1 }} size="large" onClick={handleSubmit}>
            Update
          </Button>
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
            state={basicDetails}
          />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <GTIN handleBasicDetails={handleBasicDetails} state={basicDetails} />
        </TabPanel>

        <TabPanel value={value} index={3}>
          <ImgUploadSection handleUpload={setImgArr} />
        </TabPanel>

        <TabPanel value={value} index={4}>
          <ProductTags autoComHndl={handleMultiAutoCom} />
        </TabPanel>
        <TabPanel value={value} index={5}>
          <PriceAndQty
            handleBasicDetails={handleBasicDetails}
            state={basicDetails}
            sellerDetails={sellerDetails}
            autoComHndl={handleBasicAutoCom}
          />
        </TabPanel>
        {/* <TabPanel value={value} index={6}>
          <h1>Confirm</h1>
        </TabPanel> */}
      </Box>
      {/* <Stack alignItems="center">
        <Button variant="contained" color="error" sx={{ mr: 1 }} size="large" onClick={handleSubmit}>
          Delete
        </Button>
      </Stack> */}
      <Stack alignItems="center">
        <Button variant="contained" color="error" sx={{ mr: 1 }} size="large" onClick={handleOpen}>
          Delete
        </Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Are you sure you want to delete?
            </Typography>
            <br />
            <Button variant="contained" color="error" sx={{ ml: 6 }} size="large" onClick={deleteSubmit}>
              Delete
            </Button>
            <Button variant="contained" color="warning" sx={{ ml: 4 }} size="large">
              Cancel
            </Button>
          </Box>
        </Modal>
      </Stack>
    </Container>
  );
}
