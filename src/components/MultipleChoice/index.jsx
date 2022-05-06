import React, { useState } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmarkCircle } from '@fortawesome/free-regular-svg-icons';
import AlertMessage from '../AlertMessage';

const Container = styled.div`
  margin-top: 15px;
`;

const Gap = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
`;

const EmailCard = styled.span`
  background-color: #a0a0cc;
  color: #fff;
  margin-top: 10px;
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
  margin-top: 5px;
  width: 100%;
  border-color: ${(props) => (props.error ? '#D8000C' : '#c7c7c7')};

  :focus {
    border: 1px solid;
    outline: 1px solid;
    border-color: ${(props) => (props.error ? '#D8000C' : '#565696')};
    outline-color: ${(props) => (props.error ? '#FFD2D2' : '#9494c0')};
  }
`;

const MultipleChoice = ({
  choiceList,
  setChoiceList,
  placeholder,
  name,
  title,
}) => {
  const [email, setEmail] = useState('');
  const [invalidEmailError, setInvalidEmailError] = useState('');
  const handleChange = (e) => {
    setEmail(e.target.value.trim());
    setInvalidEmailError('');
  };

  /* const emailRegex = /[\w\d\.-]+@[\w\d\.-]+\.[\w\d\.-]+/; */

  const checkEmail = (email) => {
    let error = false;
    if (choiceList.includes(email)) {
      setInvalidEmailError(`${email} ya fue ingresado`);
      error = true;
    } /* else if (!emailRegex.test(email)) {
      setInvalidEmailError('Email invalido');
      error = true;
    } */
    return error;
  };

  const handleKeyDown = (e) => {
    const email = e.target.value;
    if (['Tab', ',', 'Enter'].includes(e.key)) {
      e.preventDefault();
      if (!checkEmail(email)) {
        setChoiceList((prev) => [...prev, email]);
        setEmail('');
      }
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const email = e.clipboardData.getData('text');
    setEmail('');

    if (checkEmail(email)) {
      setInvalidEmailError(`${email} ya fue ingresado`);
    } else {
      setInvalidEmailError('');
      setChoiceList((prev) => [...prev, email]);
    }
  };

  return (
    <p>
      <label htmlFor={name}>
        {title}
        <span className="fieldRecomendation">Requerido</span>
      </label>
      <Input
        name={name}
        error={invalidEmailError}
        placeholder={placeholder}
        value={email}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onPaste={handlePaste}
        autoFocus
      />
      {invalidEmailError && (
        <AlertMessage error fullWidth>
          {invalidEmailError}
        </AlertMessage>
      )}
      {choiceList.length > 0 && (
        <Gap>
          {choiceList.map((email) => (
            <EmailCard key={email}>
              {email}
              <FontAwesomeIcon
                icon={faXmarkCircle}
                className="deleteIcon"
                onClick={() =>
                  setChoiceList((prev) => [
                    ...prev.filter((item) => item !== email),
                  ])
                }
              />
            </EmailCard>
          ))}
        </Gap>
      )}
    </p>
  );
};

export default MultipleChoice;
