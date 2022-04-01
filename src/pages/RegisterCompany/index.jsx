import { useState } from 'react';
import Layout from '../../layouts/navigation';
import FormWrapper from '../../components/FormWrapper';
import MultipleEmail from '../../components/MultipleEmail';
import ConfirmRegisterCompanyModal from './ConfirmRegisterCompanyModal';

const RegisterCompany = () => {
  const [emailList, setEmailList] = useState([]);
  const [openModal, setOpenModal] = useState(false);

  const handleClick = () => {
    setOpenModal(true);
  };
  return (
    <Layout
      main={
        <>
          <FormWrapper
            onClickLoadingButton={handleClick}
            disableButton={!emailList.length > 0}
            loadingButtonTitle='dar de alta'
            singleButton
          >
            <h1>Dar de alta a las empresas</h1>
            <MultipleEmail emailList={emailList} setEmailList={setEmailList} />
          </FormWrapper>
          {openModal && (
            <ConfirmRegisterCompanyModal
              openModal={openModal}
              setOpenModal={setOpenModal}
              emailList={emailList}
              setEmailList={setEmailList}
            />
          )}
        </>
      }
      right={<p>cv</p>}
    />
  );
};

export default RegisterCompany;
