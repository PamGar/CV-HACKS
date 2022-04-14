import { useState } from 'react';
import MainContentWrapper from '../../components/MainContentWrapper';
import styled from 'styled-components';
import MultipleEmail from '../../components/MultipleEmail';

const ShareCV = ({ setShowMainContent }) => {
  const [emailList, setEmailList] = useState([]);
  const [loading, setLoading] = useState({ loading: false, disable: false });

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
    <MainContentWrapper
      loadingButtonTitle='compartir'
      onClickOutlinedButton={() => setShowMainContent('CVlist')}
      onClickLoadingButton={postEmailList}
      loading={loading.loading}
      disableButton={loading.disable || !emailList.length > 0}
    >
      <h1>Compartir CV</h1>
      <MultipleEmail emailList={emailList} setEmailList={setEmailList} />
    </MainContentWrapper>
  );
};

export default ShareCV;
