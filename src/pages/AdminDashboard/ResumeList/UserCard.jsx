import { useContext, useEffect, useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import AlertMessage from '../../../components/AlertMessage';
import ConfirmChangeStatusModal from '../ConfirmChangeStatusModal';
import { ResumeContext } from '../ResumeContextProvider';

const UserCardContainer = styled.div`
  padding: 10px;
  background-color: ${(props) => (props.isSelected ? '#8f9c9a' : '#f7f7f7')};
  border-radius: 3px;
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

  :hover {
    box-shadow: 0px 3px 1px -1px rgb(0 0 0 / 20%),
      0px 2px 4px 0px rgb(0 0 0 / 14%), 0px 1px 7px 0px rgb(0 0 0 / 12%);
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

const Name = styled.p`
  font-size: 1.2rem;
  grid-area: name;
  justify-self: start;
  color: ${(props) => (props.isSelected ? 'white' : '#171717')};
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
}) => {
  const UserCardContainerRef = useRef();
  const { userSelectedId, setUserSelectedId } = useContext(ResumeContext);
  const [openChangeStatusModal, setOpenChangeStatusModal] = useState(false);

  useEffect(() => {
    userSelectedId === id && setDisableButton(false);
  }, []);

  return (
    <>
      <StyledNavLink to={`${id}`}>
        <UserCardContainer
          onClick={() => {
            setUserSelectedId(cvId);
            setDisableButton(false);
          }}
          isSelected={userSelectedId === id}
          ref={UserCardContainerRef}
        >
          <UserImage>
            <img src={userPhoto} />
          </UserImage>
          <Name isSelected={userSelectedId === id}>
            {name} {paternal_surname}
          </Name>
          <AlertMessage success={isHired} info={!isHired} fullWidth>
            {isHired ? 'contratado' : 'En busqueda'}
          </AlertMessage>
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
