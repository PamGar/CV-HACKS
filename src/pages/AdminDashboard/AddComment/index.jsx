import { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import MainContentWrapper from '../../../components/MainContentWrapper';
import axios from 'axios';
import EditCommentModal from './EditCommentModal';
import ConfirmDeleteComentModal from './ConfirmDeleteComentModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { toast } from 'react-toastify';
import MainAndRightLayout from '../../../layouts/MainAndRightLayout';
import { useNavigate, useParams } from 'react-router-dom';
import SkeletonCommentCard from './SkeletonCommentCard';
import UserResumeById from '../ResumeList/UserResumeById';
import { ResumeContext } from '../ResumeContextProvider';

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
  position: relative;
  background-color: #f3f4f6;

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

const AddComment = () => {
  const { resumeData } = useContext(ResumeContext);
  const [comment, setComment] = useState({
    comment: '',
    description: 'Información Personal',
  });
  const [commentList, setCommentList] = useState([]);
  const [openEditCommentModal, setOpenEditCommentModal] = useState(false);
  const [commentSelectedID, setCommentSelectedID] = useState(0);
  const [openConfirmDeleteComentModal, setOpenConfirmDeleteComentModal] =
    useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(true);
  const [pageCounter, setPageCounter] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const handleChange = (e) => {
    setComment((prev) => ({ ...prev, comment: e.target.value }));
  };
  const token = localStorage.getItem('authToken');
  const { id } = useParams();
  const navigate = useNavigate();

  const PAGE_SIZE = 20;
  const WriteAComment = async () => {
    setLoading(true);
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/cv/admin-cv-comments/${resumeData.cv.id}`,
        comment,
        { headers: { authorization: `Token ${token}` } }
      );
      toast.success('¡Corrección agregada!');
      setComment({
        comment: '',
        description: 'Información Personal',
      });
      if (!hasMore) setCommentList((prev) => [data, ...prev]);
    } catch (err) {
      toast.error('No se a podido agregar la corrección');
    } finally {
      setLoading(false);
    }
  };
  const getListOfComments = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/cv/admin-cv-comments/${
          resumeData.cv.id
        }?page_number=${1}&page_size=${PAGE_SIZE}`,
        { headers: { authorization: `Token ${token}` } }
      );
      setCommentList([...data.data]);
      setPageCounter((prev) => prev + 1);
      setHasMore(data.next_page);
    } catch (err) {
      toast.error(
        'Opps ha ocurrido un error, no se logró cargar la lista de comentarios'
      );
    } finally {
      setLoadingData(false);
    }
  };

  const fetchMoreData = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/cv/admin-cv-comments/${resumeData.cv.id}?page_number=${pageCounter}&page_size=${PAGE_SIZE}`,
        {
          headers: {
            authorization: `Token ${localStorage.getItem('authToken')}`,
          },
        }
      );
      setCommentList((prev) => [...prev, ...data.data]);
      setPageCounter((prev) => prev + 1);
      setHasMore(data.next_page);
    } catch (err) {
      toast.error(
        'Opps ha ocurrido un error, no se logró cargar nuevos comentarios'
      );
    }
  };

  useEffect(() => {
    getListOfComments();
  }, []);

  return (
    <MainAndRightLayout
      main={
        <>
          <MainContentWrapper
            onClickLoadingButton={WriteAComment}
            onClickOutlinedButton={() => navigate(-1)}
            loadingButtonTitle="Agregar corrección"
            disableButton={!comment.comment || loading}
            loading={loading}
            dataLength={commentList.length}
            next={fetchMoreData}
            hasMore={hasMore}
            loader={
              <>
                <SkeletonCommentCard />
                <SkeletonCommentCard />
                <SkeletonCommentCard />
              </>
            }
          >
            <h2>Agregar corrección</h2>
            <Textarea
              rows="3"
              columns="15"
              onChange={handleChange}
              value={comment.comment}
              autoFocus
            ></Textarea>
            <Select
              onChange={(e) =>
                setComment((prev) => ({ ...prev, description: e.target.value }))
              }
            >
              <option value="Informacion Personal">Información Personal</option>
              <option value="Redes Sociales">Redes Sociales</option>
              <option value="Educación">Educación</option>
              <option value="Idiomas">Idiomas</option>
              <option value="Cursos">Cursos</option>
              <option value="Certificaciones">Certificaciones</option>
              <option value="Experiencia">Experiencia</option>
              <option value="Organizaciones">Organizaciones</option>
              <option value="Proyectos">Proyectos</option>
              <option value="Publicaciones">Publicaciones</option>
              <option value="Premios">Premios</option>
              <option value="Habilidades">Habilidades</option>
              <option value="Intereses">Intereses</option>
            </Select>
            <h3>Lista de comentarios</h3>
            {loadingData && (
              <>
                <SkeletonCommentCard />
                <SkeletonCommentCard />
                <SkeletonCommentCard />
              </>
            )}
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
                    <FontAwesomeIcon icon={faPenToSquare} className="icon" />
                  </IconButton>
                  <IconButton
                    onClick={(e) => {
                      e.preventDefault();
                      setOpenConfirmDeleteComentModal(true);
                      setCommentSelectedID(id);
                    }}
                  >
                    <FontAwesomeIcon icon={faTrashCan} className="icon" />
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
                <p>Corrección:</p>
                <p className="comment">{comment}</p>
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
              userSelectedId={id}
            />
          )}
          {openConfirmDeleteComentModal && (
            <ConfirmDeleteComentModal
              openConfirmDeleteComentModal={openConfirmDeleteComentModal}
              setOpenConfirmDeleteComentModal={setOpenConfirmDeleteComentModal}
              commentID={commentSelectedID}
              setCommentList={setCommentList}
              userSelectedId={resumeData.cv.id}
            />
          )}
        </>
      }
      right={<UserResumeById />}
    />
  );
};

export default AddComment;
