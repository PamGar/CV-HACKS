import React, { useRef, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import {
  faTrashCan,
  faPenToSquare,
  faEye,
  faEyeSlash,
} from '@fortawesome/free-regular-svg-icons';
import Button from '../Buttons/LoadingButton';
import Chevron from '../../assets/icons/chevron-down.svg';
import { AccordeonBox, ButtonBox } from './EditStyledComponents';

const ProjectsEdit = (props) => {
  const URL = `${process.env.REACT_APP_BASE_URL}/cv/projects/${props.cvId}`;
  const [hide, setHide] = useState(false);
  const [editItems, setEditItems] = useState(false);
  const [editedItem, setEditedItem] = useState({});
  const [item, setItem] = useState({
    id: '',
    title: '',
    additional_information: '',
    start_date: '',
    end_date: '',
    description: '',
    tools: 'empty',
    technologies: 'empty',
  });
  const toggleAccordeonRef = useRef();
  const getHeightRef = useRef();
  const firstInputRef = useRef();
  const formRef = useRef();
  const addButtonRef = useRef();
  const [childBodyHeight, setChildBodyHeight] = useState(0);
  const myToken = window.localStorage.getItem('authToken');

  const [itemsList, setItemsList] = useState([]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setItem({
      ...item,
      [name]: value,
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

  const getItemsList = async () => {
    try {
      const { data } = await axios.get(`${URL}?page_size=10&page_number=1`, {
        headers: {
          authorization: `Token ${myToken}`,
        },
      });
      setItemsList(data.data);
      setChildBodyHeight(getHeightRef.current.children[0].offsetHeight);
    } catch (error) {
      console.error('error', error);
    }
  };

  const addItem = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(URL, item, {
        headers: {
          authorization: `Token ${myToken}`,
        },
      });
      setItem({
        id: '',
        title: '',
        additional_information: '',
        start_date: '',
        end_date: '',
        description: '',
        tools: 'empty',
        technologies: 'empty',
      });
      getItemsList();
      formRef.current.classList.toggle('unhide');
      addButtonRef.current.classList.toggle('hide');
      setChildBodyHeight(getHeightRef.current.children[0].offsetHeight);
      props.refreshCvData();
    } catch (error) {
      console.error('error', error);
    }
  };

  const removeLanguage = async (event, id) => {
    event.preventDefault();

    try {
      const { data } = await axios.delete(`${URL}/${id}`, {
        headers: {
          authorization: `Token ${myToken}`,
        },
      });
      getItemsList();
      props.refreshCvData();
    } catch (error) {
      console.error('error', error);
    }
  };

  const getLanguage = async (event, id) => {
    event.preventDefault();

    try {
      const { data } = await axios.get(`${URL}/${id}`, {
        headers: {
          authorization: `Token ${myToken}`,
        },
      });
      setItem({
        id: data.id,
        title: data.title,
        additional_information: data.additional_information,
        start_date: data.start_date,
        end_date: data.end_date,
        description: data.description,
        tools: 'empty',
        technologies: 'empty',
      });
      setEditItems(true);
      formRef.current.classList.toggle('unhide');
      addButtonRef.current.classList.toggle('hide');
      setChildBodyHeight(getHeightRef.current.children[0].offsetHeight);
    } catch (error) {
      console.error('error', error);
    }
  };

  const updateLanguage = async (event, id) => {
    event.preventDefault();

    try {
      const { data } = await axios.put(`${URL}/${id}`, item, {
        headers: {
          authorization: `Token ${myToken}`,
        },
      });
      setEditItems(false);
      setItem({
        id: '',
        title: '',
        additional_information: '',
        start_date: '',
        end_date: '',
        description: '',
        tools: 'empty',
        technologies: 'empty',
      });
      getItemsList();
      formRef.current.classList.toggle('unhide');
      addButtonRef.current.classList.toggle('hide');
      setChildBodyHeight(getHeightRef.current.children[0].offsetHeight);
      props.refreshCvData();
    } catch (error) {
      console.error('error', error);
    }
  };

  const cancelUpdate = (event) => {
    event.preventDefault();
    setEditItems(false);
    formRef.current.classList.toggle('unhide');
    addButtonRef.current.classList.toggle('hide');
    setChildBodyHeight(getHeightRef.current.children[0].offsetHeight);
    setItem({
      id: '',
      title: '',
      additional_information: '',
      start_date: '',
      end_date: '',
      description: '',
      tools: 'empty',
      technologies: 'empty',
    });
  };

  useEffect(() => {
    getItemsList();
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
            Proyectos
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
              {itemsList.length === 0 ? (
                <p className="tasks_0">
                  Aun no tienes ningun proyecto guardado
                </p>
              ) : (
                itemsList.map((item) => {
                  return (
                    <div className="body_box" key={item.id}>
                      <p>
                        <span>{item.title}</span>
                      </p>
                      <p>{item.additional_information}</p>
                      <p>{item.description}</p>
                      <div className="editBox">
                        <button
                          onClick={(event) => getLanguage(event, item.id)}
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
                          onClick={(event) => removeLanguage(event, item.id)}
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
              <div className="wrapperForm" ref={formRef}>
                {editItems ? (
                  <h3>Actualizar proyecto</h3>
                ) : (
                  <h3>Agregar nuevo proyecto</h3>
                )}
                <p>
                  <label htmlFor="title">
                    Titulo del proyecto
                    <span className="fieldRecomendation">Requerido</span>
                  </label>
                  <input
                    ref={firstInputRef}
                    type="text"
                    id="title"
                    name="title"
                    value={item.title}
                    placeholder="Escribe el nombre del proyecto"
                    autoComplete="off"
                    onChange={handleChange}
                  />
                </p>
                <p>
                  <label htmlFor="subtitle">
                    Subtitulo
                    <span className="fieldRecomendation">Requerido</span>
                  </label>
                  <input
                    type="text"
                    id="subtitle"
                    name="additional_information"
                    value={item.additional_information}
                    placeholder="Escribe un subtitulo sobre el proyecto"
                    autoComplete="off"
                    onChange={handleChange}
                  />
                </p>
                <div className="twoColumns">
                  <div>
                    <p>
                      <label htmlFor="start_date">
                        Fecha de inicio
                        <span className="fieldRecomendation">Requerido</span>
                      </label>
                      <input
                        type="date"
                        name="start_date"
                        value={item.start_date}
                        autoComplete="off"
                        onChange={handleChange}
                      />
                    </p>
                  </div>
                  <div>
                    <p>
                      <label htmlFor="end_date">
                        Fecha de culminación
                        <span className="fieldRecomendation">Requerido</span>
                      </label>
                      <input
                        type="date"
                        name="end_date"
                        value={item.end_date}
                        autoComplete="off"
                        onChange={handleChange}
                      />
                    </p>
                    <div className="check_data">
                      <input
                        type="checkbox"
                        name="expiry_date"
                        autoComplete="off"
                        onChange={handleChange}
                      />
                      <label htmlFor="expiry_date">Presente (Actualidad)</label>
                    </div>
                  </div>
                </div>
                <p>
                  <label htmlFor="description">
                    Descripción
                    <span className="fieldRecomendation">Requerido</span>
                  </label>
                  <textarea
                    type="text"
                    id="description"
                    name="description"
                    rows="5"
                    value={item.description}
                    placeholder="Escribe una breve descripción del proyecto"
                    autoComplete="off"
                    onChange={handleChange}
                  ></textarea>
                </p>
                <ButtonBox>
                  {editItems ? (
                    <>
                      <Button type="button" onClick={cancelUpdate}>
                        Cancelar
                      </Button>
                      <Button
                        type="button"
                        onClick={(event) => updateLanguage(event, item.id)}
                      >
                        Actualizar
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button type="button" onClick={handleForm}>
                        Cancelar
                      </Button>
                      <Button type="button" onClick={addItem}>
                        Guardar
                      </Button>
                    </>
                  )}
                </ButtonBox>
              </div>
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

export default ProjectsEdit;
