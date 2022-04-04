import React, { useRef, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import {
  faTrashCan,
  faPenToSquare,
  faEye,
  faEyeSlash,
  faChessPawn,
} from '@fortawesome/free-regular-svg-icons';
import Button from '../Buttons/LoadingButton';
import Chevron from '../../assets/icons/chevron-down.svg';
import { AccordeonBox, ButtonBox } from './EditStyledComponents';

const SkillsEdit = (props) => {
  const URL = `${process.env.REACT_APP_BASE_URL}/cv/admin-cv-formskills/${props.cvId}`;
  const [hide, setHide] = useState(false);
  const [editItems, setEditItems] = useState(false);
  const [item, setItem] = useState({
    id: null,
    type: 'Skill',
    title: '',
    subtitle: '',
    level: '0',
  });
  const getHeightRef = useRef();
  const [childBodyHeight, setChildBodyHeight] = useState(0);
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
    setChildBodyHeight(getHeightRef.current.children[0].offsetHeight);
  };

  const getItemsList = async () => {
    try {
      const { data } = await axios.get(`${URL}?type=Skill`, {
        headers: {
          authorization: `Token ${myToken}`,
        },
      });
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
        type: 'Skill',
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
        type: 'Skill',
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
        type: 'Skill',
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
      type: 'Skill',
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
            <div>
              <FontAwesomeIcon icon={faChessPawn} className="iconAccordeon" />
              Skills
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
                <p className="tasks_0">Aun no tienes ninguna skill guardada</p>
              ) : (
                itemsList.map((item) => {
                  return (
                    <div className="body_box" key={item.id}>
                      <p>
                        <span>{item.title}</span>
                      </p>
                      <p>{item.subtitle}</p>
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
                <h3>Actualizar skill</h3>
              ) : (
                <h3>Agregar nueva skill</h3>
              )}
              <p>
                <label htmlFor="title">
                  Nombre de la skill
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
                  <span className="fieldRecomendation">Requerido</span>
                </label>
                <textarea
                  type="text"
                  name="subtitle"
                  rows="5"
                  value={item.subtitle}
                  placeholder="Escribe una breve descripcion de la skill"
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

export default SkillsEdit;
