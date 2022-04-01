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
  const URL = `${process.env.REACT_APP_BASE_URL}/cv/formnormals/${props.cvId}`;
  const [hide, setHide] = useState(false);
  const [editItems, setEditItems] = useState(false);
  const [editedItem, setEditedItem] = useState({});
  const [item, setItem] = useState({
    data: {
      type: 'Project',
      title: '',
      subtitle: '',
      start_date: '',
      end_date: '',
      description: '',
    },
    address: {
      street: '0',
      num_int: 0,
      num_ext: 0,
      suburb: '0',
      town: '0',
      state: '0',
      country: '0',
      zip_code: '0',
    },
    address_update: false,
    id: '',
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
      const { data } = await axios.get(`${URL}?type=Project`, {
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
    console.log('hi');
    e.preventDefault();
    try {
      const { data } = await axios.post(URL, item, {
        headers: {
          authorization: `Token ${myToken}`,
        },
      });
      setItem({
        data: {
          type: 'Project',
          title: '',
          subtitle: '',
          start_date: '',
          end_date: '',
          description: '',
        },
        address: {
          street: '0',
          num_int: 0,
          num_ext: 0,
          suburb: '0',
          town: '0',
          state: '0',
          country: '0',
          zip_code: '0',
        },
        address_update: false,
        id: '',
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
        data: {
          title: data.title,
          subtitle: data.subtitle,
          start_date: data.start_date,
          end_date: data.end_date,
          description: data.description,
        },
        address: {
          street: '0',
          num_int: 0,
          num_ext: 0,
          suburb: '0',
          town: '0',
          state: '0',
          country: '0',
          zip_code: '0',
        },
        address_update: false,
        id: data.id,
      });
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
          data: {
            title: item.data.title,
            subtitle: item.data.subtitle,
            start_date: item.data.start_date,
            end_date: item.data.end_date,
            description: item.data.description,
          },
          address: {
            street: '0',
            num_int: 0,
            num_ext: 0,
            suburb: '0',
            town: '0',
            state: '0',
            country: '0',
            zip_code: '0',
          },
          address_update: false,
        },
        {
          headers: {
            authorization: `Token ${myToken}`,
          },
        }
      );
      setEditItems(false);
      setItem({
        data: {
          type: 'Project',
          title: '',
          subtitle: '',
          start_date: '',
          end_date: '',
          description: '',
        },
        address: {
          street: '0',
          num_int: 0,
          num_ext: 0,
          suburb: '0',
          town: '0',
          state: '0',
          country: '0',
          zip_code: '0',
        },
        address_update: false,
        id: '',
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
      data: {
        type: 'Project',
        title: '',
        subtitle: '',
        start_date: '',
        end_date: '',
        description: '',
      },
      address: {
        street: '0',
        num_int: 0,
        num_ext: 0,
        suburb: '0',
        town: '0',
        state: '0',
        country: '0',
        zip_code: '0',
      },
      address_update: false,
      id: '',
    });
  };

  /*Captar cambios al escribir en el formulario*/
  const handleAddressChange = (event) => {
    const { name, value } = event.target;

    setItem({
      ...item,
      address: {
        ...item.address,
        [name]: value,
      },
    });

    setEditedItem({
      ...editedItem,
      address: {
        ...editedItem.address,
        [name]: value,
      },
    });
  };

  /*Captar cambios al escribir en el formulario*/
  const handleDataChange = (event) => {
    const { name, value } = event.target;

    setItem({
      ...item,
      data: {
        ...item.data,
        [name]: value,
      },
    });

    setEditedItem({
      ...editedItem,
      data: {
        ...editedItem.data,
        [name]: value,
      },
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
          <div className="body">
            {itemsList.length === 0 ? (
              <p className="tasks_0">Aun no tienes ningun proyecto guardado</p>
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
                type="text"
                id="title"
                name="title"
                value={item.data.title}
                placeholder="Escribe el nombre del proyecto"
                autoComplete="off"
                onChange={handleDataChange}
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
                name="subtitle"
                value={item.data.subtitle}
                placeholder="Escribe un subtitulo sobre el proyecto"
                autoComplete="off"
                onChange={handleDataChange}
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
                    value={item.data.start_date}
                    autoComplete="off"
                    onChange={handleDataChange}
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
                    value={item.data.end_date}
                    autoComplete="off"
                    onChange={handleDataChange}
                  />
                </p>
                <div className="check_data">
                  <input
                    type="checkbox"
                    name="expiry_date"
                    value={item.data.end_date}
                    autoComplete="off"
                    onChange={handleDataChange}
                  />
                  <label htmlFor="expiry_date">Presente (Actualidad)</label>
                </div>
              </div>
            </div>
            <p>
              <label htmlFor="description">
                Descripción<span className="fieldRecomendation">Requerido</span>
              </label>
              <textarea
                type="text"
                id="description"
                name="description"
                rows="5"
                value={item.data.description}
                placeholder="Escribe tus tareas en el cargo"
                autoComplete="off"
                onChange={handleDataChange}
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

export default ProjectsEdit;
