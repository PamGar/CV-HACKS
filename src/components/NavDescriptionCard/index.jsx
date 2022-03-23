import React from 'react';
import styled from 'styled-components';

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

  :hover {
    transform: scale(1.02);
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
const Icon = styled.div``;
const Description = styled.div``;
const NavDescriptionCard = ({ children, icon, description, onClick }) => {
  return (
    <Wrapper onClick={() => onClick()}>
      <Title>
        <Icon>{icon}</Icon>
        <p>{children}</p>
      </Title>
      <Description>
        <p>{description}</p>
      </Description>
    </Wrapper>
  );
};

export default NavDescriptionCard;
