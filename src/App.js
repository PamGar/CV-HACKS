import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import PublicRoute from './components/PublicRoute';
import { GlobalStyles } from './styles/GlobalStyles';
import Login from './pages/Login';
import CV_preview from './pages/cv_preview';
import AdminDashboard from './pages/AdminDashboard';
import RegisterCompany from './pages/RegisterCompany';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import VacancyList from './pages/VacancyList';
import AppbarLayout from './layouts/AppbarLayout';
import Profile from './pages/Profile';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState({
    isAuth: !!localStorage.getItem('authToken'),
    role: localStorage.getItem('role') || 0,
  });
  return (
    <Router>
      <ToastContainer
        position='top-right'
        autoClose={3000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <GlobalStyles />
      <Routes>
        <Route
          element={
            <PublicRoute
              isAuth={isAuthenticated.isAuth}
              role={isAuthenticated.role}
            />
          }
        >
          <Route path='/' element={<h1>landing</h1>} />
          <Route
            path='/login'
            element={<Login setIsAuthenticated={setIsAuthenticated} />}
          />
          <Route path='/login/company' element={<Login company />} />
        </Route>
        <Route element={<PrivateRoute isAuth={isAuthenticated.isAuth} />}>
          <Route element={<AppbarLayout role={isAuthenticated.role} />}>
            {(isAuthenticated.role == 5 || isAuthenticated.role == 4) && (
              <Route path='/resume' element={<CV_preview />} />
            )}
            {isAuthenticated.role == 2 && (
              <Route path='/resumes' element={<AdminDashboard />} />
            )}
            {isAuthenticated.role == 2 && (
              <Route path='/register-company' element={<RegisterCompany />} />
            )}
            {isAuthenticated.role == 2 && (
              <Route path='/job-offers' element={<VacancyList />} />
            )}
            <Route path='/profile' element={<Profile />}>
              <Route path='settings' element={<p>configuracion generales</p>} />
              <Route index element={<p>pagina de configuracion</p>} />
            </Route>
            <Route path='*' element={<h1>not found</h1>} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
