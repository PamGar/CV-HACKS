import React from 'react';
import '../../styles/normalize.css';
import styled from 'styled-components';

const GridBase = styled.div`
  display: grid;
  width: 100%;
  max-width: 100%;
  grid-template-columns: 100px max(600px) auto;
  grid-template-areas: 'navigation main tasks';

  @media (max-width: 1440px) {
    grid-template-columns: 100px max(500px) auto;
  }

  @media (max-width: 1099px) {
    grid-template-areas: 'navigation navigation' 'main tasks';
    grid-template-columns: max(500px) 1fr;
  }

  @media (max-width: 820px) {
    grid-template-areas: 'navigation' 'main';
  }
`;

const Nav = styled.nav`
  grid-area: navigation / navigation / navigation / navigation;
  position: sticky;
  top: 0;
  width: 100%;
  background-color: pink;
  height: 100vh;
  max-height: 100vh;
  margin: 0;
  z-index: 7;

  @media (max-width: 1099px) {
    height: 70px;
  }

  @media (max-width: 820px) {
    width: 100vw;
  }
`;

const Main = styled.div`
  width: 100%;
  grid-area: main / main / main / main;
  background-color: blue;

  @media (max-width: 820px) {
    width: 100vw;
  }
`;

const Tasks = styled.div`
  position: sticky;
  height: 100vh;
  grid-area: tasks / tasks / tasks / tasks;

  @media (max-width: 820px) {
    display: none;
  }
`;

const index = () => {
  return (
    <GridBase>
      <Nav>Navigation</Nav>
      <Main>Main</Main>
      <Tasks>Tasks</Tasks>
    </GridBase>
  );
};

export default index;
