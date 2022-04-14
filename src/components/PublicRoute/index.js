import { Outlet, Navigate } from 'react-router-dom';

const PublicRoute = ({ isAuth, role }) => {
  return isAuth ? (
    <Navigate to={role == 5 || role == 4 ? '/resume' : 'resumes'} />
  ) : (
    <Outlet />
  );
};

export default PublicRoute;
