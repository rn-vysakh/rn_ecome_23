import API_URL from './ApiUrl';

const axios = require('axios');

const Backend = axios.create({
  baseURL: API_URL.base_url,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, x-access-token',
    'Access-Control-Allow-Credentials': true,
  },
  validateStatus: false,
});

export default Backend;
