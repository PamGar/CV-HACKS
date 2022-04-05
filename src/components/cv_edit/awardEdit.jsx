import React, { useRef, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import {
  faTrashCan,
  faPenToSquare,
  faEye,
  faEyeSlash,
  faStar,
} from '@fortawesome/free-regular-svg-icons';
import Button from '../Buttons/LoadingButton';
import Chevron from '../../assets/icons/chevron-down.svg';
import { AccordeonBox, ButtonBox } from './EditStyledComponents';

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
  const toggleAccordeonRef = useRef();
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

  const getItemsList = async () => {
    try {
      const { data } = await axios.get(`${URL}?type=Award`, {
        headers: {
          authorization: `Token ${myToken}`,
        },
      });
      setItemsList(data);
      setChildBodyHeight(getHeightRef.current.children[0].offsetHeight);
    } catch (error) {
      console.error('error', error);
    }
  };

  const addItem = async (e) => {
    console.log('hi');
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
    } catch (error) {
      console.error('error', error);
    }
  };

  const cancelUpdate = (event) => {
    event.preventDefault();
    setEditItems(false);
    setItem({
      type: 'Award',
      title: '',
      subtitle: '',
      date: null,
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
            <div>
              <FontAwesomeIcon icon={faStar} className="iconAccordeon" />
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
                itemsList.map((item) => {
                  return (
                    <div className="body_box" key={item.id}>
                      <p>
                        <span>{item.title}</span>
                      </p>
                      <p>{item.subtitle}</p>
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
        </div>
      </AccordeonBox>
    </div>
  );
};

export default AwardEdit;
