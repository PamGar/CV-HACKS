import React from 'react';
import styled from 'styled-components';
import CVicon from '../../assets/icons/CV.svg';
import InterIcon from '../../assets/icons/Interview.svg';

const IconsBox = styled.div`
  text-align: center;
  color: #fff;

  div {
    font-size: 12px;
  }

  @media (max-width: 1099px) {
    display: flex;

    div {
      display: flex;
      flex-direction: column;
      margin: 0 20px;
      align-items: center;
    }
  }
`;

const IconButton = styled.button`
  width: 60px;
  height: 60px;
  border-radius: 5px;
  background-color: ${(props) => props.bgcolor};
  margin-top: 30px;
  margin-bottom: 10px;
  border: none;
  cursor: pointer;

  @media (max-width: 1099px) {
    margin-top: 0;
    margin-bottom: 5px;
  }
`;

const userMenu = () => {
  return (
    <IconsBox>
      <div>
        <IconButton bgcolor="#E83E8C">
          <img src={CVicon} alt="" />
        </IconButton>
        Curriculum
      </div>
      <div>
        <IconButton bgcolor="#59F97E">
          <img src={InterIcon} alt="" />
        </IconButton>
        Interviews
      </div>
    </IconsBox>
  );
};

export default userMenu;
