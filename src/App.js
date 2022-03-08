import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import PublicRoute from './components/PublicRoute';
import { GlobalStyles } from './styles/GlobalStyles';
import Login from './pages/Login';

const App = () => {
  return (
    <Router>
      <GlobalStyles />
      <Routes>
        <Route element={<PublicRoute isAuth={false} />}>
          <Route path='/login' element={<Login />} />
          <Route path='/login/company' element={<Login company />} />
        </Route>
        <Route element={<PrivateRoute isAuth={false} />}>
          <Route path='/dashboard' element={<div>dashboard page</div>} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
