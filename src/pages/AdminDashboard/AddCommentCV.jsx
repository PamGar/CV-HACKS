import React from 'react';
import styled from 'styled-components';
import FormWrapper from '../../components/FormWrapper';
import AlertMessage from '../../components/AlertMessage';
import { useState } from 'react';

const Textarea = styled.textarea`
  max-width: 100%;
  width: 100%;
  resize: vertical;
  overflow-wrap: break-word;
  padding: 8px 15px;
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
  grid-template-columns: 0.8fr minmax(210px, 1fr);
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
`;

const AddCommentCV = ({ setShowMainContent }) => {
  const [comment, setComment] = useState('');
  const [commentList, setCommentList] = useState([
    {
      id: 1,
      comment: 'Recuerda agregar la ultima experiencia laboral',
      area: 'Experiencia',
      status: 1,
    },
    {
      id: 2,
      comment: 'Coloca tus 2 nombres y apellidos',
      area: 'Información personal',
      status: 2,
    },
  ]);
  const [area, setArea] = useState('Informacion Personal');
  const handleChange = (e) => {
    setComment(e.target.value);
  };
  return (
    <FormWrapper
      onClick={() => console.log('sending information to API')}
      setShowMainContent={setShowMainContent}
      disableButton={!comment}
    >
      <h2>Agregar correción</h2>
      <Textarea
        rows='3'
        columns='15'
        onChange={handleChange}
        value={comment}
        autoFocus
      ></Textarea>
      <Select onChange={(e) => setArea(e.target.value)}>
        <option value='Informacion Personal'>Informacion Personal</option>
        <option value='Estudios'>Estudios</option>
        <option value='Experiencia'>Experiencia</option>
        <option value='Cursos'>Cursos</option>
      </Select>
      <h3>Preview</h3>
      <CommentContainer>
        <AreaContainer>
          <p>Area:</p>
          <p>{area}</p>
        </AreaContainer>
        <p>Correción:</p>
        {comment && <p className='comment'>{comment}</p>}
      </CommentContainer>
      <h3>Lista de comentarios</h3>
      {commentList.map((comment) => (
        <CommentContainer key={comment.id}>
          <AreaContainer>
            <p>Area:</p>
            <p>{comment.area}</p>
          </AreaContainer>
          <AreaContainer>
            <p>Status:</p>
            <AlertMessage
              fullWidth
              info={comment.status === 1 ? true : false}
              success={comment.status === 1 ? false : true}
            >
              {comment.status === 1 ? 'enviado' : 'terminado'}
            </AlertMessage>
          </AreaContainer>
          <p>Correción:</p>
          <p className='comment'> {comment.comment}</p>
        </CommentContainer>
      ))}
    </FormWrapper>
  );
};

export default AddCommentCV;
