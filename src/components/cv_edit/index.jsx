import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';
import Button from '../Buttons/LoadingButton';
import Chevron from '../../assets/icons/chevron-down.svg';
import LanguagesEdit from './languagesEdit';
import { AccordeonBox, ButtonBox } from './EditStyledComponents';
import CertificationsEdit from './certificationsEdit';
import AwardEdit from './awardEdit';
import PublicationsEdit from './publicationsEdit';

const Form = styled.form`
  width: 80%;
  margin-left: auto;
  margin-right: auto;

  input::placeholder {
    color: #888;
  }

  p {
    display: flex;
    flex-direction: column;
  }

  label {
    margin-top: 10px;
    font-weight: 500;
  }

  h3 {
    font-weight: 500;
  }

  input {
    border-radius: 5px;
    padding: 10px;
    border: solid 1px #d6ccdd;
  }

  input:focus {
    outline: none !important;
    border-color: #63b2b3;
    box-shadow: 0 0 10px #63b2b3;
  }

  @media (max-width: 1099px) {
    width: 100%;
  }
`;

const Experience = styled.div`
  .box_experience {
    text-align: left;
    padding: 10px 0;

    span {
      font-weight: 700;
    }

    ul {
      padding-left: 15px;
    }
  }
`;

const EditCV = ({ editButton, cvId }) => {
  /* const itemsEls = useRef([]);
  const getRef = (element) => itemsEls.current.push(element);
  useEffect(() => {
    itemsEls.current.forEach((key) =>
      key.addEventListener('click', () => {
        key.classList.toggle('hide');
      })
    );
  }, []); */

  return (
    <>
      <Form>
        {/* <AccordeonBox>
          <div className="acordeon ">
            <div className="header hide" ref={getRef}>
              Informacion personal
              <div className="openClose">
                <img src={Chevron} alt="" />
              </div>
            </div>
            <div className="body">
              <p>
                <label htmlFor="">Nombre *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value=""
                  placeholder="Escribe tu Nombre y apellido"
                  autoComplete="off"
                />
              </p>
              <p>
                <label htmlFor="">Area *</label>
                <input
                  type="text"
                  id="area"
                  name="area"
                  value=""
                  placeholder="Escribe tu area (Frontend, backend, mobile, etc)"
                  autoComplete="off"
                />
              </p>
              <p>
                <label htmlFor="">Telefono *</label>
                <input
                  type="text"
                  id="phone"
                  name="phone"
                  value=""
                  placeholder="Escribe tu numero de telefono"
                  autoComplete="off"
                />
              </p>
              <p>
                <label htmlFor="">Correo *</label>
                <input
                  type="text"
                  id="email"
                  name="email"
                  value=""
                  placeholder="Escribe tu correo electronico"
                  autoComplete="off"
                />
              </p>
              <p>
                <label htmlFor="">Github</label>
                <input
                  type="text"
                  id="github"
                  name="github"
                  value=""
                  placeholder="Escribe tu usuario github"
                  autoComplete="off"
                />
              </p>
              <p>
                <label htmlFor="">Pais</label>
                <input
                  type="text"
                  id="country"
                  name="country"
                  value=""
                  placeholder="Escribe tu pais actual"
                  autoComplete="off"
                />
              </p>
              <p>
                <label htmlFor="">Sobre mi</label>
                <input
                  type="text"
                  id="about"
                  name="about"
                  value=""
                  placeholder="Escribe una breve reseña de ti"
                  autoComplete="off"
                />
              </p>
              <p>
                <label htmlFor="">Skills</label>
                <input
                  type="text"
                  id="skills"
                  name="skills"
                  value=""
                  placeholder="Escribe tus skills (Photoshop, Figma, Git, etc)"
                  autoComplete="off"
                />
              </p>
              <p>
                <label htmlFor="">Soft skills</label>
                <input
                  type="text"
                  id="softSkills"
                  name="softSkills"
                  value=""
                  placeholder="Escribe tus Soft Skills (Comunicacion, adaptabilidad, etc)"
                  autoComplete="off"
                />
              </p>
            </div>
          </div>
        </AccordeonBox> */}
        {/* <PublicationsEdit cvId={cvId} /> */}
        <AwardEdit cvId={cvId} />
        <CertificationsEdit cvId={cvId} />
        <LanguagesEdit cvId={cvId} />
      </Form>
      <ButtonBox>
        <Button type="button" onClick={editButton}>
          Volver
        </Button>
      </ButtonBox>
    </>
  );
};

export default EditCV;
