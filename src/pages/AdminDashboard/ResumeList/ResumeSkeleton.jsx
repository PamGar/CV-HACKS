import SkeletonLoading from '../../../components/SkeletonLoading';
import styled from 'styled-components';

const ResumeContainer = styled.div`
  padding: 20px 30px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 22px;
  background-color: white;
  border-radius: 15px;
  /* position: absolute; */
`;

const SpaceEvenly = styled.div`
  display: flex;
  justify-content: space-evenly;
`;

const SocialMediaCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 14px;
  padding-top: 5px;
  padding-bottom: 12px;
`;

const EducationContainer = styled(SocialMediaCard)`
  padding: 0;
  align-items: initial;
`;

const ResumeSkeleton = () => {
  return (
    <ResumeContainer>
      <SkeletonLoading width='100%' height='38px' />
      <SpaceEvenly>
        <SkeletonLoading width='130px' height='13px' />
        <SkeletonLoading width='100px' height='13px' />
      </SpaceEvenly>
      <SkeletonLoading width='100%' height='85px' />
      <SkeletonLoading width='100%' height='40px' />
      <SpaceEvenly>
        <SocialMediaCard>
          <SkeletonLoading width='23px' height='23px' borderRadius='50%' />
          <SkeletonLoading width='80px' height='13px' />
          <SkeletonLoading width='50px' height='13px' />
        </SocialMediaCard>
        <SocialMediaCard>
          <SkeletonLoading width='23px' height='23px' borderRadius='50%' />
          <SkeletonLoading width='80px' height='13px' />
          <SkeletonLoading width='50px' height='13px' />
        </SocialMediaCard>
      </SpaceEvenly>
      <SkeletonLoading width='100%' height='40px' />
      <EducationContainer>
        <SkeletonLoading width='320px' height='13px' />
        <SkeletonLoading width='150px' height='13px' />
        <SkeletonLoading width='100px' height='13px' />
        <SkeletonLoading width='280px' height='13px' />
        <SkeletonLoading width='100%' height='40px' />
        <SkeletonLoading width='70px' height='13px' />
      </EducationContainer>
      <SkeletonLoading width='100%' height='40px' />
    </ResumeContainer>
  );
};

export default ResumeSkeleton;
