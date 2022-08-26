import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CV from '../../components/cv_preview';
import EditCV from '../../components/cv_edit';
import TasksTodo from '../../components/tasks_todo';
import Hacky from '../../assets/images/Hacky.png';
import styled from 'styled-components';
import Modal from '../../components/Modal';
import FirstTime from '../../components/Modal/first_time_user';
import axios from 'axios';
import TasksButton from '../../assets/icons/task-list.svg';
import HelpButton from '../../assets/icons/bulb.svg';
import Close from '../../assets/icons/close.svg';
import UserMenu from '../../layouts/navigation/userMenu';
import MainAndRightLayout from '../../layouts/MainAndRightLayout';
import HelpCV from '../../components/cv_help';
import { toast } from 'react-toastify';

const HelpCont = styled.button`
  position: fixed;
  bottom: 0;
  right: 20px;
  overflow: hidden;
  text-align: center;
  padding: 0 20px;
  background: none;
  cursor: pointer;
  z-index: 10;

  p {
    background-color: #545796;
    color: #fff;
    padding: 10px 0;
    border-radius: 5px;
    font-weight: 700;
    box-shadow: 5px 5px 15px grey;
  }

  img {
    position: relative;
    bottom: -10px;
  }

  @media (max-width: 1099px) {
    display: none;
  }
`;

const FloatBox = styled.div`
  display: none;
  @media (max-width: 1099px) {
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
      margin: 30px 20px;
      border-radius: 50%;
      box-shadow: 0 0 15px #00000036;
      font-weight: 700;

      img {
        width: 50%;
      }
    }

    .tasks {
      background-color: #fff;
    }
    .help {
      background-color: #fff;
    }
  }
`;

const SidebarTasks = styled.div`
  position: fixed;
  width: 95%;
  max-width: 600px;
  top: 0;
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
    overflow: auto;
    height: 100%;
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
  const [cvData, setCvData] = useState({
    cv: {
      id: 0,
      created_date: '',
      description: '',
      status: '',
      url_public: null,
      url_private: null,
      area: null,
      tags: [],
    },
    comments: [],
    certifications: [],
    awards: [],
    publications: [],
    languages: [],
    skills: [],
    intersts: [],
    urls: [],
    projects: [],
    courses: [],
    organisations: [],
    experiences: [],
    educations: [],
  });
  const navigate = useNavigate();
  const [firstData, setFirstData] = useState(false);
  const [openLoginModal, setOpenLoginModal] = useState(true);
  const [isEdit, setIsEdit] = useState(false);
  const [dataNotLoaded, setDataNotLoaded] = useState(true);
  const [sidebarWidth, setSidebarWidth] = useState(-100);
  const [sidebarHelpWidth, setSidebarHelpWidth] = useState(-100);

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

  const myId = window.localStorage.getItem('id');
  const myToken = window.localStorage.getItem('authToken');

  const getUserData = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/user/${myId}`,
        {
          headers: {
            Authorization: `Token ${myToken}`,
          },
        }
      );
      setUser(data);
      console.log('user', data);
      data.name === null ? setFirstData(true) : setFirstData(false);
      if (data.name !== null) {
        getCV();
      }
    } catch (error) {
      const invalidToken = error.response.data.message;
      toast.error(`${invalidToken}, Por favor refresca la pagina`);
      if (invalidToken === 'Token invalido') {
        localStorage.removeItem('authToken');
        localStorage.removeItem('id');
        localStorage.removeItem('role');
      } else {
        return;
      }
      navigate('/');
    }
  };

  const getCV = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/cv/`,
        {
          headers: {
            Authorization: `Token ${myToken}`,
          },
        }
      );
      setCvData(data);
      // console.log('cv', data);
      setDataNotLoaded(false);
    } catch (error) {
      console.error('errorData', error.message);
      toast.error(error.response.data.message);
    }
  };

  const refreshCvData = () => {
    getUserData();
    getCV();
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
        <div className="wrapper">
          {dataNotLoaded ? null : <TasksTodo cvId={cvData.cv.id} />}
        </div>
      </SidebarTasks>
      <SidebarHelp style={{ left: `${sidebarHelpWidth}%` }}>
        <button onClick={handleSidebarHelp}>
          <img src={Close} alt="" />
        </button>
        <div className="wrapper">
          <HelpCV />
        </div>
      </SidebarHelp>

      {/* Modal para datos por primera vez */}
      {firstData && (
        <Modal
          isOpen={openLoginModal}
          element={
            <FirstTime
              refreshCvData={refreshCvData}
              closeModal={() => {
                setOpenLoginModal(!openLoginModal);
              }}
            />
          }
        />
      )}

      <MainAndRightLayout
        main={
          isEdit ? (
            <EditCV
              tagsData={cvData.cv.tags}
              cvId={cvData.cv.id}
              editButton={handleEdit}
              refreshCvData={refreshCvData}
            />
          ) : (
            <CV
              cvData={cvData}
              userData={user}
              editButton={handleEdit}
              dataLoaded={dataNotLoaded}
            />
          )
        }
        right={dataNotLoaded ? null : <TasksTodo cvId={cvData.cv.id} />}
        menu={<UserMenu />}
        name={`${user.name} ${user.paternal_surname}`}
        profilePicture={`${user.image}`}
      />

      {
        <HelpCont onClick={handleSidebarHelp}>
          <p>¿Ayuda necesitas?</p>
          <img src={Hacky} alt="" />
        </HelpCont>
      }
      {/* <FloatBox>
        <button className="tasks" onClick={handleSidebarTask}>
          <img src={TasksButton} alt="" />
        </button>
        <button className="help" onClick={handleSidebarHelp}>
          <img src={HelpButton} alt="" />
        </button>
      </FloatBox> */}
    </>
  );
};

export default CV_preview;
