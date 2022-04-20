import React from 'react';
import styled from 'styled-components';
import SkeletonLoading from '../../../components/SkeletonLoading';

const SkeletonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  border-radius: 15px;
  padding: 15px;
  box-shadow: rgb(0 0 0 / 20%) 0px 2px 1px -1px,
    rgb(0 0 0 / 14%) 0px 1px 1px 0px, rgb(0 0 0 / 12%) 0px 1px 3px 0px;
`;

const IconContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 20px;
`;

const SkeletonCommentCard = () => {
  return (
    <SkeletonContainer>
      <IconContainer>
        <SkeletonLoading width='23px' height='23px' borderRadius='50%' />
        <SkeletonLoading width='23px' height='23px' borderRadius='50%' />
      </IconContainer>
      <SkeletonLoading width='100%' height='29px' />
      <SkeletonLoading width='100%' height='29px' />
      <SkeletonLoading width='100%' height='29px' />
      <SkeletonLoading width='100%' height='29px' />
    </SkeletonContainer>
  );
};

export default SkeletonCommentCard;
