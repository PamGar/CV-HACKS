import React, { useRef } from 'react';
import styled from 'styled-components';
import { keyframes } from 'styled-components';
import CVicon from '../../assets/icons/CV.svg';
import InterIcon from '../../assets/icons/Interview.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faBuilding } from '@fortawesome/free-regular-svg-icons';
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
  color: #fff;

  div {
    font-size: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  @media (max-width: 1099px) {
    display: flex;

    div {
      margin: 0 20px;
    }
  }
`;

const Button = styled.div`
  cursor: pointer;
  .hover {
    animation: ${jelloAnim} 0.5s ease 0s 1 normal forwards;
  }
`;

const IconButton = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 5px;
  background-color: ${(props) => props.bgcolor};
  margin-top: 30px;
  margin-bottom: 10px;
  border: none;
  cursor: pointer;
  padding: 5px;
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    width: 20px;
    height: 20px;
  }

  @media (max-width: 1099px) {
    margin-top: 0;
    margin-bottom: 5px;
  }

  .fontAwesomeIcon {
    height: 20px;
    width: 20px;
    color: white;
  }
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
        Curriculum
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
        <Button onClick={() => navigate('/share-resume')}>
          <IconButton bgcolor='#197a81'>
            <FontAwesomeIcon icon={faPaperPlane} className='fontAwesomeIcon' />
          </IconButton>
          Share CVs
        </Button>
      )}
      {role == 3 && (
        <Button onClick={() => navigate('/register-company')}>
          <IconButton bgcolor='#197a81'>
            <FontAwesomeIcon icon={faBuilding} className='fontAwesomeIcon' />
          </IconButton>
          Dar de alta
        </Button>
      )}
    </IconsBox>
  );
};

export default UserMenu;
