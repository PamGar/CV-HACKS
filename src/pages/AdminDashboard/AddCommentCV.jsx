import React from 'react';
import styled from 'styled-components';
import FormWrapper from '../../components/FormWrapper';
import { useState, useEffect } from 'react';
import axios from 'axios';
import EditCommentModal from './EditCommentModal';
import ConfirmDeleteComentModal from './ConfirmDeleteComentModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { toast } from 'react-toastify';

const Textarea = styled.textarea`
  box-shadow: 0px 3px 5px 0px rgb(0 0 0 / 20%), 0px 2px 5px 0px rgb(0 0 0 / 14%),
    0px 1px 8px 0px rgb(0 0 0 / 12%);
  max-width: 100%;
  width: 100%;
  resize: vertical;
  overflow-wrap: break-word;
  padding: 8px 15px;
  border-radius: 3px;
`;

const CommentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  background-color: rgb(238, 238, 255);
  border-radius: 3px;
  box-shadow: 0px 3px 5px 0px rgb(0 0 0 / 20%), 0px 2px 5px 0px rgb(0 0 0 / 14%),
    0px 1px 8px 0px rgb(0 0 0 / 12%);
  padding: 15px;

  .comment {
    background-color: rgb(213, 213, 255);
    border-radius: 3px;
    padding: 9px;
  }
`;

const AreaContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr minmax(210px, 1fr);
  align-items: center;

  p:nth-child(2) {
    width: 100%;
    background-color: rgb(213, 213, 255);
    border-radius: 3px;
    text-align: center;
    padding: 9px;
  }
`;

const Select = styled.select`
  padding: 8px 15px;
  box-shadow: 0px 3px 5px 0px rgb(0 0 0 / 20%), 0px 2px 5px 0px rgb(0 0 0 / 14%),
    0px 1px 8px 0px rgb(0 0 0 / 12%);
  border-radius: 3px;
`;

const IconContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 20px;
`;

const IconButton = styled.button`
  cursor: pointer;
  background-color: transparent;

  .icon {
    height: 20px;
    width: 20px;
  }
`;

const AddCommentCV = ({ setShowMainContent, userSelectedId }) => {
  const [comment, setComment] = useState({
    comment: '',
    description: 'Informacion Personal',
  });
  const [commentList, setCommentList] = useState([]);
  const [openEditCommentModal, setOpenEditCommentModal] = useState(false);
  const [commentSelectedID, setCommentSelectedID] = useState(0);
  const [openConfirmDeleteComentModal, setOpenConfirmDeleteComentModal] =
    useState(false);
  const [loading, setLoading] = useState(false);
  const handleChange = (e) => {
    setComment((prev) => ({ ...prev, comment: e.target.value }));
  };
  const token = localStorage.getItem('authToken');

  const WriteAComment = async () => {
    setLoading(true);
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/cv/admin-cv-comments/${userSelectedId}`,
        comment,
        { headers: { authorization: `Token ${token}` } }
      );
      console.log(data);
      toast.success('¡Correción agregada!');
      setCommentList((prev) => [...prev, data]);
      setComment({
        comment: '',
        description: 'Informacion Personal',
      });
      setLoading(false);
    } catch (err) {
      toast.error('No se a podido agregar la correción');
      setLoading(false);
    }
  };
  const getListOfComments = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/cv/admin-cv-comments/${userSelectedId}`,
        { headers: { authorization: `Token ${token}` } }
      );
      setCommentList([...data]);
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getListOfComments();
  }, []);

  return (
    <>
      <FormWrapper
        onClick={WriteAComment}
        setShowMainContent={setShowMainContent}
        disableButton={!comment.comment || loading}
        loading={loading}
      >
        <h2>Agregar correción</h2>
        <Textarea
          rows='3'
          columns='15'
          onChange={handleChange}
          value={comment.comment}
          autoFocus
        ></Textarea>
        <Select
          onChange={(e) =>
            setComment((prev) => ({ ...prev, description: e.target.value }))
          }
        >
          <option value='Informacion Personal'>Informacion Personal</option>
          <option value='Estudios'>Estudios</option>
          <option value='Experiencia'>Experiencia</option>
          <option value='Cursos'>Cursos</option>
        </Select>
        <h3>Lista de comentarios</h3>
        {commentList.map(({ comment, id, description }) => (
          <CommentContainer key={id}>
            <IconContainer>
              <IconButton
                onClick={(e) => {
                  e.preventDefault();
                  setOpenEditCommentModal(true);
                  setCommentSelectedID(id);
                }}
              >
                <FontAwesomeIcon icon={faPenToSquare} className='icon' />
              </IconButton>
              <IconButton
                onClick={(e) => {
                  e.preventDefault();
                  setOpenConfirmDeleteComentModal(true);
                  setCommentSelectedID(id);
                }}
              >
                <FontAwesomeIcon icon={faTrashCan} className='icon' />
              </IconButton>
            </IconContainer>
            <AreaContainer>
              <p>Area:</p>
              <p>{description}</p>
            </AreaContainer>
            <AreaContainer>
              <p>Status:</p>
              {/* <AlertMessage
              fullWidth
              info={comment.status === 1 ? true : false}
              success={comment.status === 1 ? false : true}
            >
              {comment.status === 1 ? 'enviado' : 'terminado'}
            </AlertMessage> */}
            </AreaContainer>
            <p>Correción:</p>
            <p className='comment'>{comment}</p>
          </CommentContainer>
        ))}
      </FormWrapper>
      {openEditCommentModal && (
        <EditCommentModal
          openEditCommentModal={openEditCommentModal}
          setOpenEditCommentModal={setOpenEditCommentModal}
          commentID={commentSelectedID}
          commentList={commentList}
          setCommentList={setCommentList}
          userSelectedId={userSelectedId}
        />
      )}
      {openConfirmDeleteComentModal && (
        <ConfirmDeleteComentModal
          openConfirmDeleteComentModal={openConfirmDeleteComentModal}
          setOpenConfirmDeleteComentModal={setOpenConfirmDeleteComentModal}
          commentID={commentSelectedID}
          setCommentList={setCommentList}
          userSelectedId={userSelectedId}
        />
      )}
    </>
  );
};

export default AddCommentCV;
