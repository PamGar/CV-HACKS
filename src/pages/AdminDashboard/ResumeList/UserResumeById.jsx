import { useEffect, useContext, useState } from "react";
import { useParams } from "react-router-dom";
import CV_preview from "../../../components/cv_preview";
import axios from "axios";
import ResumeSkeleton from "./ResumeSkeleton";
import { toast } from "react-toastify";
import { ResumeContext } from "../ResumeContextProvider";

const UserResumeById = () => {
  const { id } = useParams();
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
    return axios.get(`${process.env.REACT_APP_BASE_URL}/cv/admin-cv/${id}`, {
      headers: {
        authorization: `Token ${localStorage.getItem("authToken")}`,
      },
      signal: controller.signal,
    });
  };

  const GetUserData = () => {
    return axios.get(`${process.env.REACT_APP_BASE_URL}/user/${id}`, {
      headers: {
        authorization: `Token ${localStorage.getItem("authToken")}`,
      },
      signal: controller.signal,
    });
  };

  const GetBoth = async () => {
    setLoadingResume(true);
    try {
      const data = await Promise.all([GetCV(), GetUserData()]);
      setResumeData(data[0].data);
      setUserData(data[1].data);
      setLoadingResume(false);
    } catch (err) {
      if (err.message !== "canceled") {
        console.log(err);
        toast.error("Oppp no se logró cargar el curriculum");
        setLoadingResume(false);
      }
    }
  };
  useEffect(() => {
    !resumeData && GetBoth();
    resumeData && userData.id != id && GetBoth();
    !userSelectedId && setUserSelectedId(+id);
    return () => {
      controller.abort();
    };
  }, [id]);

  return (
    <>
      {loadingResume && <ResumeSkeleton />}
      {resumeData && (
        <CV_preview
          userData={userData}
          cvData={resumeData}
          downloadAdmin={true}
        />
      )}
    </>
  );
};

export default UserResumeById;
