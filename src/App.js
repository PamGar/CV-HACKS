import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PrivateRoute, {
  PrivateRouteAdmin,
  PrivateRoutePadawan,
  PrivateRouteCompany,
  PrivateRouteExternal,
} from './components/PrivateRoute';
import PublicRoute from './components/PublicRoute';
import { GlobalStyles } from './styles/GlobalStyles';
import Login from './pages/Login';
import CV_preview from './pages/cv_preview';
import AdminDashboard from './pages/AdminDashboard';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState({
    isAuth: !!localStorage.getItem('authToken'),
    role: localStorage.getItem('role') || 0,
  });
  return (
    <Router>
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
          <Route element={<PrivateRoutePadawan role={isAuthenticated.role} />}>
            <Route path='/dashboard' element={<CV_preview />} />
          </Route>
          <Route element={<PrivateRouteCompany />}></Route>
          <Route element={<PrivateRouteExternal />}></Route>
          <Route element={<PrivateRouteAdmin role={isAuthenticated.role} />}>
            <Route path='/dashboard/admin' element={<AdminDashboard />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
