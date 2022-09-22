import Modal from '../../components/Modal';
import styled from 'styled-components';
import axios from 'axios';
import { toast } from 'react-toastify';
import ModalLayout from '../../components/Modal/ModalLayout';
import { useRef, useState, useEffect } from 'react';
import Button from '../../components/Buttons/LoadingButton';
import { ButtonBox } from '../../components/cv_edit/EditStyledComponents';

const Box = styled.div`
  max-width: 900px;
  padding: 20px 20px 0 20px;
  border-radius: 15px;
  background-color: #fff;
`;

const ModalConfirmationDelete = ({
  openModal,
  setOpenModal,
  confirmedDelete,
  cvToDelete,
  refreshCvList,
}) => {
  const ModalLayoutRef = useRef();
  const myToken = localStorage.getItem('authToken');

  const removeCV = async (event, id) => {
    event.preventDefault();

    try {
      const { data } = await axios.delete(
        `${process.env.REACT_APP_BASE_URL}/cv/${cvToDelete}`,
        {
          headers: {
            authorization: `Token ${myToken}`,
          },
        }
      );
      toast.success('CV eliminado con éxito');
      refreshCvList();
      setOpenModal(false);
    } catch (error) {
      console.error('error', error);
      toast.error('No se pudo eliminar el CV');
    }
  };

  return (
    <Modal
      isOpen={openModal}
      element={
        <ModalLayout
          ref={ModalLayoutRef}
          myOwnContainer
          setOpenModal={setOpenModal}
        >
          <Box>
            <h2>Estas seguro que deseas eliminar este CV?</h2>
            <ButtonBox>
              {/* <Button type="button">Cancelar</Button> */}
              <Button type="button" onClick={removeCV}>
                Eliminar CV
              </Button>
            </ButtonBox>
          </Box>
        </ModalLayout>
      }
    />
  );
};

export default ModalConfirmationDelete;
