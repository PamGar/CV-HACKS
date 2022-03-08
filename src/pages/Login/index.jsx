import { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import LoadingButton from '../../components/Buttons/LoadingButton';
import hackademyLogo from '../../assets/hackademyLogo.png';
import Modal from '../../components/Modal';
import LoginModal from '../LoginModal';
import AlertMessage from '../../components/AlertMessage';

const Wrapper = styled.div`
  height: 100vh;
  background-color: #f6f6f6;
  display: grid;
  place-items: center;
`;

const Container = styled.div`
  background-color: #ffffff;
  border-radius: 5px;
  padding: clamp(20px, 7vw, 100px);

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
  }
`;
const Login = ({ company }) => {
  const [user, setUser] = useState({ email: '', role: 5 });
  const [inputError, setInputError] = useState({
    disabledButton: false,
    hideErrorMessage: true,
    showInputError: false,
    loadingButton: false,
  });
  const [openLoginModal, setOpenLoginModal] = useState(false);

  const emailRegexValidation = /\S+@\S+\.\S+/;

  const handleChange = (e) => {
    const { name, value } = e.target;

    setUser({ [name]: value, role: 5 });

    if (value.endsWith('@hackademy.lat'))
      setUser((prev) => ({ ...prev, role: 2 }));

    if (value.endsWith('@hackademy.mx'))
      setUser((prev) => ({ ...prev, role: 4 }));

    if (company) setUser((prev) => ({ ...prev, role: 3 }));

    emailRegexValidation.test(value)
      ? setInputError({
          disabledButton: false,
          hideErrorMessage: true,
          showInputError: false,
        })
      : setInputError((prev) => ({
          ...prev,
          disabledButton: true,
          showInputError: true,
        }));
  };

  const handleBlur = (e) => {
    const value = e.target.value;
    emailRegexValidation.test(value)
      ? setInputError({
          disabledButton: false,
          hideErrorMessage: true,
          showInputError: false,
        })
      : setInputError((prev) => ({
          ...prev,
          hideErrorMessage: false,
          disabledButton: true,
        }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setInputError((prev) => ({
      ...prev,
      disabledButton: true,
      loadingButton: true,
    }));

    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/user/`,
        user
      );
      setInputError((prev) => ({
        ...prev,
        disabledButton: false,
        loadingButton: false,
      }));
      setOpenLoginModal(true);
    } catch (err) {
      console.log(err);
      setInputError((prev) => ({
        ...prev,
        disabledButton: false,
        loadingButton: false,
      }));
    }
  };

  return (
    <Wrapper>
      <Container>
        <LoginForm onSubmit={handleSubmit}>
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
            onChange={handleChange}
            onBlur={handleBlur}
            error={inputError.showInputError}
            autoFocus
          />
          <AlertMessage error fullWidth hide={inputError.hideErrorMessage}>
            Ingrese un correo válido
          </AlertMessage>
          <LoadingButton
            type='submit'
            fullWidth
            loading={inputError.loadingButton}
            disabled={inputError.disabledButton}
          >
            OBTENER CÓDIGO DE ACCESO
          </LoadingButton>
        </LoginForm>
      </Container>
      <Modal
        isOpen={openLoginModal}
        element={
          <LoginModal
            closeModal={setOpenLoginModal}
            isOpen={openLoginModal}
            userEmail={user.email}
          />
        }
      />
    </Wrapper>
  );
};

export default Login;
