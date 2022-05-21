import React, { useRef, useEffect, useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTrashCan,
  faPenToSquare,
  faEye,
  faEyeSlash,
  faCalendar,
} from '@fortawesome/free-regular-svg-icons';
import { faCertificate } from '@fortawesome/free-solid-svg-icons';
import Button from '../Buttons/LoadingButton';
import Chevron from '../../assets/icons/chevron-down.svg';
import { AccordeonBox, ButtonBox, BoxColumn } from './EditStyledComponents';
import { toast } from 'react-toastify';

const CertificationsEdit = (props) => {
  const [hide, setHide] = useState(false);
  const [editItems, setEditItems] = useState(false);
  const [item, setItem] = useState({
    name: '',
    company: '',
    expedition_date: '',
    expiry_date: '',
    credential_id: null,
    credential_url: null,
    id: '',
  });
  const toggleAccordeonRef = useRef();
  const firstInputRef = useRef();
  const formRef = useRef();
  const addButtonRef = useRef();
  const getHeightRef = useRef();
  const [childBodyHeight, setChildBodyHeight] = useState(0);
  const myToken = window.localStorage.getItem('authToken');
  const [itemsList, setItemsList] = useState([]);
  const [disabledEndDate, setDisabledEndDate] = useState(false);

  const handleCheck = (event) => {
    const checked = event.target.checked;

    setItem({
      ...item,
      expiry_date: checked ? null : '',
    });
    setDisabledEndDate(!disabledEndDate);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setItem({
      ...item,
      [name]: value === '' ? null : value,
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
        `${process.env.REACT_APP_BASE_URL}/cv/admin-cv-certifications/${props.cvId}?page_size=20&page_number=1`,
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
        expiry_date: '',
        credential_id: null,
        credential_url: null,
        id: '',
      });
      getItemsList();
      toast.success('Certificado agregado con exito');
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
        `${process.env.REACT_APP_BASE_URL}/cv/admin-cv-certifications/${props.cvId}/${id}`,
        {
          headers: {
            authorization: `Token ${myToken}`,
          },
        }
      );
      getItemsList();
      toast.success('Certificado eliminado con exito');
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
        `${process.env.REACT_APP_BASE_URL}/cv/admin-cv-certifications/${props.cvId}/${id}`,
        {
          headers: {
            authorization: `Token ${myToken}`,
          },
        }
      );
      setItem({
        name: data.name,
        company: data.company,
        expedition_date: data.expedition_date,
        expiry_date: data.expiry_date,
        credential_id: data.credential_id,
        credential_url: data.credential_url,
        id: data.id,
      });
      setDisabledEndDate(data.expiry_date === null ? true : false);
      setEditItems(true);
      formRef.current.classList.add('unhide');
      addButtonRef.current.classList.add('hide');
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
        expiry_date: '',
        credential_id: null,
        credential_url: null,
        id: '',
      });
      getItemsList();
      toast.success('Certificado actualizado con exito');
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
    setDisabledEndDate(false);
    setEditItems(false);
    formRef.current.classList.toggle('unhide');
    addButtonRef.current.classList.toggle('hide');
    setChildBodyHeight(getHeightRef.current.children[0].offsetHeight);
    setItem({
      name: '',
      company: '',
      expedition_date: '',
      expiry_date: '',
      credential_id: null,
      credential_url: null,
      id: '',
    });
  };

  const visibility = async (event, visibility, id, index) => {
    event.preventDefault();

    let newArr = [...itemsList];
    newArr[index].public = visibility;

    setItemsList(newArr);

    try {
      const { data } = await axios.put(
        `${process.env.REACT_APP_BASE_URL}/cv/admin-cv-certifications/${props.cvId}/${id}`,
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
              <FontAwesomeIcon icon={faCertificate} className="iconAccordeon" />
              Certificados
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
                  Aun no tienes ningun certificado guardado
                </p>
              ) : (
                itemsList.map((item, index) => {
                  return (
                    <BoxColumn key={item.id}>
                      <p className="first">
                        {item.company}
                        {' • '}
                        <span className="second">{item.name}</span>
                      </p>
                      <p className="second">{item.company}</p>

                      <p className="third">
                        <FontAwesomeIcon
                          icon={faCalendar}
                          className="calendar"
                        />{' '}
                        {item.expedition_date}
                        {' • '}
                        {item.expiry_date === null
                          ? 'Actualmente'
                          : item.expiry_date}
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
                        value={
                          item.expiry_date === null ? '' : item.expiry_date
                        }
                        autoComplete="off"
                        onChange={handleChange}
                        disabled={disabledEndDate}
                        required
                      />
                    </p>
                    <div className="check_data">
                      <input
                        type="checkbox"
                        id="expiry_date"
                        name="expiry_date"
                        checked={disabledEndDate}
                        autoComplete="off"
                        onChange={handleCheck}
                      />
                      <label htmlFor="expiry_date">No expira</label>
                    </div>
                  </div>
                </div>
                <p>
                  <label htmlFor="credential_id">
                    ID de la credencial
                    <span className="fieldRecomendation">Recomendado</span>
                  </label>
                  <input
                    type="text"
                    name="credential_id"
                    value={item.credential_id}
                    placeholder="Escribe tus tareas en el cargo"
                    autoComplete="off"
                    onChange={handleChange}
                  />
                </p>
                <p>
                  <label htmlFor="credential_url">
                    URL de la credencial
                    <span className="fieldRecomendation">Recomendado</span>
                  </label>
                  <input
                    type="text"
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
                    <>
                      <Button type="button" onClick={cancelUpdate}>
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

export default CertificationsEdit;
