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
  };

  const getItemsList = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/cv/${URLroute}/${props.cvId}?type=Publication`,
        {
          headers: {
            authorization: `Token ${myToken}`,
          },
        }
      );
      setItemsList(data);
    } catch (error) {
      console.error('error', error);
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
    } catch (error) {
      console.error('error', error);
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
    } catch (error) {
      console.error('error', error);
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
    } catch (error) {
      console.error('error', error);
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
    } catch (error) {
      console.error('error', error);
    }
  };

  const cancelUpdate = (event) => {
    event.preventDefault();
    setEditItems(false);
    setItem({
      type: 'Publication',
      title: '',
      subtitle: '',
      date: '',
      description: '',
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
            Publicaciones
            <div className="openClose">
              <img src={Chevron} alt="" />
            </div>
          </div>
          <div className="body">
            {itemsList.length === 0 ? (
              <p className="tasks_0">
                Aun no tienes ninguna publicacion guardada
              </p>
            ) : (
              itemsList.map((item) => {
                return (
                  <div className="body_box" key={item.id}>
                    <p>
                      <span>{item.title}</span>
                    </p>
                    <p>{item.subtitle}</p>
                    <p>{item.description}</p>
                    <div className="editBox">
                      <button onClick={(event) => getLanguage(event, item.id)}>
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
            {editItems ? (
              <h3>Actualizar publicación</h3>
            ) : (
              <h3>Agregar nueva publicación</h3>
            )}
            <p>
              <label htmlFor="title">¿Como se llama la publicación?</label>
              <input
                type="text"
                id="title"
                name="title"
                value={item.title}
                placeholder="Escribe el titulo de la publicacion"
                autoComplete="off"
                onChange={handleChange}
              />
            </p>
            <p>
              <label htmlFor="subtitle">¿Donde se publico?</label>
              <input
                type="text"
                id="subtitle"
                name="subtitle"
                value={item.subtitle}
                placeholder="Escribe el nombre del empleador"
                autoComplete="off"
                onChange={handleChange}
              />
            </p>
            <p>
              <label htmlFor="date">¿En que fecha se publico?</label>
              <input
                type="date"
                id="date"
                name="date"
                value={item.date}
                autoComplete="off"
                onChange={handleChange}
              />
            </p>
            <p>
              <label htmlFor="description">Descripción</label>
              <textarea
                type="text"
                id="description"
                name="description"
                rows="5"
                value={item.description}
                placeholder="Escribe tus tareas en el cargo"
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
                <Button type="button" onClick={addItem}>
                  Agregar +
                </Button>
              )}
            </ButtonBox>
          </div>
        </div>
      </AccordeonBox>
    </div>
  );
};

export default PublicationsEdit;
