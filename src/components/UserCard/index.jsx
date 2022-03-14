import { useState, useRef } from 'react';
import styled from 'styled-components';
import LoadingButton from '../Buttons/LoadingButton';

const UserCardContainer = styled.div`
  padding: 10px;
  background-color: ${(props) => (props.isSelected ? '#8f9c9a' : '#f0f0f0')};
  border-radius: 3px;
  display: grid;
  grid-template-areas: 'name area isHired';
  grid-template-columns: 2fr 1fr 1.5fr;
  text-align: center;
  place-items: center;
  color: #171717;
  box-shadow: 0px 3px 1px -2px rgb(0 0 0 / 20%),
    0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%);
  transition: all 190ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;

  opacity: 1;

  &[class~='fadeIn'] {
    opacity: 0;
  }
`;
const Name = styled.p`
  grid-area: name;
  justify-self: start;
  color: ${(props) => (props.isSelected ? 'white' : '#171717')};
`;
const Area = styled.p`
  grid-area: area;
  color: ${(props) => (props.isSelected ? 'white' : '#171717')};
`;
const IsHired = styled.p`
  grid-area: isHired;
  background-color: ${(props) => (props.isHired ? 'green' : '#fffba6')};
  padding: 5px 7px;
  border-radius: 3px;
  color: ${(props) => (props.isHired ? 'white' : 'black')};
  width: 100%;
`;

const UserCard = ({ name, area, isHired, isSelected, setIsSelected, id }) => {
  const UserCardContainerRef = useRef();
  return (
    <UserCardContainer
      onClick={() => {
        setIsSelected(id);
        UserCardContainerRef.current.classList.add('fadeIn');
      }}
      isSelected={isSelected === id}
      ref={UserCardContainerRef}
    >
      <Name isSelected={isSelected === id}>{name}</Name>
      <Area isSelected={isSelected === id}>{area}</Area>
      <IsHired isHired={isHired}>
        {isHired ? 'contratado' : 'Looking for a job'}
      </IsHired>
    </UserCardContainer>
  );
};

export default UserCard;
