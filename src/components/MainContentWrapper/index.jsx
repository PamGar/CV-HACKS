import LoadingButton from '../Buttons/LoadingButton';
import OutlinedButton from '../Buttons/OutlinedButton';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  background-color: white;
  border-radius: 15px;
  box-shadow: rgb(0 0 0 / 20%) 0px 3px 1px -2px,
    rgb(0 0 0 / 14%) 0px 2px 2px 0px, rgb(0 0 0 / 12%) 0px 1px 5px 0px;
  padding: 25px 15px;
`;

const ButtonsContainer = styled.div`
  position: sticky;
  bottom: 10px;
  margin-bottom: 10px;
  display: flex;
  gap: 15px;

  button:nth-child(1) {
    flex-grow: 1;
  }

  button:nth-child(2) {
    flex-grow: 3;
  }
`;
const MainContentWrapper = ({
  children,
  onClickLoadingButton,
  onClickOutlinedButton,
  setShowMainContent,
  disableButton,
  loading,
  loadingButtonTitle,
  singleButton,
  noButton,
}) => {
  return (
    <Wrapper>
      <Content>{children}</Content>
      {!noButton && (
        <ButtonsContainer>
          {!singleButton && !noButton && (
            <OutlinedButton
              bgColor='white'
              onClick={onClickOutlinedButton}
              disabled={loading}
            >
              regresar
            </OutlinedButton>
          )}
          {!noButton && (
            <LoadingButton
              onClick={onClickLoadingButton}
              disabled={disableButton}
              loading={loading}
            >
              {loadingButtonTitle}
            </LoadingButton>
          )}
        </ButtonsContainer>
      )}
    </Wrapper>
  );
};

export default MainContentWrapper;
