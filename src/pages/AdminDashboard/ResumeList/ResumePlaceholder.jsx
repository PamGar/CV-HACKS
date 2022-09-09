import { useContext, useEffect } from 'react';
import ResumeSVG from '../../../assets/images/ResumeSVG.svg';
import styled from 'styled-components';
import { ResumeContext } from '../ResumeContextProvider';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    width: 80%;
    height: 80%;
  }
`;

const ResumePlaceholder = () => {
  const { userSelectedId } = useContext(ResumeContext);
  const navigate = useNavigate();

  useEffect(() => {
    userSelectedId && navigate(`${userSelectedId}`);
  }, []);

  return <Container>{!userSelectedId && <img src={ResumeSVG} />}</Container>;
};

export default ResumePlaceholder;
