import { useState } from 'react';
import Button from '../../components/Buttons/Button';
import styled from 'styled-components';
import hackademyLogo from '../../assets/hackademyLogo.png';

const Container = styled.div`
  height: 100vh;
  background-color: #f6f6f6;
  display: grid;
  place-items: center;
`;

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #ffffff;
  padding: clamp(30px, 8vw, 100px);
  border-radius: 10px;
  gap: 16px;

  img {
    width: 137px;
    height: 137px;
  }

  label {
    text-align: center;
  }

  input {
    width: 100%;
  }

  input {
    padding: 10px;
    border: 1px solid #888888;
    border-radius: 5px;
    font-size: 0.875rem;

    &:focus-visible {
      outline: none;
      border: 1px solid #00b7b8cc;
      box-shadow: 0 0 4px #00b7b8cc;
    }
  }

  p {
    text-align: center;
  }
`;

const Login = () => {
  return (
    <Container>
      <LoginForm>
        <img src={hackademyLogo} />
        <label>
          Para iniciar sesión ingrese su correo y recibirá un codigo de acceso.
        </label>
        <input type='email' required placeholder='Email'></input>
        <Button type='submit' fullWidth onClick={(e) => e.preventDefault()}>
          ENVIAR
        </Button>
        <p>El código de acceso solo es válido por 15 minutos</p>
      </LoginForm>
    </Container>
  );
};

export default Login;
