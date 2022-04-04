import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import PublicRoute from './components/PublicRoute';
import { GlobalStyles } from './styles/GlobalStyles';
import Login from './pages/Login';
import CV_preview from './pages/cv_preview';
import AdminDashboard from './pages/AdminDashboard';
import RegisterCompany from './pages/RegisterCompany';
import Layout from './layouts/navigation';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
        <Route element={<PublicRoute isAuth={isAuthenticated.isAuth} />}>
          <Route
            path='/login'
            element={<Login setIsAuthenticated={setIsAuthenticated} />}
          />
          <Route path='/login/company' element={<Login company />} />
        </Route>
        <Route element={<PrivateRoute isAuth={isAuthenticated.isAuth} />}>
          <Route
            path='/dashboard'
            element={
              isAuthenticated.role == 5 ? (
                <AdminDashboard />
              ) : isAuthenticated.role == 4 ? (
                <CV_preview />
              ) : isAuthenticated.role == 3 ? (
                <AdminDashboard />
              ) : isAuthenticated.role == 2 ? null : isAuthenticated.role ===
                1 ? null : null
            }
          />
          <Route
            path='register-company'
            element={isAuthenticated.role == 3 && <RegisterCompany />}
          />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
