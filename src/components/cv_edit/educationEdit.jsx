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
import { faBuildingColumns } from '@fortawesome/free-solid-svg-icons';
import Button from '../Buttons/LoadingButton';
import Chevron from '../../assets/icons/chevron-down.svg';
import {
  AccordeonBox,
  ButtonBox,
  BoxFlex,
  BoxColumn,
} from './EditStyledComponents';
import { toast } from 'react-toastify';

const EducationEdit = (props) => {
  const URL = `${process.env.REACT_APP_BASE_URL}/cv/educations/${props.cvId}`;
  const [hide, setHide] = useState(false);
  const [editItems, setEditItems] = useState(false);
  const [item, setItem] = useState({
    data: {
      major: '',
      academic_discipline: 'empty',
      degree: '',
      start_date: '',
      end_date: null,
      description: '',
    },
    address: {
      street: 'empty',
      num_int: 0,
      num_ext: 0,
      suburb: 'empty',
      town: '',
      state: 'empty',
      country: '',
      zip_code: 'empty',
    },
    address_update: false,
    id: '',
    address_id: '',
  });

  const toggleAccordeonRef = useRef();
  const firstInputRef = useRef();
  const formRef = useRef();
  const addButtonRef = useRef();
  const getHeightRef = useRef();
  const [childBodyHeight, setChildBodyHeight] = useState(0);
  const [disabledEndDate, setDisabledEndDate] = useState(false);
  const myToken = window.localStorage.getItem('authToken');
  const [itemsList, setItemsList] = useState([]);

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
      const { data } = await axios.get(`${URL}?page_size=20&page_number=1`, {
        headers: {
          authorization: `Token ${myToken}`,
        },
      });
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
      const { data } = await axios.post(URL, item, {
        headers: {
          authorization: `Token ${myToken}`,
        },
      });
      setItem({
        data: {
          major: '',
          academic_discipline: 'empty',
          degree: '',
          start_date: '',
          end_date: '',
          description: '',
        },
        address: {
          street: 'empty',
          num_int: 0,
          num_ext: 0,
          suburb: 'empty',
          town: '',
          state: 'empty',
          country: '',
          zip_code: 'empty',
        },
        address_update: false,
      });
      toast.success('Agregado con exito');
      getItemsList();
      formRef.current.classList.toggle('unhide');
      addButtonRef.current.classList.toggle('hide');
      /* setChildBodyHeight(getHeightRef.current.children[0].offsetHeight); */
      props.refreshCvData();
    } catch (error) {
      toast.error(error.response.data.message);
      console.error('error', error.response);
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
      toast.success('Eliminado con exito');
      /* setChildBodyHeight(getHeightRef.current.children[0].offsetHeight); */
      props.refreshCvData();
    } catch (error) {
      toast.error('Oops, ocurrio algo inesperado');
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
          major: data.major,
          academic_discipline: 'empty',
          degree: data.degree,
          start_date: data.start_date,
          end_date: data.end_date === null ? '' : data.end_date,
          description: data.description,
        },
        address: {
          street: 'empty',
          num_int: 0,
          num_ext: 0,
          suburb: 'empty',
          town: data.address.town,
          state: 'empty',
          country: data.address.country,
          zip_code: 'empty',
        },
        address_update: false,
        id: data.id,
        address_id: data.address.id,
      });
      setDisabledEndDate(data.end_date === null ? true : false);
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
      const { data } = await axios.put(`${URL}/${id}`, item, {
        headers: {
          authorization: `Token ${myToken}`,
        },
      });
      setEditItems(false);
      setItem({
        data: {
          major: '',
          academic_discipline: 'empty',
          degree: '',
          start_date: '',
          end_date: '',
          description: '',
        },
        address: {
          street: 'empty',
          num_int: 0,
          num_ext: 0,
          suburb: 'empty',
          town: '',
          state: 'empty',
          country: '',
          zip_code: 'empty',
        },
        address_update: false,
      });
      getItemsList();
      toast.success('Actualizado con exito');
      formRef.current.classList.toggle('unhide');
      addButtonRef.current.classList.toggle('hide');
      /* setChildBodyHeight(getHeightRef.current.children[0].offsetHeight); */
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
      data: {
        major: '',
        academic_discipline: 'empty',
        degree: '',
        start_date: '',
        end_date: null,
        description: '',
      },
      address: {
        street: 'empty',
        num_int: 0,
        num_ext: 0,
        suburb: 'empty',
        town: '',
        state: 'empty',
        country: '',
        zip_code: 'empty',
      },
      address_update: false,
    });
  };

  /*Captar cambios al escribir en el formulario*/
  const handleAddressChange = (event) => {
    const { name, value } = event.target;

    setItem({
      ...item,
      address_update: true,
      address: {
        ...item.address,
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
  };

  const handleCheck = (event) => {
    const checked = event.target.checked;

    setItem({
      ...item,
      data: {
        ...item.data,
        end_date: checked ? null : '',
      },
    });
    setDisabledEndDate(!disabledEndDate);
  };

  const visibility = async (event, visibility, id, index) => {
    event.preventDefault();

    let newArr = [...itemsList];
    newArr[index].public = visibility;

    setItemsList(newArr);

    try {
      const { data } = await axios.put(
        `${URL}/${id}`,
        {
          public: visibility,
        },
        {
          headers: {
            authorization: `Token ${myToken}`,
          },
        }
      );
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
              <FontAwesomeIcon
                icon={faBuildingColumns}
                className="iconAccordeon"
              />
              Educación
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
                  Aun no tienes ninguna educacion guardada
                </p>
              ) : (
                itemsList.map((item, index) => {
                  return (
                    <BoxColumn key={item.id}>
                      <p className="first">
                        {item.major}
                        {' • '}
                        <span className="third">{item.degree}</span>
                      </p>
                      <p>{item.description}</p>
                      <p className="third">
                        <FontAwesomeIcon
                          icon={faCalendar}
                          className="calendar"
                        />{' '}
                        {item.start_date}
                        {' • '}
                        {item.end_date === null ? 'Actualmente' : item.end_date}
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
              <form className="wrapperForm" ref={formRef} onSubmit={addItem}>
                {editItems ? (
                  <h3>Actualizar educación</h3>
                ) : (
                  <h3>Agregar nueva educación</h3>
                )}
                <p>
                  <label htmlFor="title">
                    Titulo obtenido
                    <span className="fieldRecomendation">Requerido</span>
                  </label>
                  <input
                    ref={firstInputRef}
                    type="text"
                    name="major"
                    value={item.data.major}
                    placeholder="Escribe el titulo obtenido"
                    autoComplete="off"
                    onChange={handleDataChange}
                    required
                  />
                </p>
                <p>
                  <label htmlFor="subtitle">
                    Nombre de la institución
                    <span className="fieldRecomendation">Requerido</span>
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="degree"
                    value={item.data.degree}
                    placeholder="Preparatoria / Universidad / Institucion"
                    autoComplete="off"
                    onChange={handleDataChange}
                    required
                  />
                </p>
                <div className="twoColumns">
                  <div>
                    <p>
                      <label htmlFor="city">
                        Ciudad
                        <span className="fieldRecomendation">Requerido</span>
                      </label>
                      <input
                        type="text"
                        name="town"
                        value={item.address.town}
                        autoComplete="off"
                        placeholder="Escribe la ciudad de la institucion"
                        onChange={handleAddressChange}
                        required
                      />
                    </p>
                  </div>
                  <div>
                    <p>
                      <label htmlFor="country">
                        Pais
                        <span className="fieldRecomendation">Requerido</span>
                      </label>
                      <input
                        type="text"
                        name="country"
                        value={item.address.country}
                        autoComplete="off"
                        placeholder="Escribe el pais de la institucion"
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
                        required
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
                        disabled={disabledEndDate}
                        required
                      />
                    </p>
                    <div className="check_data">
                      <input
                        type="checkbox"
                        name="end_date"
                        checked={disabledEndDate}
                        autoComplete="off"
                        onChange={handleCheck}
                      />
                      <label htmlFor="expiry_date">Presente (Actualidad)</label>
                    </div>
                  </div>
                </div>
                <p>
                  <label htmlFor="description">
                    Descripción
                    <span className="description">Requerido</span>
                  </label>
                  <textarea
                    type="text"
                    rows="5"
                    name="description"
                    value={item.data.description}
                    placeholder="Escribe una breve descripcion del titulo obtenido"
                    autoComplete="off"
                    onChange={handleDataChange}
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
                      <Button type="button" onClick={cancelUpdate}>
                        Cancelar
                      </Button>
                      <Button type="submit" /* onClick={addItem} */>
                        Guardar
                      </Button>
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

export default EducationEdit;
