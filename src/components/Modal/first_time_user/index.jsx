import React from 'react';
import styled from 'styled-components';
import Button from '../../Buttons/LoadingButton';

const FirstTimeModal = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 9999;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #14141499;

  span {
    font-weight: 700;
  }

  .box {
    background-color: #fff;
    padding: 40px 20px;
    margin: 20px;
    border-radius: 3px;
    text-align: center;
    max-width: 600px;

    & > p {
      font-weight: 700;
      font-size: 16px;
      margin-bottom: 20px;
    }

    form p {
      display: flex;

      & > * {
        padding: 10px;
        width: 100px;
        margin: 10px;
      }

      label {
        text-align: left;
        font-weight: 700;
      }

      input {
        width: 100%;
      }
    }
  }

  section {
    display: flex;
    align-items: center;
    padding: 20px;
    text-align: left;

    label {
      width: unset;
      margin-left: 20px;
    }
    input {
      width: unset;
    }
  }
`;

const ButtonBox = styled.div`
  padding: 20px;
  display: flex;
  justify-content: center;

  button {
    margin: 0 30px;
  }
`;

const Input = styled.input`
  width: 100%;
  border: ${(props) =>
    props.error ? '1px solid #d8000c' : '1px solid #888888'};
  border-radius: 5px;
  font-size: 0.875rem;

  &::placeholder {
    color: ${(props) => (props.error ? '#FFD2D2' : '#888888')};
  }

  &:focus-visible {
    outline: none;
    border: ${(props) =>
      props.error ? 'border: 1px solid #d8000c' : '1px solid #00b7b8cc'};
  }
`;

const FirstTime = ({ closeModal, isOpen }) => {
  return (
    <FirstTimeModal isOpen={isOpen}>
      <div className="box">
        <p>
          Parece que aun no te has presentado, que tal si nos proporcionas
          algunos datos basicos para empezar
        </p>
        <form action="">
          <p>
            <label for="name">
              <span>Nombre</span>
              <strong>
                <abbr title="required">*</abbr>
              </strong>
            </label>
            <Input type="text" id="name" name="name" />
          </p>
          <p>
            <label for="dev_area">
              <span>Area</span>
            </label>
            <Input type="text" id="dev_area" name="dev_area" />
          </p>
          <p>
            <label for="country">
              <span>Pais</span>
            </label>
            <Input type="text" id="country" name="country" />
          </p>
          <section>
            <Input type="checkbox" id="checkbox" name="checkbox" />
            <label for="checkbox">
              ¿Deseas recibir ofertas de empleo de nuestro equipo, basados en
              los datos de tu CV?
            </label>
          </section>
        </form>
        <ButtonBox>
          <Button type="button">Enviar</Button>
        </ButtonBox>
      </div>
    </FirstTimeModal>
  );
};

export default FirstTime;
