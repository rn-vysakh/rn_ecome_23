import Cookies from 'js-cookie';

export const cookieConst = {
  userData: 'sdvbsdh69ib43b4vivj',
  token: 'dvjisvbnijgieu43aqcc',
  userRole: 'fvjnfjpozcwqk3434',
};

export const getUserData = () => {
  const userData = Cookies.get(cookieConst.userData) ? JSON.parse(Cookies.get(cookieConst.userData)) : false;
  return userData;
};
export const getUserToken = () => {
  const token = Cookies.get(cookieConst.token) ? JSON.parse(Cookies.get(cookieConst.token)) : false;
  return token;
};
export const getUserRole = () => {
  const role = Cookies.get(cookieConst.userRole) ? JSON.parse(Cookies.get(cookieConst.userRole)) : false;
  return role;
};
