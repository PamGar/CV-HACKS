import { useState } from 'react';
import MainContentWrapper from '../../../components/MainContentWrapper';
import styled from 'styled-components';
import MultipleEmail from '../../../components/MultipleEmail';
import MainAndRightLayout from '../../../layouts/MainAndRightLayout';
import { useNavigate, useParams } from 'react-router-dom';
import UserResumeById from '../ResumeList/UserResumeById';

const ShareResume = () => {
  const [emailList, setEmailList] = useState([]);
  const [loading, setLoading] = useState({ loading: false, disable: false });
  const navigate = useNavigate();
  const { id } = useParams();
  console.log(id);

  const postEmailList = async () => {
    setLoading((prev) => ({ loading: true, disable: true }));
    try {
      const data = await new Promise((reject, resolve) => {
        setTimeout(() => resolve(emailList), 2000);
      });
      console.log(data);
      setLoading((prev) => ({ loading: false, disable: false }));
    } catch (err) {
      console.log(err);
      setLoading(false);
      setLoading((prev) => ({ loading: false, disable: false }));
    }
  };
  return (
    <MainAndRightLayout
      main={
        <MainContentWrapper
          loadingButtonTitle='compartir'
          onClickOutlinedButton={() => navigate(-1)}
          onClickLoadingButton={postEmailList}
          loading={loading.loading}
          disableButton={loading.disable || !emailList.length > 0}
        >
          <h1>Compartir CV</h1>
          <MultipleEmail emailList={emailList} setEmailList={setEmailList} />
        </MainContentWrapper>
      }
      right={<UserResumeById />}
    />
  );
};

export default ShareResume;
