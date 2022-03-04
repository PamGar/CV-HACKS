import React, { useState } from 'react';
import styled from 'styled-components';
import '../../styles/normalize.css';
import Logo from '../../assets/images/logo_white.png';
import Profile from '../../assets/images/profile.jpg';
import IconsBox from './userMenu';

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
    height: 100px;
    padding-left: 20px;
    box-sizing: border-box;
    padding-right: 20px;
    flex-direction: row;
    justify-content: space-between;

    .grow {
      display: none;
    }
  }

  @media (max-width: 820px) {
    width: 100vw;
  }
`;

const LogoContainer = styled.div`
  width: 70px;
  height: 70px;
  text-align: center;
  margin-top: 20px;

  img {
    width: 100%;
  }

  @media (max-width: 1099px) {
    margin-top: 10px;
  }
`;

const ProfileBox = styled.div`
  text-align: center;
  margin-bottom: 20px;
  position: relative;

  .imageProfile {
    border-radius: 50%;
    width: 70px;
    height: 70px;
    cursor: pointer;
  }

  img {
    border-radius: 50%;
    object-fit: cover;
    width: 100%;
    height: 100%;
  }

  a {
    font-weight: 700;
    color: #ff6161;
    text-decoration: none;
  }

  @media (max-width: 1099px) {
    margin-bottom: 0;
  }
`;

const MenuOptions = styled.div`
  width: 200px;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 5px 5px 5px grey;
  position: absolute;
  right: -210px;
  bottom: 50%;
  transform: translateY(50%);
  padding: 10px 0;

  @media (max-width: 1099px) {
    right: 0;
    bottom: -40%;
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

const Index = () => {
  const [openMenu, setOpenMenu] = useState(false);

  return (
    <GridBase>
      <Nav>
        <LogoContainer>
          <img src={Logo} alt="" />
        </LogoContainer>
        <IconsBox />
        <div className="grow"></div>
        <ProfileBox>
          <div className="imageProfile" onClick={() => setOpenMenu(!openMenu)}>
            <img src={Profile} alt="" />
          </div>
          {openMenu && (
            <MenuOptions>
              <a href="">Logout</a>
            </MenuOptions>
          )}
        </ProfileBox>
      </Nav>
      <Main>Main</Main>
      <Tasks>Tasks</Tasks>
    </GridBase>
  );
};

export default Index;
