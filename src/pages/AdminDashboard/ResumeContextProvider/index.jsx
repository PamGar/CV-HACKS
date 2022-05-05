import { useState, createContext } from 'react';
import { Outlet } from 'react-router-dom';

export const ResumeContext = createContext(null);

const ResumeContextProvider = () => {
  const [dataResumeList, setDataResumeList] = useState([]);
  const [hasMoreResumeList, setHasMoreResumeList] = useState(null);
  const [pageCounterResumeList, setPageCounterResumeList] = useState(1);
  const [loadingResumeList, setLoadingResumeList] = useState(true);
  const [resumeData, setResumeData] = useState(null);
  const [userSelectedId, setUserSelectedId] = useState(null);
  const [userData, setUserData] = useState([]);
  return (
    <ResumeContext.Provider
      value={{
        resumeData,
        setResumeData,
        userSelectedId,
        setUserSelectedId,
        userData,
        setUserData,
        dataResumeList,
        setDataResumeList,
        hasMoreResumeList,
        setHasMoreResumeList,
        pageCounterResumeList,
        setPageCounterResumeList,
        loadingResumeList,
        setLoadingResumeList,
      }}
    >
      <Outlet />
    </ResumeContext.Provider>
  );
};

export default ResumeContextProvider;
