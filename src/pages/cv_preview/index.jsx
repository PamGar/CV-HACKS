import React from 'react';
import Layout from '../../layouts/navigation/index';
import CV from '../../components/cv_preview';
import Tasks from '../../components/tasks_list';
import Hacky from '../../assets/images/Hacky.png';
import styled from 'styled-components';

const HelpCont = styled.button`
  position: absolute;
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
`;

const CV_preview = () => {
  return (
    <>
      <Layout main={<CV />} right={<Tasks />} />
      <HelpCont>
        <p>¿Ayuda necesitas?</p>
        <img src={Hacky} alt="" />
      </HelpCont>
    </>
  );
};

export default CV_preview;
