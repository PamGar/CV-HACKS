import { useState, useRef } from 'react';
import Modal from '../../../components/Modal';
import styled from 'styled-components';
import LoadingButton from '../../../components/Buttons/LoadingButton';
import OutlinedButton from '../../../components/Buttons/OutlinedButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-regular-svg-icons';
import axios from 'axios';
import { toast } from 'react-toastify';
import ModalLayout from '../../../components/Modal/ModalLayout';

const FontAwesomeIconStyled = styled(FontAwesomeIcon)`
  width: 50px;
  height: 50px;
  color: red;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 20px;
  width: 100%;
`;

const ConfirmDeleteComentModal = ({
  openConfirmDeleteComentModal,
  setOpenConfirmDeleteComentModal,
  commentID,
  setCommentList,
  userSelectedId,
}) => {
  const [loading, setLoading] = useState(false);
  const ModalWrapperRef = useRef();

  const handleDelete = async () => {
    setLoading(true);
    try {
      const { data } = await axios.delete(
        `${process.env.REACT_APP_BASE_URL}/cv/admin-cv-comments/${userSelectedId}/${commentID}`,
        {
          headers: {
            authorization: `Token ${localStorage.getItem('authToken')}`,
          },
        }
      );
      toast.success('Correción eliminada');
      ModalWrapperRef.current.classList.add('fadeOut');
      setCommentList((prev) =>
        prev.filter((comment) => comment.id !== commentID)
      );
      setTimeout(() => setOpenConfirmDeleteComentModal(false), 250);
    } catch (err) {
      console.log(err);
      toast.error('No se ha podido eliminar la Correción.');
      setLoading(false);
    }
  };

  return (
    <Modal
      element={
        <ModalLayout ref={ModalWrapperRef}>
          <FontAwesomeIconStyled icon={faTrashCan} />
          <h1>¿Estás seguro?</h1>
          <p>
            ¿Realmente quieres eliminar este comentario? Está acción NO podrá
            ser deshecha.
          </p>
          <ButtonContainer>
            <OutlinedButton
              fullWidth
              disabled={loading}
              onClick={() => {
                ModalWrapperRef.current.classList.add('fadeOut');
                setTimeout(() => setOpenConfirmDeleteComentModal(false), 250);
              }}
            >
              cancelar
            </OutlinedButton>
            <LoadingButton
              fullWidth
              onClick={handleDelete}
              disabled={loading}
              loading={loading}
            >
              eliminar
            </LoadingButton>
          </ButtonContainer>
        </ModalLayout>
      }
      isOpen={openConfirmDeleteComentModal}
    />
  );
};

export default ConfirmDeleteComentModal;
