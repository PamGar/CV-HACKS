import React, { useState, useEffect, useRef } from 'react';
import Layout from '../../layouts/navigation/index';
import CV from '../../components/cv_preview';
import EditCV from '../../components/cv_edit';
import Tasks from '../../components/tasks_list';
import TasksTodo from '../../components/tasks_todo';
import Hacky from '../../assets/images/Hacky.png';
import styled from 'styled-components';
import Modal from '../../components/Modal';
import FirstTime from '../../components/Modal/first_time_user';
import axios from 'axios';
import TasksButton from '../../assets/icons/task-list.svg';
import HelpButton from '../../assets/icons/bulb.svg';
import Close from '../../assets/icons/close.svg';

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
      box-shadow: 0 0 35px -5px #000000b3;
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

const SidebarTasks = styled.div`
  position: fixed;
  width: 95%;
  bottom: 0;
  left: -100%;
  z-index: 999;
  background-color: #fff;
  border-radius: 0 5px 5px 0;
  box-shadow: 5px 0px 15px grey;
  transform: translateY(0);
  transition: 0.5s;
  transition-timing-function: cubic-bezier(0.87, 0, 0.13, 1);

  .wrapper {
    overflow: scroll;
    height: calc(100vh - 70px);
  }

  button {
    background-color: transparent;
    height: 30px;
    width: 30px;
    position: fixed;
    bottom: 20px;
    right: 20px;
    z-index: 9999;
    box-shadow: 0 0 15px grey;
    border-radius: 50%;

    img {
      width: 100%;
    }
  }
`;

const SidebarHelp = styled(SidebarTasks)`
  text-align: center;
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
  const [isEdit, setIsEdit] = useState(false);
  const [sidebarWidth, setSidebarWidth] = useState(-100);
  const [sidebarHelpWidth, setSidebarHelpWidth] = useState(-100);

  /* console.log(user); */

  const handleEdit = () => {
    setIsEdit(!isEdit);
  };

  const handleSidebarTask = () => {
    if (sidebarWidth === 0) {
      setSidebarWidth(-100);
    } else {
      setSidebarWidth(0);
    }
  };

  const handleSidebarHelp = () => {
    if (sidebarHelpWidth === 0) {
      setSidebarHelpWidth(-100);
    } else {
      setSidebarHelpWidth(0);
    }
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
  }, []);

  return (
    <>
      {/* <Modal
        isOpen={openTasksModal}
        element={
          <TasksModal
            closeModal={() => {
              setOpenTasksModal(!openTasksModal);
            }}
            isEdit={isEdit}
          />
        }
      /> */}
      <SidebarTasks style={{ left: `${sidebarWidth}%` }}>
        <button onClick={handleSidebarTask}>
          <img src={Close} alt="" />
        </button>
        <div className="wrapper">{isEdit ? <TasksTodo /> : <Tasks />}</div>
      </SidebarTasks>
      <SidebarHelp style={{ left: `${sidebarHelpWidth}%` }}>
        <button onClick={handleSidebarHelp}>
          <img src={Close} alt="" />
        </button>
        <div className="wrapper">
          <h1>Help me</h1>
        </div>
      </SidebarHelp>

      {/* Modal para datos por primera vez */}
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
        <button className="tasks" onClick={handleSidebarTask}>
          <img src={TasksButton} alt="" />
        </button>
        <button className="help" onClick={handleSidebarHelp}>
          <img src={HelpButton} alt="" />
        </button>
      </FloatBox>
    </>
  );
};

export default CV_preview;
