import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrashCan } from '@fortawesome/free-regular-svg-icons';
import styled from 'styled-components';
import axios from 'axios';
import { ButtonBox } from '../../components/cv_edit/EditStyledComponents';
import LoadingButton from '../../components/Buttons/LoadingButton';
import English from '../../assets/images/eeuu-flag.png';
import Spanish from '../../assets/images/spain-flag.png';
import NewCvModal from '../cv_preview_list/new_cv_modal';
import ModalConfirmationDelete from '../cv_preview_list/confirm_delete';
import { toast } from 'react-toastify';

const Wrapper = styled.div`
  padding: 30px;

  h1 {
    margin-bottom: 20px;
  }
`;

const WrapperCardCV = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-gap: 20px;
  justify-items: left;
  align-items: center;

  & > a {
    width: 100%;
  }

  & .card {
    background: #fff;
    text-align: left;
    padding: 20px;
    box-shadow: 2px 1px 7px #00000057;
    border-radius: 10px;
    width: 100%;
    cursor: pointer;

    &:hover {
      background-color: #f6f6f6;
    }

    &:active {
      background-color: #e0e0e0;
    }
  }

  .card_data {
    display: flex;
    justify-content: space-between;

    .title {
      font-weight: 700;
    }

    .language {
      width: 30px;
      filter: opacity(50%);

      img {
        width: 100%;
      }
    }
  }
  .editBox {
    display: flex;
    justify-content: end;
    margin-top: 10px;

    button {
      margin-left: 10px;
      background: transparent;
      padding: 5px 0 0 5px;
      width: 30px;
      cursor: pointer;

      svg {
        font-size: 18px;
      }
    }

    & > button:hover {
      filter: opacity(50%);
    }

    .editBox_edit path {
      color: #92d27b;
    }

    .editBox_delete path {
      color: #ff6666;
    }

    .editBox_hide path {
      color: #ff6666;
      filter: opacity(0.5);
    }

    .editBox_unhide path {
      color: #99e2e3;
    }
  }
`;

const MyCvs = () => {
  const myToken = localStorage.getItem('authToken');
  const myId = localStorage.getItem('id');
  const [cvList, setCvList] = useState([]);
  const [edit, setEdit] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [infoToEdit, setInfoToEdit] = useState({});
  const [cvToDelete, setCvToDelete] = useState(null);

  const getCV = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/cv/`,
        {
          headers: {
            Authorization: `Token ${myToken}`,
          },
        }
      );

      setCvList(data.data);
    } catch (error) {
      console.error('errorData', error.message);
    }
  };

  const EditCv = (event, id, description, area, cv_language) => {
    event.preventDefault();
    setInfoToEdit({
      description: description,
      area: area,
      cv_language: cv_language,
      cvId: id,
    });
    setEdit(true);
    setOpenModal(true);
  };

  /* const removeCV = async (event, id) => {
    event.preventDefault();

    try {
      const { data } = await axios.delete(
        `${process.env.REACT_APP_BASE_URL}/cv/${id}`,
        {
          headers: {
            authorization: `Token ${myToken}`,
          },
        }
      );
      toast.success('CV eliminado con éxito');
      getCV();
    } catch (error) {
      console.error('error', error);
      toast.error('No se pudo eliminar el CV');
    }
  }; */

  useEffect(() => {
    getCV();
  }, []);

  return (
    <Wrapper>
      <h1>Mis CV's</h1>
      <WrapperCardCV>
        {cvList.map((CV) => {
          return (
            <NavLink
              to={`${CV.id}`}
              key={CV.id}
              style={{ textDecoration: 'none' }}
            >
              <div className="card">
                <div className="card_data">
                  <div>
                    <p className="title">{CV.description}</p>
                    <p>{CV?.area}</p>
                  </div>
                  <div className="language">
                    <img
                      src={
                        CV.cv_language?.id === 2
                          ? English
                          : CV.cv_language?.id === 1
                          ? Spanish
                          : null
                      }
                      alt=""
                    />
                  </div>
                </div>
                <div className="editBox">
                  {/* <button onClick={getLanguage(event, item.id) }> */}
                  <button
                    onClick={(event) => {
                      EditCv(
                        event,
                        CV.id,
                        CV.description,
                        CV.area,
                        CV.cv_language.id
                      );
                    }}
                  >
                    <FontAwesomeIcon
                      icon={faPenToSquare}
                      className="editBox_edit"
                    />
                  </button>
                  {/* <button
                  onClick={(event) => {
                      visibility(event, !item.public, item.id, index);
                    }}
                  >
                    {item.public ? (
                      <FontAwesomeIcon
                        icon={faEye}
                        className="editBox_unhide"
                      />
                    ) : (
                      <FontAwesomeIcon
                        icon={faEyeSlash}
                        className="editBox_hide"
                      />
                    )}
                  </button> */}
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      setCvToDelete(CV.id);
                      setConfirmDelete(true);
                    }}
                  >
                    <FontAwesomeIcon
                      icon={faTrashCan}
                      className="editBox_delete"
                    />
                  </button>
                </div>
              </div>
            </NavLink>
          );
        })}
      </WrapperCardCV>
      <ButtonBox>
        <LoadingButton
          onClick={() => {
            setEdit(false);
            setOpenModal(true);
          }}
        >
          Agregar otro CV
        </LoadingButton>
      </ButtonBox>
      {openModal && (
        <NewCvModal
          openModal={openModal}
          setOpenModal={setOpenModal}
          refreshCvList={getCV}
          isEdit={edit}
          infoToEdit={infoToEdit}
        />
      )}
      {confirmDelete && (
        <ModalConfirmationDelete
          openModal={confirmDelete}
          setOpenModal={setConfirmDelete}
          // confirmedDelete={removeCV}
          cvToDelete={cvToDelete}
          refreshCvList={getCV}
        />
      )}
    </Wrapper>
  );
};

export default MyCvs;
