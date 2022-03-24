import React, { useRef, useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTrashCan,
  faPenToSquare,
  faEye,
  faEyeSlash,
} from '@fortawesome/free-regular-svg-icons';
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

  .tasks_0 {
    padding-bottom: 20px;
    color: #999999;
  }

  .body_box {
    padding: 10px 0;

    span {
      font-weight: 700;
    }
  }

  .editBox {
    display: flex;
    justify-content: end;

    button {
      margin-left: 20px;
      background: transparent;
      padding: 5px 0 0 5px;
      width: 30px;

      svg {
        font-size: 18px;
      }
    }

    .editBox_edit path {
      color: #92d27b;
    }

    .editBox_delete path {
      color: #ff6666;
    }

    .editBox_hide path {
      color: #ff6666;
      filter: opacity(0.5);
    }

    .editBox_unhide path {
      color: #99e2e3;
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

const EditCV = ({ editButton, cvId }) => {
  const [hide, setHide] = useState(false);
  const [editLanguage, setEditLanguage] = useState(false);
  const [language, setLanguage] = useState({
    type: 'Language',
    title: '',
    subtitle: '',
    level: '',
  });
  const itemsEls = useRef([]);
  const getRef = (element) => itemsEls.current.push(element);
  const myToken = window.localStorage.getItem('authToken');

  const [languagesList, setLanguagesList] = useState([]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setLanguage({
      ...language,
      [name]: value,
    });
  };

  const addLanguage = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/cv/admin-cv-formskills/${cvId}`,
        language,
        {
          headers: {
            authorization: `Token ${myToken}`,
          },
        }
      );
      getLanguagesList();
    } catch (error) {
      console.error('error', error);
    }
  };

  const removeLanguage = async (event, id) => {
    event.preventDefault();

    try {
      const { data } = await axios.delete(
        `${process.env.REACT_APP_BASE_URL}/cv/admin-cv-formskills/${cvId}/${id}`,
        {
          headers: {
            authorization: `Token ${myToken}`,
          },
        }
      );
      getLanguagesList();
    } catch (error) {
      console.error('error', error);
    }
  };

  const getLanguage = async (event, id) => {
    event.preventDefault();

    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/cv/admin-cv-formskills/${cvId}/${id}`,
        {
          headers: {
            authorization: `Token ${myToken}`,
          },
        }
      );
      setLanguage(data);
    } catch (error) {
      console.error('error', error);
    }
  };

  const updateLanguage = async (event, id) => {
    event.preventDefault();

    try {
      const { data } = await axios.put(
        `${process.env.REACT_APP_BASE_URL}/cv/admin-cv-formskills/${cvId}/${id}`,
        language,
        {
          headers: {
            authorization: `Token ${myToken}`,
          },
        }
      );
      getLanguagesList();
    } catch (error) {
      console.error('error', error);
    }
  };

  const getLanguagesList = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/cv/admin-cv-formskills/${cvId}`,
        {
          headers: {
            authorization: `Token ${myToken}`,
          },
        }
      );
      setLanguagesList(data);
    } catch (error) {
      console.error('error', error);
    }
  };

  useEffect(() => {
    itemsEls.current.forEach((key) =>
      key.addEventListener('click', () => {
        key.classList.toggle('hide');
      })
    );
  }, []);

  useEffect(() => {
    getLanguagesList();
  }, []);

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
          <div className="acordeon">
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
        </AccordeonBox> */}
        <AccordeonBox>
          <div className="acordeon">
            <div className="header hide" ref={getRef}>
              Idiomas
              <div className="openClose">
                <img src={Chevron} alt="" />
              </div>
            </div>
            <div className="body">
              {languagesList.length === 0 ? (
                <p className="tasks_0">Aun no tienes ningun idioma guardado</p>
              ) : (
                languagesList.map((language) => {
                  return (
                    <div className="body_box" key={language.id}>
                      <p>{language.title}</p>
                      <p>
                        <span>
                          {language.subtitle} | {language.level}
                        </span>
                      </p>
                      <div className="editBox">
                        <button
                          onClick={(event) => getLanguage(event, language.id)}
                        >
                          <FontAwesomeIcon
                            icon={faPenToSquare}
                            className="editBox_edit"
                          />
                        </button>
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            setHide(!hide);
                          }}
                        >
                          {hide ? (
                            <FontAwesomeIcon
                              icon={faEyeSlash}
                              className="editBox_hide"
                            />
                          ) : (
                            <FontAwesomeIcon
                              icon={faEye}
                              className="editBox_unhide"
                            />
                          )}
                        </button>
                        <button
                          onClick={(event) =>
                            removeLanguage(event, language.id)
                          }
                        >
                          <FontAwesomeIcon
                            icon={faTrashCan}
                            className="editBox_delete"
                          />
                        </button>
                      </div>
                    </div>
                  );
                })
              )}
              <div className="separador"></div>
              <h3>Agregar nuevo idioma</h3>
              <p>
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={language.title}
                  onChange={handleChange}
                  placeholder="Escribe el idioma aprendido (Ingles, Chino, etc)"
                  autoComplete="off"
                />
              </p>
              <p>
                <label htmlFor="subtitle">Subtitle</label>
                <input
                  type="text"
                  id="subtitle"
                  name="subtitle"
                  value={language.subtitle}
                  onChange={handleChange}
                  placeholder="Escribe el examen aprobado (IELTS, HSK, TOEFL, etc)"
                  autoComplete="off"
                />
              </p>
              <p>
                <label htmlFor="level">Nivel</label>
                <input
                  type="level"
                  id="level"
                  name="level"
                  value={language.level}
                  onChange={handleChange}
                  placeholder="Escribe el nivel (Basico, Intermedio, Avanzado, etc)"
                  autoComplete="off"
                />
              </p>
              <ButtonBox>
                <Button type="button" onClick={addLanguage}>
                  Agregar +
                </Button>
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
