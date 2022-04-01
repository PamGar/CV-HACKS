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

const InterestEdit = (props) => {
  const URL = `${process.env.REACT_APP_BASE_URL}/cv/admin-cv-formskills/${props.cvId}`;
  const [hide, setHide] = useState(false);
  const [editItems, setEditItems] = useState(false);
  const [item, setItem] = useState({
    id: null,
    type: 'Interest',
    title: '',
    subtitle: '',
    level: '0',
  });

  const toggleAccordeonRef = useRef();
  const firstInputRef = useRef();
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
      const { data } = await axios.get(`${URL}?type=Interest`, {
        headers: {
          authorization: `Token ${myToken}`,
        },
      });
      console.log(data);
      setItemsList(data);
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
        type: 'Interest',
        title: '',
        subtitle: '',
        level: '0',
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
      setItem({
        id: data.id,
        type: 'Interest',
        title: data.title,
        subtitle: data.subtitle,
        level: '0',
      });
      setEditItems(true);
      firstInputRef.current.focus();
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
        },
        {
          headers: {
            authorization: `Token ${myToken}`,
          },
        }
      );
      setEditItems(false);
      setItem({
        type: 'Interest',
        title: '',
        subtitle: '',
        level: '0',
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
      type: 'Interest',
      title: '',
      subtitle: '',
      level: '0',
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
            Intereses
            <div className="openClose">
              <img src={Chevron} alt="" />
            </div>
          </div>
          <div className="body">
            {itemsList.length === 0 ? (
              <p className="tasks_0">
                Aun no tienes ningun interes / hobby guardado
              </p>
            ) : (
              itemsList.map((item) => {
                return (
                  <div className="body_box" key={item.id}>
                    <p>
                      <span>{item.title}</span>
                    </p>
                    <p>{item.subtitle}</p>
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
              <h3>Actualizar interes</h3>
            ) : (
              <h3>Agregar nuevo interes</h3>
            )}
            <p>
              <label htmlFor="title">
                Nombre del interes
                <span className="fieldRecomendation">Requerido</span>
              </label>
              <input
                ref={firstInputRef}
                type="text"
                name="title"
                value={item.title}
                placeholder="Escribe el nombre de la skill"
                autoComplete="off"
                onChange={handleChange}
              />
            </p>
            <p>
              <label htmlFor="subtitle">
                Descripcion
                <span className="fieldRecomendation">Opcional</span>
              </label>
              <textarea
                type="text"
                name="subtitle"
                value={item.subtitle}
                placeholder="Escribe una breve descripcion de tu interes"
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

export default InterestEdit;
