import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';
import Button from '../Buttons/LoadingButton';

const Form = styled.form`
  width: 80%;
  margin-left: auto;
  margin-right: auto;

  p {
    display: flex;
    flex-direction: column;
  }

  label {
    margin-top: 10px;
  }

  h3 {
    font-weight: 500;
  }

  input {
    border-radius: 3px;
    padding: 10px;
  }

  input:focus {
    outline: none !important;
    border-color: #63b2b3;
    box-shadow: 0 0 10px #63b2b3;
  }

  @media (max-width: 820px) {
    width: 90%;
  }
`;

const AccordeonBox = styled.div`
  cursor: pointer;

  .acordeon {
    border-radius: 5px;
    overflow: hidden;
    margin: 20px;
    box-shadow: 0px 10px 40px -20px grey;
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

  .body_box {
    padding: 10px 0;

    span {
      font-weight: 700;
    }
  }

  .hide + .body {
    margin: 0;
    height: 0;
    padding-top: 0;
    padding-bottom: 0;
  }

  .date {
    display: flex;
    justify-content: space-between;

    p {
      width: 45%;
    }
  }

  .separador {
    height: 2px;
    background-color: #6610f2;
    margin: 10px 0;
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
      <Form>
        <AccordeonBox>
          <div className="acordeon ">
            <div className="header hide" ref={getRef}>
              Informacion personal
            </div>
            <div className="body">
              <p>
                <label htmlFor="">Nombre</label>
                <input type="text" id="name" name="name" value="" />
              </p>
              <p>
                <label htmlFor="">Area</label>
                <input type="text" id="name" name="name" value="" />
              </p>
              <p>
                <label htmlFor="">Telefono</label>
                <input type="text" id="name" name="name" value="" />
              </p>
              <p>
                <label htmlFor="">Correo</label>
                <input type="text" id="name" name="name" value="" />
              </p>
              <p>
                <label htmlFor="">Github</label>
                <input type="text" id="name" name="name" value="" />
              </p>
              <p>
                <label htmlFor="">Pais</label>
                <input type="text" id="name" name="name" value="" />
              </p>
              <p>
                <label htmlFor="">Sobre mi</label>
                <input type="text" id="name" name="name" value="" />
              </p>
              <p>
                <label htmlFor="">Skills</label>
                <input type="text" id="name" name="name" value="" />
              </p>
              <p>
                <label htmlFor="">Soft skills</label>
                <input type="text" id="name" name="name" value="" />
              </p>
              <p>
                <label htmlFor="">Lenguajes</label>
                <input type="text" id="name" name="name" value="" />
              </p>
            </div>
          </div>
        </AccordeonBox>
        <AccordeonBox>
          <div className="acordeon ">
            <div className="header hide" ref={getRef}>
              Estudios
            </div>
            <div className="body">
              <div className="body_box">
                <p>2013 - 2017 | Universidad de Valencia</p>
                <p>
                  <span>Lic. en artes multimedia</span>
                </p>
              </div>
              <div className="body_box">
                <p>2013 - 2017 | Universidad de Valencia</p>
                <p>
                  <span>Lic. en artes multimedia</span>
                </p>
              </div>
              <div className="separador"></div>
              <h3>Agregar un estudio</h3>
              <p>
                <label htmlFor="">Institucion</label>
                <input type="text" id="name" name="name" value="" />
              </p>
              <p>
                <label htmlFor="">Titulo</label>
                <input type="text" id="name" name="name" value="" />
              </p>
              <div className="date">
                <p>
                  <label htmlFor="">Año de inicio</label>
                  <input type="text" id="name" name="name" value="" />
                </p>
                <p>
                  <label htmlFor="">Año finalizacion</label>
                  <input type="text" id="name" name="name" value="" />
                </p>
              </div>
              <ButtonBox>
                <Button type="button">Agregar +</Button>
              </ButtonBox>
            </div>
          </div>
        </AccordeonBox>
        <AccordeonBox>
          <div className="acordeon ">
            <div className="header hide" ref={getRef}>
              Experiencia
            </div>
            <div className="body">
              <Experience>
                <div className="box_experience">
                  <div className="date_experience">1987 - 1990</div>
                  <div className="info_experience">
                    <span>Lorem ipsum dolor sit amet.</span>
                    <p>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    </p>
                    <ul>
                      <li>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      </li>
                      <li>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      </li>
                      <li>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="box_experience">
                  <div className="date_experience">1987 - 1990</div>
                  <div className="info_experience">
                    <span>Lorem ipsum dolor sit amet.</span>
                    <p>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    </p>
                    <ul>
                      <li>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      </li>
                      <li>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      </li>
                      <li>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      </li>
                    </ul>
                  </div>
                </div>
              </Experience>
              <div className="separador"></div>
              <h3>Agregar una experiencia</h3>
              <p>
                <label htmlFor="">Cargo</label>
                <input type="text" id="name" name="name" value="" />
              </p>
              <p>
                <label htmlFor="">Empresa</label>
                <input type="text" id="name" name="name" value="" />
              </p>
              <p>
                <label htmlFor="">Responsabilidades del cargo</label>
                <input type="text" id="name" name="name" value="" />
              </p>
              <div className="date">
                <p>
                  <label htmlFor="">Año de inicio</label>
                  <input type="text" id="name" name="name" value="" />
                </p>
                <p>
                  <label htmlFor="">Año finalizacion</label>
                  <input type="text" id="name" name="name" value="" />
                </p>
              </div>
              <ButtonBox>
                <Button type="button">Agregar +</Button>
              </ButtonBox>
            </div>
          </div>
        </AccordeonBox>
        <AccordeonBox>
          <div className="acordeon ">
            <div className="header hide" ref={getRef}>
              Cursos
            </div>
            <div className="body">
              <div className="body_box">
                <p>2013 | Coursera</p>
                <p>
                  <span>UX/UI design</span>
                </p>
              </div>
              <div className="body_box">
                <p>2017 | React avanzado</p>
                <p>
                  <span>Lynda.com</span>
                </p>
              </div>
              <div className="separador"></div>
              <h3>Agregar nuevo curso</h3>
              <p>
                <label htmlFor="">Nombre del curso</label>
                <input type="text" id="name" name="name" value="" />
              </p>
              <p>
                <label htmlFor="">Año</label>
                <input type="text" id="name" name="name" value="" />
              </p>
              <ButtonBox>
                <Button type="button">Agregar +</Button>
              </ButtonBox>
            </div>
          </div>
        </AccordeonBox>
      </Form>
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
