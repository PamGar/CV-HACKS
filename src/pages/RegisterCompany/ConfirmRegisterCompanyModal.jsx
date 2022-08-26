import Modal from '../../components/Modal';
import { useRef, useState } from 'react';
import styled from 'styled-components';
import ModalLayout from '../../components/Modal/ModalLayout';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBuilding } from '@fortawesome/free-regular-svg-icons';
import LoadingButton from '../../components/Buttons/LoadingButton';
import OutlinedButton from '../../components/Buttons/OutlinedButton';
import { toast } from 'react-toastify';
import axios from 'axios';

const FontAwesomeIconStyled = styled(FontAwesomeIcon)`
  color: #6a6aff;
  width: 50px;
  height: 50px;
`;

const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  gap: 10px;
`;

const EmailsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;

  p {
    border-radius: 3px;
    padding: 5px 10px;
    background-color: #e0e0e0;
    font-weight: 600;
  }
`;

const ConfirmRegisterCompanyModal = ({
  openModal,
  setOpenModal,
  emailList,
  setEmailList,
}) => {
  const [loading, setLoading] = useState(false);
  const ModalLayoutRef = useRef();

  const handleCloseModal = (e) => {
    e.preventDefault();
    ModalLayoutRef.current.classList.add('fadeOut');
    setTimeout(() => setOpenModal(false), 250);
  };

  const postEmailList = async () => {
    setLoading(true);
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/company/`,
        { companies: emailList },
        {
          headers: {
            authorization: `Token ${localStorage.getItem('authToken')}`,
          },
        }
      );
      console.log(data);
      ModalLayoutRef.current.classList.add('fadeOut');
      toast.success('Se dió de alta exitosamente');
      setEmailList([]);
      setTimeout(() => setOpenModal(false), 250);
    } catch (err) {
      if (err.response.status === 400) {
        toast.error(
          `${err.response.data.message}, elimínelo e intente enviarlo de nuevo`,
          { autoClose: 4000 }
        );
      } else {
        toast.error('opps ha ocurrido un error, no se pudo enviar los correos');
      }
      setLoading(false);
    }
  };
  return (
    <Modal
      isOpen={openModal}
      element={
        <ModalLayout ref={ModalLayoutRef}>
          <FontAwesomeIconStyled icon={faBuilding} />
          <h1>Dar de alta</h1>
          <p>Los siguientes correos serán agregados:</p>
          <EmailsContainer>
            {emailList.map((email) => (
              <p key={email}>{email}</p>
            ))}
          </EmailsContainer>
          <ButtonContainer>
            <OutlinedButton
              fullWidth
              onClick={handleCloseModal}
              disabled={loading}
            >
              cancelar
            </OutlinedButton>
            <LoadingButton
              fullWidth
              onClick={postEmailList}
              loading={loading}
              disabled={loading}
            >
              Dar de alta
            </LoadingButton>
          </ButtonContainer>
        </ModalLayout>
      }
    />
  );
};

export default ConfirmRegisterCompanyModal;
