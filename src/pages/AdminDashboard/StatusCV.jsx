import React from 'react';
import styled from 'styled-components';
import FormWrapper from '../../components/FormWrapper';
import LoadingButton from '../../components/Buttons/LoadingButton';
import OutlinedButton from '../../components/Buttons/OutlinedButton';
import AlertMessage from '../../components/AlertMessage';

const CurrentStatus = styled.div`
  display: grid;
  grid-template-columns: 1.1fr 1fr;
  p {
    align-self: center;
    font-size: 16px;
  }
`;

const CompanyContainer = styled(CurrentStatus)`
  select {
    box-shadow: 0px 3px 5px 0px rgb(0 0 0 / 20%),
      0px 2px 5px 0px rgb(0 0 0 / 14%), 0px 1px 8px 0px rgb(0 0 0 / 12%);
    border-radius: 3px;
  }
`;

const StatusCV = ({ setShowMainContent }) => {
  const isHired = false;
  return (
    <FormWrapper setShowMainContent={setShowMainContent}>
      <h1>Actualizar estatus</h1>
      <CurrentStatus>
        <p>Estatus ACTUAL</p>
        <AlertMessage success={isHired} info={!isHired}>
          {isHired ? 'contratado' : 'Looking for a job'}
        </AlertMessage>
      </CurrentStatus>
      <CompanyContainer>
        <p>¿Cúal empresa lo contrató?</p>
        <select>
          <option value='hackademy'>hackademy</option>
          <option value='empresa2'>empresa2</option>
          <option value='empresa3'>empresa3</option>
        </select>
      </CompanyContainer>
      <OutlinedButton>marcar como 'en busqueda'</OutlinedButton>
    </FormWrapper>
  );
};

export default StatusCV;
