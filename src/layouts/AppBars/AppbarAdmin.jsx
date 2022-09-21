import { useLayoutEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NavLink } from 'react-router-dom';
import {
  faIdCard,
  faFileLines,
  faBuilding,
} from '@fortawesome/free-regular-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import HackademyIcon from '../../assets/images/logo_white.png';
import Modal from '../../components/Modal';
import Drawer from '../Drawer';

export const AppBarDesktop = styled.nav`
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
  box-shadow: 2px 1px 7px #00000057;
`;

export const AppBarMobile = styled.nav`
  background-color: #a0a0cc;
  display: flex;
  flex-direction: row-reverse;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 20px;
  box-shadow: 0px 5px 10px #00000057;
  border-radius: 15px;
  margin: 5px;
`;

export const StyledLink = styled(NavLink)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  text-decoration: none;
  color: #ffffff;
  width: 80%;
  border-radius: 15px;
  padding: 10px 0;

  .Icon {
    height: 30px;
    width: 30px;
  }

  .HackademyIcon {
    width: 50px;

    @media (max-width: 1000px) {
      width: 45px;
    }
  }

  @media (max-width: 1000px) {
    width: 20%;
    padding: 5px 0 0 0;
  }

  @media (max-width: 800px) {
    width: 50px;
    color: #6b6b6b;
  }
`;

export const StyledLinkMobile = styled(StyledLink)`
  flex-direction: row;
  width: 100%;
  padding: 15px;
  border-radius: 0;
  gap: 15px;
`;

export const HamburgerIcon = styled.div`
  border: 3px solid #f3f4f6;
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
    background-color: #f3f4f6;
    border-radius: 15px;
  }
  ::before {
    content: '';
    position: absolute;
    top: 20px;
    left: 7px;
    width: 20px;
    height: 5px;
    background-color: #f3f4f6;
    border-radius: 15px;
  }
`;

const AppbarAdmin = () => {
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

    return () => {
      window.removeEventListener('resize', updateWidth);
    };
  }, [clientWidth]);
  return (
    <>
      {clientWidth > 1000 && (
        <AppBarDesktop>
          <StyledLink to="/">
            <img src={HackademyIcon} className="HackademyIcon" />
          </StyledLink>
          <StyledLink to="/resumes">
            <FontAwesomeIcon icon={faIdCard} className="Icon" />
            Curriculums
          </StyledLink>
          <StyledLink to="/job-offers">
            <FontAwesomeIcon icon={faFileLines} className="Icon" />
            Vacantes
          </StyledLink>
          <StyledLink to="/register-company">
            <FontAwesomeIcon icon={faBuilding} className="Icon" />
            Dar de alta
          </StyledLink>
          <StyledLink to="/profile">
            <FontAwesomeIcon icon={faUser} className="Icon" />
            Mi perfil
          </StyledLink>
        </AppBarDesktop>
      )}
      {clientWidth <= 1000 && (
        <AppBarMobile>
          {clientWidth <= 800 && (
            <HamburgerIcon onClick={() => setOpenModal(true)} />
          )}
          <StyledLink to="/">
            <img src={HackademyIcon} className="HackademyIcon" />
          </StyledLink>
          {clientWidth > 800 && (
            <>
              <StyledLink to="/resumes">
                <FontAwesomeIcon icon={faIdCard} className="Icon" />
                Curriculums
              </StyledLink>
              <StyledLink to="/job-offers">
                <FontAwesomeIcon icon={faFileLines} className="Icon" />
                Vacantes
              </StyledLink>
              <StyledLink to="/register-company">
                <FontAwesomeIcon icon={faBuilding} className="Icon" />
                Dar de alta
              </StyledLink>
              <StyledLink to="/profile">
                <FontAwesomeIcon icon={faUser} className="Icon" />
                Mi perfil
              </StyledLink>
            </>
          )}
        </AppBarMobile>
      )}
      <Modal
        isOpen={openModal}
        element={
          <Drawer
            setOpenModal={setOpenModal}
            ref={DrawerRef}
            activeFade={activateFade}
          >
            <StyledLinkMobile to="/resumes" onClick={handleClickDrawer}>
              <FontAwesomeIcon icon={faIdCard} className="Icon" />
              Curriculums
            </StyledLinkMobile>
            <StyledLinkMobile to="/job-offers" onClick={handleClickDrawer}>
              <FontAwesomeIcon icon={faFileLines} className="Icon" />
              Vacantes
            </StyledLinkMobile>
            <StyledLinkMobile
              to="/register-company"
              onClick={handleClickDrawer}
            >
              <FontAwesomeIcon icon={faBuilding} className="Icon" />
              Dar de alta
            </StyledLinkMobile>
            <StyledLinkMobile to="/profile" onClick={handleClickDrawer}>
              <FontAwesomeIcon icon={faUser} className="Icon" />
              Mi perfil
            </StyledLinkMobile>
          </Drawer>
        }
      />
    </>
  );
};

export default AppbarAdmin;
