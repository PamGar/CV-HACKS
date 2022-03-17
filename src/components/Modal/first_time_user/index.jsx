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
    font-weight: 500;
  }

  .box {
    background-color: #fff;
    padding: 20px 40px;
    margin: 20px;
    border-radius: 3px;
    text-align: center;
    max-width: 600px;
    border-top: solid 30px #00b7b8;

    & > p {
      font-weight: 500;
      font-size: 16px;
      margin-bottom: 20px;
    }

    form p {
      display: flex;
      flex-direction: column;

      & > * {
        padding: 10px;
      }

      label {
        text-align: left;
        font-weight: 500;
        padding-left: 0;
        padding-bottom: 0;
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
      boder: 1px solid rgb(214, 204, 221);
    }
  }

  .form-control {
    font-family: system-ui, sans-serif;
    font-size: 2rem;
    font-weight: bold;
    line-height: 1.1;
    display: grid;
    grid-template-columns: 1em auto;
    gap: 0.5em;
  }

  .form-control + .form-control {
    margin-top: 1em;
  }

  .form-control--disabled {
    color: grey;
    cursor: not-allowed;
  }

  input[type='checkbox'] {
    /* Add if not using autoprefixer */
    -webkit-appearance: none;
    /* Remove most all native input styles */
    appearance: none;
    /* For iOS < 15 */
    background-color: #fff;
    /* Not removed via appearance */
    margin: 0;

    font: inherit;
    color: currentColor;
    width: 25px;
    height: 25px;
    border: 0.15em solid #00b7b8;
    border-radius: 0.15em;
    transform: translateY(-0.075em);

    display: grid;
    place-content: center;
  }

  input[type='checkbox']::before {
    content: '';
    width: 20px;
    height: 20px;
    clip-path: polygon(14% 44%, 0 65%, 50% 100%, 100% 16%, 80% 0%, 43% 62%);
    transform: scale(0);
    transform-origin: bottom left;
    transition: 120ms transform ease-in-out;
    box-shadow: inset 1em 1em #00b7b8;
    /* Windows High Contrast Mode */
    background-color: CanvasText;
  }

  input[type='checkbox']:checked::before {
    transform: scale(1);
  }

  input[type='checkbox']:focus {
    outline: max(2px, 0.15em) solid #00b7b8;
    outline-offset: max(2px, 0.15em);
  }

  input[type='checkbox']:disabled {
    #00b7b8: #00b7b8;

    color: #00b7b8;
    cursor: not-allowed;
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
            <Input
              type="text"
              id="name"
              name="name"
              placeholder="Escribe tu nombre y apellido"
              autoComplete="off"
            />
          </p>
          <p>
            <label for="dev_area">
              <span>Area</span>
            </label>
            <Input
              type="text"
              id="dev_area"
              name="dev_area"
              placeholder="Escribe tu area (Frontend, backend, mobile, etc)"
              autoComplete="off"
            />
          </p>
          <p>
            <label for="country">
              <span>Pais</span>
            </label>
            <Input
              type="text"
              id="country"
              name="country"
              placeholder="Escribe el pais donde te encuentras"
              autoComplete="off"
            />
          </p>
          <section>
            <Input type="checkbox" id="checkbox" name="checkbox" />
            <label for="checkbox form-control">
              Deseo recibir ofertas de empleo basadas en los datos de mi CV.
            </label>
          </section>
        </form>
        <ButtonBox>
          <Button type="button" onClick={closeModal}>
            Enviar
          </Button>
        </ButtonBox>
      </div>
    </FirstTimeModal>
  );
};

export default FirstTime;
