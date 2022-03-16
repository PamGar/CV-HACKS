import React, { useLayoutEffect, useEffect, useRef } from 'react';
import NavDescriptionNav from '../../components/NavDescriptionCard';
import ModalLayout from '../../layouts/ModalLayout';
import Modal from '../../components/Modal';
import styled from 'styled-components';

const Box = styled.div`
  width: 90vw;
  max-width: 900px;
  background-color: white;
  padding: clamp(10px, 5%, 30px);
  border-radius: 3px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(290px, 1fr));
  gap: 30px;
  margin: 10px 0;
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
            <NavDescriptionNav
              description='una descripción simple'
              icon='icono'
              onClick={() => {
                // setShowMainContent('comments');
                setTimeout(() => setShowMainContent('comments'), 250);
                console.log('clicked');
              }}
            >
              Escribir comentarios
            </NavDescriptionNav>
            <NavDescriptionNav
              description='una descripción simple'
              icon='icono'
            >
              Editar CV
            </NavDescriptionNav>
            <NavDescriptionNav
              description='una descripción simple'
              icon='icono'
            >
              Estatus
            </NavDescriptionNav>
            <NavDescriptionNav
              description='una descripción simple'
              icon='icono'
            >
              Compartir
            </NavDescriptionNav>
            <NavDescriptionNav
              description='una descripción simple'
              icon='icono'
            >
              Compartir
            </NavDescriptionNav>
            <NavDescriptionNav
              description='una descripción simple'
              icon='icono'
            >
              Compartir
            </NavDescriptionNav>
            <NavDescriptionNav
              description='una descripción simple'
              icon='icono'
            >
              Compartir
            </NavDescriptionNav>
            <NavDescriptionNav
              description='una descripción simple'
              icon='icono'
            >
              Compartir
            </NavDescriptionNav>
            <NavDescriptionNav
              description='una descripción simple'
              icon='icono'
            >
              Compartir
            </NavDescriptionNav>
            <NavDescriptionNav
              description='una descripción simple'
              icon='icono'
            >
              Compartir
            </NavDescriptionNav>
            <NavDescriptionNav
              description='una descripción simple'
              icon='icono'
            >
              Compartir
            </NavDescriptionNav>
            <NavDescriptionNav
              description='una descripción simple'
              icon='icono'
            >
              Compartir
            </NavDescriptionNav>
            <NavDescriptionNav
              description='una descripción simple'
              icon='icono'
            >
              Compartir
            </NavDescriptionNav>
            <NavDescriptionNav
              description='una descripción simple'
              icon='icono'
            >
              Compartir
            </NavDescriptionNav>
          </Box>
        </ModalLayout>
      }
    />
  );
};

export default NavModal;
