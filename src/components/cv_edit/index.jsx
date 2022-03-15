import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';
import Button from '../Buttons/LoadingButton';

const AccordeonBox = styled.div`
  .acordeon {
    border-radius: 5px;
    overflow: hidden;
    margin: 20px;
  }

  .header {
    background-color: #99e2e3;
    padding: 20px;
    font-weight: 700;
  }

  .body {
    background-color: #eeeeff;
    padding: 20px;
    color: black;
    transition-duration: 0.2s;
  }

  .hide .body {
    height: 0;
    padding-top: 0;
    padding-bottom: 0;
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

const EditCV = ({ editButton }) => {
  const itemsEls = useRef([]);
  const getRef = (element) => itemsEls.current.push(element);

  useEffect(() => {
    itemsEls.current.forEach((key) =>
      key.addEventListener('click', () => {
        key.classList.toggle('hide');
      })
    );
  }, []);

  return (
    <>
      <div>
        <AccordeonBox>
          <div className="acordeon hide" ref={getRef}>
            <div className="header">Informacion personal</div>
            <div className="body">Lorem ipsum</div>
          </div>
        </AccordeonBox>
        <AccordeonBox>
          <div className="acordeon hide" ref={getRef}>
            <div className="header">Estudios</div>
            <div className="body">Lorem ipsum</div>
          </div>
        </AccordeonBox>
        <AccordeonBox>
          <div className="acordeon hide" ref={getRef}>
            <div className="header">Experiencia</div>
            <div className="body">Lorem ipsum</div>
          </div>
        </AccordeonBox>
        <AccordeonBox>
          <div className="acordeon hide" ref={getRef}>
            <div className="header">Cursos</div>
            <div className="body">Lorem ipsum</div>
          </div>
        </AccordeonBox>
      </div>
      <ButtonBox>
        <Button type="button" onClick={editButton}>
          Cancel
        </Button>
        <Button type="button">Save</Button>
      </ButtonBox>
    </>
  );
};

export default EditCV;
