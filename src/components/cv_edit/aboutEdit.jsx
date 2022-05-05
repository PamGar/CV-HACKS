import React, { useRef, useEffect, useState } from 'react';
import SocialEdit from './socialEdit';
import axios from 'axios';
import Button from '../Buttons/LoadingButton';
import Chevron from '../../assets/icons/chevron-down.svg';
import { Form, AccordeonBox, ButtonBox } from './EditStyledComponents';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';

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
      image: '',
    },
    address: {
      state: '',
      country: '',
    },
    address_update: false,
  });
  const profileImageRef = useRef();
  const getHeightRef = useRef();
  const toggleAccordeonRef = useRef();
  const [childBodyHeight, setChildBodyHeight] = useState(0);
  const myToken = window.localStorage.getItem('authToken');
  const myId = window.localStorage.getItem('id');
  const [itemsList, setItemsList] = useState([]);
  const refForm = useRef();

  const getItemsList = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/user/${myId}`,
        {
          headers: {
            authorization: `Token ${myToken}`,
          },
        }
      );
      setItem({
        user: {
          about_me: data.about_me,
          name: data.name,
          paternal_surname: data.paternal_surname,
          mothers_maiden_name: data.mothers_maiden_name,
          birthdate: data.birthdate,
          gender: data.gender,
          subscribed: data.subscribed,
          phone: data.phone,
        },
        address: {
          state: data.address.state,
          country: data.address.country,
        },
        address_update: false,
      });
      setChildBodyHeight(getHeightRef.current.children[0].offsetHeight);
    } catch (error) {
      console.error('error', error);
    }
  };

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

  const handleFileChange = (e) => {
    const { files } = e.target;

    UploadImageInfo(e);

    var reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload = function () {
      let base64 = reader.result.toString();
      setItem({
        ...item,
        user: {
          ...item.user,
          image: base64,
        },
      });
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
  };

  const toggleAccordeonHandle = () => {
    toggleAccordeonRef.current.classList.toggle('hide');
    setChildBodyHeight(getHeightRef.current.children[0].offsetHeight);
  };

  const getHeight = () => {
    setTimeout(() => {
      setChildBodyHeight(getHeightRef.current.children[0].offsetHeight);
    }, 500);
  };

  const updateLanguage = async (event, id) => {
    event.preventDefault();

    try {
      const { data } = await axios.put(URL, item, {
        headers: {
          authorization: `Token ${myToken}`,
        },
      });
      toast.success('Perfil actualizado');
      props.refreshCvData();
    } catch (error) {
      toast.error('Algo ocurrio, intenta de nuevo');
      console.log('errorAbout', error);
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
            <form ref={refForm} onSubmit={updateLanguage}>
              <div>
                <div className="addPicture">
                  <p>
                    Carga una foto para tu CV
                    <hr />
                    <span className="fieldRecomendation">Recomendado</span>
                  </p>
                  <label htmlFor="image">+</label>
                  <input
                    ref={profileImageRef}
                    type="file"
                    id="image"
                    name="image"
                    accept="image/x-png,image/gif,image/jpeg"
                    autoComplete="off"
                    onChange={handleFileChange}
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
                    value={item.user.name}
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
                    value={item.user.paternal_surname}
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
                        value={item.address.state}
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
                        value={item.address.country}
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
                    maxLength="200"
                    name="about_me"
                    value={item.user.about_me}
                    autoComplete="off"
                    placeholder="Escribe algo acerca de ti"
                    onChange={handleDataChange}
                  ></textarea>
                </p>
                {/* <p>
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
              </p> */}
                <p>
                  <label htmlFor="phone">
                    Telefono
                    <span className="fieldRecomendation">Requerido</span>
                  </label>
                  <input
                    type="text"
                    id="phone"
                    name="phone"
                    value={item.user.phone}
                    autoComplete="off"
                    placeholder="Escribe tu numero de telefono"
                    onChange={handleDataChange}
                    required
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
                    <Button type="button">Guardar</Button>
                  )}
                </ButtonBox>
                <SocialEdit
                  cvId={props.cvId}
                  getHeight={getHeight}
                  refreshCvData={props.refreshCvData}
                />
              </div>
            </form>
          </div>
        </div>
      </AccordeonBox>
    </div>
  );
};

export default AboutEdit;
