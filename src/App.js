import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import PublicRoute from './components/PublicRoute';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route element={<PublicRoute isAuth={false} />}>
          <Route path='/login' element={<div>login page</div>} />
        </Route>
        <Route element={<PrivateRoute isAuth={false} />}>
          <Route path='/dashboard' element={<div>dashboard page</div>} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
