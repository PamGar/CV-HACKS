import React from 'react';
import styled from 'styled-components';
import LoadingButton from '../../components/Buttons/LoadingButton';
import { Wrapper } from './CVlist';

const Form = styled.form`
  background-color: rgb(238, 238, 255);
  border-radius: 3px;
  box-shadow: 0px 3px 5px 0px rgb(0 0 0 / 20%), 0px 2px 5px 0px rgb(0 0 0 / 14%),
    0px 1px 8px 0px rgb(0 0 0 / 12%);
  margin: 20px 15px 0;
  padding: 25px 15px;
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

const CurrentStatus = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  p {
    align-self: center;
    font-size: 16px;
  }
`;

const IsHired = styled.p`
  background-color: ${(props) => (props.isHired ? 'green' : '#fffba6')};
  padding: 5px 7px;
  border-radius: 3px;
  color: ${(props) => (props.isHired ? 'white' : 'black')};
  width: 100%;
  text-align: center;
`;

const CompanyContainer = styled(CurrentStatus)``;

const ButtonsContainer = styled.div`
  position: sticky;
  bottom: 10px;
  margin: 0 15px 10px;
  display: grid;
  grid-template-columns: 1fr 3fr;
  gap: 15px;
`;

const StatusCV = () => {
  return (
    <Wrapper>
      <Form>
        <h1>Actualizar estatus</h1>
        <CurrentStatus>
          <p>Estatus ACTUAL</p>
          <IsHired isHired>contratado</IsHired>
        </CurrentStatus>
        <CompanyContainer>
          <p>¿Cúal empresa lo contrató?</p>
          <select>
            <option value='hackademy'>hackademy</option>
            <option value='empresa2'>empresa2</option>
            <option value='empresa3'>empresa3</option>
          </select>
        </CompanyContainer>
        <LoadingButton>marcar como 'en busqueda'</LoadingButton>
      </Form>
      <ButtonsContainer>
        <LoadingButton type='submit' fullWidth>
          regresar
        </LoadingButton>
        <LoadingButton type='submit' fullWidth>
          actualizar estatus
        </LoadingButton>
      </ButtonsContainer>
    </Wrapper>
  );
};

export default StatusCV;
