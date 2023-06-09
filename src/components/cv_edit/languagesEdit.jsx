import React, { useRef, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import {
  faTrashCan,
  faPenToSquare,
  faEye,
  faEyeSlash,
} from '@fortawesome/free-regular-svg-icons';
import { faLanguage } from '@fortawesome/free-solid-svg-icons';
import Button from '../Buttons/LoadingButton';
import Chevron from '../../assets/icons/chevron-down.svg';
import { AccordeonBox, ButtonBox, BoxColumn } from './EditStyledComponents';
import { toast } from 'react-toastify';

const LanguagesEdit = (props) => {
  const [language, setLanguage] = useState({
    title: '',
    subtitle: null,
    level: null,
    type: 'Language',
  });
  const [hide, setHide] = useState(false);
  const [editLanguage, setEditLanguage] = useState(false);
  const toggleAccordeonRef = useRef();
  const getHeightRef = useRef();
  const firstInputRef = useRef();
  const formRef = useRef();
  const addButtonRef = useRef();
  const [childBodyHeight, setChildBodyHeight] = useState(0);
  const myToken = window.localStorage.getItem('authToken');
  const [languagesList, setLanguagesList] = useState([]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setLanguage({
      ...language,
      [name]: value === '' ? null : value,
    });
  };

  const toggleAccordeonHandle = () => {
    toggleAccordeonRef.current.classList.toggle('hide');
    setChildBodyHeight(getHeightRef.current.children[0].offsetHeight);
  };

  const handleForm = (e) => {
    e.preventDefault();
    formRef.current.classList.toggle('unhide');
    addButtonRef.current.classList.toggle('hide');
    setChildBodyHeight(getHeightRef.current.children[0].offsetHeight);
  };

  const addLanguage = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/cv/admin-cv-formskills/${props.cvId}`,
        language,
        {
          headers: {
            authorization: `Token ${myToken}`,
          },
        }
      );
      setLanguage({
        title: '',
        subtitle: null,
        level: null,
        type: 'Language',
      });
      getLanguagesList();
      toast.success('Agregado con éxito');
      formRef.current.classList.toggle('unhide');
      addButtonRef.current.classList.toggle('hide');
      setChildBodyHeight(getHeightRef.current.children[0].offsetHeight);
      props.refreshCvData();
    } catch (error) {
      console.error('error', error);
      toast.error('No se pudo agregar el lenguaje');
    }
  };

  const cancelUpdate = (event) => {
    event.preventDefault();
    setEditLanguage(false);
    formRef.current.classList.toggle('unhide');
    addButtonRef.current.classList.toggle('hide');
    setChildBodyHeight(getHeightRef.current.children[0].offsetHeight);
    setLanguage({
      title: '',
      subtitle: '',
      level: '',
      type: 'Language',
    });
  };

  const removeLanguage = async (event, id) => {
    event.preventDefault();

    try {
      const { data } = await axios.delete(
        `${process.env.REACT_APP_BASE_URL}/cv/admin-cv-formskills/${props.cvId}/${id}`,
        {
          headers: {
            authorization: `Token ${myToken}`,
          },
        }
      );
      getLanguagesList();
      toast.success('Eliminado con éxito');
      props.refreshCvData();
    } catch (error) {
      console.error('error', error);
      toast.error('No se pudo eliminar el lenguaje');
    }
  };

  const getLanguage = async (event, id) => {
    event.preventDefault();

    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/cv/admin-cv-formskills/${props.cvId}/${id}`,
        {
          headers: {
            authorization: `Token ${myToken}`,
          },
        }
      );
      setLanguage(data);
      setEditLanguage(true);
      formRef.current.classList.add('unhide');
      addButtonRef.current.classList.toggle('hide');
      setChildBodyHeight(getHeightRef.current.children[0].offsetHeight);
      firstInputRef.current.focus();
    } catch (error) {
      console.error('error', error);
      toast.error('No se pudieron cargar los datos del lenguaje a editar');
    }
  };

  const updateLanguage = async (event, id) => {
    event.preventDefault();

    try {
      const { data } = await axios.put(
        `${process.env.REACT_APP_BASE_URL}/cv/admin-cv-formskills/${props.cvId}/${id}`,
        {
          title: language.title,
          subtitle: language.subtitle,
          level: language.level,
        },
        {
          headers: {
            authorization: `Token ${myToken}`,
          },
        }
      );
      setEditLanguage(false);
      setLanguage({
        title: '',
        subtitle: null,
        level: null,
        type: 'Language',
      });
      getLanguagesList();
      toast.success('Actualizado con éxito');
      formRef.current.classList.toggle('unhide');
      addButtonRef.current.classList.toggle('hide');
      setChildBodyHeight(getHeightRef.current.children[0].offsetHeight);
      props.refreshCvData();
    } catch (error) {
      console.error('error', error);
      toast.error('No se pudo actualizar el lenguaje');
    }
  };

  const getLanguagesList = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/cv/admin-cv-formskills/${props.cvId}?type=Language&page_size=20&page_number=1`,
        {
          headers: {
            authorization: `Token ${myToken}`,
          },
        }
      );
      setLanguagesList(data.data);
      setTimeout(() => {
        setChildBodyHeight(getHeightRef.current.children[0].offsetHeight);
      }, 100);
    } catch (error) {
      toast.error('No se pudo obtener tu lista de lenguajes');
    }
  };

  const visibility = async (event, visibility, id, index) => {
    event.preventDefault();

    let newArr = [...languagesList];
    newArr[index].public = visibility;

    setLanguagesList(newArr);

    try {
      const { data } = await axios.put(
        `${process.env.REACT_APP_BASE_URL}/cv/admin-cv-formskills/${props.cvId}/${id}`,
        {
          public: visibility,
        },
        {
          headers: {
            authorization: `Token ${myToken}`,
          },
        }
      );
      /* getItemsList(); */
      props.refreshCvData();
    } catch (error) {
      console.error('error', error);
    }
  };

  useEffect(() => {
    getLanguagesList();
  }, []);

  return (
    <div>
      <AccordeonBox>
        <div className="acordeon">
          <div
            className="header hide"
            ref={toggleAccordeonRef}
            onClick={toggleAccordeonHandle}
          >
            <div>
              <FontAwesomeIcon icon={faLanguage} className="iconAccordeon" />
              Idiomas
            </div>
            <div className="openClose">
              <img src={Chevron} alt="" />
            </div>
          </div>
          <div
            className="body"
            ref={getHeightRef}
            style={{
              height: `${childBodyHeight}px`,
            }}
          >
            <div>
              {languagesList.length === 0 ? (
                <p className="tasks_0">Aun no tienes ningún idioma guardado</p>
              ) : (
                languagesList.map((language, index) => {
                  return (
                    <BoxColumn key={language.id}>
                      <p className="first">{language.title}</p>
                      {language.subtitle ? (
                        <p className="second">
                          {language.subtitle} {' • '}
                          <span className="third">{language.level}</span>
                        </p>
                      ) : null}
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
                          onClick={(event) => {
                            visibility(
                              event,
                              !language.public,
                              language.id,
                              index
                            );
                          }}
                        >
                          {!language.public ? (
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
                    </BoxColumn>
                  );
                })
              )}
              <div className="separador"></div>
              <form
                onSubmit={addLanguage}
                className="wrapperForm"
                ref={formRef}
              >
                {editLanguage ? (
                  <h3>Actualizar idioma</h3>
                ) : (
                  <h3>Agregar nuevo idioma</h3>
                )}
                <p>
                  <label htmlFor="title">
                    Title<span className="fieldRecomendation">Requerido</span>
                  </label>
                  <input
                    ref={firstInputRef}
                    type="text"
                    id="title"
                    name="title"
                    value={language.title}
                    onChange={handleChange}
                    placeholder="Escribe el idioma aprendido (Ingles, Chino, etc)"
                    autoComplete="off"
                    required
                  />
                </p>
                <p>
                  <label htmlFor="subtitle">
                    Certificación
                    <span className="fieldRecomendation">Opcional</span>
                  </label>
                  <input
                    type="text"
                    id="subtitle"
                    name="subtitle"
                    value={language.subtitle === null ? '' : language.subtitle}
                    onChange={handleChange}
                    placeholder="Escribe el examen aprobado (IELTS, HSK, TOEFL, etc)"
                    autoComplete="off"
                  />
                </p>
                <p>
                  <label htmlFor="level">
                    Nivel<span className="fieldRecomendation">Opcional</span>
                  </label>
                  <input
                    type="level"
                    id="level"
                    name="level"
                    value={language.level === null ? '' : language.level}
                    onChange={handleChange}
                    placeholder="Escribe el nivel (Básico, Intermedio, Avanzado, etc)"
                    autoComplete="off"
                  />
                </p>
                <ButtonBox>
                  {editLanguage ? (
                    <>
                      <Button type="button" onClick={cancelUpdate}>
                        Cancelar
                      </Button>
                      <Button
                        type="button"
                        onClick={(event) => updateLanguage(event, language.id)}
                      >
                        Actualizar
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button type="button" onClick={cancelUpdate}>
                        Cancelar
                      </Button>
                      <Button type="button">Guardar</Button>
                    </>
                  )}
                </ButtonBox>
              </form>
              <ButtonBox ref={addButtonRef}>
                <Button type="button" onClick={handleForm}>
                  Agregar
                </Button>
              </ButtonBox>
            </div>
          </div>
        </div>
      </AccordeonBox>
    </div>
  );
};

export default LanguagesEdit;
