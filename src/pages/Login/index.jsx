import { useState } from 'react';
import Button from '../../components/Buttons/Button';
import styled from 'styled-components';
import hackademyLogo from '../../assets/hackademyLogo.png';

const Wrapper = styled.div`
  height: 100vh;
  background-color: #f6f6f6;
  display: grid;
  place-items: center;
`;

const Container = styled.div`
  background-color: #ffffff;
  border-radius: 5px;
  padding: clamp(30px, 8vw, 100px);

  hr {
    margin: 16px 0;
  }
`;

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;

  img {
    width: 137px;
    height: 137px;
  }

  label {
    text-align: center;
  }
`;

const AuthTokenDurationInfo = styled.div`
  text-align: center;
  color: #00529b;
  background-color: #bde5f8;
  padding: 9px;
  width: 100%;
  border-radius: 5px;
`;

const ErrorMessage = styled.p`
  display: ${(props) => (props.error ? 'block' : 'none')};
  color: #d8000c;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
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
    box-shadow: ${(props) =>
      props.error ? '0 0 4px #ff8686' : '0 0 4px #00b7b8cc'};
  }
`;
const Login = () => {
  const [user, setUser] = useState({ email: '', userType: '' });
  const [inputError, setInputError] = useState({
    disabledButton: true,
    showErrorMessage: false,
    showInputError: false,
  });

  const emailRegexValidation = /\S+@\S+\.\S+/;

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setUser((prev) => ({ ...prev, [name]: value }));

    emailRegexValidation.test(value)
      ? setInputError({
          disabledButton: false,
          showErrorMessage: false,
          showInputError: false,
        })
      : setInputError((prev) => ({
          ...prev,
          disabledButton: true,
          showInputError: true,
        }));
  };

  const handleOnBlur = (e) => {
    const value = e.target.value;
    emailRegexValidation.test(value)
      ? setInputError({
          disabledButton: false,
          showErrorMessage: false,
          showInputError: false,
        })
      : setInputError((prev) => ({
          ...prev,
          showErrorMessage: true,
          disabledButton: true,
        }));
  };

  const handleOnSubmit = (e) => {
    console.log(user);
    e.preventDefault();
  };

  return (
    <Wrapper>
      <Container>
        <LoginForm onSubmit={handleOnSubmit}>
          <img src={hackademyLogo} />
          <label>
            Para iniciar sesión ingrese su correo y recibirá un codigo de
            acceso.
          </label>
          <Input
            type='email'
            required
            placeholder='Email'
            value={user.email}
            name='email'
            onChange={handleOnChange}
            onBlur={handleOnBlur}
            error={inputError.showInputError}
            autoFocus
          />
          <ErrorMessage error={inputError.showErrorMessage}>
            Ingrese un correo válido
          </ErrorMessage>
          <Button type='submit' fullWidth disabled={inputError.disabledButton}>
            ENVIAR
          </Button>
        </LoginForm>
        <hr />
        <AuthTokenDurationInfo>
          El código de acceso solo es válido por 15 minutos
        </AuthTokenDurationInfo>
      </Container>
    </Wrapper>
  );
};

export default Login;
