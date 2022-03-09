import React, { useLayoutEffect, useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import AlertMessage from '../../components/AlertMessage';
import LoadingButton from '../../components/Buttons/LoadingButton';

const ModalWrapper = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100vw;
  height: 100vh;
  opacity: 1;
  transition: all 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  background-color: rgb(0, 0, 0, 0.1);

  &[class~='fadeOut'] {
    opacity: 0;
  }

  &[class~='fadeIn'] {
    opacity: 0;
  }
`;

const AccessTokenForm = styled.form`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  justify-content: center;
  flex-direction: column;
  gap: 16px;
  background-color: white;
  border-radius: 5px;
  padding: clamp(10px, 9vw, 100px);
  box-shadow: 0 0 46px #888888;
  transition: transform 250ms ease 50ms;
  text-align: center;
  min-width: 320px;

  input {
    width: 100%;
    padding: 10px;
    border: 1px solid #888888;
    border-radius: 5px;
    font-size: 0.875rem;

    &:focus-visible {
      outline: none;
      border: 1px solid #00b7b8cc;
    }
  }

  &[class~='fadeIn'] {
    transform: translate(-50%, -60%);
  }
  &[class~='fadeOut'] {
    transform: translate(-50%, -40%);
  }
`;

const LoginModal = ({ closeModal, isOpen, userEmail }) => {
  const [user, setUser] = useState({ email: userEmail, password: '' });
  const [inputError, setInputError] = useState({
    disabledButton: true,
    hideErrorMessage: true,
    loadingButton: false,
  });
  const [responseErrorMessage, setResponseErrorMessage] = useState('');

  const ModalWrapperRef = useRef();
  const AccessTokenFormRef = useRef();
  const navigate = useNavigate();
  const { t } = useTranslation('login');

  const addClassList = (ref, className) => ref.current.classList.add(className);
  const removeClassList = (ref, className) =>
    ref.current.classList.remove(className);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setUser((prev) => ({ ...prev, [name]: value }));
    value.length >= 13
      ? setInputError((prev) => ({ ...prev, disabledButton: false }))
      : setInputError((prev) => ({ ...prev, disabledButton: true }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setInputError({
      hideErrorMessage: true,
      loadingButton: true,
      disabledButton: true,
    });

    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/login/`,
        user
      );
      setInputError((prev) => ({
        ...prev,
        loadingButton: false,
        disabledButton: false,
      }));
      closeModal(false);
      localStorage.setItem('authToken', data.token);
      navigate('/dashboard');
    } catch (err) {
      err.response.status === 400
        ? setResponseErrorMessage(t('invalid_login_code'))
        : setResponseErrorMessage(t('error_500'));

      setInputError({
        hideErrorMessage: false,
        loadingButton: false,
        disabledButton: false,
      });
    }
  };

  useLayoutEffect(() => {
    document.body.style.overflow = 'hidden';
    addClassList(ModalWrapperRef, 'fadeIn');
    addClassList(AccessTokenFormRef, 'fadeIn');
    return () => {
      document.body.removeAttribute('style');
    };
  }, []);

  useEffect(() => {
    setTimeout(() => {
      removeClassList(ModalWrapperRef, 'fadeIn');
      removeClassList(AccessTokenFormRef, 'fadeIn');
    }, 250);
  }, []);

  return (
    <ModalWrapper isOpen={isOpen} ref={ModalWrapperRef}>
      <AccessTokenForm ref={AccessTokenFormRef} onSubmit={handleSubmit}>
        <h2>{t('login')}</h2>
        <p>
          {t('we_have_sent_you_a_email')} <strong>{userEmail}</strong>
        </p>
        <input
          onChange={handleChange}
          value={user.accessToken}
          name='password'
          required
        />
        <AlertMessage hide={inputError.hideErrorMessage} error>
          {responseErrorMessage}
        </AlertMessage>
        <LoadingButton
          type='submit'
          fullWidth
          disabled={inputError.disabledButton}
          loading={inputError.loadingButton}
        >
          {t('login')}
        </LoadingButton>
        <hr />
        <AlertMessage info>{t('login_code_duration_info')}</AlertMessage>
      </AccessTokenForm>
    </ModalWrapper>
  );
};

export default LoginModal;
