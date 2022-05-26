import { useLayoutEffect, useRef, useState } from 'react';
import {
  StyledLink,
  StyledLinkMobile,
  AppBarDesktop,
  AppBarMobile,
  HamburgerIcon,
} from './AppbarAdmin';
import HackademyIcon from '../../assets/images/logo_white.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faIdCard } from '@fortawesome/free-regular-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import Modal from '../../components/Modal';
import Drawer from '../Drawer';

const AppbarPadawan = () => {
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
          <StyledLink to='/'>
            <img src={HackademyIcon} className='HackademyIcon' />
          </StyledLink>
          <StyledLink to='/resume'>
            <FontAwesomeIcon icon={faIdCard} className='Icon' />
            Mi CV
          </StyledLink>
          <StyledLink to='/profile'>
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
          {clientWidth > 800 && (
            <>
              <StyledLink to='/resume'>
                <FontAwesomeIcon icon={faIdCard} className='Icon' />
                Mi CV
              </StyledLink>
              <StyledLink to='/profile'>
                <FontAwesomeIcon icon={faUser} className='Icon' />
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
            <StyledLinkMobile to='/resume' onClick={handleClickDrawer}>
              <FontAwesomeIcon icon={faIdCard} className='Icon' />
              Mi CV
            </StyledLinkMobile>
            <StyledLinkMobile to='/profile' onClick={handleClickDrawer}>
              <FontAwesomeIcon icon={faUser} className='Icon' />
              Mi perfil
            </StyledLinkMobile>
          </Drawer>
        }
      />
    </>
  );
};

export default AppbarPadawan;
