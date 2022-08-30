import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmarkCircle } from '@fortawesome/free-regular-svg-icons';
import AlertMessage from '../AlertMessage';

const Gap = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const EmailCard = styled.span`
  background-color: #a0a0cc;
  color: #fff;
  margin: 10px 10px 0 0;
  padding: 5px 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  font-weight: 600;
  border-radius: 15px;

  .deleteIcon {
    cursor: pointer;
    height: 20px;
    width: 20px;
    color: #ffbaba;
  }
`;

const Input = styled.input`
  padding: 5px;
  width: 100%;
  border-color: ${(props) => (props.error ? '#D8000C' : '#c7c7c7')};

  :focus {
    border: 1px solid;
    outline: 1px solid;
    border-color: ${(props) => (props.error ? '#D8000C' : '#565696')};
    outline-color: ${(props) => (props.error ? '#FFD2D2' : '#9494c0')};
  }
`;

const MultipleChoice = (props) => {
  const [choiceList, setChoiceList] = useState(props.tagsData);
  const [choicesAdded, setChoicesAdded] = useState([]);
  const [email, setEmail] = useState('');
  const [invalidEmailError, setInvalidEmailError] = useState('');
  const myToken = window.localStorage.getItem('authToken');
  const myId = window.localStorage.getItem('id');

  /* const getTechnologies = async (event) => {
    event.preventDefault();

    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/cv/tags/${myId}?page_size=50&page_number=1`,
        {
          headers: {
            authorization: `Token ${myToken}`,
          },
        }
      );
      setChoiceList(data.data);
      props.getHeight();
    } catch (error) {
      console.error('error', error);
      toast.error('Oops, ocurrió algo inesperado');
    }
  }; */

  const addItem = async (e, item) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/cv/tags/${myId}`,
        {
          tags: [item],
        },
        {
          headers: {
            authorization: `Token ${myToken}`,
          },
        }
      );
      toast.success('Agregado con éxito');
      props.getHeight();
      props.refreshCvData();
    } catch (error) {
      console.error('error', error);
      toast.error('Oops, ocurrió algo inesperado');
    }
  };

  const removeItem = async (event, id) => {
    event.preventDefault();

    try {
      const { data } = await axios.delete(
        `${process.env.REACT_APP_BASE_URL}/cv/tags/${id}`,
        {
          headers: {
            authorization: `Token ${myToken}`,
          },
        }
      );
      toast.success('Eliminado con éxito');
      props.refreshCvData();
    } catch (error) {
      console.error('error', error);
      toast.error('Oops, ocurrió algo inesperado');
    }
  };

  const checkEmail = (email) => {
    let error = false;
    choiceList.map((tag) => {
      if (tag.name === email) {
        setInvalidEmailError(`${email} ya fue ingresado`);
        error = true;
      }
    });
    return error;
  };

  const handleChange = (e) => {
    setEmail(e.target.value);
    setInvalidEmailError('');

    if (e.target.value.includes(',')) {
      e.preventDefault();
      if (!checkEmail(email)) {
        setChoiceList((prev) => [
          ...prev,
          {
            name: email,
          },
        ]);
        addItem(e, email);
        setEmail('');
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!checkEmail(email)) {
      setChoiceList((prev) => [
        ...prev,
        {
          name: email,
        },
      ]);
      addItem(e, email);
      setEmail('');
    }
  };

  const handleKeyDown = (e) => {
    const email = e.target.value;

    if (['Enter'].includes(e.key)) {
      e.preventDefault();
      if (!checkEmail(email)) {
        setChoiceList((prev) => [
          ...prev,
          {
            name: email,
          },
        ]);
        addItem(e, email);
        setEmail('');
      }
    } /* else {
      setEmail(e.target.value.trim());
      setInvalidEmailError('');
    } */
    props.getHeight();
  };

  /* const handlePaste = (e) => {
    e.preventDefault();
    const email = e.clipboardData.getData('text');
    setEmail('');

    if (checkEmail(email)) {
      setInvalidEmailError(`${email} ya fue ingresado`);
    } else {
      setInvalidEmailError('');
      setChoiceList((prev) => [...prev, email]);
    }
  }; */

  /* useEffect(() => {
    getTechnologies();
  }, []); */

  return (
    <p>
      <label htmlFor="technologies">
        Tecnologías y herramientas que dominas
        <span className="fieldRecomendation">Requerido</span>
      </label>
      <span
        className="fieldRecomendation"
        style={{ marginBottom: '5px', marginLeft: '10px' }}
      >
        (Ingresarlas separadas por una coma)
      </span>

      <Input
        type="text"
        name="technologies"
        error={invalidEmailError}
        placeholder="Javascript, Python, Node, Java, Ruby, etc."
        value={email}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        autoComplete="off"
      />
      {invalidEmailError && (
        <AlertMessage error fullWidth style={{ marginTop: '10px' }}>
          {invalidEmailError}
        </AlertMessage>
      )}
      {choiceList.length > 0 && (
        <Gap>
          {choiceList.map((email) => (
            <EmailCard key={email.id}>
              {email.name}
              <FontAwesomeIcon
                icon={faXmarkCircle}
                className="deleteIcon"
                onClick={(event) => {
                  setChoiceList((prev) => [
                    ...prev.filter((item) => item.name !== email.name),
                  ]);
                  removeItem(event, email.id);
                }}
              />
            </EmailCard>
          ))}
        </Gap>
      )}
    </p>
  );
};

export default MultipleChoice;
