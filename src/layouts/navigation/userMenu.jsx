import React, { useRef } from 'react';
import styled from 'styled-components';
import { keyframes } from 'styled-components';
import CVicon from '../../assets/icons/CV.svg';
import InterIcon from '../../assets/icons/Interview.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBuilding, faFileLines } from '@fortawesome/free-regular-svg-icons';
import { useNavigate } from 'react-router-dom';

const jelloAnim = keyframes`
0% {
  transform: scale3d(1, 1, 1);
}

30% {
  transform: scale3d(1.25, 0.75, 1);
}

40% {
  transform: scale3d(0.75, 1.25, 1);
}

50% {
  transform: scale3d(1.15, 0.85, 1);
}

65% {
  transform: scale3d(0.95, 1.05, 1);
}

75% {
  transform: scale3d(1.05, 0.95, 1);
}

100% {
  transform: scale3d(1, 1, 1);
}
`;

const IconsBox = styled.div`
  text-align: center;

  div {
    font-size: 12px;
    font-weight: 500;
    display: flex;
    flex-direction: column;
    align-items: center;
    color: #fff;
  }

  @media (max-width: 1099px) {
    display: flex;
  }
`;

const Button = styled.div`
  cursor: pointer;
  margin: 0 20px;
  .hover {
    animation: ${jelloAnim} 0.5s ease 0s 1 normal forwards;
  }
`;

const IconButton = styled.button`
  position: relative;
  width: 40px;
  height: 40px;
  border-radius: 5px;
  background-color: transparent;
  margin-top: 30px;
  margin-bottom: 5px;
  border: none;
  cursor: pointer;
  padding: 5px;
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    width: 30px;
    height: 30px;
  }

  @media (max-width: 1099px) {
    margin-top: 0;
    margin-bottom: 0px;
  }

  .fontAwesomeIcon {
    height: 30px;
    width: 30px;
    color: white;
  }
`;

const Notification = styled.div`
  background-color: #ff6666;
  color: #fff;
  font-weight: 700;
  width: 18px;
  height: 18px;
  position: absolute;
  right: -5px;
  top: -5px;
  border-radius: 50%;
  margin: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const UserMenu = () => {
  const addAnim = (e) => {
    e.target.classList.add('hover');

    setTimeout(() => e.target.classList.remove('hover'), 600);
  };
  const navigate = useNavigate();

  const role = localStorage.getItem('role');

  return (
    <IconsBox>
      <Button onMouseOver={addAnim}>
        <IconButton bgcolor='#E83E8C'>
          <img src={CVicon} alt='' />
        </IconButton>
        MyCV
      </Button>
      {role != 5 && (
        <Button onMouseOver={addAnim}>
          <IconButton bgcolor='#59F97E'>
            <img src={InterIcon} alt='' />
          </IconButton>
          Interviews
        </Button>
      )}
      {role == 3 && (
        <Button onClick={() => navigate('/register-company')}>
          <IconButton>
            <FontAwesomeIcon
              icon={faBuilding}
              className='fontAwesomeIcon'
              onMouseOver={addAnim}
            />
          </IconButton>
          Dar de alta
        </Button>
      )}
      {role == 3 && (
        <Button onClick={() => navigate('/job-offers')}>
          <IconButton>
            <FontAwesomeIcon
              icon={faFileLines}
              className='fontAwesomeIcon'
              onMouseOver={addAnim}
            />
          </IconButton>
          Vacantes
        </Button>
      )}
      <Button onMouseOver={addAnim}>
        <IconButton bgcolor='#59F97E'>
          <Notification>3</Notification>
          <img src={InterIcon} alt='' />
        </IconButton>
        Entrevistas
      </Button>
    </IconsBox>
  );
};

export default UserMenu;
