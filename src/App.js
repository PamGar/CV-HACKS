import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import PublicRoute from './components/PublicRoute';
import { GlobalStyles } from './styles/GlobalStyles';
import Login from './pages/Login';
import CV_preview from './pages/cv_preview';
import RegisterCompany from './pages/RegisterCompany';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import VacancyList from './pages/VacancyList';
import Landing from './pages/landing';
import AppbarLayout from './layouts/AppbarLayout';
import Profile from './pages/Profile';
import ResumeContextProvider from './pages/AdminDashboard/ResumeContextProvider';
import ResumeList from './pages/AdminDashboard/ResumeList';
import AddComment from './pages/AdminDashboard/AddComment';
import DeleteUser from './pages/AdminDashboard/DeleteUser';
import ShareResume from './pages/AdminDashboard/ShareResume';
import CandidatesCompany from './pages/CandidatesCompany';
import JobOffersCompany from './pages/JobOffersCompany';
import SendError from './pages/SendError';
import CreateJobOfferCompany from './pages/CreateJobOfferCompany';
import UserResumeById from './pages/AdminDashboard/ResumeList/UserResumeById';
import ResumePlaceholder from './pages/AdminDashboard/ResumeList/ResumePlaceholder';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState({
    isAuth: !!localStorage.getItem('authToken'),
    role: localStorage.getItem('role') || 0,
  });
  return (
    <Router>
      <ToastContainer
        position="top-right"
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
          <Route path="/" element={<Landing />} />
          <Route
            path="/login"
            element={<Login setIsAuthenticated={setIsAuthenticated} />}
          />
          <Route path="/login/company" element={<Login company />} />
        </Route>
        <Route element={<PrivateRoute isAuth={isAuthenticated.isAuth} />}>
          <Route element={<AppbarLayout role={isAuthenticated.role} />}>
            {(isAuthenticated.role == 5 || isAuthenticated.role == 4) && (
              <Route
                path="/resume"
                element={
                  <CV_preview
                    setAuth={setIsAuthenticated}
                    authData={isAuthenticated}
                  />
                }
              />
            )}
            {isAuthenticated.role == 2 && (
              <Route element={<ResumeContextProvider />}>
                <Route path="/resumes" element={<ResumeList />}>
                  <Route index element={<ResumePlaceholder />} />
                  <Route path=":id" element={<UserResumeById />} />
                </Route>
                <Route path="/resumes/:id/comments" element={<AddComment />} />
                <Route path="/resumes/:id/share" element={<ShareResume />} />
                <Route
                  path="/resumes/:id/delete-user"
                  element={<DeleteUser />}
                />
              </Route>
            )}
            {isAuthenticated.role == 2 && (
              <Route path="/register-company" element={<RegisterCompany />} />
            )}
            {(isAuthenticated.role == 2 || isAuthenticated.role == 3) && (
              <Route
                path="/job-offers"
                element={
                  isAuthenticated.role == 2 ? (
                    <VacancyList />
                  ) : (
                    <JobOffersCompany />
                  )
                }
              />
            )}
            {isAuthenticated.role == 3 && (
              <Route path="/candidates" element={<CandidatesCompany />} />
            )}
            {isAuthenticated.role == 3 && (
              <Route
                path="/create-job-offer"
                element={<CreateJobOfferCompany />}
              />
            )}
            <Route path="/send-error" element={<SendError />} />
            <Route
              path="/profile"
              element={<Profile setIsAuthenticated={setIsAuthenticated} />}
            >
              <Route path="settings" element={<p>configuracion generales</p>} />
              <Route index element={<p></p>} />
            </Route>
            <Route
              path="*"
              element={<h1 style={{ paddingTop: '30px' }}>not found</h1>}
            />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
