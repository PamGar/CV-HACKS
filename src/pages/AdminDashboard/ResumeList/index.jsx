import { useState, useEffect, useContext } from 'react';
import UserCard from '../../../components/UserCard';
import NavModal from '../NavModal';
import styled from 'styled-components';
import axios from 'axios';
import MainContentWrapper from '../../../components/MainContentWrapper';
import MainAndRightLayout from '../../../layouts/MainAndRightLayout';
import { ResumeContext } from '../ResumeContextProvider';
import SkeletonLoading from '../../../components/SkeletonLoading';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

const SearchUserInput = styled.input`
  outline: 1px solid #888888;
  border-radius: 10px;
  padding: 10px;
  :focus-visible {
    outline: 1px solid #565696;
  }
`;

const ResumeList = () => {
  const [data, setData] = useState([]);
  const [hasMore, setHasMore] = useState(null);
  const [pageCounter, setPageCounter] = useState(1);
  const [loading, setLoading] = useState(true);
  const { userSelectedId, setUserSelectedId, resumeData, setResumeData } =
    useContext(ResumeContext);
  const [disableButton, setDisableButton] = useState(!userSelectedId);
  const [openModal, setOpenModal] = useState(false);

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
    } finally {
      setLoading(false);
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
    <MainAndRightLayout
      main={
        <Wrapper>
          <MainContentWrapper
            dataLength={data.length}
            hasMore={hasMore}
            next={fetchMoreData}
            loader={
              <>
                <SkeletonLoading width='100%' height='78px' />
                <SkeletonLoading width='100%' height='78px' />
                <SkeletonLoading width='100%' height='78px' />
              </>
            }
            onClickLoadingButton={() => {
              setOpenModal(true);
            }}
            loadingButtonTitle='mas opciones'
            singleButton
            disableButton={disableButton}
          >
            <h1>Listado de CVs</h1>
            <SearchUserInput type='text' placeholder='buscar usuario' />
            {loading && (
              <>
                <SkeletonLoading width='100%' height='78px' />
                <SkeletonLoading width='100%' height='78px' />
                <SkeletonLoading width='100%' height='78px' />
                <SkeletonLoading width='100%' height='78px' />
              </>
            )}
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
              <NavModal openModal={openModal} setOpenModal={setOpenModal} />
            )}
          </MainContentWrapper>
        </Wrapper>
      }
      right={<div>cv</div>}
    />
  );
};

export default ResumeList;
