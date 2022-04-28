import SkeletonLoading from '../../components/SkeletonLoading';
import { JobCard, Title, Duration, IconsContainer } from '.';

const JobCardSkeleton = () => {
  return (
    <JobCard>
      <Title>
        <SkeletonLoading height='29px' width='170px' />
        <SkeletonLoading height='25px' width='100px' />
      </Title>
      <SkeletonLoading height='38px' width='95px' />
      <SkeletonLoading height='100px' width='100%' />
      <SkeletonLoading height='20px' width='10%' />
      <Duration>
        <SkeletonLoading height='20px' width='23%' />
        <SkeletonLoading height='20px' width='15%' />
      </Duration>
      <IconsContainer>
        <SkeletonLoading borderRadius='50%' width='25px' height='25px' />
        <SkeletonLoading borderRadius='50%' width='25px' height='25px' />
      </IconsContainer>
    </JobCard>
  );
};

export default JobCardSkeleton;
