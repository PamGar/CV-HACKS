import { useState } from 'react';
import MainContentWrapper from '../../components/MainContentWrapper';
import MultipleEmail from '../../components/MultipleEmail';
import ConfirmRegisterCompanyModal from './ConfirmRegisterCompanyModal';
import styled from 'styled-components';

const Wrapper = styled.div`
  padding-top: 30px;
  max-width: 500px;
  @media (max-width: 1000px) {
    max-width: 100%;
  }
`;

const RegisterCompany = () => {
  const [emailList, setEmailList] = useState([]);
  const [openModal, setOpenModal] = useState(false);

  const handleClick = () => {
    setOpenModal(true);
  };
  return (
    <Wrapper>
      <MainContentWrapper
        onClickLoadingButton={handleClick}
        disableButton={!emailList.length > 0}
        loadingButtonTitle='dar de alta'
        singleButton
      >
        <h1>Dar de alta a las empresas</h1>
        <MultipleEmail emailList={emailList} setEmailList={setEmailList} />
      </MainContentWrapper>
      {openModal && (
        <ConfirmRegisterCompanyModal
          openModal={openModal}
          setOpenModal={setOpenModal}
          emailList={emailList}
          setEmailList={setEmailList}
        />
      )}
    </Wrapper>
  );
};

export default RegisterCompany;
