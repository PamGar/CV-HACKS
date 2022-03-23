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
  display: grid;
  grid-template-columns: 1fr 3fr;
  gap: 15px;
`;
const FormWrapper = ({
  children,
  onClick,
  setShowMainContent,
  disableButton,
}) => {
  return (
    <Wrapper>
      <Form>{children}</Form>
      <ButtonsContainer>
        <OutlinedButton
          type='submit'
          fullWidth
          bgColor='white'
          onClick={() => setShowMainContent('CVlist')}
        >
          regresar
        </OutlinedButton>
        <LoadingButton
          fullWidth
          onClick={onClick}
          type='submit'
          disabled={disableButton}
        >
          enviar
        </LoadingButton>
      </ButtonsContainer>
    </Wrapper>
  );
};

export default FormWrapper;
