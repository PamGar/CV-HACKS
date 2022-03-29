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

const CertificationsEdit = (props) => {
  const [hide, setHide] = useState(false);
  const [editItems, setEditItems] = useState(false);
  const [item, setItem] = useState({
    name: '',
    company: '',
    expedition_date: '',
    expiry_date: null,
    credential_id: null,
    credential_url: '',
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
        `${process.env.REACT_APP_BASE_URL}/cv/admin-cv-certifications/${props.cvId}`,
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
    console.log('hi');
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/cv/admin-cv-certifications/${props.cvId}`,
        item,
        {
          headers: {
            authorization: `Token ${myToken}`,
          },
        }
      );
      setItem({
        name: '',
        company: '',
        expedition_date: '',
        expiry_date: null,
        credential_id: null,
        credential_url: '',
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
        `${process.env.REACT_APP_BASE_URL}/cv/admin-cv-certifications/${props.cvId}/${id}`,
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
        `${process.env.REACT_APP_BASE_URL}/cv/admin-cv-certifications/${props.cvId}/${id}`,
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
        `${process.env.REACT_APP_BASE_URL}/cv/admin-cv-certifications/${props.cvId}/${id}`,
        item,
        {
          headers: {
            authorization: `Token ${myToken}`,
          },
        }
      );
      setEditItems(false);
      setItem({
        name: '',
        company: '',
        expedition_date: '',
        expiry_date: null,
        credential_id: null,
        credential_url: '',
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
      name: '',
      company: '',
      expedition_date: '',
      expiry_date: null,
      credential_id: null,
      credential_url: '',
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
            Certificados
            <div className="openClose">
              <img src={Chevron} alt="" />
            </div>
          </div>
          <div className="body">
            {itemsList.length === 0 ? (
              <p className="tasks_0">
                Aun no tienes ningun certificado guardado
              </p>
            ) : (
              itemsList.map((item) => {
                return (
                  <div className="body_box" key={item.id}>
                    <p>
                      <span>{item.name}</span> {item.company}
                    </p>
                    <p>
                      {item.expedition_date} | {item.expiry_date}
                    </p>
                    <a href="http://">{item.credential_url}</a>
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
              <h3>Actualizar certificado</h3>
            ) : (
              <h3>Agregar nuevo certificado</h3>
            )}
            <p>
              <label htmlFor="name">Nombre del certificado</label>
              <input
                type="text"
                id="name"
                name="name"
                value={item.name}
                placeholder="Escribe el nombre de la certificacion"
                autoComplete="off"
                onChange={handleChange}
              />
            </p>
            <p>
              <label htmlFor="company">Institucion que lo expide</label>
              <input
                type="text"
                id="company"
                name="company"
                value={item.company}
                placeholder="Escribe el nombre del empleador"
                autoComplete="off"
                onChange={handleChange}
              />
            </p>
            <div className="date">
              <p>
                <label htmlFor="expedition_date">Fecha de expedición</label>
                <input
                  type="date"
                  id="expedition_date"
                  name="expedition_date"
                  value={item.expedition_date}
                  autoComplete="off"
                  onChange={handleChange}
                />
              </p>
              <p>
                <label htmlFor="expiry_date">Fecha de expiración</label>
                <input
                  type="date"
                  id="expiry_date"
                  name="expiry_date"
                  value={item.expiry_date}
                  autoComplete="off"
                  onChange={handleChange}
                />
              </p>
            </div>
            <p>
              <label htmlFor="credential_id">ID de la credencial</label>
              <input
                type="text"
                id="credential_id"
                name="credential_id"
                value={item.credential_id}
                placeholder="Escribe tus tareas en el cargo"
                autoComplete="off"
                onChange={handleChange}
              />
            </p>
            <p>
              <label htmlFor="credential_url">URL de la credencial</label>
              <input
                type="text"
                id="credential_url"
                name="credential_url"
                value={item.credential_url}
                placeholder="Escribe tus tareas en el cargo"
                autoComplete="off"
                onChange={handleChange}
              />
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

export default CertificationsEdit;
