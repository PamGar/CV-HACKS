import { useContext, useEffect, useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import AlertMessage from '../../../components/AlertMessage';
import LoadingButton from '../../../components/Buttons/LoadingButton';
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

const ShowTooltipContainer = styled.div`
  border-radius: 3px;
  transition: box-shadow 250ms ease;
  width: 100%;
  position: relative;
  display: inline-block;
  :hover {
    box-shadow: 0px 3px 1px -1px rgb(0 0 0 / 20%),
      0px 2px 4px 0px rgb(0 0 0 / 14%), 0px 1px 7px 0px rgb(0 0 0 / 12%);
  }
`;

const fadeIn = keyframes`
from{opacity :0}
to{opacity:1}
`;
const fadeOut = keyframes`
from{opacity :1}
to{opacity:0}
`;

const TooltipContainer = styled.div`
  /* border: 1px solid red; */
  position: absolute;
  /* left: auto;
  right: calc(100%);
  top: 50%;
  transform: translateX(0) translateY(-50%); */
  top: -110px;
  left: -100px;
  display: ${(props) => (props.showTooltip ? 'block' : 'none')};
  /* display: block; */

  &[class~='fadeIn'] {
    animation: ${fadeIn} 250ms;
  }
  &[class~='fadeOut'] {
    animation: ${fadeOut} 250ms;
  }
`;

const ToolTip = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  gap: 10px;
  width: 100%;
  height: 100%;

  width: clamp(150px, 25vw, 200px);
  background-color: #f7f7f7;
  border-radius: 3px;

  box-shadow: 0px 3px 1px -1px rgb(0 0 0 / 20%),
    0px 2px 4px 0px rgb(0 0 0 / 14%), 0px 1px 7px 0px rgb(0 0 0 / 12%);
  padding: 15px;
  /* margin-right: 20px; */
  margin-bottom: 30px;
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
  const TooltipContainerRef = useRef();
  const { userSelectedId, setUserSelectedId } = useContext(ResumeContext);
  const [showTooltip, setShowTooltip] = useState(null);
  const [openChangeStatusModal, setOpenChangeStatusModal] = useState(false);

  const handleTooltipTransition = () => {
    TooltipContainerRef.current.classList.add('fadeIn');
    setShowTooltip(id);
  };

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
          <ShowTooltipContainer
            onMouseLeave={() => {
              TooltipContainerRef.current.classList.replace(
                'fadeIn',
                'fadeOut'
              );
              setTimeout(() => setShowTooltip(null), 230);
            }}
            onClick={handleTooltipTransition}
            onMouseEnter={handleTooltipTransition}
            onMouseMove={() => {
              // console.log(TooltipContainerRef);
              TooltipContainerRef.current.classList.add('fadeIn');
            }}
          >
            <AlertMessage success={isHired} info={!isHired} fullWidth>
              {isHired ? 'contratado' : 'Looking for a job'}
            </AlertMessage>
            <TooltipContainer
              showTooltip={showTooltip === id}
              ref={TooltipContainerRef}
            >
              {/* <ToolTip>
                <h3>Cambiar Status:</h3>
                <LoadingButton
                  fullWidth
                  onClick={() => setOpenChangeStatusModal(true)}
                >
                  {isHired ? 'Looking for a job' : 'contratado'}
                </LoadingButton>
              </ToolTip> */}
            </TooltipContainer>
          </ShowTooltipContainer>
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
