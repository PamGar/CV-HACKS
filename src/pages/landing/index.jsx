import React from 'react';
import styled from 'styled-components';
import Button from '../../components/Buttons/LoadingButton';
import { NavLink } from 'react-router-dom';
import Coder from '../../assets/images/Recurso1.svg';
import Logo from '../../assets/images/logo_white.png';

const Landing = () => {
  const LandingBox = styled.div`
    height: 100vh;

    button {
      background-color: #08adb4;
    }

    a {
      text-decoration: none;
    }
  `;
  const Nav = styled.div`
    height: 100px;
    padding: 0 20px;
    background-color: #a0a0cc;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .logo {
      height: 60%;

      img {
        height: 100%;
      }
    }
  `;
  const Body = styled.div`
    height: calc(100% - 100px);
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

  return (
    <LandingBox>
      <Nav>
        <div className="logo">
          <img src={Logo} alt="" />
        </div>
        <div>
          <p style={{ color: '#595393', fontWeight: '700', fontSize: '18px' }}>
            <span
              style={{ color: '#C0D12E', fontWeight: '700', fontSize: '18px' }}
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
        <div>
          <img src={Coder} alt="" />
        </div>
      </Body>
    </LandingBox>
  );
};

export default Landing;
