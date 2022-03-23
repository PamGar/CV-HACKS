import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import PublicRoute from './components/PublicRoute';
import { GlobalStyles } from './styles/GlobalStyles';
import Login from './pages/Login';
import CV_preview from './pages/cv_preview';
import AdminDashboard from './pages/AdminDashboard';
import Layout from './layouts/navigation';

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
          <Route
            path='/dashboard'
            element={
              isAuthenticated.role == 5 ? null : isAuthenticated.role == 4 ? (
                <CV_preview />
              ) : isAuthenticated.role == 3 ? (
                <AdminDashboard />
              ) : isAuthenticated.role == 2 ? null : isAuthenticated.role ===
                1 ? null : null
            }
          />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;

const Test = () => {
  return <Layout main={<div>test</div>} right={<div>cv</div>} />;
};
