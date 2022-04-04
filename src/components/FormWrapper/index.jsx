import LoadingButton from '../Buttons/LoadingButton';
import OutlinedButton from '../../components/Buttons/OutlinedButton';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin: 20px 15px 0;
  background-color: rgb(238, 238, 255);
  border-radius: 3px;
  box-shadow: 0px 3px 5px 0px rgb(0 0 0 / 20%), 0px 2px 5px 0px rgb(0 0 0 / 14%),
    0px 1px 8px 0px rgb(0 0 0 / 12%);
  padding: 25px 15px;
`;

const ButtonsContainer = styled.div`
  position: sticky;
  bottom: 10px;
  margin: 0 15px 10px;
  /* display: grid;
  grid-template-columns: 1fr 3fr; */
  display: flex;
  gap: 15px;

  button:nth-child(1) {
    flex-grow: 1;
  }

  button:nth-child(2) {
    flex-grow: 3;
  }
`;
const FormWrapper = ({
  children,
  onClickLoadingButton,
  onClickOutlinedButton,
  setShowMainContent,
  disableButton,
  loading,
  loadingButtonTitle,
  singleButton,
}) => {
  return (
    <Wrapper>
      <Form>{children}</Form>
      <ButtonsContainer>
        {!singleButton && (
          <OutlinedButton
            bgColor='white'
            onClick={onClickOutlinedButton}
            disabled={loading}
          >
            regresar
          </OutlinedButton>
        )}
        <LoadingButton
          onClick={onClickLoadingButton}
          disabled={disableButton}
          loading={loading}
        >
          {loadingButtonTitle}
        </LoadingButton>
      </ButtonsContainer>
    </Wrapper>
  );
};

export default FormWrapper;
