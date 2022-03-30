import { useState, useEffect } from 'react';
import UserCard from '../../components/UserCard';
import LoadingButton from '../../components/Buttons/LoadingButton';
import NavModal from './NavModal';
import styled from 'styled-components';
import axios from 'axios';

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

const CVlist = ({
  openModal,
  setOpenModal,
  setShowMainContent,
  userSelectedId,
  setUserSelectedId,
}) => {
  const [data, setData] = useState([]);
  const [diasableButton, setDiasableButton] = useState(true);
  const [userCardRef, setUserCardRef] = useState({});

  const getCVlist = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/cv/admin-cv-all?page_number=1&page_size=1`,
        {
          headers: {
            authorization: `Token ${localStorage.getItem('authToken')}`,
          },
        }
      );
      setData([...data.data]);
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getCVlist();
  }, []);

  return (
    <Wrapper>
      <InfinityScrollContainer>
        <h1>Listado de CVs</h1>
        <SearchUserInput type='text' placeholder='buscar usuario' />
        {data.map(({ name, area, isHired, id }) => (
          <UserCard
            name={name}
            area={area}
            isHired={isHired}
            userSelectedId={userSelectedId}
            setUserSelectedId={setUserSelectedId}
            setDiasableButton={setDiasableButton}
            setUserCardRef={setUserCardRef}
            id={id}
            key={id}
            data={data}
            setData={setData}
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
