import React, { useState } from 'react';
import Layout from '../../layouts/navigation/index';
import CV from '../../components/cv_preview';
import EditCV from '../../components/cv_edit';
import Tasks from '../../components/tasks_list';
import TasksTodo from '../../components/tasks_todo';
import Hacky from '../../assets/images/Hacky.png';
import styled from 'styled-components';
import Modal from '../../components/Modal';
import FirstTime from '../../components/Modal/first_time_user';

const HelpCont = styled.button`
  position: fixed;
  bottom: 0;
  right: 20px;
  overflow: hidden;
  text-align: center;
  padding: 0 20px;
  background: none;
  cursor: pointer;

  p {
    background-color: #00b7b852;
    padding: 10px 0;
    border-radius: 5px;
    font-weight: 700;
    box-shadow: 5px 5px 15px grey;
  }

  img {
    position: relative;
    bottom: -10px;
  }

  @media (max-width: 820px) {
    display: none;
  }
`;

const CV_preview = () => {
  const [user, setUser] = useState({
    name: 'case',
  });
  const [openLoginModal, setOpenLoginModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const handleEdit = () => {
    setIsEdit(!isEdit);
  };

  return (
    <>
      {user.name === '' ? (
        <Modal
          isOpen={true}
          element={<FirstTime closeModal={setOpenLoginModal} isOpen={true} />}
        />
      ) : null}

      {isEdit ? (
        <Layout
          main={<EditCV editButton={handleEdit} />}
          right={<TasksTodo />}
        />
      ) : (
        <Layout main={<CV editButton={handleEdit} />} right={<Tasks />} />
      )}

      <HelpCont>
        <p>¿Ayuda necesitas?</p>
        <img src={Hacky} alt="" />
      </HelpCont>
    </>
  );
};

export default CV_preview;
