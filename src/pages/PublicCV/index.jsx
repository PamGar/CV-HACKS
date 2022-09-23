import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CV from './cvPublicPreview';
import axios from 'axios';

const PublicCV = () => {
  const [cvData, setCvData] = useState({
    cv: {
      id: 0,
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

  const getCV = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/cv/shared/${cvId}`
      );
      setCvData(data);
      console.log(data);
    } catch (error) {
      console.error('errorData', error.message);
    }
  };

  useEffect(() => {
    getCV();
  }, []);

  return (
    <div>
      <CV cvData={cvData} />
    </div>
  );
};

export default PublicCV;
