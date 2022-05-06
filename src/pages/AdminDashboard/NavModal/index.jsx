import NavDescriptionCard from '../../../components/NavDescriptionCard';
import Modal from '../../../components/Modal';
import styled from 'styled-components';
import ModalLayout from '../../../components/Modal/ModalLayout';
import { useRef } from 'react';
import {
  faPenToSquare,
  faPaperPlane,
} from '@fortawesome/free-regular-svg-icons';

const Box = styled.div`
  width: 90vw;
  max-width: 900px;
  padding: clamp(10px, 5%, 30px);
  border-radius: 3px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(290px, 1fr));
  gap: 30px;
  margin: 10px 0;
  background-color: rgb(238, 238, 255);
`;

const NavModal = ({ openModal, setOpenModal, userId }) => {
  const ModalLayoutRef = useRef();

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
            <NavDescriptionCard
              description='Escribe algun comentario sobre el CV seleccionado'
              icon={faPenToSquare}
              path={`/resumes/${userId}/comments`}
              onClick={() => ModalLayoutRef.current.classList.add('fadeOut')}
            >
              Escribir comentarios
            </NavDescriptionCard>
            {/* <NavDescriptionCard
              description='Agrega información al CV seleccionado'
              icon='icono'
              path='edit'
            >
              Editar CV
            </NavDescriptionCard> */}
            <NavDescriptionCard
              description='Compartir CVs a las empresas'
              icon={faPaperPlane}
              path={`/resumes/${userId}/share`}
              onClick={() => ModalLayoutRef.current.classList.add('fadeOut')}
            >
              Compartir
            </NavDescriptionCard>
          </Box>
        </ModalLayout>
      }
    />
  );
};

export default NavModal;
