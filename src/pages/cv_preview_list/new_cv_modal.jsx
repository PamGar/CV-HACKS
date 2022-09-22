import Modal from '../../components/Modal';
import styled from 'styled-components';
import axios from 'axios';
import { toast } from 'react-toastify';
import ModalLayout from '../../components/Modal/ModalLayout';
import { useRef, useState, useEffect } from 'react';
import Button from '../../components/Buttons/LoadingButton';
import { ButtonBox } from '../../components/cv_edit/EditStyledComponents';

const Box = styled.div`
  max-width: 900px;
  padding: clamp(10px, 5%, 30px);
  border-radius: 15px;
  margin: 10px 0;
  background-color: #fff;

  & > p {
    font-weight: 500;
    font-size: 16px;
    margin-bottom: 20px;
  }

  form > div {
    display: flex;
    flex-direction: column;

    .fieldRecomendation {
      font-size: 11px;
      color: #9b9b9b;
      margin-left: 5px;
    }

    & > * {
      padding: 10px;
    }

    label {
      text-align: left;
      font-weight: 500;
      padding-left: 0;
      padding-bottom: 0;
    }

    input,
    select {
      border-radius: 10px;
      padding: 15px 10px;
      background-color: #ededed;
    }
  }
`;

const Input = styled.input`
  width: 100%;
  border: ${(props) =>
    props.error ? '1px solid #d8000c' : '1px solid #888888'};
  border-radius: 5px;
  font-size: 0.875rem;

  &::placeholder {
    color: ${(props) => (props.error ? '#FFD2D2' : '#888888')};
  }

  &:focus-visible {
    outline: none;
    border: ${(props) =>
      props.error ? 'border: 1px solid #d8000c' : '1px solid #00b7b8cc'};
  }
`;

const NewCvModal = ({
  openModal,
  setOpenModal,
  refreshCvList,
  isEdit,
  infoToEdit,
}) => {
  const URL = `${process.env.REACT_APP_BASE_URL}/cv/`;
  const ModalLayoutRef = useRef();
  const myToken = window.localStorage.getItem('authToken');
  const [item, setItem] = useState({
    description: '',
    area: '',
    cv_language: 1,
  });

  console.log('Modal', infoToEdit);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setItem({
      ...item,
      [name]: value,
    });
  };

  const HandleCreateCv = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        URL,
        {
          description: item.description,
          area: item.area,
          cv_language: parseInt(item.cv_language),
        },
        {
          headers: {
            authorization: `Token ${myToken}`,
          },
        }
      );
      refreshCvList();
      setOpenModal(false);
    } catch (error) {
      toast.error('No se pudo agregar el CV');
    }
  };

  const HandleEditCv = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `${URL}${infoToEdit.cvId}`,
        {
          description: item.description,
          area: item.area,
          cv_language: parseInt(item.cv_language),
        },
        {
          headers: {
            authorization: `Token ${myToken}`,
          },
        }
      );
      setOpenModal(false);
      refreshCvList();
    } catch (error) {
      toast.error('No se pudo editar el CV');
    }
  };

  useEffect(() => {
    if (isEdit) {
      setItem({
        description: infoToEdit.description,
        area: infoToEdit.area,
        cv_language: parseInt(infoToEdit.cv_language),
      });
    }
  }, []);

  return (
    <Modal
      isOpen={openModal}
      element={
        <ModalLayout
          ref={ModalLayoutRef}
          myOwnContainer
          setOpenModal={setOpenModal}
        >
          <Box>
            <h1>{isEdit ? 'Editar CV' : 'Agregar CV'}</h1>
            <form>
              <div>
                <label htmlFor="description">
                  Nombre para el CV
                  <span className="fieldRecomendation">Requerido</span>
                </label>
                <input
                  type="text"
                  name="description"
                  value={item.description}
                  placeholder="Escribe un nombre para el CV"
                  autoComplete="off"
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label htmlFor="user/area">
                  Area
                  <span className="fieldRecomendation">Requerida</span>
                </label>
                <input
                  list="colores"
                  type="text"
                  id="area"
                  value={item.area}
                  name="area"
                  placeholder="Escribe tu area (Frontend, backend, mobile, etc)"
                  autoComplete="off"
                  onChange={handleChange}
                />
                <datalist id="colores">
                  <option value="Frontend"></option>
                  <option value="Backend"></option>
                  <option value="Fullstack"></option>
                  <option value="Mobile"></option>
                  <option value="UX/UI"></option>
                  <option value="Product owner"></option>
                  <option value="Scrum Master"></option>
                </datalist>
              </div>
              <div>
                <label htmlFor="cv_language">
                  En que idioma estara el CV
                  <span className="fieldRecomendation">Requerido</span>
                </label>
                <select
                  name="cv_language"
                  onChange={handleChange}
                  value={item.cv_language}
                >
                  <option value="1">Español</option>
                  <option value="2">Ingles</option>
                </select>
              </div>
              <ButtonBox style={{ alignItems: 'center' }}>
                <Button
                  type="button"
                  onClick={isEdit ? HandleEditCv : HandleCreateCv}
                >
                  {isEdit ? 'Editar CV' : 'Agregar CV'}
                </Button>
              </ButtonBox>
            </form>
          </Box>
        </ModalLayout>
      }
    />
  );
};

export default NewCvModal;
