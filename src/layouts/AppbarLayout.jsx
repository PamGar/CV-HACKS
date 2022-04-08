import React, { useLayoutEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import { Outlet, NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFileLines,
  faBuilding,
  faAddressCard,
  faUser,
} from '@fortawesome/free-regular-svg-icons';
import HackademyIcon from '../assets/images/logo_white.png';
import Modal from '../components/Modal';
import Drawer from './Drawer';

const Layout = styled.div`
  padding: 30px 30px 0;
  min-height: 100vh;
  display: grid;
  grid-template-columns: 120px 1fr;
  gap: 30px;
  @media (max-width: 1000px) {
    grid-template-columns: 1fr;
    grid-template-rows: 78px 1fr;
    padding: 0;
    gap: 20px;
  }
  .active {
    color: #565696;
    background-color: #5656960a;
  }
`;

const FlexWrapper = styled.div`
  position: sticky;
  position: -webkit-sticky;
  top: 30px;
  display: flex;
  flex-direction: column;
  z-index: 10px;
  @media (max-width: 1000px) {
    top: 0;
    flex-direction: row;
  }
`;

const AppBarDesktop = styled.nav`
  position: sticky;
  top: 30px;
  background-color: #a0a0cc;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  padding: 30px 0;

  box-shadow: 0px 3px 5px 0px rgb(0 0 0 / 20%), 0px 2px 5px 0px rgb(0 0 0 / 14%),
    0px 1px 8px 0px rgb(0 0 0 / 12%);
`;

const AppBarMobile = styled.nav`
  background-color: #a0a0cc;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  gap: 20px;

  box-shadow: 0px 3px 5px 0px rgb(0 0 0 / 20%), 0px 2px 5px 0px rgb(0 0 0 / 14%),
    0px 1px 8px 0px rgb(0 0 0 / 12%);

  @media (max-width: 800px) {
    justify-content: space-between;
  }
`;

const MainWrapper = styled.div`
  @media (max-width: 1000px) {
    padding: 0 20px;
  }
`;

const StyledLink = styled(NavLink)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  text-decoration: none;
  color: rgb(236, 225, 209);
  width: 80%;
  border-radius: 15px;
  padding: 10px 0;

  .Icon {
    height: 30px;
    width: 30px;
  }

  .HackademyIcon {
    height: 50px;
    width: 50px;
  }

  @media (max-width: 1000px) {
    width: 20%;
    padding: 10px 0 0 0;
  }

  @media (max-width: 800px) {
    width: 50px;
    margin-right: 20px;
    color: #565696;
  }
`;

const StyledLinkMobile = styled(StyledLink)`
  flex-direction: row;
  width: 100%;
  padding: 15px;
  border-radius: 0;
  gap: 15px;
`;

const HamburgerIcon = styled.div`
  border: 3px solid #565696;
  margin-left: 20px;
  width: 40px;
  height: 40px;
  border-radius: 15px;
  position: relative;
  cursor: pointer;

  ::after {
    content: '';
    position: absolute;
    top: 10px;
    left: 7px;
    width: 20px;
    height: 5px;
    background-color: #565696;
    border-radius: 15px;
  }
  ::before {
    content: '';
    position: absolute;
    top: 20px;
    left: 7px;
    width: 20px;
    height: 5px;
    background-color: #565696;
    border-radius: 15px;
  }
`;

const AppbarLayout = ({ role }) => {
  const [clientWidth, setClientWidth] = useState(window.innerWidth);
  const [openModal, setOpenModal] = useState(false);
  const [activateFade, setActivateFade] = useState(false);

  const DrawerRef = useRef();

  const handleClickDrawer = () => {
    DrawerRef.current.classList.add('toggleDrawer');
    setActivateFade(true);
    setTimeout(() => setActivateFade(false), 250);
    setTimeout(() => setOpenModal(false), 250);
  };

  useLayoutEffect(() => {
    setClientWidth(window.innerWidth);

    const updateWidth = () => {
      setClientWidth(window.innerWidth);
    };

    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, [clientWidth]);

  return (
    <Layout>
      <FlexWrapper>
        {clientWidth > 1000 && (
          <AppBarDesktop>
            <StyledLink to='/'>
              <img src={HackademyIcon} className='HackademyIcon' />
            </StyledLink>
            {(role == 5 || role == 4 || role == 3) && (
              <StyledLink to='/layout'>
                <FontAwesomeIcon icon={faAddressCard} className='Icon' />
                {role == 5 ? 'CVs' : 'Mi CV'}
              </StyledLink>
            )}
            <StyledLink to='/job-offers'>
              <FontAwesomeIcon icon={faFileLines} className='Icon' />
              Vacantes
            </StyledLink>
            <StyledLink to='/register-company'>
              <FontAwesomeIcon icon={faBuilding} className='Icon' />
              Dar de alta
            </StyledLink>
            <StyledLink to='/settings'>
              <FontAwesomeIcon icon={faUser} className='Icon' />
              Mi perfil
            </StyledLink>
          </AppBarDesktop>
        )}
        {clientWidth <= 1000 && (
          <AppBarMobile>
            {clientWidth <= 800 && (
              <HamburgerIcon onClick={() => setOpenModal(true)} />
            )}
            <StyledLink to='/'>
              <img src={HackademyIcon} className='HackademyIcon' />
            </StyledLink>
            {(role == 5 || role == 4 || role == 3) && clientWidth > 800 && (
              <StyledLink to='/layout'>
                <FontAwesomeIcon icon={faAddressCard} className='Icon' />
                {role == 5 ? 'CVs' : 'Mi CV'}
              </StyledLink>
            )}
            {clientWidth > 800 && (
              <>
                <StyledLink to='/job-offers'>
                  <FontAwesomeIcon icon={faFileLines} className='Icon' />
                  Vacantes
                </StyledLink>
                <StyledLink to='/register-company'>
                  <FontAwesomeIcon icon={faBuilding} className='Icon' />
                  Dar de alta
                </StyledLink>
                <StyledLink to='/settings'>
                  <FontAwesomeIcon icon={faUser} className='Icon' />
                  Mi perfil
                </StyledLink>
              </>
            )}
          </AppBarMobile>
        )}
      </FlexWrapper>
      <Modal
        isOpen={openModal}
        element={
          <Drawer
            setOpenModal={setOpenModal}
            ref={DrawerRef}
            activateFade={activateFade}
          >
            {(role == 5 || role == 4 || role == 3) && (
              <StyledLinkMobile to='/layout' onClick={handleClickDrawer}>
                <FontAwesomeIcon icon={faAddressCard} className='Icon' />
                {role == 5 ? 'CVs' : 'Mi CV'}
              </StyledLinkMobile>
            )}
            <StyledLinkMobile to='/job-offers' onClick={handleClickDrawer}>
              <FontAwesomeIcon icon={faFileLines} className='Icon' />
              Vacantes
            </StyledLinkMobile>
            <StyledLinkMobile
              to='/register-company'
              onClick={handleClickDrawer}
            >
              <FontAwesomeIcon icon={faBuilding} className='Icon' />
              Dar de alta
            </StyledLinkMobile>
            <StyledLinkMobile to='/settings' onClick={handleClickDrawer}>
              <FontAwesomeIcon icon={faUser} className='Icon' />
              Mi perfil
            </StyledLinkMobile>
          </Drawer>
        }
      />
      <MainWrapper>
        <Outlet />
      </MainWrapper>
    </Layout>
  );
};

export default AppbarLayout;
