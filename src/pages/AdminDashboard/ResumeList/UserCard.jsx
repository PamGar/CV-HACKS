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
  grid-template-areas: 'name area isHired';
  grid-template-columns: 1.5fr 1.5fr 1.4fr;
  text-align: center;
  place-items: center;
  color: #171717;
  transition: background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  cursor: pointer;
  position: relative;
  transition: box-shadow 250ms ease;

  :hover {
    box-shadow: 0px 3px 1px -1px rgb(0 0 0 / 20%),
      0px 2px 4px 0px rgb(0 0 0 / 14%), 0px 1px 7px 0px rgb(0 0 0 / 12%);
  }
`;
const Name = styled.p`
  font-size: 1.2rem;
  grid-area: name;
  justify-self: start;
  color: ${(props) => (props.isSelected ? 'white' : '#171717')};
`;
const Area = styled.p`
  grid-area: area;
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
  area,
  isHired,
  id,
  setDisableButton,
  data,
  setData,
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
            setUserSelectedId(id);
            setDisableButton(false);
          }}
          isSelected={userSelectedId === id}
          ref={UserCardContainerRef}
        >
          <Name isSelected={userSelectedId === id}>
            {name} {paternal_surname}
          </Name>
          <Area isSelected={userSelectedId === id}>{area}</Area>
          <AlertMessage success={isHired} info={!isHired} fullWidth>
            {isHired ? 'contratado' : 'Looking for a job'}
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
