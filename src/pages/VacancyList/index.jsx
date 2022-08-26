import { useState, useEffect } from 'react';
import Layout from '../../layouts/navigation';
import MainContentWrapper from '../../components/MainContentWrapper';
import styled from 'styled-components';
import MainAndRightLayout from '../../layouts/MainAndRightLayout';
import axios from 'axios';

const VacancyCard = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 1fr 2fr;
  border-radius: 3px;
  padding: 10px;
  background-color: white;
  cursor: pointer;

  p:nth-child(2) {
    font-weight: bold;
    font-size: 16px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;
const VacancyList = () => {
  const [data, setData] = useState([]);
  const [selectedVacancyID, setSelectedVacancyID] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const PAGE_SIZE = 5;

  const abortController = new AbortController();

  const getVacancyList = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/company/cv-vacancies-admin?page_size=${PAGE_SIZE}&&page_number=${pageNumber}`,
        {
          headers: {
            authorization: `Token ${localStorage.getItem('authToken')}`,
          },
          signal: abortController.signal,
        }
      );
      setData(data.data);
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getVacancyList();
    return () => abortController.abort();
  }, []);
  return (
    <MainAndRightLayout
      main={
        <MainContentWrapper noButton>
          <h1>Lista de Vacantes</h1>
          {data.map((vacancy) => (
            <VacancyCard
              key={vacancy.id}
              onClick={() => setSelectedVacancyID(vacancy.coordinate)}
            >
              <p>{vacancy.name || `compañía ${vacancy.id}`}</p>
              <p>{vacancy.title}</p>
            </VacancyCard>
          ))}
        </MainContentWrapper>
      }
      right={<h1>vacantes</h1>}
    />
  );
};

export default VacancyList;
