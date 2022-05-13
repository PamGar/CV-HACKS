import React, { useRef, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import {
  faTrashCan,
  faPenToSquare,
  faEye,
  faEyeSlash,
  faCircleCheck,
  faCircleXmark,
} from '@fortawesome/free-regular-svg-icons';
import { toast } from 'react-toastify';

const SocialEdit = (props) => {
  const URL = `${process.env.REACT_APP_BASE_URL}/cv/admin-cv-urls/${props.cvId}`;
  const [hide, setHide] = useState(false);
  const [editItems, setEditItems] = useState(false);
  const [item, setItem] = useState({
    id: null,
    type: '',
    url: '',
    description: '',
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

  const getItemsList = async () => {
    try {
      const { data } = await axios.get(`${URL}?page_size=20&page_number=1`, {
        headers: {
          authorization: `Token ${myToken}`,
        },
      });
      setItemsList(data.data);
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
        id: null,
        type: '',
        url: '',
        description: '',
      });
      getItemsList();
      toast.success('Agregado con exito');
      props.refreshCvData();
      props.getHeight();
    } catch (error) {
      console.error('error', error);
      toast.error('Oops, ocurrio algo inesperado');
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
      props.refreshCvData();
      props.getHeight();
    } catch (error) {
      console.error('error', error);
      toast.error('Oops, ocurrio algo inesperado');
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
        type: data.type,
        url: data.url,
        description: data.description,
      });
      setEditItems(true);
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
        id: null,
        type: '',
        url: '',
        description: '',
      });
      getItemsList();
      toast.success('Actualizado con exito');
      props.refreshCvData();
    } catch (error) {
      console.error('error', error);
      toast.error('Oops, ocurrio algo inesperado');
    }
  };

  const cancelUpdate = (event) => {
    event.preventDefault();
    setEditItems(false);
    setItem({
      id: null,
      type: '',
      url: '',
      description: '',
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
      props.refreshCvData();
    } catch (error) {
      console.error('error', error);
    }
  };

  useEffect(() => {
    getItemsList();
  }, []);

  return (
    <p className="redesSociales">
      <label htmlFor="redes">
        Redes sociales
        <span className="fieldRecomendation">Recomendado</span>
      </label>
      <div onChange={handleChange}>
        <div className="twoColumns twoColumns__redes">
          <select name="type" id="cars" value={item.type}>
            <option value="">Selecciona una red social</option>
            <option value="LinkedIn">LinkedIn</option>
            <option value="Stackoverflow">Stackoverflow</option>
            <option value="Twitter">Twitter</option>
            <option value="Github">Github</option>
            <option value="Gitlab">Gitlab</option>
            <option value="Instagram">Instagram</option>
          </select>
          <input
            type="text"
            name="url"
            value={item.url}
            autoComplete="off"
            placeholder="Escribe tu nombre de usuario"
            onChange={handleChange}
          />
        </div>
        <input
          ref={firstInputRef}
          className="inputUrl"
          type="text"
          name="description"
          value={item.description}
          autoComplete="off"
          placeholder="Escribe la URL de tu perfil"
          onChange={handleChange}
        />
        <div className="socialButtonsBox">
          {editItems ? (
            <>
              <button className="addIcon" onClick={cancelUpdate}>
                <FontAwesomeIcon
                  icon={faCircleXmark}
                  className="editBox_xmark"
                />
              </button>
              <button
                className="addIcon"
                onClick={(event) => updateLanguage(event, item.id)}
              >
                <FontAwesomeIcon
                  icon={faCircleCheck}
                  className="editBox_check"
                />
              </button>
            </>
          ) : (
            <button className="addIcon" onClick={addItem}>
              +
            </button>
          )}
        </div>
      </div>
      <div className="redList">
        {itemsList.map((redSocial, index) => {
          return (
            <div className="redItem" key={redSocial.id}>
              <div>
                <p>
                  {redSocial.type}:{' '}
                  <a href={redSocial.description} target="_blank">
                    {redSocial.url}
                  </a>
                </p>
              </div>
              <div className="editBox">
                <button onClick={(event) => getLanguage(event, redSocial.id)}>
                  <FontAwesomeIcon
                    icon={faPenToSquare}
                    className="editBox_edit"
                  />
                </button>
                <button
                  onClick={(event) => {
                    visibility(event, !redSocial.public, redSocial.id, index);
                  }}
                >
                  {!redSocial.public ? (
                    <FontAwesomeIcon
                      icon={faEyeSlash}
                      className="editBox_hide"
                    />
                  ) : (
                    <FontAwesomeIcon icon={faEye} className="editBox_unhide" />
                  )}
                </button>
                <button
                  onClick={(event) => removeLanguage(event, redSocial.id)}
                >
                  <FontAwesomeIcon
                    icon={faTrashCan}
                    className="editBox_delete"
                  />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </p>
  );
};

export default SocialEdit;
