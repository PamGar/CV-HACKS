import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  padding: 30px;
`;

const WrapperCardCV = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-gap: 20px;
  justify-items: center;
  align-items: center;

  .card {
    background: grey;
    text-align: center;
    width: 300px;
    height: 100px;
    border-radius: 15px;
  }
`;

const MyCvs = () => {
  return (
    <Wrapper>
      <h1>Mis CV's</h1>
      <WrapperCardCV>
        <div className="card">Mi primer CV</div>
        <div className="card">Mi segundo CV</div>
        <div className="card">Mi tercer Cv</div>
        <div className="card">Agregar otro CV</div>
      </WrapperCardCV>
    </Wrapper>
  );
};

export default MyCvs;
