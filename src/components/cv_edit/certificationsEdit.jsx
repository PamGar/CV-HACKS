import React, { useRef, useEffect, useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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
        `${process.env.REACT_APP_BASE_URL}/cv/admin-cv-certifications/${props.cvId}`,
        {
          headers: {
            authorization: `Token ${myToken}`,
          },
        }
      );
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
      formRef.current.classList.toggle('unhide');
      addButtonRef.current.classList.toggle('hide');
      setChildBodyHeight(getHeightRef.current.children[0].offsetHeight);
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
      formRef.current.classList.toggle('unhide');
      addButtonRef.current.classList.toggle('hide');
      setChildBodyHeight(getHeightRef.current.children[0].offsetHeight);
      firstInputRef.current.focus();
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
      formRef.current.classList.toggle('unhide');
      addButtonRef.current.classList.toggle('hide');
      setChildBodyHeight(getHeightRef.current.children[0].offsetHeight);
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
                  <h3>Actualizar certificado</h3>
                ) : (
                  <h3>Agregar nuevo certificado</h3>
                )}
                <p>
                  <label htmlFor="name">
                    Nombre del certificado
                    <span className="fieldRecomendation">Requerido</span>
                  </label>
                  <input
                    ref={firstInputRef}
                    type="text"
                    id="name"
                    name="name"
                    value={item.name}
                    placeholder="Escribe el nombre de la certificacion"
                    autoComplete="off"
                    onChange={handleChange}
                    required
                  />
                </p>
                <p>
                  <label htmlFor="company">
                    Institucion que lo expide
                    <span className="fieldRecomendation">Requerido</span>
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={item.company}
                    placeholder="Escribe el nombre de la quien entrega el certificado"
                    autoComplete="off"
                    onChange={handleChange}
                    required
                  />
                </p>
                <div className="twoColumns">
                  <div>
                    <p>
                      <label htmlFor="expedition_date">
                        Fecha de expedición
                        <span className="fieldRecomendation">Requerido</span>
                      </label>
                      <input
                        type="date"
                        id="expedition_date"
                        name="expedition_date"
                        value={item.expedition_date}
                        autoComplete="off"
                        onChange={handleChange}
                        required
                      />
                    </p>
                  </div>
                  <div>
                    <p>
                      <label htmlFor="expiry_date">
                        Fecha de expiración
                        <span className="fieldRecomendation">Requerido</span>
                      </label>
                      <input
                        type="date"
                        id="expiry_date"
                        name="expiry_date"
                        value={item.expiry_date}
                        autoComplete="off"
                        onChange={handleChange}
                        required
                      />
                    </p>
                    <div className="check_data">
                      <input
                        type="checkbox"
                        id="expiry_date"
                        name="expiry_date"
                        value={item.expiry_date}
                        autoComplete="off"
                        onChange={handleChange}
                      />
                      <label htmlFor="expiry_date">Presente (Actualidad)</label>
                    </div>
                  </div>
                </div>
                <p>
                  <label htmlFor="credential_id">
                    ID de la credencial
                    <span className="fieldRecomendation">Requerido</span>
                  </label>
                  <input
                    type="text"
                    name="credential_id"
                    value={item.credential_id}
                    placeholder="Escribe tus tareas en el cargo"
                    autoComplete="off"
                    onChange={handleChange}
                    required
                  />
                </p>
                <p>
                  <label htmlFor="credential_url">
                    URL de la credencial
                    <span className="fieldRecomendation">Requerido</span>
                  </label>
                  <input
                    type="text"
                    name="credential_url"
                    value={item.credential_url}
                    placeholder="Escribe tus tareas en el cargo"
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

export default CertificationsEdit;
