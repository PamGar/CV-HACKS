import LoadingButton from '../Buttons/LoadingButton';
import OutlinedButton from '../Buttons/OutlinedButton';
import styled from 'styled-components';
import InfiniteScroll from 'react-infinite-scroll-component';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  padding-top: ${(props) => (props.paddingTop ? '30px' : '0px')};
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
  margin-bottom: ${(props) => props.noButton && '30px'};

  @media (max-width: 1000px) {
    margin-bottom: ${(props) => props.noButton && '20px'};
  }
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

const InfiniteScrollStyled = styled(InfiniteScroll)`
  display: flex;
  flex-direction: column;
  gap: 20px;
  background-color: white;
  border-radius: 15px;
  box-shadow: rgb(0 0 0 / 20%) 0px 3px 1px -2px,
    rgb(0 0 0 / 14%) 0px 2px 2px 0px, rgb(0 0 0 / 12%) 0px 1px 5px 0px;
  padding: 25px 15px;
  margin-bottom: ${(props) => props.noButton && '30px'};

  @media (max-width: 1000px) {
    margin-bottom: ${(props) => props.noButton && '20px'};
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
  dataLength,
  hasMore,
  next,
  loader,
  paddingTop,
}) => {
  return (
    <Wrapper paddingTop={paddingTop}>
      {dataLength ? (
        <InfiniteScrollStyled
          dataLength={dataLength}
          hasMore={hasMore}
          next={next}
          loader={loader}
          noButton={noButton}
        >
          {children}
        </InfiniteScrollStyled>
      ) : (
        <Content noButton={noButton}>{children}</Content>
      )}
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
