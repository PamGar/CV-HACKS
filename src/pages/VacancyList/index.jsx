import { useState } from 'react';
import Layout from '../../layouts/navigation';
import MainContentWrapper from '../../components/MainContentWrapper';
import styled from 'styled-components';
import MainAndRightLayout from '../../layouts/MainAndRightLayout';

const arrMock = [
  { company: 'empresa1', title: 'front-end developer', id: 1 },
  { company: 'empresa2', title: 'back-end developer', id: 2 },
  { company: 'empresa3', title: 'djando developer', id: 3 },
  { company: 'empresa4', title: 'UX/UI', id: 4 },
];

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
  const [selectedVacancyID, setSelectedVacancyID] = useState(null);
  return (
    <MainAndRightLayout
      main={
        <MainContentWrapper noButton>
          <h1>Lista de Vacantes</h1>
          {arrMock.map((vacancy) => (
            <VacancyCard
              key={vacancy.company}
              onClick={() => setSelectedVacancyID(vacancy.id)}
            >
              <p>{vacancy.company}</p>
              <p>{vacancy.title}</p>
            </VacancyCard>
          ))}
        </MainContentWrapper>
      }
      right={
        <MainContentWrapper noButton>
          <h1>Descripción de vacante</h1>
          <p>{selectedVacancyID}</p>
        </MainContentWrapper>
      }
    />
  );
};

export default VacancyList;
