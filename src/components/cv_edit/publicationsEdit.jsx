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
import { faNewspaper } from '@fortawesome/free-solid-svg-icons';
import Button from '../Buttons/LoadingButton';
import Chevron from '../../assets/icons/chevron-down.svg';
import { AccordeonBox, ButtonBox, BoxColumn } from './EditStyledComponents';
import { toast } from 'react-toastify';

const PublicationsEdit = (props) => {
  const URLroute = 'admin-cv-formworks';
  const [hide, setHide] = useState(false);
  const [editItems, setEditItems] = useState(false);
  const [item, setItem] = useState({
    type: 'Publication',
    title: '',
    subtitle: '',
    date: '',
    description: '',
  });
  const toggleAccordeonRef = useRef();
  const firstInputRef = useRef();
  const formRef = useRef();
  const addButtonRef = useRef();
  const getHeightRef = useRef();
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
      const { data } = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/cv/${URLroute}/${props.cvId}?type=Publication&page_size=20&page_number=1`,
        {
          headers: {
            authorization: `Token ${myToken}`,
          },
        }
      );
      setItemsList(data.data);
      setTimeout(() => {
        setChildBodyHeight(getHeightRef.current.children[0].offsetHeight);
      }, 100);
    } catch (error) {
      console.error('error', error);
      toast.error('Oops, ocurrio algo inesperado');
    }
  };

  const addItem = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/cv/${URLroute}/${props.cvId}`,
        item,
        {
          headers: {
            authorization: `Token ${myToken}`,
          },
        }
      );
      setItem({
        type: 'Publication',
        title: '',
        subtitle: '',
        date: '',
        description: '',
      });
      getItemsList();
      toast.success('Agregado con exito');
      formRef.current.classList.toggle('unhide');
      addButtonRef.current.classList.toggle('hide');
      setChildBodyHeight(getHeightRef.current.children[0].offsetHeight);
      props.refreshCvData();
    } catch (error) {
      console.error('error', error);
      toast.error('Oops, ocurrio algo inesperado');
    }
  };

  const removeLanguage = async (event, id) => {
    event.preventDefault();

    try {
      const { data } = await axios.delete(
        `${process.env.REACT_APP_BASE_URL}/cv/${URLroute}/${props.cvId}/${id}`,
        {
          headers: {
            authorization: `Token ${myToken}`,
          },
        }
      );
      getItemsList();
      toast.success('Eliminado con exito');
      props.refreshCvData();
    } catch (error) {
      console.error('error', error);
      toast.error('Oops, ocurrio algo inesperado');
    }
  };

  const getLanguage = async (event, id) => {
    event.preventDefault();

    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/cv/${URLroute}/${props.cvId}/${id}`,
        {
          headers: {
            authorization: `Token ${myToken}`,
          },
        }
      );
      setItem(data);
      setEditItems(true);
      formRef.current.classList.add('unhide');
      addButtonRef.current.classList.toggle('hide');
      setChildBodyHeight(getHeightRef.current.children[0].offsetHeight);
    } catch (error) {
      console.error('error', error);
      toast.error('Oops, ocurrio algo inesperado');
    }
  };

  const updateLanguage = async (event, id) => {
    event.preventDefault();

    try {
      const { data } = await axios.put(
        `${process.env.REACT_APP_BASE_URL}/cv/${URLroute}/${props.cvId}/${id}`,
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
        type: 'Publication',
        title: '',
        subtitle: '',
        date: '',
        description: '',
      });
      getItemsList();
      toast.success('Actualizado con exito');
      formRef.current.classList.toggle('unhide');
      addButtonRef.current.classList.toggle('hide');
      setChildBodyHeight(getHeightRef.current.children[0].offsetHeight);
      props.refreshCvData();
    } catch (error) {
      console.error('error', error);
      toast.error('Oops, ocurrio algo inesperado');
    }
  };

  const cancelUpdate = (event) => {
    event.preventDefault();
    setEditItems(false);
    formRef.current.classList.toggle('unhide');
    addButtonRef.current.classList.toggle('hide');
    setChildBodyHeight(getHeightRef.current.children[0].offsetHeight);
    setItem({
      type: 'Publication',
      title: '',
      subtitle: '',
      date: '',
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
        `${process.env.REACT_APP_BASE_URL}/cv/${URLroute}/${props.cvId}/${id}`,
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
              <FontAwesomeIcon icon={faNewspaper} className="iconAccordeon" />
              Publicaciones
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
                <p className="tasks_0">
                  Aun no tienes ninguna publicacion guardada
                </p>
              ) : (
                itemsList.map((item, index) => {
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
                          {!item.public ? (
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
                    </BoxColumn>
                  );
                })
              )}
              <div className="separador"></div>
              <form onSubmit={addItem} className="wrapperForm" ref={formRef}>
                {editItems ? (
                  <h3>Actualizar publicación</h3>
                ) : (
                  <h3>Agregar nueva publicación</h3>
                )}
                <p>
                  <label htmlFor="title">
                    Nombre de la publicación
                    <span className="fieldRecomendation">Requerido</span>
                  </label>
                  <input
                    ref={firstInputRef}
                    type="text"
                    id="title"
                    name="title"
                    value={item.title}
                    placeholder="Escribe el titulo de la publicacion"
                    autoComplete="off"
                    onChange={handleChange}
                    required
                  />
                </p>
                <p>
                  <label htmlFor="subtitle">
                    ¿Donde se publico?
                    <span className="fieldRecomendation">Opcional</span>
                  </label>
                  <input
                    type="text"
                    id="subtitle"
                    name="subtitle"
                    value={item.subtitle}
                    placeholder="Escribe el nombre del empleador"
                    autoComplete="off"
                    onChange={handleChange}
                    required
                  />
                </p>
                <p>
                  <label htmlFor="date">
                    Fecha de publicación
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
                    placeholder="Escribe una breve descripcion de la publicación"
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

export default PublicationsEdit;
