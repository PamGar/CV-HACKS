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
import { faScroll } from '@fortawesome/free-solid-svg-icons';
import Button from '../Buttons/LoadingButton';
import Chevron from '../../assets/icons/chevron-down.svg';
import { AccordeonBox, ButtonBox, BoxColumn } from './EditStyledComponents';
import { toast } from 'react-toastify';

const CoursesEdit = (props) => {
  const URL = `${process.env.REACT_APP_BASE_URL}/cv/formnormals/${props.cvId}`;
  const [hide, setHide] = useState(false);
  const [editItems, setEditItems] = useState(false);
  const [itemsList, setItemsList] = useState([]);
  const [item, setItem] = useState({
    data: {
      type: 'Course',
      title: '',
      subtitle: '',
      start_date: '',
      end_date: '',
      description: null,
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
    address_id: '',
  });
  const toggleAccordeonRef = useRef();
  const getHeightRef = useRef();
  const [childBodyHeight, setChildBodyHeight] = useState(0);
  const firstInputRef = useRef();
  const formRef = useRef();
  const addButtonRef = useRef();
  const myToken = window.localStorage.getItem('authToken');
  const [disabledEndDate, setDisabledEndDate] = useState(false);

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
        `${URL}?type=Course&page_size=20&page_number=1`,
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
      toast.error('No se pudo obtener tu lista de cursos');
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
          type: 'Course',
          title: '',
          subtitle: '',
          start_date: '',
          end_date: '',
          description: null,
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
        address_id: '',
      });
      getItemsList();
      toast.success('Curso agregado con éxito');
      formRef.current.classList.toggle('unhide');
      addButtonRef.current.classList.toggle('hide');
      setDisabledEndDate(false);
      /* setChildBodyHeight(getHeightRef.current.children[0].offsetHeight); */
      props.refreshCvData();
    } catch (error) {
      console.error('error', error);
      toast.error('No se pudo agregar el curso');
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
      toast.success('Curso eliminado con éxito');
      props.refreshCvData();
    } catch (error) {
      console.error('error', error);
      toast.error('No se pudo eliminar el curso');
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
          town: data.address.town,
          state: '0',
          country: data.address.country,
          zip_code: '0',
        },
        address_update: false,
        id: data.id,
        address_id: data.address.id,
      });
      setEditItems(true);
      setDisabledEndDate(data.end_date === null ? true : false);
      formRef.current.classList.add('unhide');
      addButtonRef.current.classList.add('hide');
      setChildBodyHeight(getHeightRef.current.children[0].offsetHeight);
      firstInputRef.current.focus();
    } catch (error) {
      toast.error('No se pudieron cargar los datos del curso a editar');
    }
  };

  const updateItem = async (event, id) => {
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
          type: 'Course',
          title: '',
          subtitle: '',
          start_date: '',
          end_date: '',
          description: null,
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
      toast.success('Curso actualizado con éxito');
      formRef.current.classList.toggle('unhide');
      addButtonRef.current.classList.toggle('hide');
      setChildBodyHeight(getHeightRef.current.children[0].offsetHeight);
      setDisabledEndDate(false);
      props.refreshCvData();
    } catch (error) {
      toast.error('No se pudo actualizar el curso');
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
        type: 'Course',
        title: '',
        subtitle: '',
        start_date: '',
        end_date: '',
        description: null,
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
        [name]: value === '' ? null : value,
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
        [name]: value === '' ? null : value,
      },
    });
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
              <FontAwesomeIcon icon={faScroll} className="iconAccordeon" />
              Cursos
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
                <p className="tasks_0">Aun no tienes ningún curso guardado</p>
              ) : (
                itemsList.map((item, index) => {
                  return (
                    <BoxColumn key={item.id}>
                      <p className="first">
                        {item.title}
                        {' • '}
                        <span className="third">{item.subtitle}</span>
                      </p>
                      <p className="second">{item.description}</p>
                      <p className="third">
                        <FontAwesomeIcon
                          icon={faCalendar}
                          className="calendar"
                        />{' '}
                        {item.start_date} {' • '}{' '}
                        {item.end_date === null ? 'Actualmente' : item.end_date}
                      </p>
                      <div className="editBox">
                        <button onClick={(event) => getItem(event, item.id)}>
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
                        <button onClick={(event) => removeItem(event, item.id)}>
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
                  <h3>Actualizar curso</h3>
                ) : (
                  <h3>Agregar nuevo curso</h3>
                )}
                <p>
                  <label htmlFor="title">
                    Nombre del curso
                    <span className="fieldRecomendation">Requerido</span>
                  </label>
                  <input
                    ref={firstInputRef}
                    type="text"
                    name="title"
                    value={item.data.title}
                    placeholder="Escribe el nombre del curso realizado"
                    autoComplete="off"
                    onChange={handleDataChange}
                    required
                  />
                </p>
                <p>
                  <label htmlFor="subtitle">
                    Institución o plataforma
                    <span className="fieldRecomendation">Requerido</span>
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="subtitle"
                    value={item.data.subtitle}
                    placeholder="Escribe el nombre de la institución o plataforma"
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
                        placeholder="Escribe la ciudad donde realizaste el curso"
                        onChange={handleAddressChange}
                        required
                      />
                    </p>
                  </div>
                  <div>
                    <p>
                      <label htmlFor="country">
                        País
                        <span className="fieldRecomendation">Requerido</span>
                      </label>
                      <input
                        type="text"
                        name="country"
                        value={item.address.country}
                        autoComplete="off"
                        placeholder="Escribe el país donde realizaste el curso"
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
                        value={
                          item.data.end_date === null ? '' : item.data.end_date
                        }
                        autoComplete="off"
                        onChange={handleDataChange}
                        disabled={disabledEndDate}
                      />
                    </p>
                    <div className="check_data">
                      <input
                        type="checkbox"
                        name="expiry_date"
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
                    <span className="fieldRecomendation">Opcional</span>
                  </label>
                  <textarea
                    type="text"
                    name="description"
                    rows="5"
                    value={
                      item.data.description === null
                        ? ''
                        : item.data.description
                    }
                    placeholder="Escribe las tecnologías aprendidas en el curso, que proyectos trabajaste, que herramientas usaste"
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

export default CoursesEdit;
