import { useRef } from 'react';
import styled from 'styled-components';
import AlertMessage from '../../components/AlertMessage';

const UserCardContainer = styled.div`
  padding: 10px;
  background-color: ${(props) => (props.isSelected ? '#8f9c9a' : '#f7f7f7')};
  border-radius: 3px;
  display: grid;
  grid-template-areas: 'name area isHired';
  grid-template-columns: 2fr 1fr 1.5fr;
  text-align: center;
  place-items: center;
  color: #171717;
  box-shadow: 0px 3px 1px -2px rgb(0 0 0 / 20%),
    0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%);
  transition: background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  cursor: pointer;

  :hover {
    box-shadow: 0px 3px 1px -1px rgb(0 0 0 / 20%),
      0px 2px 4px 0px rgb(0 0 0 / 14%), 0px 1px 7px 0px rgb(0 0 0 / 12%);
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

const UserCard = ({
  name,
  area,
  isHired,
  isSelected,
  setIsSelected,
  id,
  setDiasableButton,
  setUserCardRef,
}) => {
  const UserCardContainerRef = useRef();
  return (
    <UserCardContainer
      onClick={() => {
        setIsSelected(id);
        setDiasableButton(false);
        setUserCardRef(UserCardContainerRef);
      }}
      isSelected={isSelected === id}
      ref={UserCardContainerRef}
    >
      <Name isSelected={isSelected === id}>{name}</Name>
      <Area isSelected={isSelected === id}>{area}</Area>
      <AlertMessage success={isHired} info={!isHired} fullWidth>
        {isHired ? 'contratado' : 'Looking for a job'}
      </AlertMessage>
    </UserCardContainer>
  );
};

export default UserCard;
