import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CV from './cvPublicPreview';
import axios from 'axios';
import PublicCvLoader from './PublicCvLoader';

const PublicCV = () => {
  const [cvData, setCvData] = useState({
    cv: {
      id: '',
      created_date: '',
      description: '',
      status: '',
      url_public: null,
      url_private: null,
      area: null,
      tags: [],
    },
    comments: [],
    certifications: [],
    awards: [],
    publications: [],
    languages: [],
    skills: [],
    intersts: [],
    urls: [],
    projects: [],
    courses: [],
    organisations: [],
    experiences: [],
    educations: [],
  });
  const { cvId } = useParams();
  const [loadingResume, setLoadingResume] = useState(
    cvData.cv.id === '' ? false : true
  );

  const getCV = async () => {
    setLoadingResume(true);
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/cv/shared/${cvId}`
      );
      setCvData(data);
      console.log(data);
      setLoadingResume(false);
    } catch (error) {
      console.error('errorData', error.message);
    }
  };

  useEffect(() => {
    getCV();
  }, []);

  return (
    <>
      {loadingResume && <PublicCvLoader />}
      <div>
        <CV cvData={cvData} cvUuId={cvId} />
      </div>
    </>
  );
};

export default PublicCV;
