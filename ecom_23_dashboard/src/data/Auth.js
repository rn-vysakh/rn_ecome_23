import Cookies from 'js-cookie';
import axios from './axios';
import { getUserToken, cookieConst } from './userData';

const Signin = async ({ email, password }) => {
  try {
    const data = {
      email,
      password,
    };
    const response = await axios.post('/api/user/signin', data).catch((error) => ({
      status: error.response?.status,
      msg: 'User not found',
      error: true,
    }));
    if (response.data?.statusCode === 200) {
      //   console.log(response.data);

      Cookies.set(cookieConst.token, JSON.stringify(response.data?.data?.accessToken), { expires: 6 });
      Cookies.set(cookieConst.userData, JSON.stringify(response.data?.data), { expires: 6 });
      Cookies.set(cookieConst.userRole, JSON.stringify(response.data?.data?.role), { expires: 6 });
      return {
        auth: true,
        error: false,
        message: response.data?.message,
      };
    }
    return {
      auth: false,
      error: true,
      message: response.data?.message,
    };
  } catch (error) {
    // console.log(error);
    return {
      auth: false,
      error: true,
      message: 'Something went wrong',
    };
  }
};
export default Signin;

export const SignOut = async () => {
  try {
    const token = getUserToken();
    const config = {
      headers: {
        'x-access-token': token,
      },
    };

    const response = await axios.delete('/api/user/signout', config).catch((error) => ({
      status: error.response?.status,
      msg: 'User not found',
      error: true,
    }));

    if (response.data) {
      // console.log(response.data);
      Cookies.remove(cookieConst.token);
      Cookies.remove(cookieConst.userData);
      Cookies.remove(cookieConst.userRole);
      return true;
    }
    return false;
  } catch (error) {
    // console.log(error);
    return false;
  }
};
