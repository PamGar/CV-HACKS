import React from 'react';
import styled from 'styled-components';
import Button from '../Buttons/LoadingButton';

const ButtonBox = styled.div`
  padding: 20px;
  display: flex;
  justify-content: center;

  button {
    margin: 0 30px;
  }
`;

const EditCV = ({ editButton }) => {
  return (
    <>
      <div>EditCV</div>
      <ButtonBox>
        <Button type="button" onClick={editButton}>
          Cancel
        </Button>
        <Button type="button">Save</Button>
      </ButtonBox>
    </>
  );
};

export default EditCV;
