import axios from 'axios';
import { useEffect, useState, useLayoutEffect } from 'react';
import styled from 'styled-components';
import Modal from '../../components/Modal';
import LoadingButton from '../../components/Buttons/LoadingButton';
import SkeletonLoading from '../../components/SkeletonLoading';
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
  const [editedComment, setEditedComment] = useState({
    comment: '',
    description: '',
  });
  const [loading, setLoading] = useState(true);
  const [commentToBeChanged, setCommentToBeChanged] = useState(
    commentList.find((comment) => comment.id === commentID)
  );
  const token = localStorage.getItem('authToken');

  const commentPosition = commentList.findIndex(
    (comment) => comment.id === commentID
  );

  const handleChangeTextarea = (e) => {
    setEditedComment((prev) => ({
      ...prev,
      comment: e.target.value,
    }));
    setCommentToBeChanged((prev) => ({ ...prev, comment: e.target.value }));
  };

  const handleChangeSelect = (e) => {
    setEditedComment((prev) => ({ ...prev, description: e.target.value }));
    setCommentToBeChanged((prev) => ({ ...prev, description: e.target.value }));
  };

  const getComment = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/cv/admin-cv-comments/1/${commentID}`,
        { headers: { authorization: `Token ${token}` } }
      );
      setEditedComment({
        comment: data[0].comment,
        description: data[0].description,
      });
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  const editComment = async () => {
    try {
      const { data } = await axios.put(
        `${process.env.REACT_APP_BASE_URL}/cv/admin-cv-comments/1/${commentID}`,
        editedComment,
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

  useEffect(() => {
    getComment();
  }, []);

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
            {loading ? (
              <>
                <SkeletonLoading width={'100%'} height={'56px'} />
                <SkeletonLoading width={'100%'} height={'37px'} />
              </>
            ) : (
              <>
                <textarea
                  value={editedComment.comment}
                  autoFocus
                  onChange={handleChangeTextarea}
                />
                <select
                  onChange={handleChangeSelect}
                  value={editedComment.description}
                >
                  <option value='Informacion Personal'>
                    Informacion Personal
                  </option>
                  <option value='Estudios'>Estudios</option>
                  <option value='Experiencia'>Experiencia</option>
                  <option value='Cursos'>Cursos</option>
                </select>
              </>
            )}
            <LoadingButton fullWidth onClick={editComment}>
              editar comentario
            </LoadingButton>
          </Container>
        </Wrapper>
      }
    />
  );
};

export default EditCommentModal;
