import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import Coder from '../../assets/images/Recurso1.svg';
import Logo from '../../assets/images/logo_white.png';
import LandingImage from '../../assets/images/landing-image.jpg';

const LandingBox = styled.div`
  height: 100vh;
  display: grid;
  grid-template-rows: auto 1fr auto;

  h1 {
    color: #fff;

    @media (max-width: 800px) {
      font-size: 24px;
    }
  }

  a {
    text-decoration: none;
  }
`;

const Button = styled.button`
  background-color: #565696;
  padding: 10px 32px;
  border-radius: 30px;
  font-weight: 700;
  font-size: 16px;
  color: #fff;

  &:hover {
    background-color: #3f3f78;
    cursor: pointer;
  }
`;

const Nav = styled.div`
  height: 100px;
  padding: 0 20px;
  display: flex;
  justify-content: left;
  gap: 10px;
  align-items: center;

  .logo {
    height: 60%;

    img {
      height: 100%;
    }
  }
`;

const Body = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  padding: 20px;

  @media (max-width: 1000px) {
    flex-direction: column;
  }

  div {
    width: 50%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;

    @media (max-width: 1000px) {
      width: 100%;
    }
  }
`;

const Footer = styled.div`
  text-align: right;
  color: #fff;
  padding: 20px;

  a {
    color: #9797e5;
    font-weight: 700;
    font-size: 14px;
  }
`;

const Landing = () => {
  return (
    <LandingBox
      style={{
        backgroundImage: ` linear-gradient(to bottom, rgba(0, 0, 0, 0.52), rgba(0, 0, 0, 0.73)), url(${LandingImage})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPositionX: 'center',
      }}
    >
      <Nav>
        <div className="logo">
          <img src={Logo} alt="" />
        </div>
        <div>
          <p style={{ color: '#9a9a9a', fontWeight: '700', fontSize: '18px' }}>
            <span
              style={{ color: '#fff', fontWeight: '700', fontSize: '18px' }}
            >
              cv
            </span>{' '}
            platform
          </p>
        </div>
        {/* <NavLink to="/login">
          <Button>Ingresar</Button>
        </NavLink> */}
      </Nav>
      <Body>
        <div>
          <h1>
            Ingresa a la plataforma y<br />
            comienza ya a crear tu CV
          </h1>
          <NavLink to="/login" style={{ marginTop: '10px' }}>
            <Button>Ingresar</Button>
          </NavLink>
        </div>
      </Body>
      <Footer>
        Copyright ©2022{' '}
        <a href="https://hackademy.lat/" target="_blank">
          Hackademy
        </a>
        . Todos los derechos reservados
      </Footer>
    </LandingBox>
  );
};

export default Landing;
