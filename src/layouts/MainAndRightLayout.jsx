import { useState, useRef } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faNoteSticky } from '@fortawesome/free-regular-svg-icons';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import Modal from '../components/Modal';
import ModalLayout from '../components/Modal/ModalLayout';

const Layout = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 30px;
  @media (max-width: 1000px) {
    display: block;
    grid-template-columns: 1fr;
  }
  position: relative;
`;

const Main = styled.div`
  padding-top: 30px;
`;

const Right = styled.div`
  position: sticky;
  top: 0;
  padding-top: 30px;
  height: 100vh;
  overflow-y: scroll;
  z-index: 10;

  &::-webkit-scrollbar {
    display: none;
  }
  @media (max-width: 1000px) {
    display: none;
  }
`;

const FloatIcons = styled.div`
  display: none;
  @media (max-width: 1000px) {
    display: block;
    position: fixed;
    bottom: 31px;
    right: 20px;

    button {
      background-color: #a0a0cc;
      border-radius: 50%;
      padding: 12px;
      cursor: pointer;
      display: flex;
      justify-content: center;
      align-items: center;
      box-shadow: 2px 1px 7px #00000057;
    }

    .icon {
      width: 30px;
      height: 30px;
      color: #fff;
    }
  }
`;

const ModalContainer = styled.div`
  width: 90%;
  & > * {
    margin: 10% 0;
  }
`;

const MainAndRightLayout = ({ main, right }) => {
  const [openModal, setOpenModal] = useState(false);
  const ModalLayoutRef = useRef();

  return (
    <Layout>
      <Main>{main}</Main>
      <Right>{right}</Right>
      <FloatIcons openModal={openModal}>
        <button onClick={() => setOpenModal(true)}>
          <FontAwesomeIcon icon={faEllipsisVertical} className="icon" />
        </button>
      </FloatIcons>
      <Modal
        isOpen={openModal}
        element={
          <ModalLayout
            ref={ModalLayoutRef}
            myOwnContainer
            setOpenModal={setOpenModal}
          >
            <ModalContainer>{right}</ModalContainer>
          </ModalLayout>
        }
      />
    </Layout>
  );
};

export default MainAndRightLayout;
