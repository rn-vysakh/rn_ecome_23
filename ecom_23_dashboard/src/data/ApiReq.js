import Cookie from 'js-cookie';
import axios from './axios';
import { getUserToken } from './userData';
import ApiUrl from './ApiUrl';

const fileDownload = require('js-file-download');

// for React Query
export const postQuery = async ({ url, data }) => {
  try {
    console.log(data);
    if (!url) return 0;

    const token = getUserToken();
    const config = {
      headers: {
        'x-access-token': token,
      },
    };
    const response = await axios.post(url, data, config).catch((error) => error);

    // console.log(response);

    return response;
  } catch (error) {
    return error;
  }
};

export const getReq = async ({ url }) => {
  try {
    if (!url) return 0;

    const token = getUserToken();
    const config = {
      headers: {
        'x-access-token': token,
      },
    };
    const response = await axios.get(url, config).catch((error) => {
      return {
        data: null,
        error: true,
      };
    });

    // console.log(response);
    if (response.data) {
      return response.data;
    }

    return {
      error: true,
      data: null,
      message: 'Something went wrong',
      statusCode: '500',
    };
  } catch (error) {
    return {
      error: true,
      data: null,
      message: 'Something went wrong',
      statusCode: '500',
    };
  }
};

export const postReq = async ({ url, data }) => {
  try {
    console.log(data);
    if (!url) return 0;

    const token = getUserToken();
    const config = {
      headers: {
        'x-access-token': token,
      },
    };
    const response = await axios.post(url, data, config).catch((error) => {
      return {
        data: null,
        error: true,
      };
    });

    // console.log(response);
    if (response.data) {
      return response.data;
    }

    return {
      error: true,
      data: null,
      message: 'Something went wrong',
      statusCode: '500',
    };
  } catch (error) {
    return {
      error: true,
      data: null,
      message: 'Something went wrong',
      statusCode: '500',
    };
  }
};

export const patchReq = async ({ url, data }) => {
  try {
    console.log(data);
    if (!url) return 0;

    const token = getUserToken();
    const config = {
      headers: {
        'x-access-token': token,
      },
    };
    const response = await axios.patch(url, data, config).catch((error) => {
      return {
        data: null,
        error: true,
      };
    });

    // console.log(response);
    if (response.data) {
      return response.data;
    }

    return {
      error: true,
      data: null,
      message: 'Something went wrong',
      statusCode: '500',
    };
  } catch (error) {
    return {
      error: true,
      data: null,
      message: 'Something went wrong',
      statusCode: '500',
    };
  }
};

export const downloadFile = async ({ url, fileName, onDownload, onDone }) => {
  const token = getToken();

  if (token === null) {
    return {
      auth: false,
      msg: 'No Token Found',
      error: true,
    };
  }

  if (onDownload) {
    onDownload();
  }
  token.responseType = 'blob';
  const response = await axios.get(`${ApiUrl.base_url}/${url}`, token).catch((error) => {
    console.log(error);
    return {
      error: true,
      data: error,
    };
  });

  try {
    if (response) {
      fileDownload(response.data, fileName);
    } else {
      return {
        error: true,
        data: null,
      };
    }
    if (onDone) {
      onDone();
    }
  } catch (error) {
    if (onDone) {
      onDone();
    }
    return {
      error: true,
      data: null,
    };
  }
};

const getToken = () => {
  const token = Cookie.get(ApiUrl.COOKIETOKEN) ? Cookie.get(ApiUrl.COOKIETOKEN) : null;

  const config = {
    headers: { 'x-access-token': token },
  };

  if (token === null) return null;

  return config;
};

export const patchRequest = async ({ data, url }) => {
  const token = getUserToken();
  const config = {
    headers: {
      'x-access-token': token,
    },
  };
  if (token === null) {
    return {
      auth: false,
      msg: 'No Token Found',
      error: true,
    };
  }
  const response = await axios.patch(`${ApiUrl.base_url}/${url}`, data, config).catch((error) => {
    console.log(error);
    return {
      error: true,
      data: error,
    };
  });

  console.log(response, '❌💥❤');
  // return response;
  try {
    if (response.error) {
      return {
        error: true,
        data: response.data,
      };
    }
    if (response) {
      if (response.data && !response.data.error) {
        return {
          error: false,
          data: response.data,
        };
      }
      return {
        error: true,
        data: response.data,
      };
    }
    return {
      error: true,
      data: null,
    };
  } catch (error) {
    return {
      error: true,
      data: null,
    };
  }
};

export const deleteReq = async ({ url }) => {
  const token = getUserToken();
  if (token === null) {
    return {
      auth: false,
      msg: 'No Token Found',
      error: true,
    };
  }
  const response = await axios.delete(`${ApiUrl.base_url}/${url}`, token).catch((error) => {
    console.log(error);
    return {
      error: true,
      data: error,
    };
  });

  try {
    // if (response) {
    //   return {
    //     error: false,
    //     data: response.data,
    //   };
    // }
    if (response) {
      if (response.data.verified && !response.data.error) {
        return {
          auth: true,
          role: response.data.role,
        };
      }
    }
    return {
      error: true,
      data: null,
    };
  } catch (error) {
    return {
      error: true,
      data: null,
    };
  }
  // if (response) {
  //   if (response.data.verified && !response.data.error) {
  //     return {
  //       auth: true,
  //       role: response.data.role,
  //     };
  //   }
  // }
};

export const deleteRequest = async ({ url }) => {
  const token = getUserToken();
  const config = {
    headers: {
      'x-access-token': token,
    },
  };
  if (token === null) {
    return {
      auth: false,
      msg: 'No Token Found',
      error: true,
    };
  }
  const response = await axios.delete(`${ApiUrl.base_url}/${url}`, config).catch((error) => {
    console.log(error);
    return {
      error: true,
      data: error,
    };
  });

  try {
    if (response) {
      return {
        error: false,
        data: response.data,
      };
    }
    return {
      error: true,
      data: null,
    };
  } catch (error) {
    return {
      error: true,
      data: null,
    };
  }
};
