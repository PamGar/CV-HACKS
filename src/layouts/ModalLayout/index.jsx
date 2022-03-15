import React, { useLayoutEffect, useEffect, useRef } from 'react';
import styled from 'styled-components';

// Este Layout para modal sirve para tener la transición de fadeIn y fadeOut.
// Hay que pasarle una prop onClick con un setTimeOut que cierre el modal en 250ms.
// Este layout tiene un downside, y es que NO importa dondé el usuario haga click,
// siempre se va a cerrar modal, si no deseas esto, construye tu propio Layout como en
// ../../../pages/LoginModal/index

export const ModalWrapper = styled.div`
  position: fixed;
  inset: 0px;
  display: grid;
  place-items: center;
  transition: all 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  background-color: rgb(0, 0, 0, 0.5);
  z-index: 100;
  opacity: 1;
  overflow-y: auto;

  &[class~='fadeOut'] {
    opacity: 0;
  }

  &[class~='fadeIn'] {
    opacity: 0;
  }
`;

const ModalLayout = ({ children, onClick }) => {
  const ModalWrapperRef = useRef();
  const addClassList = (ref, className) => ref.current.classList.add(className);
  const removeClassList = (ref, className) =>
    ref.current.classList.remove(className);

  useLayoutEffect(() => {
    document.body.style.overflow = 'hidden';
    addClassList(ModalWrapperRef, 'fadeIn');
    return () => {
      document.body.removeAttribute('style');
    };
  }, []);

  useEffect(() => {
    setTimeout(() => {
      removeClassList(ModalWrapperRef, 'fadeIn');
    }, 250);
  }, []);
  return (
    <ModalWrapper
      ref={ModalWrapperRef}
      onClick={() => {
        addClassList(ModalWrapperRef, 'fadeOut');
        onClick();
      }}
    >
      {children}
    </ModalWrapper>
  );
};

export default ModalLayout;
