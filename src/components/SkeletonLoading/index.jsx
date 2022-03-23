import styled, { keyframes } from 'styled-components';

const wave = keyframes`
from { transform: translateX(-100%);
}
to { transform: translateX(100%);
}

`;

const Skeleton = styled.div`
  background-color: rgba(0, 0, 0, 0.11);
  width: ${(props) => props.width || '30px'};
  height: ${(props) => props.height || '15px'};
  border-radius: 4px / 6.7px;
  position: relative;
  overflow: hidden;

  ::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(
      90deg,
      rgba(255, 255, 255, 0) 0%,
      rgba(0, 0, 0, 0.07) 50%,
      rgba(255, 255, 255, 0) 100%
    );
    border-radius: 3px;
    animation: ${wave} 1.6s linear 0.5s infinite;
  }
`;

const SkeletonLoading = ({ height, width }) => {
  return <Skeleton height={height} width={width} />;
};

export default SkeletonLoading;
