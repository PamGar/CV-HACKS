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
  width: 100%;
  outline: none;
  border-radius: 10px;
  padding: 10px;
  background-color: #f3f4f6;
  :focus-visible {
    outline: 1px solid #ababab;
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
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(2);

  const PAGE_SIZE = 10;

  const getCVlist = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/cv/s/?search=&page_number=1&page_size=10`,
        {
          headers: {
            authorization: `Token ${localStorage.getItem('authToken')}`,
          },
        }
      );
      setDataResumeList(data);
      setHasMoreResumeList(1);
    } catch (err) {
      toast.error('Opps ha ocurrido un error, no se pudo obtener los datos');
    } finally {
      setLoadingResumeList(false);
    }
  };

  const searchCVlist = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/cv/s/?search=${search.replace(
          ' ',
          '+'
        )}&page_number=1&page_size=${PAGE_SIZE}`,
        {
          headers: {
            authorization: `Token ${localStorage.getItem('authToken')}`,
          },
        }
      );
      setDataResumeList(data);
      /*setHasMoreResumeList(data.next_page);*/
      // setPageCounterResumeList(1);
    } catch (err) {
      toast.error('Opps ha ocurrido un error, no se pudo obtener los datos');
    }
  };

  const fetchMoreData = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/cv/s/?search=${search.replace(
          ' ',
          '+'
        )}&page_number=${page}&page_size=${PAGE_SIZE}`,
        {
          headers: {
            authorization: `Token ${localStorage.getItem('authToken')}`,
          },
        }
      );
      setDataResumeList((prev) => [...prev, ...data]);
      setPage(page + 1);
      // setPageCounterResumeList((prev) => prev + 1);
      // setHasMoreResumeList(data.next_page);
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
                <SkeletonLoading width="100%" height="78px" />
                <SkeletonLoading width="100%" height="78px" />
                <SkeletonLoading width="100%" height="78px" />
              </>
            }
            onClickLoadingButton={() => {
              setOpenModal(true);
            }}
            loadingButtonTitle="mas opciones"
            singleButton
            disableButton={disableButton}
          >
            <h1>Listado de CVs</h1>
            <div>
              <SearchUserInput
                type="text"
                placeholder="Busca por nombre, area, o escribe una palabra clave"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  searchCVlist();
                }}
              />
              <p style={{ color: '#b1b1b1', fontSize: '12px', margin: '10px' }}>
                Puedes escribir varios criterios de busqueda separados por un
                espacio
              </p>
            </div>
            {loadingResumeList && (
              <>
                <SkeletonLoading width="100%" height="78px" />
                <SkeletonLoading width="100%" height="78px" />
                <SkeletonLoading width="100%" height="78px" />
                <SkeletonLoading width="100%" height="78px" />
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
                cvId={id}
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
