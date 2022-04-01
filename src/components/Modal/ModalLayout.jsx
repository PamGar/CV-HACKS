import { useLayoutEffect, useEffect, forwardRef } from 'react';
import styled from 'styled-components';

const ModalWrapper = styled.div`
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

const Container = styled.div`
  background-color: rgb(238, 238, 255);
  padding: clamp(10px, 5%, 30px);
  border-radius: 3px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  width: 90vw;
  max-width: 500px;
  text-align: center;
  margin: 20px 0;
`;

const ModalLayout = forwardRef(({ children, myOwnContainer }, ref) => {
  useLayoutEffect(() => {
    ref.current.classList.add('fadeIn');
    if (document.body.clientHeight > window.innerHeight) {
      document.body.style.marginRight = '17px';
      document.body.style.overflowY = 'hidden';
    }

    return () => {
      document.body.removeAttribute('style');
    };
  }, []);

  useEffect(() => {
    setTimeout(() => ref.current.classList.remove('fadeIn'), 250);
  }, []);

  return (
    <ModalWrapper ref={ref}>
      {myOwnContainer ? children : <Container>{children}</Container>}
    </ModalWrapper>
  );
});

export default ModalLayout;
