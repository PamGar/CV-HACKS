import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
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

  @media (max-width: 820px) {
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;

  .platform {
    font-weight: 700;
    color: #c0d12e;
  }

  span {
    font-weight: 700;
    color: #595393;
  }

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
    disabledButton: true,
    hideErrorMessage: true,
    showInputError: false,
    loadingButton: false,
    hideError500: true,
  });
  const [openLoginModal, setOpenLoginModal] = useState(false);

  const emailRegexValidation = /\S+@\S+\.\S+/;
  const { t } = useTranslation('login');

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
          hideError500: true,
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
          hideError500: true,
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
      hideError500: true,
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
        hideError500: false,
      }));
    }
  };

  return (
    <Wrapper>
      <Container>
        <LoginForm onSubmit={handleSubmit}>
          <img src={hackademyLogo} />
          <p className="platform">
            CV <span>Platform</span>
          </p>
          <label>{t('login_instructions_label')}</label>
          <Input
            type="email"
            required
            placeholder="Email"
            value={user.email}
            name="email"
            onChange={handleChange}
            onBlur={handleBlur}
            error={inputError.showInputError}
            autoFocus
          />
          <AlertMessage error fullWidth hide={inputError.hideErrorMessage}>
            {t('email_error')}
          </AlertMessage>
          <AlertMessage error fullWidth hide={inputError.hideError500}>
            {t('error_500')}
          </AlertMessage>
          <LoadingButton
            type="submit"
            fullWidth
            loading={inputError.loadingButton}
            disabled={inputError.disabledButton}
          >
            {t('submit_email')}
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
