import React, { useState } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmarkCircle } from '@fortawesome/free-regular-svg-icons';
import AlertMessage from '../AlertMessage';

const Container = styled.div`
  background-color: white;
  display: flex;
  padding: 10px;
  gap: 10px;
  flex-wrap: wrap;
  box-shadow: 0px 3px 5px 0px rgb(0 0 0 / 20%), 0px 2px 5px 0px rgb(0 0 0 / 14%),
    0px 1px 8px 0px rgb(0 0 0 / 12%);
  &,
  > *,
  > * > * {
    border-radius: 3px;
  }
`;

const Gap = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
`;

const EmailCard = styled.span`
  background-color: #e0e0e0;
  padding: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
  font-weight: 600;

  .deleteIcon {
    cursor: pointer;
    height: 20px;
    width: 20px;
    color: #fa787f;
  }
`;

const Input = styled.input`
  padding: 5px;
  border: 1px solid #c7c7c7;
  width: 100%;
  border-color: ${(props) => (props.error ? '#D8000C' : '#c7c7c7')};

  :focus {
    border: 1px solid;
    outline: 1px solid;
    border-color: ${(props) => (props.error ? '#D8000C' : '#00b7b8')};
    outline-color: ${(props) => (props.error ? '#FFD2D2' : '#7cb4b4')};
  }
`;

const MultipleEmail = ({ emailList, setEmailList }) => {
  const [email, setEmail] = useState('');
  const [invalidEmailError, setInvalidEmailError] = useState('');
  const handleChange = (e) => {
    setEmail(e.target.value.trim());
    setInvalidEmailError('');
  };

  const emailRegex = /[\w\d\.-]+@[\w\d\.-]+\.[\w\d\.-]+/;

  const checkEmail = (email) => {
    let error = false;
    if (emailList.includes(email)) {
      setInvalidEmailError(`${email} ya fue ingresado`);
      error = true;
    } else if (!emailRegex.test(email)) {
      setInvalidEmailError('Email invalido');
      error = true;
    }
    return error;
  };

  const handleKeyDown = (e) => {
    const email = e.target.value;
    if (['Tab', ',', 'Enter'].includes(e.key)) {
      e.preventDefault();
      if (!checkEmail(email)) {
        setEmailList((prev) => [...prev, email]);
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
      setEmailList((prev) => [...prev, email]);
    }
  };

  return (
    <Container>
      {emailList.length > 0 && (
        <Gap>
          {emailList.map((email) => (
            <EmailCard key={email}>
              {email}
              <FontAwesomeIcon
                icon={faXmarkCircle}
                className='deleteIcon'
                onClick={() =>
                  setEmailList((prev) => [
                    ...prev.filter((item) => item !== email),
                  ])
                }
              />
            </EmailCard>
          ))}
        </Gap>
      )}
      <Input
        error={invalidEmailError}
        placeholder='ingresar correos'
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
    </Container>
  );
};

export default MultipleEmail;
