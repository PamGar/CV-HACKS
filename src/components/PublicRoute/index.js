import { Outlet, Navigate } from 'react-router-dom';

const PublicRoute = ({ isAuth, role }) => {
  return isAuth ? (
    <Navigate to={role == 5 || role == 4 ? '/my-resume-list' : 'resumes'} />
  ) : (
    <Outlet />
  );
};

export default PublicRoute;
