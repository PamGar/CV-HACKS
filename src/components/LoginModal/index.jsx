import React, { useLayoutEffect, useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import Button from '../Buttons/Button';

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

const AuthTokenDurationInfo = styled.div`
  color: #00529b;
  background-color: #bde5f8;
  width: 100%;
  padding: 9px;
  border-radius: 5px;
  text-align: center;
`;

const LoginModal = ({ closeModal, isOpen }) => {
  const ModalWrapperRef = useRef();
  const AccessTokenFormRef = useRef();

  useLayoutEffect(() => {
    document.body.style.overflow = 'hidden';
    ModalWrapperRef.current.classList.add('fadeIn');
    AccessTokenFormRef.current.classList.add('fadeIn');
    return () => {
      document.body.removeAttribute('style');
    };
  }, []);

  useEffect(() => {
    setTimeout(() => {
      ModalWrapperRef.current.classList.remove('fadeIn');
      AccessTokenFormRef.current.classList.remove('fadeIn');
    }, 250);
  }, []);

  return (
    <ModalWrapper isOpen={isOpen} ref={ModalWrapperRef}>
      <AccessTokenForm ref={AccessTokenFormRef}>
        <label>Ingrese su código de acceso </label>
        <input placeholder='Código de acceso' />
        <Button
          onClick={(e) => {
            e.preventDefault();
            // ModalWrapperRef.current.classList.add('fadeOut');
            // AccessTokenFormRef.current.classList.add('fadeOut');
            // setTimeout(() => closeModal((prev) => !prev), 250);
          }}
        >
          INGRESAR
        </Button>
        <hr />
        <AuthTokenDurationInfo>
          El código de acceso solo es válido por 15 minutos
        </AuthTokenDurationInfo>
      </AccessTokenForm>
    </ModalWrapper>
  );
};

export default LoginModal;
