import styled from 'styled-components';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShareFromSquare } from '@fortawesome/free-regular-svg-icons';
import { faGear, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  padding-top: 30px;
`;

const ProfileLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 3fr;
  width: 100%;
  gap: 30px;
  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const Navigation = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 15px;
  color: #6b6b6b;
`;

const NavCard = styled.div`
  display: flex;
  flex-direction: column;
  box-shadow: rgb(0 0 0 / 20%) 0px 3px 1px -2px,
    rgb(0 0 0 / 14%) 0px 2px 2px 0px, rgb(0 0 0 / 12%) 0px 1px 5px 0px;
  padding: 20px;
  border-radius: 10px;
  background-color: white;

  .icon {
    font-size: 16px;
  }
  :last-child {
    cursor: pointer;
  }
`;

const NavLinkStyled = styled(NavLink)`
  text-decoration: none;
  border-radius: 10px;
  color: #6b6b6b;
`;

const Logout = styled.div`
  display: flex;
  align-items: center;
  color: #ff6a6a;
  gap: 10px;

  path {
    font-size: 5px;
  }
`;

const ButtonsIcons = styled(Logout)`
  color: #565696;
`;

const ContentWrapper = styled.div`
  @media (max-width: 600px) {
    display: none;
  }
`;

const Profile = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();

  const handleLogout = (e) => {
    setIsAuthenticated({ isAuth: false, role: null });
    localStorage.removeItem('authToken');
    localStorage.removeItem('role');
    navigate('/login');
  };

  return (
    <Wrapper>
      <h1>Mi perfil</h1>
      <ProfileLayout>
        <Navigation>
          <NavCard>
            <ButtonsIcons>
              <FontAwesomeIcon icon={faGear} className="icon logout" />
              <NavLinkStyled to="settings">Configuraciones</NavLinkStyled>
            </ButtonsIcons>
          </NavCard>
          <NavCard onClick={handleLogout}>
            <Logout>
              <FontAwesomeIcon
                icon={faRightFromBracket}
                className="icon logout"
              />
              <p>Logout</p>
            </Logout>
          </NavCard>
        </Navigation>
        <ContentWrapper>
          <Outlet />
        </ContentWrapper>
      </ProfileLayout>
    </Wrapper>
  );
};

export default Profile;
