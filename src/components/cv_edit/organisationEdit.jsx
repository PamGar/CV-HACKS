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

const OrganisationEdit = (props) => {
  const URL = `${process.env.REACT_APP_BASE_URL}/cv/formnormals/${props.cvId}`;
  const [hide, setHide] = useState(false);
  const [editItems, setEditItems] = useState(false);
  const [itemsList, setItemsList] = useState([]);
  const [item, setItem] = useState({
    data: {
      type: 'Organisation',
      title: '',
      subtitle: '',
      start_date: '',
      end_date: '',
    },
    address: {
      street: '0',
      num_int: 0,
      num_ext: 0,
      suburb: '0',
      town: '',
      state: '0',
      country: '',
      zip_code: '0',
    },
    address_update: false,
    id: '',
  });
  const [editedItem, setEditedItem] = useState({});
  const toggleAccordeonRef = useRef();
  const firstInputRef = useRef();
  const myToken = window.localStorage.getItem('authToken');

  const toggleAccordeonHandle = () => {
    toggleAccordeonRef.current.classList.toggle('hide');
  };

  const getItemsList = async () => {
    try {
      const { data } = await axios.get(`${URL}?type=Organisation`, {
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
        data: {
          type: 'Organisation',
          title: '',
          subtitle: '',
          start_date: '',
          end_date: '',
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
      });
      getItemsList();
    } catch (error) {
      console.error('error', error);
    }
  };

  const removeItem = async (event, id) => {
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

  const getItem = async (event, id) => {
    event.preventDefault();

    try {
      const { data } = await axios.get(`${URL}/${id}`, {
        headers: {
          authorization: `Token ${myToken}`,
        },
      });
      setItem({
        data: {
          type: 'Organisation',
          title: data.title,
          subtitle: data.subtitle,
          start_date: data.start_date,
          end_date: data.end_date,
        },
        address: {
          street: '0',
          num_int: 0,
          num_ext: 0,
          suburb: '0',
          town: data.town,
          state: '0',
          country: data.country,
          zip_code: '0',
        },
        address_update: false,
        id: data.id,
      });
      setEditItems(true);
      firstInputRef.current.focus();
    } catch (error) {
      console.error('error', error);
    }
  };

  const updateItem = async (event, id) => {
    event.preventDefault();

    try {
      const { data } = await axios.put(`${URL}/${id}`, editedItem, {
        headers: {
          authorization: `Token ${myToken}`,
        },
      });
      setEditItems(false);
      setItem({
        data: {
          type: 'Organisation',
          title: '',
          subtitle: '',
          start_date: '',
          end_date: '',
        },
        address: {
          street: '0',
          num_int: 0,
          num_ext: 0,
          suburb: '0',
          town: '',
          state: '0',
          country: '',
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
        type: 'Organisation',
        title: '',
        subtitle: '',
        start_date: '',
        end_date: '',
      },
      address: {
        street: '0',
        num_int: 0,
        num_ext: 0,
        suburb: '0',
        town: '',
        state: '0',
        country: '',
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
            Organización
            <div className="openClose">
              <img src={Chevron} alt="" />
            </div>
          </div>
          <div className="body">
            {itemsList.length === 0 ? (
              <p className="tasks_0">
                Aun no tienes ninguna organización guardado
              </p>
            ) : (
              itemsList.map((item) => {
                return (
                  <div className="body_box" key={item.id}>
                    <p>
                      <span>{item.title}</span>
                    </p>
                    <p>{item.subtitle}</p>
                    <p>
                      {item.start_date} | {item.end_date}
                    </p>
                    <div className="editBox">
                      <button onClick={(event) => getItem(event, item.id)}>
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
                      <button onClick={(event) => removeItem(event, item.id)}>
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
              <h3>Actualizar organización</h3>
            ) : (
              <h3>Agregar nuevo organización</h3>
            )}
            <p>
              <label htmlFor="title">
                Nombre de la organización
                <span className="fieldRecomendation">Requerido</span>
              </label>
              <input
                ref={firstInputRef}
                type="text"
                name="title"
                value={item.data.title}
                placeholder="Escribe el nombre de la organización"
                autoComplete="off"
                onChange={handleDataChange}
              />
            </p>
            <p>
              <label htmlFor="subtitle">
                Posición dentro de la organización
                <span className="fieldRecomendation">Requerido</span>
              </label>
              <input
                type="text"
                id="company"
                name="subtitle"
                value={item.data.subtitle}
                placeholder="Escribe el nombre del empleador"
                autoComplete="off"
                onChange={handleDataChange}
              />
            </p>
            <div className="twoColumns">
              <div>
                <p>
                  <label htmlFor="city">
                    Ciudad<span className="fieldRecomendation">Requerido</span>
                  </label>
                  <input
                    type="text"
                    name="town"
                    value={item.address.town}
                    autoComplete="off"
                    placeholder="Escribe la ciudad en la que vives"
                    onChange={handleAddressChange}
                    required
                  />
                </p>
              </div>
              <div>
                <p>
                  <label htmlFor="country">
                    Pais<span className="fieldRecomendation">Requerido</span>
                  </label>
                  <input
                    type="text"
                    name="country"
                    value={item.address.country}
                    autoComplete="off"
                    placeholder="Escribe el pais en el que vives"
                    onChange={handleAddressChange}
                    required
                  />
                </p>
              </div>
            </div>
            <div className="twoColumns">
              <div>
                <p>
                  <label htmlFor="expedition_date">
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
                  <label htmlFor="expiry_date">
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
              <label htmlFor="credential_id">
                Descripción<span className="fieldRecomendation">Opcional</span>
              </label>
              <textarea
                type="text"
                name="credential_id"
                rows="5"
                value={item.credential_id}
                placeholder="Escribe una breve descripcion de la organización"
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
                    onClick={(event) => updateItem(event, item.id)}
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

export default OrganisationEdit;
