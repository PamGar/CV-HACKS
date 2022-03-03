import React from 'react';
import styled from 'styled-components';
import '../../styles/normalize.css';
import Logo from '../../assets/images/logo_white.png';
import Profile from '../../assets/images/profile.jpg';

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
  background-color: #00b7b8;
  height: 100vh;
  max-height: 100vh;
  margin: 0;
  z-index: 7;
  display: flex;
  flex-direction: column;
  align-items: center;

  .grow {
    flex-grow: 1;
  }

  @media (max-width: 1099px) {
    height: 70px;
  }

  @media (max-width: 820px) {
    width: 100vw;
  }
`;

const LogoContainer = styled.div`
  width: 100%;
  text-align: center;
  margin-top: 20px;

  img {
    width: 70%;
  }
`;

const MenuIcons = styled.div``;

const ProfileBox = styled.div`
  text-align: center;
  margin-bottom: 20px;

  img {
    border-radius: 50%;
    width: 70%;
  }

  a {
    font-weight: 700;
    color: #891010;
    text-decoration: none;
  }
`;

const Main = styled.div`
  width: 100%;
  grid-area: main / main / main / main;

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
      <Nav>
        <LogoContainer>
          <img src={Logo} alt="" />
        </LogoContainer>
        <MenuIcons>Icons</MenuIcons>
        <div className="grow"></div>
        <ProfileBox>
          <img src={Profile} alt="" />
          <a href="">Logout</a>
        </ProfileBox>
      </Nav>
      <Main>Main</Main>
      <Tasks>Tasks</Tasks>
    </GridBase>
  );
};

export default index;
