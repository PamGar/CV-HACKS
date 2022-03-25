import { useState, useLayoutEffect, useRef, useEffect } from 'react';
import Modal from '../../components/Modal';
import styled from 'styled-components';
import LoadingButton from '../../components/Buttons/LoadingButton';
import OutlinedButton from '../../components/Buttons/OutlinedButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-regular-svg-icons';
import AlertMessage from '../../components/AlertMessage';
import { ModalWrapper } from '../../layouts/ModalLayout';
import axios from 'axios';

const Container = styled.div`
  background-color: rgb(238, 238, 255);
  padding: clamp(10px, 5%, 30px);
  border-radius: 3px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  width: 90vw;
  max-width: 500px;
  text-align: center;

  .trashIcon {
    width: 50px;
    height: 50px;
    color: red;
  }
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
}) => {
  const [showError, setShowError] = useState(false);
  const ModalWrapperRef = useRef();

  const handleDelete = async () => {
    try {
      const { data } = await axios.delete(
        `${process.env.REACT_APP_BASE_URL}/cv/admin-cv-comments/1/${commentID}`,
        {
          headers: {
            authorization: `Token ${localStorage.getItem('authToken')}`,
          },
        }
      );
      ModalWrapperRef.current.classList.add('fadeOut');
      setCommentList((prev) =>
        prev.filter((comment) => comment.id !== commentID)
      );
      setTimeout(() => setOpenConfirmDeleteComentModal(false), 250);
    } catch (err) {
      console.log(err);
      setShowError(true);
    }
  };

  useLayoutEffect(() => {
    document.body.style.marginRight = '17px';
    document.body.style.overflowY = 'hidden';
    ModalWrapperRef.current.classList.add('fadeIn');
    return () => {
      document.body.removeAttribute('style');
    };
  }, []);

  useEffect(() => {
    setTimeout(() => ModalWrapperRef.current.classList.remove('fadeIn'), 250);
  }, []);
  return (
    <Modal
      element={
        <ModalWrapper ref={ModalWrapperRef}>
          <Container>
            <FontAwesomeIcon icon={faTrashCan} className='trashIcon' />
            <h1>¿Estás seguro?</h1>
            <p>
              ¿Realmente quieres eliminar este comentario? Está acción NO podrá
              ser deshecha.
            </p>
            <ButtonContainer>
              <OutlinedButton
                fullWidth
                onClick={() => {
                  ModalWrapperRef.current.classList.add('fadeOut');
                  setTimeout(() => setOpenConfirmDeleteComentModal(false), 250);
                }}
              >
                cancelar
              </OutlinedButton>
              <LoadingButton fullWidth onClick={handleDelete}>
                eliminar
              </LoadingButton>
            </ButtonContainer>
            {showError && (
              <AlertMessage error fullWidth>
                opps ha ocurrido un error, no se pudo eliminar la correción
              </AlertMessage>
            )}
          </Container>
        </ModalWrapper>
      }
      isOpen={openConfirmDeleteComentModal}
    />
  );
};

export default ConfirmDeleteComentModal;
