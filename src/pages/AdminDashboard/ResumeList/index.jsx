import { useState, useEffect, useContext } from 'react';
import UserCard from './UserCard';
import NavModal from '../NavModal';
import styled from 'styled-components';
import axios from 'axios';
import MainContentWrapper from '../../../components/MainContentWrapper';
import MainAndRightLayout from '../../../layouts/MainAndRightLayout';
import { ResumeContext } from '../ResumeContextProvider';
import SkeletonLoading from '../../../components/SkeletonLoading';
import { Outlet } from 'react-router-dom';
import { toast } from 'react-toastify';

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
  const {
    userSelectedId,
    dataResumeList,
    setDataResumeList,
    hasMoreResumeList,
    setHasMoreResumeList,
    pageCounterResumeList,
    setPageCounterResumeList,
    loadingResumeList,
    setLoadingResumeList,
  } = useContext(ResumeContext);
  const [disableButton, setDisableButton] = useState(!userSelectedId);
  const [openModal, setOpenModal] = useState(false);

  const PAGE_SIZE = 5;

  const getCVlist = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/cv/admin-cv-all?page_number=${pageCounterResumeList}&page_size=${PAGE_SIZE}`,
        {
          headers: {
            authorization: `Token ${localStorage.getItem('authToken')}`,
          },
        }
      );
      setDataResumeList([...data.data]);
      setHasMoreResumeList(data.next_page);
      setPageCounterResumeList((prev) => prev + 1);
    } catch (err) {
      toast.error('Opps ha ocurrido un error, no se pudo obtener los datos');
    } finally {
      setLoadingResumeList(false);
    }
  };

  const fetchMoreData = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/cv/admin-cv-all?page_number=${pageCounterResumeList}&page_size=${PAGE_SIZE}`,
        {
          headers: {
            authorization: `Token ${localStorage.getItem('authToken')}`,
          },
        }
      );
      setDataResumeList((prev) => [...prev, ...data.data]);
      setPageCounterResumeList((prev) => prev + 1);
      setHasMoreResumeList(data.next_page);
    } catch (err) {
      toast.error('Opps ha ocurrido un error, no se pudo actulizar la lista');
    }
  };

  useEffect(() => {
    dataResumeList.length <= 0 && getCVlist();
  }, []);

  return (
    <MainAndRightLayout
      main={
        <Wrapper>
          <MainContentWrapper
            dataLength={dataResumeList.length}
            hasMore={hasMoreResumeList}
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
            {loadingResumeList && (
              <>
                <SkeletonLoading width='100%' height='78px' />
                <SkeletonLoading width='100%' height='78px' />
                <SkeletonLoading width='100%' height='78px' />
                <SkeletonLoading width='100%' height='78px' />
              </>
            )}
            {dataResumeList.map(({ isHired, id, user }) => (
              <UserCard
                name={user.name}
                userPhoto={user.image}
                paternal_surname={user.paternal_surname}
                isHired={isHired}
                setDisableButton={setDisableButton}
                id={user.id}
                key={id}
                data={dataResumeList}
                setData={setDataResumeList}
              />
            ))}
            {openModal && (
              <NavModal
                openModal={openModal}
                setOpenModal={setOpenModal}
                userId={userSelectedId}
              />
            )}
          </MainContentWrapper>
        </Wrapper>
      }
      right={<Outlet />}
    />
  );
};

export default ResumeList;
