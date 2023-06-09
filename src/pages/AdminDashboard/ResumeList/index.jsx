import { useState, useEffect, useContext, useRef } from 'react';
import UserCard from './UserCard';
import NavModal from '../NavModal';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDownAZ } from '@fortawesome/free-solid-svg-icons';
import English from '../../../assets/images/eeuu-flag.png';
import Spanish from '../../../assets/images/spain-flag.png';
import Mexico from '../../../assets/images/mexico-flag.png';
import axios from 'axios';
import MainContentWrapper from '../../../components/MainContentWrapper';
import MainAndRightLayout from '../../../layouts/MainAndRightLayout';
import { ResumeContext } from '../ResumeContextProvider';
import SkeletonLoading from '../../../components/SkeletonLoading';
import { Outlet, useNavigate } from 'react-router-dom';
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

const Highlight = styled.span`
  color: red;
  font-weight: 700;
`;

const Filters = styled.div`
  display: flex;

  svg {
    font-size: 20px;
  }

  .language {
    width: 25px;
    display: flex;

    img {
      width: 100%;
    }
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
  const [totalCvCounter, setTotalCvCounter] = useState('0');
  const [searchCounter, setSearchCounter] = useState('0');
  const [page, setPage] = useState(2);
  const alphabeticOrderRef = useRef();
  const onlyEnglishRef = useRef();
  const onlySpanishRef = useRef();
  // const alphabeticOrderRef = useRef();
  const [IsInalphabeticOrder, setIsInalphabeticOrder] = useState(false);
  const [onlySpanish, setOnlySpanish] = useState(false);
  const [onlyEnglish, setOnlyEnglish] = useState(false);
  const navigate = useNavigate();
  const myId = localStorage.getItem('id');

  const HandleCheckAlphabetic = async () => {
    setIsInalphabeticOrder(alphabeticOrderRef.current.checked);
    setOnlyEnglish(false);
    setOnlySpanish(false);
    setSearch('');

    try {
      const { data } = await axios.get(
        `${
          process.env.REACT_APP_BASE_URL
        }/cv/s/?search=&page_number=1&page_size=${PAGE_SIZE}${
          alphabeticOrderRef.current.checked ? '&alpha=true' : ''
        }`,
        {
          headers: {
            authorization: `Token ${localStorage.getItem('authToken')}`,
          },
        }
      );
      setPage(2);
      setDataResumeList(data.data);
      setTotalCvCounter(data.total_counter);
      setSearchCounter(data.search_counter);
      setHasMoreResumeList(1);
    } catch (error) {
      toast.error('Opps ha ocurrido un error, no se pudieron cargar los CV');
    }
  };

  const HandleOnlyEnglish = async () => {
    setOnlyEnglish(onlyEnglishRef.current.checked);
    setIsInalphabeticOrder(false);
    setOnlySpanish(false);
    setSearch('');

    try {
      const { data } = await axios.get(
        `${
          process.env.REACT_APP_BASE_URL
        }/cv/s/?search=&page_number=1&page_size=${PAGE_SIZE}${
          onlyEnglishRef.current.checked ? '&lang=eng' : ''
        }`,
        {
          headers: {
            authorization: `Token ${localStorage.getItem('authToken')}`,
          },
        }
      );
      setPage(2);
      setDataResumeList(data.data);
      setTotalCvCounter(data.total_counter);
      setSearchCounter(data.search_counter);
      setHasMoreResumeList(1);
    } catch (error) {
      toast.error('Opps ha ocurrido un error, no se pudieron cargar los CV');
    }
  };

  const HandleOnlySpanish = async () => {
    setOnlySpanish(onlySpanishRef.current.checked);
    setIsInalphabeticOrder(false);
    setOnlyEnglish(false);
    setSearch('');

    try {
      const { data } = await axios.get(
        `${
          process.env.REACT_APP_BASE_URL
        }/cv/s/?search=&page_number=1&page_size=${PAGE_SIZE}${
          onlySpanishRef.current.checked ? '&lang=esp' : ''
        }`,
        {
          headers: {
            authorization: `Token ${localStorage.getItem('authToken')}`,
          },
        }
      );
      setPage(2);
      setDataResumeList(data.data);
      setTotalCvCounter(data.total_counter);
      setSearchCounter(data.search_counter);
      setHasMoreResumeList(1);
    } catch (error) {
      toast.error('Opps ha ocurrido un error, no se pudieron cargar los CV');
    }
  };

  const PAGE_SIZE = 11;

  const getCVlist = async (props) => {
    try {
      const { data } = await axios.get(
        `${
          process.env.REACT_APP_BASE_URL
        }/cv/s/?search=&page_number=1&page_size=${PAGE_SIZE}${
          onlyEnglish ? '&lang=eng' : ''
        }${onlySpanish ? '&lang=esp' : ''}`,
        {
          headers: {
            authorization: `Token ${localStorage.getItem('authToken')}`,
          },
        }
      );
      setDataResumeList(data.data);
      setTotalCvCounter(data.total_counter);
      setSearchCounter(data.search_counter);
      setHasMoreResumeList(1);
    } catch (error) {
      const invalidToken = error.response.data.message;
      if (invalidToken === 'Token invalido') {
        toast.error(`${invalidToken}, Por favor refresca la pagina`);
        localStorage.removeItem('authToken');
        localStorage.removeItem('id');
        localStorage.removeItem('role');
        props.setAuth({
          ...props.authData,
          isAuth: '',
        });
        navigate('/');
      }
      toast.error('Opps ha ocurrido un error, no se pudieron cargar los CV');
    } finally {
      setLoadingResumeList(false);
    }
  };

  const searchCVlist = async (e) => {
    setSearch(e.target.value);

    try {
      const { data } = await axios.get(
        `${
          process.env.REACT_APP_BASE_URL
        }/cv/s/?search=${e.target.value.replace(
          ' ',
          '+'
        )}&page_number=1&page_size=${PAGE_SIZE}${
          IsInalphabeticOrder ? '&alpha=true' : ''
        }${onlyEnglish ? '&lang=eng' : ''}${onlySpanish ? '&lang=esp' : ''}`,
        {
          headers: {
            authorization: `Token ${localStorage.getItem('authToken')}`,
          },
        }
      );
      setPage(2);
      setDataResumeList(data.data);
      setSearchCounter(data.search_counter);
      setHasMoreResumeList(data.next_page);
      // setPageCounterResumeList(1);
    } catch (err) {
      toast.error('Ha ocurrido un error, no se pudieron obtener los datos');
    }
  };

  const fetchMoreData = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/cv/s/?search=${search.replace(
          ' ',
          '+'
        )}&page_number=${page}&page_size=${PAGE_SIZE}${
          IsInalphabeticOrder ? '&alpha=true' : ''
        }${onlyEnglish ? '&lang=eng' : ''}${onlySpanish ? '&lang=esp' : ''}`,
        {
          headers: {
            authorization: `Token ${localStorage.getItem('authToken')}`,
          },
        }
      );
      setDataResumeList((prev) => [...prev, ...data.data]);
      setPage(page + 1);
      // setPageCounterResumeList((prev) => prev + 1);
      setHasMoreResumeList(data.next_page);
    } catch (err) {
      setHasMoreResumeList(err.response.data.next_page);
      toast.warning('No hay mas resultados para esta busqueda');
    }
  };

  useEffect(() => {
    // dataResumeList.length <= 0 && getCVlist();
    getCVlist();
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
            <div>
              <h1>Listado de CVs</h1>
              <p>
                Hay en total <Highlight>{totalCvCounter}</Highlight> CVs en la
                plataforma
              </p>
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
              }}
            >
              <p
                style={{ color: '#b1b1b1', fontSize: '12px', margin: '0 10px' }}
              >
                Puedes escribir varios criterios de busqueda separados por un
                espacio
              </p>
              <SearchUserInput
                type="text"
                placeholder="Busca por nombre, area, o escribe una palabra clave"
                value={search}
                onChange={searchCVlist}
              />
              <Filters>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    margin: '0 10px',
                  }}
                >
                  <input
                    type="checkbox"
                    name="check"
                    ref={alphabeticOrderRef}
                    onChange={HandleCheckAlphabetic}
                    checked={IsInalphabeticOrder}
                  />{' '}
                  <label htmlFor="check">
                    <FontAwesomeIcon icon={faArrowDownAZ} />
                  </label>
                </div>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    margin: '0 10px',
                  }}
                >
                  <input
                    type="checkbox"
                    name="check"
                    ref={onlyEnglishRef}
                    onChange={HandleOnlyEnglish}
                    checked={onlyEnglish}
                  />{' '}
                  <label htmlFor="check">
                    <div className="language">
                      <img src={English} alt="" />
                    </div>
                  </label>
                </div>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    margin: '0 10px',
                  }}
                >
                  <input
                    type="checkbox"
                    name="check"
                    ref={onlySpanishRef}
                    onChange={HandleOnlySpanish}
                    checked={onlySpanish}
                  />{' '}
                  <label htmlFor="check">
                    <div className="language">
                      <img
                        src={
                          myId == 26 /* Solo para Sonia */ ? Mexico : Spanish
                        }
                        alt=""
                      />
                    </div>
                  </label>
                </div>
              </Filters>
              {searchCounter !== totalCvCounter ? (
                <p
                  style={{
                    margin: '0 10px',
                  }}
                >
                  Su busqueda ha arrojado <Highlight>{searchCounter}</Highlight>{' '}
                  resultados
                </p>
              ) : null}
            </div>
            {loadingResumeList && (
              <>
                <SkeletonLoading width="100%" height="78px" />
                <SkeletonLoading width="100%" height="78px" />
                <SkeletonLoading width="100%" height="78px" />
                <SkeletonLoading width="100%" height="78px" />
              </>
            )}
            {dataResumeList.map(
              ({ isHired, id, user, created_date, cv_language }) => (
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
                  email={user.email}
                  lastUpdate={created_date}
                  language={cv_language?.id}
                />
              )
            )}
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
