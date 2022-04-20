import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding: clamp(8px, 4%, 16px);
  border-radius: 3px;
  background-color: #f7f7f7;
  box-shadow: 0px 3px 1px -2px rgb(0 0 0 / 20%),
    0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%);
  transition: all 0.1s ease-in-out;
  cursor: pointer;
  text-decoration: none;

  :hover {
    transform: scale(1.02);
  }

  :active {
    color: #565696;
    background-color: #5656960a;
  }
`;

const Title = styled.div`
  display: flex;
  gap: 5px;
  p {
    font-size: 20px;
    font-weight: 800;
  }
`;
const FontAwesomeIconStyled = styled(FontAwesomeIcon)`
  width: 27px;
  height: 27px;
  color: #565696;
`;
const Description = styled.div``;
const NavDescriptionCard = ({ children, icon, description, path, onClick }) => {
  const navigate = useNavigate();
  return (
    <Wrapper
      onClick={() => {
        onClick();
        setTimeout(() => navigate(path), 250);
      }}
    >
      <Title>
        <FontAwesomeIconStyled icon={icon} />
        <p>{children}</p>
      </Title>
      <Description>
        <p>{description}</p>
      </Description>
    </Wrapper>
  );
};

export default NavDescriptionCard;
