import { useEffect, useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import CV_preview from '../../../components/cv_preview_admin';
import axios from 'axios';
import ResumeSkeleton from './ResumeSkeleton';
import { toast } from 'react-toastify';
import { ResumeContext } from '../ResumeContextProvider';

const UserResumeById = () => {
  const { id } = useParams();
  const { cvId } = useParams();
  const {
    userSelectedId,
    setUserSelectedId,
    userData,
    resumeData,
    setResumeData,
    setUserData,
  } = useContext(ResumeContext);
  const [loadingResume, setLoadingResume] = useState(resumeData ? false : true);
  let controller = new AbortController();

  const GetCV = () => {
    return axios.get(`${process.env.REACT_APP_BASE_URL}/cv/admin-cv/${cvId}`, {
      headers: {
        authorization: `Token ${localStorage.getItem('authToken')}`,
      },
      signal: controller.signal,
    });
  };

  const GetUserData = () => {
    return axios.get(`${process.env.REACT_APP_BASE_URL}/user/${id}`, {
      headers: {
        authorization: `Token ${localStorage.getItem('authToken')}`,
      },
      signal: controller.signal,
    });
  };

  const GetBoth = async () => {
    try {
      const data = await Promise.all([GetCV(), GetUserData()]);
      setResumeData(data[0].data);
      setUserData(data[1].data);
    } catch (err) {
      if (err.message !== 'canceled') {
        console.log(err);
        toast.error('Oppp no se logró cargar el curriculum');
      }
    }
  };
  useEffect(() => {
    !resumeData && GetBoth();
    resumeData && resumeData.cv.id != cvId && GetBoth();
    !userSelectedId && setUserSelectedId(+cvId);
    return () => {
      controller.abort();
    };
  }, [cvId]);

  return (
    <>
      {/* {loadingResume && <ResumeSkeleton />} */}
      {resumeData && (
        <CV_preview
          userData={userData}
          cvData={resumeData}
          downloadAdmin={true}
          refreshCV={GetBoth}
        />
      )}
    </>
  );
};

export default UserResumeById;
