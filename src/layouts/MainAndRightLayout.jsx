import React from 'react';
import styled from 'styled-components';

const Layout = styled.div`
  display: grid;
  grid-template-columns: 465px minmax(auto, 780px);
  gap: 30px;
  @media (max-width: 1000px) {
    grid-template-columns: 1fr;
  }
`;
const PositionAbsolute = styled.div`
  position: relative;
`;

const Main = styled.div``;

const Right = styled.div`
  position: sticky;
  top: 30px;
  height: calc(100vh - 30px);
  padding: 0 5px;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    display: none;
  }
  @media (max-width: 1000px) {
    display: none;
  }
`;

const MainAndRightLayout = ({ main, right }) => {
  return (
    <Layout>
      <Main>{main}</Main>
      <PositionAbsolute>
        <Right>{right}</Right>
      </PositionAbsolute>
    </Layout>
  );
};

export default MainAndRightLayout;
