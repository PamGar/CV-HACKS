import axios from 'axios';
import { useState, useLayoutEffect } from 'react';
import styled from 'styled-components';
import Modal from '../../components/Modal';
import LoadingButton from '../../components/Buttons/LoadingButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleLeft } from '@fortawesome/free-regular-svg-icons';

const Wrapper = styled.div`
  position: fixed;
  inset: 0;
  display: grid;
  place-items: center;
  background-color: rgb(0, 0, 0, 0.5);
  z-index: 100;
  overflow-y: auto;
`;
const Container = styled.div`
  background-color: rgb(238, 238, 255);
  width: 90vw;
  max-width: 500px;
  padding: clamp(10px, 5%, 30px);
  border-radius: 3px;
  display: flex;
  flex-direction: column;
  gap: 15px;

  textarea {
    max-width: 100%;
    width: 100%;
    resize: vertical;
    overflow-wrap: break-word;
    padding: 8px 15px;
    box-shadow: 0px 3px 5px 0px rgb(0 0 0 / 20%),
      0px 2px 5px 0px rgb(0 0 0 / 14%), 0px 1px 8px 0px rgb(0 0 0 / 12%);
    border-radius: 3px;
  }

  select {
    padding: 8px 15px;
    box-shadow: 0px 3px 5px 0px rgb(0 0 0 / 20%),
      0px 2px 5px 0px rgb(0 0 0 / 14%), 0px 1px 8px 0px rgb(0 0 0 / 12%);
    border-radius: 3px;
  }
`;

const IconWrapper = styled.button`
  cursor: pointer;
  position: fixed;
  top: 50px;
  left: 50px;
  background-color: transparent;
  border-radius: 50%;

  .goBack {
    background-color: rgb(238, 238, 255);
    background-color: transparent;
    color: white;
    width: 50px;
    height: 50px;
  }
`;

const EditCommentModal = ({
  openEditCommentModal,
  setOpenEditCommentModal,
  commentID,
  commentList,
  setCommentList,
}) => {
  const [commentToBeChanged, setCommentToBeChanged] = useState(
    commentList.find((comment) => comment.id === commentID)
  );
  const [loading, setLoading] = useState(false);
  const [disabledButton, setDisabledButton] = useState(true);
  const comment = commentList.find((comment) => comment.id === commentID);
  const commentPosition = commentList.findIndex(
    (comment) => comment.id === commentID
  );

  const token = localStorage.getItem('authToken');

  const handleChangeTextarea = (e) => {
    setCommentToBeChanged((prev) => ({ ...prev, comment: e.target.value }));
    comment.comment === e.target.value
      ? setDisabledButton(true)
      : setDisabledButton(false);
  };

  const handleChangeSelect = (e) => {
    setCommentToBeChanged((prev) => ({ ...prev, description: e.target.value }));
    comment.description === e.target.value
      ? setDisabledButton(true)
      : setDisabledButton(false);
  };

  const editComment = async () => {
    setLoading(true);
    setDisabledButton(true);
    try {
      const { data } = await axios.put(
        `${process.env.REACT_APP_BASE_URL}/cv/admin-cv-comments/1/${commentID}`,
        {
          comment: commentToBeChanged.comment,
          description: commentToBeChanged.description,
        },
        { headers: { authorization: `Token ${token}` } }
      );
      //actuliza el array del component CVlist.jsx
      const arrCopy = [...commentList];
      arrCopy[commentPosition] = commentToBeChanged;
      setCommentList([...arrCopy]);
      setOpenEditCommentModal(false);
    } catch (err) {
      console.log(err);
    }
  };

  useLayoutEffect(() => {
    document.body.style.marginRight = '17px';
    document.body.style.overflowY = 'hidden';

    return () => document.body.removeAttribute('style');
  }, []);
  return (
    <Modal
      isOpen={openEditCommentModal}
      element={
        <Wrapper>
          <IconWrapper onClick={() => setOpenEditCommentModal(false)}>
            <FontAwesomeIcon icon={faCircleLeft} className='goBack' />
          </IconWrapper>
          <Container>
            <h1>Editar correción</h1>
            <textarea
              value={commentToBeChanged.comment}
              onChange={handleChangeTextarea}
            />
            <select
              onChange={handleChangeSelect}
              value={commentToBeChanged.description}
            >
              <option value='Informacion Personal'>Informacion Personal</option>
              <option value='Estudios'>Estudios</option>
              <option value='Experiencia'>Experiencia</option>
              <option value='Cursos'>Cursos</option>
            </select>
            <LoadingButton
              fullWidth
              onClick={editComment}
              disabled={disabledButton}
              loading={loading}
            >
              editar comentario
            </LoadingButton>
          </Container>
        </Wrapper>
      }
    />
  );
};

export default EditCommentModal;
