import React, { useState } from 'react';
import styled from 'styled-components';
import Logo from '../../assets/images/logo_white.png';
import Profile from '../../assets/images/profile.jpg';
import IconsBox from './userMenu';

const GridBase = styled.div`
  display: grid;
  width: 100%;
  max-width: 1440px;
  grid-template-columns: 100px 1fr 1fr;
  grid-template-areas: 'navigation main tasks';

  @media (max-width: 1099px) {
    grid-template-areas: 'navigation navigation' 'main tasks';
    grid-template-columns: 1fr 1fr;
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
  box-shadow: 5px 5px 15px grey;

  .grow {
    flex-grow: 1;
  }

  @media (max-width: 1099px) {
    height: 70px;
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
  width: 50px;
  height: 50px;
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
    width: 50px;
    height: 50px;
    cursor: pointer;
  }

  img {
    border-radius: 50%;
    object-fit: cover;
    width: 100%;
    height: 100%;
  }

  a {
    text-decoration: none;
    color: #343434;
  }

  .logoutButton {
    color: #ff6161;
    font-weight: 700;
  }

  @media (max-width: 1099px) {
    margin-bottom: 0;
  }
`;

const MenuOptions = styled.div`
  width: 200px;
  background-color: #fff;
  border-radius: 3px;
  box-shadow: 5px 5px 15px grey;
  position: absolute;
  right: -210px;
  bottom: 0;
  display: flex;
  flex-direction: column;

  p {
    font-weight: 700;
    font-size: 14px;
  }

  * {
    padding: 10px;
    border-bottom: solid 1px #80808030;
  }

  hr {
    padding: 0;
  }

  @media (max-width: 1099px) {
    right: 0;
    top: 85px;
    bottom: unset;
  }
`;

const Main = styled.div`
  width: 100%;
  overflow: hidden;
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

const Index = (props) => {
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
              <p>Nombre del usuario</p>
              <hr />
              <a href="https:/">Settings</a>
              <hr />
              <a className="logoutButton" href="https:/">
                Logout
              </a>
            </MenuOptions>
          )}
        </ProfileBox>
      </Nav>
      <Main>{props.main}</Main>
      <Tasks>{props.right}</Tasks>
    </GridBase>
  );
};

export default Index;
