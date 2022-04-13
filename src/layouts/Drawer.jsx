import { useLayoutEffect, forwardRef, useRef, useEffect } from 'react';
import styled from 'styled-components';

const DrawerWrapper = styled.div`
  position: fixed;
  inset: 0;
  z-index: 99;

  .background {
    position: fixed;
    inset: 0;
    z-index: -1;
    background-color: rgb(0, 0, 0, 0.5);
    opacity: 1;
    transition: all 250ms ease;

    &[class~='fade'] {
      opacity: 0;
    }
  }

  .active {
    color: #565696;
    background-color: #5656962f;
  }
`;

const DrawerContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgb(238, 238, 255);
  height: 100vh;
  width: 240px;
  box-shadow: rgb(0 0 0 / 20%) 0px 8px 10px -5px,
    rgb(0 0 0 / 14%) 0px 16px 24px 2px, rgb(0 0 0 / 12%) 0px 6px 30px 5px;
  transform: translateX(0);
  transition: all 250ms ease;

  &[class~='toggleDrawer'] {
    transform: translateX(-240px);
  }
`;

const Drawer = forwardRef(({ children, setOpenModal, activateFade }, ref) => {
  const backgroundRef = useRef();

  useLayoutEffect(() => {
    ref.current.classList.add('toggleDrawer');
    document.body.style.overflowY = 'hidden';
    setTimeout(() => backgroundRef.current.classList.remove('fade'), 1);
    setTimeout(() => ref.current.classList.remove('toggleDrawer'), 1);

    return () => {
      document.body.removeAttribute('style');
    };
  }, []);

  useEffect(() => {
    activateFade && backgroundRef.current.classList.add('fade');
  }, [activateFade]);
  return (
    <DrawerWrapper>
      <div
        className='background fade'
        onClick={() => {
          backgroundRef.current.classList.add('fade');
          ref.current.classList.add('toggleDrawer');
          setTimeout(() => setOpenModal(false), 250);
        }}
        ref={backgroundRef}
      />
      <DrawerContainer ref={ref}>{children}</DrawerContainer>
    </DrawerWrapper>
  );
});

export default Drawer;
