import { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import MainContentWrapper from '../../components/MainContentWrapper';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan, faPencil } from '@fortawesome/free-solid-svg-icons';
import DeleteJobOfferConfirmModal from './DeleteJobOfferModal';
import EditJobOfferModal from './EditJobOfferModal';
import AlertMessage from '../../components/AlertMessage';
import JobCardSkeleton from './JobCardSkeleton';
import { toast } from 'react-toastify';

export const JobCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 10px;
  border-radius: 10px;
  background-color: #f3f4f6;
`;

export const Title = styled.div`
  display: flex;
  justify-content: space-between;

  @media (max-width: 650px) {
    flex-direction: column;
    gap: 10px;
  }
`;

export const Duration = styled(Title)``;
export const IconsContainer = styled(Title)`
  justify-content: flex-end;
  gap: 20px;

  .editIcon,
  .deleteIcon {
    width: 20px;
    height: 20px;
    cursor: pointer;
  }
  .editIcon {
    color: #3a3a3a;
  }
  .deleteIcon {
    color: #ff5050;
  }

  @media (max-width: 650px) {
    flex-direction: row;
  }
`;

const Status = styled.div`
  display: flex;
`;

const Description = styled.p`
  word-wrap: break-word;
  white-space: pre-wrap;
  word-break: break-word;
`;

const JobOffersCompany = () => {
  const [jobOfferData, setJobOfferData] = useState([]);
  const [selectedJobOffer, setSelectedJobOffer] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [pageCounter, setPageCounter] = useState(1);
  const [openModalDeleteJobOffer, setOpenModalDeleteJobOffer] = useState(false);
  const [openModalEditJobOffer, setOpenModalEditJobOffer] = useState(false);
  const [loading, setLoading] = useState(false);
  const [jobOfferDataIsEmpty, setJobOfferDataIsEmpty] = useState(false);

  const PAGE_SIZE = 5;
  const GetJobOffers = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `${
          process.env.REACT_APP_BASE_URL
        }/company/vacancies/${localStorage.getItem(
          'id'
        )}?page_number=${pageCounter}&page_size=${PAGE_SIZE}`,
        {
          headers: {
            authorization: `Token ${localStorage.getItem('authToken')}`,
          },
        }
      );
      if (data.data.length < 1) setJobOfferDataIsEmpty(true);
      setJobOfferData(data.data);
      setHasMore(data.next_page);
      setPageCounter((prev) => prev + 1);
      setLoading(false);
    } catch (err) {
      console.log(err);
      toast.error('Opp ha ocurrido un error');
    }
  };

  const NextPage = async () => {
    try {
      const { data } = await axios.get(
        `${
          process.env.REACT_APP_BASE_URL
        }/company/vacancies/${localStorage.getItem(
          'id'
        )}?page_number=${pageCounter}&page_size=${PAGE_SIZE}`,
        {
          headers: {
            authorization: `Token ${localStorage.getItem('authToken')}`,
          },
        }
      );
      setHasMore(data.next_page);
      setPageCounter((prev) => prev + 1);
      setJobOfferData((prev) => [...prev, ...data.data]);
    } catch (err) {}
  };

  useEffect(() => {
    GetJobOffers();
  }, []);

  return (
    <>
      <MainContentWrapper
        noButton
        dataLength={jobOfferData.length}
        next={NextPage}
        hasMore={hasMore}
        loader={
          <>
            <JobCardSkeleton />
            <JobCardSkeleton />
            <JobCardSkeleton />
          </>
        }
      >
        <h1>Mis vacantes</h1>
        {loading && (
          <>
            <JobCardSkeleton />
            <JobCardSkeleton />
            <JobCardSkeleton />
          </>
        )}
        {jobOfferDataIsEmpty && <h3>No hay vacantes creadas</h3>}
        {jobOfferData.map(
          ({
            name,
            description,
            area,
            start_date,
            end_date,
            minimun_salary,
            status,
            id,
          }) => (
            <JobCard key={id}>
              <Title>
                <h2>{name}</h2>
                <h3>{area}</h3>
              </Title>
              <Status>
                <AlertMessage info>{status}</AlertMessage>
              </Status>
              <Description>{description}</Description>
              <p>MXN ${minimun_salary}</p>
              <Duration>
                <p>fecha de inicio: {start_date}</p>
                <p>{end_date && `fecha de finalización: ${end_date}`}</p>
              </Duration>
              <IconsContainer>
                <FontAwesomeIcon
                  icon={faPencil}
                  className='editIcon'
                  onClick={() => {
                    setSelectedJobOffer(id);
                    setOpenModalEditJobOffer(true);
                  }}
                />
                <FontAwesomeIcon
                  icon={faTrashCan}
                  className='deleteIcon'
                  onClick={() => {
                    setSelectedJobOffer(id);
                    setOpenModalDeleteJobOffer(true);
                  }}
                />
              </IconsContainer>
            </JobCard>
          )
        )}
      </MainContentWrapper>
      {openModalDeleteJobOffer && (
        <DeleteJobOfferConfirmModal
          setJobOfferData={setJobOfferData}
          openModal={openModalDeleteJobOffer}
          setOpenModal={setOpenModalDeleteJobOffer}
          id={selectedJobOffer}
        />
      )}
      {openModalEditJobOffer && (
        <EditJobOfferModal
          jobOfferData={jobOfferData}
          setJobOfferData={setJobOfferData}
          setOpenModalEditJobOffer={setOpenModalEditJobOffer}
          openModal={openModalEditJobOffer}
          id={selectedJobOffer}
        />
      )}
    </>
  );
};

export default JobOffersCompany;
