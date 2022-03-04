import React from 'react';
import styled from 'styled-components';
import '../../styles/normalize.css';
import Logo from '../../assets/images/logo_white.png';
import Profile from '../../assets/images/profile.jpg';
import CVicon from '../../assets/icons/CV.svg';
import InterIcon from '../../assets/icons/Interview.svg';

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

const IconsBox = styled.div`
  text-align: center;
  color: #fff;

  div {
    font-size: 12px;
  }
`;

const IconButton = styled.button`
  width: 60px;
  height: 60px;
  border-radius: 5px;
  background-color: #54cd59;
  background-color: ${(props) => props.bgcolor};
  margin-top: 30px;
  margin-bottom: 10px;
  border: none;
  cursor: pointer;
`;

const ProfileBox = styled.div`
  text-align: center;
  margin-bottom: 20px;

  div {
    border-radius: 50%;
    width: 70px;
    height: 70px;
    margin-bottom: 10px;
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
        <IconsBox>
          <div>
            <IconButton bgcolor="#E83E8C">
              <img src={CVicon} alt="" />
            </IconButton>
            Curriculum
          </div>
          <div>
            <IconButton bgcolor="#59F97E">
              <img src={InterIcon} alt="" />
            </IconButton>
            Interviews
          </div>
        </IconsBox>
        <div className="grow"></div>
        <ProfileBox>
          <div>
            <img src={Profile} alt="" />
          </div>
          <a href="">Logout</a>
        </ProfileBox>
      </Nav>
      <Main>Main</Main>
      <Tasks>Tasks</Tasks>
    </GridBase>
  );
};

export default index;
