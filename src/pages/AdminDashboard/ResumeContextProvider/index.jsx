import { useState, createContext } from 'react';
import { Outlet } from 'react-router-dom';

export const ResumeContext = createContext('hah');

const ResumeContextProvider = () => {
  const [resumeData, setResumeData] = useState('hola');
  const [userSelectedId, setUserSelectedId] = useState(null);

  return (
    <ResumeContext.Provider
      value={{
        resumeData,
        setResumeData,
        userSelectedId,
        setUserSelectedId,
      }}
    >
      <Outlet />
    </ResumeContext.Provider>
  );
};

export default ResumeContextProvider;
