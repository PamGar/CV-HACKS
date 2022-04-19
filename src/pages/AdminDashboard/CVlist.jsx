import { useState, useEffect } from 'react';
import UserCard from '../../components/UserCard';
import LoadingButton from '../../components/Buttons/LoadingButton';
import NavModal from './NavModal';
import styled from 'styled-components';
import axios from 'axios';
import MainContentWrapper from '../../components/MainContentWrapper';
import InfiniteScroll from 'react-infinite-scroll-component';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

const InfinityScrollContainer = styled(InfiniteScroll)`
  display: flex;
  flex-direction: column;
  gap: 30px;
  background-color: white;
  border-radius: 15px;
  box-shadow: rgb(0 0 0 / 20%) 0px 3px 1px -2px,
    rgb(0 0 0 / 14%) 0px 2px 2px 0px, rgb(0 0 0 / 12%) 0px 1px 5px 0px;
  padding: 25px 15px;
`;

const ButtonWrapper = styled.div`
  position: sticky;
  bottom: 10px;
`;

const SearchUserInput = styled.input`
  outline: 1px solid #888888;
  border-radius: 10px;
  padding: 10px;
  :focus-visible {
    outline: 1px solid #565696;
  }
`;

const CVlist = ({
  openModal,
  setOpenModal,
  setShowMainContent,
  userSelectedId,
  setUserSelectedId,
}) => {
  const [data, setData] = useState([]);
  const [hasMore, setHasMore] = useState(null);
  const [pageCounter, setPageCounter] = useState(1);
  const [disableButton, setDisableButton] = useState(true);

  const PAGE_SIZE = 5;

  const getCVlist = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/cv/admin-cv-all?page_number=${pageCounter}&page_size=${PAGE_SIZE}`,
        {
          headers: {
            authorization: `Token ${localStorage.getItem('authToken')}`,
          },
        }
      );
      setData([...data.data]);
      setHasMore(data.next_page);
      setPageCounter((prev) => prev + 1);
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchMoreData = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/cv/admin-cv-all?page_number=${pageCounter}&page_size=${PAGE_SIZE}`,
        {
          headers: {
            authorization: `Token ${localStorage.getItem('authToken')}`,
          },
        }
      );
      setData((prev) => [...prev, ...data.data]);
      setPageCounter((prev) => prev + 1);
      setHasMore(data.next_page);
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
      <MainContentWrapper
        dataLength={data.length}
        hasMore={hasMore}
        next={fetchMoreData}
        loader={<p>loading...</p>}
        onClickLoadingButton={() => {
          setOpenModal(true);
        }}
        loadingButtonTitle='mas opciones'
        singleButton
        disableButton={disableButton}
      >
        <h1>Listado de CVs</h1>
        <SearchUserInput type='text' placeholder='buscar usuario' />
        {data.map(({ name, area, isHired, id }) => (
          <UserCard
            name={name}
            area={area}
            isHired={isHired}
            userSelectedId={userSelectedId}
            setUserSelectedId={setUserSelectedId}
            setDisableButton={setDisableButton}
            id={id}
            key={id}
            data={data}
            setData={setData}
          />
        ))}
        {openModal && (
          <NavModal
            openModal={openModal}
            setOpenModal={setOpenModal}
            setShowMainContent={setShowMainContent}
          />
        )}
      </MainContentWrapper>
    </Wrapper>
  );
};

export default CVlist;
