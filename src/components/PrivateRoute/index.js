import { Outlet, Navigate } from 'react-router-dom';

const PrivateRoute = ({ isAuth }) => {
  return isAuth ? <Outlet /> : <Navigate to='/' />;
};

export const PrivateRouteAdmin = ({ role }) => {
  return +role === 2 ? <Outlet /> : <Navigate to='/' />;
};

export const PrivateRouteCompany = ({ role }) => {
  return +role === 3 ? <Outlet /> : <Navigate to='/' />;
};

export const PrivateRoutePadawan = ({ role }) => {
  return +role === 4 ? <Outlet /> : <Navigate to='/' />;
};

export const PrivateRouteExternal = ({ role }) => {
  return +role === 5 ? <Outlet /> : <Navigate to='/' />;
};

export default PrivateRoute;
