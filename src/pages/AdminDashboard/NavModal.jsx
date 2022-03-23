import NavDescriptionCard from '../../components/NavDescriptionCard';
import ModalLayout from '../../layouts/ModalLayout';
import Modal from '../../components/Modal';
import styled from 'styled-components';

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

const NavModal = ({ openModal, setOpenModal, setShowMainContent }) => {
  return (
    <Modal
      isOpen={openModal}
      element={
        <ModalLayout
          onClick={() => setTimeout(() => setOpenModal(false), 250)}
          hideScrollBar
        >
          <Box>
            <NavDescriptionCard
              description='Escribe algun comentario sobre el CV seleccionado'
              icon='icono'
              onClick={() => {
                setTimeout(() => setShowMainContent('comments'), 250);
              }}
            >
              Escribir comentarios
            </NavDescriptionCard>
            <NavDescriptionCard
              description='Agrega información al CV seleccionado'
              icon='icono'
              onClick={() => {
                setTimeout(() => setShowMainContent('edit'), 250);
              }}
            >
              Editar CV
            </NavDescriptionCard>
            <NavDescriptionCard
              description='Marca como contratado y por cúal empresa'
              icon='icono'
              onClick={() => {
                setTimeout(() => setShowMainContent('status'), 250);
              }}
            >
              Estatus
            </NavDescriptionCard>
            <NavDescriptionCard
              description='Compartir CVs a las empresas'
              icon='icono'
              onClick={() => {
                setTimeout(() => setShowMainContent('share'), 250);
              }}
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
