import { useContext, useEffect, useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { format } from 'timeago.js';
import styled from 'styled-components';
import AlertMessage from '../../../components/AlertMessage';
import ConfirmChangeStatusModal from '../ConfirmChangeStatusModal';
import English from '../../../assets/images/eeuu-flag.png';
import Spanish from '../../../assets/images/spain-flag.png';
import Mexico from '../../../assets/images/mexico-flag.png';
import { ResumeContext } from '../ResumeContextProvider';
import Hacky from '../../../assets/images/Hacky.png';

const UserCardContainer = styled.div`
  padding: 10px;
  background-color: #f3f4f6;
  background-color: ${(props) => (props.isSelected ? '#a0a0cc' : '#f3f4f6')};
  border-radius: 10px;
  display: grid;
  grid-template-areas: 'userPhoto name isHired';
  grid-template-columns: 0.5fr 3fr 1fr;
  text-align: center;
  place-items: center;
  color: #171717;
  transition: background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  cursor: pointer;
  position: relative;
  transition: box-shadow 250ms ease;
  gap: 10px;
  overflow: hidden;
  box-shadow: 0 12px 8px -8px #b9b9b9;

  :hover {
    box-shadow: 0px 3px 1px -1px rgb(0 0 0 / 20%),
      0px 2px 4px 0px rgb(0 0 0 / 14%), 0px 1px 7px 0px rgb(0 0 0 / 12%);
  }

  .language {
    width: 30px;
    filter: opacity(50%);

    img {
      width: 100%;
    }
  }
`;

const UserImage = styled.div`
  grid-area: userPhoto;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    border-radius: 50%;
    width: 50px;
    height: 50px;
  }
`;

const NameEmailContainer = styled.div`
  justify-self: start;
  grid-area: name;
`;

const Name = styled.p`
  font-size: 1.2rem;
  justify-self: start;
  text-align: start;
  color: ${(props) => (props.isSelected ? '#fff' : '#171717')};
`;

const Email = styled.p`
  color: ${(props) => (props.isSelected ? '#cccccc' : '#7a7a7a')};
  text-align: start;
`;

const LastUpdateStyle = styled.p`
  text-align: left;

  span {
    color: ${(props) => (props.isSelected ? '#fff' : '#B1B1B1')};
  }
`;

const StyledNavLink = styled(NavLink)`
  text-decoration: none;
  .active {
    color: #565696;
  }
`;

const UserCard = ({
  name,
  paternal_surname,
  isHired,
  id,
  cvId,
  setDisableButton,
  data,
  setData,
  userPhoto,
  email,
  lastUpdate,
  language,
}) => {
  const UserCardContainerRef = useRef();
  const { userSelectedId, setUserSelectedId } = useContext(ResumeContext);
  const [openChangeStatusModal, setOpenChangeStatusModal] = useState(false);
  const myId = localStorage.getItem('id');

  useEffect(() => {
    userSelectedId === cvId && setDisableButton(false);
  }, []);

  return (
    <>
      <StyledNavLink to={`${id}/${cvId}`}>
        <UserCardContainer
          onClick={() => {
            setUserSelectedId(cvId);
            setDisableButton(false);
          }}
          isSelected={userSelectedId === cvId}
          ref={UserCardContainerRef}
        >
          <UserImage>
            <img
              src={
                userPhoto === '/media/default.jpg'
                  ? Hacky
                  : `https://apicv.hackademy.lat${userPhoto}`
              }
              alt=""
            />
          </UserImage>
          <NameEmailContainer>
            <Name isSelected={userSelectedId === cvId}>
              {name} {paternal_surname}
            </Name>
            <Email isSelected={userSelectedId === cvId}>{email}</Email>
            <LastUpdateStyle isSelected={userSelectedId === cvId}>
              Ultima actualización: <span>{format(lastUpdate)}</span>
            </LastUpdateStyle>
          </NameEmailContainer>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '5px',
              alignItems: 'flex-end',
            }}
          >
            <p
              style={{
                backgroundColor:
                  isHired === 'contratado' ? '#0bb484' : '#d1c36b',
                color: '#fff',
                padding: '5px',
                borderRadius: '5px',
                fontSize: '10px',
                fontWeight: '700',
              }}
            >
              {isHired ? 'contratado' : 'En busqueda'}
            </p>
            <div className="language">
              <img
                src={
                  language === 2
                    ? English
                    : language === 1
                    ? myId == 26 /* Solo para Sonia */
                      ? Mexico
                      : Spanish
                    : null
                }
                alt=""
              />
            </div>
          </div>
        </UserCardContainer>
      </StyledNavLink>
      {openChangeStatusModal && (
        <ConfirmChangeStatusModal
          openChangeStatusModal={openChangeStatusModal}
          setOpenChangeStatusModal={setOpenChangeStatusModal}
          isHired={isHired}
          data={data}
          userSelectedId={userSelectedId}
          setData={setData}
        />
      )}
    </>
  );
};

export default UserCard;
