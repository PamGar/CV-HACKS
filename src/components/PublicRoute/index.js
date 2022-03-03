import { Outlet, Navigate } from 'react-router-dom';

const PublicRoute = ({ isAuth }) => {
  return isAuth ? <Navigate to='/dashboard' /> : <Outlet />;
};

export default PublicRoute;
