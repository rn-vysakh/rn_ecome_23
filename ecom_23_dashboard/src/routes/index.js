import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from '../layouts/dashboard';
import LogoOnlyLayout from '../layouts/LogoOnlyLayout';
import Routes from './routes';
//
import { getUserToken } from '../data/userData';
import Login from '../pages/Login';
import NotFound from '../pages/Page404';
import Register from '../pages/Register';

// ----------------------------------------------------------------------

export default function Router() {
  const routes = Routes();
  // console.log('routes-->', routes);
  const token = getUserToken();
  return useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: routes,
    },
    {
      path: '/',
      element: <LogoOnlyLayout />,
      children: [
        { path: '/', element: <Navigate to="/dashboard/app" /> },
        { path: 'login', element: token ? <Navigate to="/dashboard/app" /> : <Login /> },
        { path: 'register', element: <Register /> },
        { path: '404', element: <NotFound /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    { path: '*', element: <Navigate to="/404" replace /> },
  ]);
}
