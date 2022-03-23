import { useState } from 'react';
import UserCard from '../../components/UserCard';
import LoadingButton from '../../components/Buttons/LoadingButton';
import NavModal from './NavModal';
import styled from 'styled-components';

const accordionData = [
  {
    name: 'Carlos Eduardo Botero Viloria',
    area: 'frontend',
    isHired: false,
    id: 1,
  },
  {
    name: 'jose',
    area: 'backend',
    isHired: false,
    id: 2,
  },
  {
    name: 'eduardo',
    area: 'ux/ui',
    isHired: true,
    id: 3,
  },
  {
    name: 'eduardo',
    area: 'tester',
    isHired: true,
    id: 4,
  },
  {
    name: 'guille',
    area: 'fronted',
    isHired: true,
    id: 5,
  },
  {
    name: 'eduardo',
    area: 'ux/ui',
    isHired: true,
    id: 6,
  },
  {
    name: 'pepe',
    area: 'devops',
    isHired: true,
    id: 7,
  },
  {
    name: 'eduardo',
    area: 'ux/ui',
    isHired: true,
    id: 8,
  },
  {
    name: 'elpepe',
    area: 'backend',
    isHired: true,
    id: 9,
  },
  {
    name: 'eduardo',
    area: 'ux/ui',
    isHired: true,
    id: 10,
  },
];

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

const InfinityScrollContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  margin: 20px 15px 0;
  background-color: rgb(238, 238, 255);
  border-radius: 3px;
  box-shadow: 0px 3px 5px 0px rgb(0 0 0 / 20%), 0px 2px 5px 0px rgb(0 0 0 / 14%),
    0px 1px 8px 0px rgb(0 0 0 / 12%);
  padding: 25px 15px;
`;

const ButtonWrapper = styled.div`
  margin: 0 15px 10px;
  position: sticky;
  bottom: 10px;
`;

const SearchUserInput = styled.input`
  box-shadow: 0px 3px 5px 0px rgb(0 0 0 / 20%), 0px 2px 5px 0px rgb(0 0 0 / 14%),
    0px 1px 8px 0px rgb(0 0 0 / 12%);
  border-radius: 3px;
  padding: 10px;
`;

const CVlist = ({ openModal, setOpenModal, setShowMainContent }) => {
  const [isSelected, setIsSelected] = useState('');
  const [diasableButton, setDiasableButton] = useState(true);
  const [userCardRef, setUserCardRef] = useState({});

  return (
    <Wrapper>
      <InfinityScrollContainer>
        <h1>Listado de CVs</h1>
        <SearchUserInput type='text' placeholder='buscar usuario' />
        {accordionData.map(({ name, area, isHired, id }) => (
          <UserCard
            name={name}
            area={area}
            isHired={isHired}
            isSelected={isSelected}
            setIsSelected={setIsSelected}
            setDiasableButton={setDiasableButton}
            setUserCardRef={setUserCardRef}
            id={id}
            key={id}
          />
        ))}
        <NavModal
          openModal={openModal}
          setOpenModal={setOpenModal}
          setShowMainContent={setShowMainContent}
        />
      </InfinityScrollContainer>
      <ButtonWrapper>
        <LoadingButton
          fullWidth
          onClick={() => {
            setOpenModal(true);
            userCardRef.current.scrollIntoView({
              behavior: 'smooth',
              block: 'nearest',
            });
          }}
          disabled={diasableButton}
        >
          más opciones
        </LoadingButton>
      </ButtonWrapper>
    </Wrapper>
  );
};

export default CVlist;
