import { useRef, useState } from 'react';
import Modal from '../../components/Modal';
import ModalLayout from '../../components/Modal/ModalLayout';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';
import LoadingButton from '../../components/Buttons/LoadingButton';
import styled from 'styled-components';
import axios from 'axios';

const FontAwesomeIconStyled = styled(FontAwesomeIcon)`
  width: 50px;
  height: 50px;
  color: red;
`;

const DeleteJobOfferConfirmModal = ({
  openModal,
  id,
  setOpenModal,
  setJobOfferData,
}) => {
  const [loading, setLoading] = useState(false);
  const ModalLayoutRef = useRef();

  const DeleteJobOffer = async () => {
    setLoading(true);
    try {
      const { data } = await axios.delete(
        `${process.env.REACT_APP_BASE_URL}/company/vacancy/${id}`,
        {
          headers: {
            authorization: `Token ${localStorage.getItem('authToken')}`,
          },
        }
      );
      setJobOfferData((prev) => prev.filter((jobOffer) => jobOffer.id !== id));
      toast.success(data.message);
      ModalLayoutRef.current.classList.add('fadeOut');
      setTimeout(() => setOpenModal(false), 250);
    } catch (err) {
      console.log(err);
      toast.error('opps no se pudo eliminar la vacante, intente de nuevo');
    } finally {
      setLoading(false);
    }
  };
  return (
    <Modal
      isOpen={openModal}
      element={
        <ModalLayout ref={ModalLayoutRef} setOpenModal={setOpenModal}>
          <FontAwesomeIconStyled icon={faTrashCan} />
          <h1>¿Estás seguro?</h1>
          <p>Elminiras la vacante y no podrás recuperarla</p>
          <LoadingButton
            onClick={DeleteJobOffer}
            fullWidth
            loading={loading}
            disabled={loading}
          >
            Confirmar
          </LoadingButton>
        </ModalLayout>
      }
    />
  );
};

export default DeleteJobOfferConfirmModal;
