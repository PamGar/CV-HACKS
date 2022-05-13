import { useContext, useEffect } from 'react';
import ResumeSVG from '../../../assets/images/ResumeSVG.svg';
import styled from 'styled-components';
import { ResumeContext } from '../ResumeContextProvider';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
  img {
    width: 100%;
    height: 100%;
  }
`;

const ResumePlaceholder = () => {
  const { userSelectedId } = useContext(ResumeContext);
  const navigate = useNavigate();

  useEffect(() => {
    userSelectedId && navigate(`${userSelectedId}`);
  }, []);

  return (
    <Container>
      {!userSelectedId && <img src={ResumeSVG} height='30' width='100%' />}
    </Container>
  );
};

export default ResumePlaceholder;
