import React, { useState, useEffect } from 'react';
import Layout from '../../layouts/navigation/index';
import CV from '../../components/cv_preview';
import EditCV from '../../components/cv_edit';
import Tasks from '../../components/tasks_list';
import TasksTodo from '../../components/tasks_todo';
import Hacky from '../../assets/images/Hacky.png';
import styled from 'styled-components';
import Modal from '../../components/Modal';
import FirstTime from '../../components/Modal/first_time_user';
import TasksModal from '../../components/Modal/tasksModal';
import axios from 'axios';
import TasksButton from '../../assets/icons/task-list.svg';
import HelpButton from '../../assets/icons/bulb.svg';

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
    background-color: #99e2e3;
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

const FloatBox = styled.div`
  display: none;
  @media (max-width: 820px) {
    display: block;
    position: fixed;
    bottom: 0;
    right: 0;

    button {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 50px;
      height: 50px;
      margin: 20px;
      border-radius: 50%;
      box-shadow: 0 0 35px -5px #1e1b44;
      font-weight: 700;

      img {
        width: 50%;
      }
    }

    .tasks {
      background-color: #e7d8ff;
    }
    .help {
      background-color: #fbffd6;
    }
  }
`;

const CV_preview = () => {
  const [user, setUser] = useState({
    id: null,
    address: {
      id: null,
      street: '',
      num_int: null,
      num_ext: null,
      suburb: '',
      town: '',
      state: '',
      country: '',
      zip_code: '',
    },
    role: {
      id: null,
      name: '',
      description: '',
    },
    about_me: null,
    name: '',
    paternal_surname: '',
    mothers_maiden_name: null,
    birthdate: null,
    email: '',
    phone: '',
    image: '',
    gender: null,
    subscribed: null,
  });
  const [firstData, setFirstData] = useState(false);
  const [openLoginModal, setOpenLoginModal] = useState(true);
  const [openTasksModal, setOpenTasksModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  /* console.log(user); */

  const handleEdit = () => {
    setIsEdit(!isEdit);
  };

  const handleTasks = () => {
    setOpenTasksModal(!openTasksModal);
  };

  /* const myToken = window.localStorage.getItem('token'); */

  const getUserData = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/user/6`,
        {
          headers: {
            /* authorization: `Token ${myToken}`, */
            authorization: `Token ef86a37ba3c734970179e34b4a72b928418df264`,
          },
        }
      );
      setUser(data);
      data.name === null ? setFirstData(true) : setFirstData(false);
    } catch (error) {
      console.error('error', error);
    }
  };

  useEffect(() => {
    getUserData();
  });

  return (
    <>
      <Modal
        isOpen={openTasksModal}
        element={
          <TasksModal
            closeModal={() => {
              setOpenTasksModal(!openTasksModal);
            }}
            isEdit={isEdit}
          />
        }
      />
      {firstData && (
        <Modal
          isOpen={openLoginModal}
          element={
            <FirstTime
              closeModal={() => {
                setOpenLoginModal(!openLoginModal);
              }}
            />
          }
        />
      )}

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
      <FloatBox>
        <button className="tasks" onClick={handleTasks}>
          <img src={TasksButton} alt="" />
        </button>
        <button className="help">
          <img src={HelpButton} alt="" />
        </button>
      </FloatBox>
    </>
  );
};

export default CV_preview;
