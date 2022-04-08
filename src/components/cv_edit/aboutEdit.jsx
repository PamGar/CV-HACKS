import React, { useRef, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import Button from '../Buttons/LoadingButton';
import Chevron from '../../assets/icons/chevron-down.svg';
import { Form, AccordeonBox, ButtonBox } from './EditStyledComponents';
import {
  faTrashCan,
  faPenToSquare,
  faEye,
  faEyeSlash,
  faUser,
} from '@fortawesome/free-regular-svg-icons';

const AboutEdit = (props) => {
  const URL = `${process.env.REACT_APP_BASE_URL}/user/profile/`;
  const [hide, setHide] = useState(false);
  const [profileImageInfo, setProfileImageInfo] = useState('');
  const [editItems, setEditItems] = useState(false);
  const [item, setItem] = useState({
    user: {
      about_me: '',
      name: '',
      paternal_surname: '',
      mothers_maiden_name: '0',
      birthdate: '2020-06-21',
      gender: '0',
      subscribed: false,
      phone: '',
    },
    address: {
      state: '',
      country: '',
    },
    address_update: false,
  });
  const toggleAccordeonRef = useRef();
  const profileImageRef = useRef();
  const getHeightRef = useRef();
  const [childBodyHeight, setChildBodyHeight] = useState(0);
  const myToken = window.localStorage.getItem('authToken');
  const [itemsList, setItemsList] = useState([]);

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
      user: {
        ...item.user,
        [name]: value,
      },
    });
  };

  const toggleAccordeonHandle = () => {
    toggleAccordeonRef.current.classList.toggle('hide');
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
      props.refreshCvData();
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
      props.refreshCvData();
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
      const { data } = await axios.put(URL, item, {
        headers: {
          authorization: `Token ${myToken}`,
        },
      }); /* 
      setEditItems(false); */
      setItem({
        user: {
          about_me: '',
          name: '',
          paternal_surname: '',
          mothers_maiden_name: '0',
          birthdate: '2020-06-21',
          gender: '0',
          subscribed: false,
          phone: '',
        },
        address: {
          state: '',
          country: '',
        },
        address_update: false,
      });
      /* getItemsList(); */
      props.refreshCvData();
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

  const UploadImageInfo = (e) => {
    // Get the selected file
    const [file] = e.target.files;
    // Get the file name and size
    const { name: fileName, size } = file;
    // Convert size in bytes to kilo bytes
    const fileSize = (size / 1000).toFixed(2);
    // Set the text content
    const fileNameAndSize = `${fileName} - ${fileSize}KB`;
    setProfileImageInfo(fileNameAndSize);
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
              <FontAwesomeIcon icon={faUser} className="iconAccordeon" />
              Acerca de mi
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
              <div className="addPicture">
                <p>
                  Carga una foto para tu CV
                  <hr />
                  <span className="fieldRecomendation">Recomendado</span>
                </p>
                <label htmlFor="profilePicture">+</label>
                <input
                  ref={profileImageRef}
                  type="file"
                  id="profilePicture"
                  name="profilePicture"
                  value={item.credential_url}
                  autoComplete="off"
                  onChange={UploadImageInfo}
                />
                <p className="fileName">
                  {profileImageInfo}
                  {profileImageInfo !== '' ? (
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        profileImageRef.current.value = '';
                        setProfileImageInfo('');
                      }}
                    >
                      Eliminar
                    </button>
                  ) : null}
                </p>
              </div>
              <p>
                <label htmlFor="name">
                  Nombre
                  <span className="fieldRecomendation">Requerido</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={item.name}
                  placeholder="Escribe tu nombre"
                  autoComplete="off"
                  onChange={handleDataChange}
                  required
                />
              </p>
              <p>
                <label htmlFor="paternal_surname">
                  Apellido
                  <span className="fieldRecomendation">Requerido</span>
                </label>
                <input
                  type="text"
                  id="surname"
                  name="paternal_surname"
                  value={item.paternal_surname}
                  placeholder="Escribe tu apellido"
                  autoComplete="off"
                  onChange={handleDataChange}
                  required
                />
              </p>
              <div className="twoColumns">
                <div>
                  <p>
                    <label htmlFor="state">
                      Estado en el que vives
                      <span className="fieldRecomendation">Requerido</span>
                    </label>
                    <input
                      type="text"
                      id="city"
                      name="state"
                      value={item.state}
                      autoComplete="off"
                      placeholder="Escribe el estado en el que vives"
                      onChange={handleAddressChange}
                      required
                    />
                  </p>
                </div>
                <div>
                  <p>
                    <label htmlFor="country">
                      Pais en el que vives
                      <span className="fieldRecomendation">Requerido</span>
                    </label>
                    <input
                      type="text"
                      id="country"
                      name="country"
                      value={item.country}
                      autoComplete="off"
                      placeholder="Escribe el pais en el que vives"
                      onChange={handleAddressChange}
                      required
                    />
                  </p>
                </div>
              </div>
              <p>
                <label htmlFor="about_me">
                  Escribe un poco acerca de ti
                  <span className="fieldRecomendation">Opcional</span>
                </label>
                <textarea
                  rows="5"
                  maxlength="200"
                  name="about_me"
                  value={item.about_me}
                  autoComplete="off"
                  placeholder="Escribe algo acerca de ti"
                  onChange={handleDataChange}
                ></textarea>
              </p>
              <p>
                <label htmlFor="softskills">
                  Nombra algunas de tus softskills
                  <span className="fieldRecomendation">Requerido</span>
                </label>
                <input
                  type="text"
                  id="softskills"
                  name="softskills"
                  value={item.softskills}
                  autoComplete="off"
                  placeholder="Por ejemplo: empatia, puntualidad"
                  onChange={handleDataChange}
                  required
                  disabled
                />
              </p>
              <p>
                <label htmlFor="technologies">
                  Tecnologias y herramientas que mas usas
                  <span className="fieldRecomendation">Requerido</span>
                </label>
                <input
                  type="text"
                  id="technologies"
                  name="technologies"
                  value={item.technologies}
                  autoComplete="off"
                  placeholder="Por ejemplo: python, react, git"
                  onChange={handleDataChange}
                  required
                  disabled
                />
              </p>
              <p>
                <label htmlFor="phone">
                  Telefono
                  <span className="fieldRecomendation">Requerido</span>
                </label>
                <input
                  type="text"
                  id="phone"
                  name="phone"
                  value={item.phone}
                  autoComplete="off"
                  placeholder="Escribe tu numero de telefono"
                  onChange={handleDataChange}
                  required
                />
              </p>
              <p>
                <label htmlFor="redes">
                  Redes sociales
                  <span className="fieldRecomendation">Recomendado</span>
                </label>
                <div className="twoColumns twoColumns__redes">
                  <select name="redes" id="cars">
                    <option value="volvo">Twitter</option>
                    <option value="saab">Github</option>
                    <option value="mercedes">Stackoverflow</option>
                    <option value="audi">Instagram</option>
                  </select>
                  <input
                    type="text"
                    name="urlRed"
                    value={item.expiry_date}
                    autoComplete="off"
                    placeholder="Escribe la URL de tu perfil"
                    onChange={handleDataChange}
                  />
                  <button className="addIcon">+</button>
                </div>
                <div className="redList">
                  <div className="redItem">
                    <div>
                      <a href="http://www.twitter.com/ale6jss">Twitter</a>
                    </div>
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
                  <div className="redItem">
                    <div>
                      <a href="http://www.twitter.com/ale6jss">Stackoverflow</a>
                    </div>
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
                </div>
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
                  <Button type="button" onClick={updateLanguage}>
                    Guardar
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

export default AboutEdit;
