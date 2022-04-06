import axios from 'axios';
import { useState, useRef } from 'react';
import styled from 'styled-components';
import Modal from '../../../components/Modal';
import LoadingButton from '../../../components/Buttons/LoadingButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons';
import OutlinedButton from '../../../components/Buttons/OutlinedButton';
import { toast } from 'react-toastify';
import ModalLayout from '../../../components/Modal/ModalLayout';

const Textarea = styled.textarea`
  max-width: 100%;
  width: 100%;
  resize: vertical;
  overflow-wrap: break-word;
  padding: 8px 15px;
  box-shadow: 0px 3px 5px 0px rgb(0 0 0 / 20%), 0px 2px 5px 0px rgb(0 0 0 / 14%),
    0px 1px 8px 0px rgb(0 0 0 / 12%);
  border-radius: 3px;
`;

const Select = styled.select`
  padding: 8px 15px;
  box-shadow: 0px 3px 5px 0px rgb(0 0 0 / 20%), 0px 2px 5px 0px rgb(0 0 0 / 14%),
    0px 1px 8px 0px rgb(0 0 0 / 12%);
  border-radius: 3px;
  width: 100%;
`;

const FontAwesomeIconStyled = styled(FontAwesomeIcon)`
  width: 50px;
  height: 50px;
  color: #239e23;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 20px;
  width: 100%;
`;

const EditCommentModal = ({
  openEditCommentModal,
  setOpenEditCommentModal,
  commentID,
  commentList,
  setCommentList,
  userSelectedId,
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
  const ModalWrapperRef = useRef();

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
        `${process.env.REACT_APP_BASE_URL}/cv/admin-cv-comments/${userSelectedId}/${commentID}`,
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
      ModalWrapperRef.current.classList.add('fadeOut');
      toast.success('Correción editada');
      setTimeout(() => setOpenEditCommentModal(false), 250);
    } catch (err) {
      console.log(err);
      setLoading(false);
      setDisabledButton(false);
      toast.error('No se ha podido editar la correción');
    }
  };

  return (
    <Modal
      isOpen={openEditCommentModal}
      element={
        <ModalLayout ref={ModalWrapperRef}>
          <FontAwesomeIconStyled icon={faPenToSquare} />
          <h1>Editar correción</h1>
          <Textarea
            value={commentToBeChanged.comment}
            onChange={handleChangeTextarea}
          />
          <Select
            onChange={handleChangeSelect}
            value={commentToBeChanged.description}
          >
            <option value='Informacion Personal'>Informacion Personal</option>
            <option value='Estudios'>Estudios</option>
            <option value='Experiencia'>Experiencia</option>
            <option value='Cursos'>Cursos</option>
          </Select>
          <ButtonContainer>
            <OutlinedButton
              fullWidth
              disabled={loading}
              onClick={() => {
                ModalWrapperRef.current.classList.add('fadeOut');
                setTimeout(() => setOpenEditCommentModal(false), 250);
              }}
            >
              cancelar
            </OutlinedButton>
            <LoadingButton
              fullWidth
              onClick={editComment}
              disabled={disabledButton}
              loading={loading}
            >
              eliminar
            </LoadingButton>
          </ButtonContainer>
        </ModalLayout>
      }
    />
  );
};

export default EditCommentModal;
