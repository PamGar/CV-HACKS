import { Outlet, Navigate } from 'react-router-dom';

const PrivateRoute = ({ isAuth }) => {
  return isAuth ? <Outlet /> : <Navigate to='/' />;
};

export default PrivateRoute;
