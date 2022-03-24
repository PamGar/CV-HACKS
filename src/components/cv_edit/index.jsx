import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';
import Button from '../Buttons/LoadingButton';
import Chevron from '../../assets/icons/chevron-down.svg';

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
    font-weight: 500;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .openClose {
      width: 25px;
      height: 25px;
      display: flex;
      align-items: center;
      transition: 0.5s;
      transform: rotate(180deg);

      img {
        width: 100%;
      }
    }
  }

  .body {
    height: auto;
    background-color: #f9f9f9;
    padding: 20px;
    color: black;
    transition-duration: 0.5s;
  }

  .body_box {
    padding: 10px 0;

    span {
      font-weight: 700;
    }
  }

  .hide + .body {
    height: 0;
    padding-top: 0;
    padding-bottom: 0;
  }

  .hide .openClose {
    transform: rotate(0deg);
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
    background-color: #bed028;
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
              <p>
                <label htmlFor="">Lenguajes</label>
                <input
                  type="text"
                  id="languages"
                  name="languages"
                  value=""
                  placeholder="Escribe los lenguajes que dominas (Ingles, Frances, etc)"
                  autoComplete="off"
                />
              </p>
            </div>
          </div>
        </AccordeonBox>
        <AccordeonBox>
          <div className="acordeon ">
            <div className="header hide" ref={getRef}>
              Estudios
              <div className="openClose">
                <img src={Chevron} alt="" />
              </div>
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
              <h3>Agregar estudios</h3>
              <p>
                <label htmlFor="">Titulo</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value=""
                  placeholder="Escribe tu Titulo / Grado / Especialidad"
                  autoComplete="off"
                />
              </p>
              <p>
                <label htmlFor="">Institucion</label>
                <input
                  type="text"
                  id="institution"
                  name="institution"
                  value=""
                  placeholder="Escribe tu Escuela / Universidad"
                  autoComplete="off"
                />
              </p>
              <div className="date">
                <p>
                  <label htmlFor="">Año de inicio</label>
                  <input
                    type="date"
                    id="dateBegin"
                    name="dateBegin"
                    value=""
                    autoComplete="off"
                  />
                </p>
                <p>
                  <label htmlFor="">Año finalizacion</label>
                  <input
                    type="date"
                    id="dateEnd"
                    name="dateEnd"
                    value=""
                    placeholder="Escribe tu numero de telefono"
                    autoComplete="off"
                  />
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
              <div className="openClose">
                <img src={Chevron} alt="" />
              </div>
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
              <h3>Agregar experiencia</h3>
              <p>
                <label htmlFor="">Cargo</label>
                <input
                  type="text"
                  id="jobTitle"
                  name="jobTitle"
                  value=""
                  placeholder="Escribe el nombre del cargo"
                  autoComplete="off"
                />
              </p>
              <p>
                <label htmlFor="">Empleador</label>
                <input
                  type="text"
                  id="employer"
                  name="employer"
                  value=""
                  placeholder="Escribe el nombre del empleador"
                  autoComplete="off"
                />
              </p>
              <p>
                <label htmlFor="">Responsabilidades del cargo</label>
                <input
                  type="text"
                  id="jobTasks"
                  name="jobTasks"
                  value=""
                  placeholder="Escribe tus tareas en el cargo"
                  autoComplete="off"
                />
              </p>
              <div className="date">
                <p>
                  <label htmlFor="">Año de inicio</label>
                  <input
                    type="date"
                    id="dateBeginJob"
                    name="dateBeginJob"
                    value=""
                    autoComplete="off"
                  />
                </p>
                <p>
                  <label htmlFor="">Año finalizacion</label>
                  <input
                    type="date"
                    id="dateEndJob"
                    name="dateEndJob"
                    value=""
                    autoComplete="off"
                  />
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
              <div className="openClose">
                <img src={Chevron} alt="" />
              </div>
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
                <input
                  type="text"
                  id="name"
                  name="name"
                  value=""
                  placeholder="Escribe el nombre del curso"
                  autoComplete="off"
                />
              </p>
              <p>
                <label htmlFor="">Año</label>
                <input
                  type="date"
                  id="name"
                  name="name"
                  value=""
                  autoComplete="off"
                />
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
          Cancelar
        </Button>
        <Button type="button">Guardar</Button>
      </ButtonBox>
    </>
  );
};

export default EditCV;
