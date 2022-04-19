import React from 'react';
import styled from 'styled-components';
import MainContentWrapper from '../../../components/MainContentWrapper';
import { useState, useEffect } from 'react';
import axios from 'axios';
import EditCommentModal from './EditCommentModal';
import ConfirmDeleteComentModal from './ConfirmDeleteComentModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { toast } from 'react-toastify';

const Textarea = styled.textarea`
  max-width: 100%;
  background-color: #f3f4f6;
  width: 100%;
  resize: vertical;
  overflow-wrap: break-word;
  padding: 8px 15px;
  border-radius: 15px;
  box-shadow: rgb(0 0 0 / 20%) 0px 2px 1px -1px,
    rgb(0 0 0 / 14%) 0px 1px 1px 0px, rgb(0 0 0 / 12%) 0px 1px 3px 0px;
  :focus-visible {
    outline-color: #565696;
  }
`;

const CommentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  border-radius: 15px;
  padding: 15px;
  box-shadow: rgb(0 0 0 / 20%) 0px 2px 1px -1px,
    rgb(0 0 0 / 14%) 0px 1px 1px 0px, rgb(0 0 0 / 12%) 0px 1px 3px 0px;
  position: relative;

  ::after {
    content: '';
    position: absolute;
    inset: 0;
    box-shadow: rgb(0 0 0 / 20%) 0px 3px 3px -2px,
      rgb(0 0 0 / 14%) 0px 3px 4px 0px, rgb(0 0 0 / 12%) 0px 1px 8px 0px;
    opacity: 0;
    border-radius: 15px;
    transition: opacity 200ms ease;
    pointer-events: none;
  }

  :hover::after {
    opacity: 1;
    border-radius: 15px;
  }

  .comment {
    background-color: #f3f4f6;
    border-radius: 10px;
    padding: 9px;
  }
`;

const AreaContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr minmax(210px, 1fr);
  align-items: center;

  p:nth-child(2) {
    width: 100%;
    background-color: #f3f4f6;
    border-radius: 10px;
    text-align: center;
    padding: 9px;
  }
`;

const Select = styled.select`
  padding: 8px 15px;
  border-radius: 10px;
  background-color: #f3f4f6;
  box-shadow: rgb(0 0 0 / 20%) 0px 2px 1px -1px,
    rgb(0 0 0 / 14%) 0px 1px 1px 0px, rgb(0 0 0 / 12%) 0px 1px 3px 0px;
  :focus-visible {
    outline-color: #565696;
  }
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
  const [pageCounter, setPageCounter] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const handleChange = (e) => {
    setComment((prev) => ({ ...prev, comment: e.target.value }));
  };
  const token = localStorage.getItem('authToken');

  const PAGE_SIZE = 4;

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
        `${process.env.REACT_APP_BASE_URL}/cv/admin-cv-comments/${userSelectedId}?page_number=${pageCounter}&page_size=${PAGE_SIZE}`,
        { headers: { authorization: `Token ${token}` } }
      );
      setCommentList([...data.data]);
      setPageCounter((prev) => prev + 1);
      setHasMore(data.next_page);
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchMoreData = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/cv/admin-cv-comments/${userSelectedId}?page_number=${pageCounter}&page_size=${PAGE_SIZE}`,
        {
          headers: {
            authorization: `Token ${localStorage.getItem('authToken')}`,
          },
        }
      );
      setCommentList((prev) => [...prev, ...data.data]);
      setPageCounter((prev) => prev + 1);
      setHasMore(data.next_page);
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
      <MainContentWrapper
        onClickLoadingButton={WriteAComment}
        onClickOutlinedButton={() => setShowMainContent('CVlist')}
        loadingButtonTitle='Agregar correción'
        disableButton={!comment.comment || loading}
        loading={loading}
        dataLength={commentList.length}
        next={fetchMoreData}
        hasMore={hasMore}
        loader={<p>loading..</p>}
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
      </MainContentWrapper>
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
