import React, { useRef, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import {
  faTrashCan,
  faPenToSquare,
  faEye,
  faEyeSlash,
  faCalendar,
} from '@fortawesome/free-regular-svg-icons';
import { faAward } from '@fortawesome/free-solid-svg-icons';
import Button from '../Buttons/LoadingButton';
import Chevron from '../../assets/icons/chevron-down.svg';
import { AccordeonBox, ButtonBox, BoxColumn } from './EditStyledComponents';
import { toast } from 'react-toastify';

const AwardEdit = (props) => {
  const URL = `${process.env.REACT_APP_BASE_URL}/cv/admin-cv-formworks/${props.cvId}`;
  const [hide, setHide] = useState(false);
  const [editItems, setEditItems] = useState(false);
  const [item, setItem] = useState({
    type: 'Award',
    title: '',
    subtitle: '',
    date: null,
    description: '',
  });
  const [itemsList, setItemsList] = useState([]);
  const toggleAccordeonRef = useRef();
  const getHeightRef = useRef();
  const addButtonRef = useRef();
  const formRef = useRef();
  const firstInputRef = useRef();
  const [childBodyHeight, setChildBodyHeight] = useState(0);
  const myToken = window.localStorage.getItem('authToken');

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
      const { data } = await axios.get(
        `${URL}?type=Award&page_size=20&page_number=1`,
        {
          headers: {
            authorization: `Token ${myToken}`,
          },
        }
      );
      setItemsList(data.data);
      setChildBodyHeight(getHeightRef.current.children[0].offsetHeight);
    } catch (error) {
      toast.error(error.response.data.message);
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
        type: 'Award',
        title: '',
        subtitle: '',
        date: null,
        description: '',
      });
      getItemsList();
      toast.success('Premio agregado');
      formRef.current.classList.toggle('unhide');
      addButtonRef.current.classList.toggle('hide');
      setChildBodyHeight(getHeightRef.current.children[0].offsetHeight);
      props.refreshCvData();
    } catch (error) {
      console.log('errorAward', error);
      toast.error('Oops, ocurrio algo inesperado');
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
      toast.success('Premio eliminado con exito');
      props.refreshCvData();
    } catch (error) {
      console.error('error', error);
      toast.error('Oops, ocurrio algo inesperado');
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
      setItem(data);
      setEditItems(true);
      formRef.current.classList.toggle('unhide');
      addButtonRef.current.classList.toggle('hide');
      setChildBodyHeight(getHeightRef.current.children[0].offsetHeight);
      firstInputRef.current.focus();
    } catch (error) {
      console.error('error', error);
      toast.error('Oops, ocurrio algo inesperado');
    }
  };

  const updateLanguage = async (event, id) => {
    event.preventDefault();

    try {
      const { data } = await axios.put(
        `${URL}/${id}`,
        {
          title: item.title,
          subtitle: item.subtitle,
          date: item.date,
          description: item.description,
        },
        {
          headers: {
            authorization: `Token ${myToken}`,
          },
        }
      );
      setEditItems(false);
      setItem({
        type: 'Award',
        title: '',
        subtitle: '',
        date: null,
        description: '',
      });
      getItemsList();
      toast.success('Premio actualizado con exito');
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
    formRef.current.classList.toggle('unhide');
    addButtonRef.current.classList.toggle('hide');
    setChildBodyHeight(getHeightRef.current.children[0].offsetHeight);
    setEditItems(false);
    setItem({
      type: 'Award',
      title: '',
      subtitle: '',
      date: null,
      description: '',
    });
  };

  const visibility = async (event, visibility, id, index) => {
    event.preventDefault();

    let newArr = [...itemsList];
    newArr[index].public = visibility;

    setItemsList(newArr);

    try {
      const { data } = await axios.put(
        `${URL}/${id}`,
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
            <div>
              <FontAwesomeIcon icon={faAward} className="iconAccordeon" />
              Premios
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
              {itemsList.length === 0 ? (
                <p className="tasks_0">Aun no tienes ningun premio guardado</p>
              ) : (
                itemsList
                  /* .sort((a, b) => {
                    return new Date(b.date) - new Date(a.date);
                  }) */
                  .map((item, index) => {
                    return (
                      <BoxColumn key={item.id}>
                        <p className="first">
                          {item.title}
                          {' • '}
                          <span className="third">{item.subtitle}</span>
                        </p>
                        <p className="second">{item.description}</p>
                        <p className="third">
                          <FontAwesomeIcon
                            icon={faCalendar}
                            className="calendar"
                          />{' '}
                          {item.date}
                        </p>
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
                            onClick={(event) => {
                              visibility(event, !item.public, item.id, index);
                            }}
                          >
                            {item.public ? (
                              <FontAwesomeIcon
                                icon={faEye}
                                className="editBox_unhide"
                              />
                            ) : (
                              <FontAwesomeIcon
                                icon={faEyeSlash}
                                className="editBox_hide"
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
                      </BoxColumn>
                    );
                  })
              )}
              <div className="separador"></div>
              <form onSubmit={addItem} className="wrapperForm" ref={formRef}>
                {editItems ? (
                  <h3>Actualizar premio</h3>
                ) : (
                  <h3>Agregar nuevo premio</h3>
                )}
                <p>
                  <label htmlFor="title">
                    Nombre del premio
                    <span className="fieldRecomendation">Requerido</span>
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={item.title}
                    placeholder="Escribe el nombre del premio"
                    autoComplete="off"
                    onChange={handleChange}
                    required
                  />
                </p>
                <p>
                  <label htmlFor="subtitle">
                    Institucion que lo entrega
                    <span className="fieldRecomendation">Requerido</span>
                  </label>
                  <input
                    type="text"
                    id="subtitle"
                    name="subtitle"
                    value={item.subtitle}
                    placeholder="Escribe el nombre de quien lo entrega"
                    autoComplete="off"
                    onChange={handleChange}
                    required
                  />
                </p>
                <p>
                  <label htmlFor="date">
                    Fecha de expedición
                    <span className="fieldRecomendation">Opcional</span>
                  </label>
                  <input
                    type="date"
                    id="date"
                    name="date"
                    value={item.date}
                    autoComplete="off"
                    onChange={handleChange}
                    required
                  />
                </p>
                <p>
                  <label htmlFor="description">
                    Descripción
                    <span className="fieldRecomendation">Opcional</span>
                  </label>
                  <textarea
                    type="text"
                    id="description"
                    name="description"
                    rows="5"
                    value={item.description}
                    placeholder="Escribe una breve descripcion"
                    autoComplete="off"
                    onChange={handleChange}
                    required
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

export default AwardEdit;
