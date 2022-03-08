import styled, { keyframes } from 'styled-components';

const Button = styled.button`
  padding: 10px 16px;
  border: none;
  background-color: ${(props) => (props.disabled ? '#8888884d' : '#00b7b8')};
  color: ${(props) => (props.disabled ? '#888888' : 'white')};
  border-radius: 5px;
  width: ${(props) => (props.fullWidth ? '100%' : 'max-content')};
  box-shadow: 0 1px 4px #888888;
  font-size: 0.875rem;
  position: relative;
  cursor: ${(props) => (props.disabled ? 'auto' : 'pointer')};
  transition: background-color 250ms ease, color 250ms ease;
  display: flex;
  justify-content: center;
  text-transform: uppercase;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    opacity: 0;
    box-shadow: 0 2px 8px #888888;
    transition: opacity 250ms ease;
    border-radius: 5px;
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    box-shadow: 0 2px 12px;
    opacity: 0;
    transition: opacity 250ms ease;
    border-radius: 5px;
  }

  &:hover::after {
    opacity: ${(props) => (props.disabled ? 0 : 1)};
  }

  &:active::before {
    opacity: 1;
  }

  &:hover {
    background-color: ${(props) => (props.disabled ? '#8888884d' : '#00acad')};
  }

  &:active {
    background-color: #00a2a3;
  }
`;

const spin = keyframes`
from {
  transform: rotate(0deg)
}
to{
  transform: rotate(360deg);
}
`;

const Spinner = styled.div`
  border-top: 2px solid #888888;
  border-left: 2px solid #888888;
  border-right: 2px solid transparent;
  border-radius: 50%;
  width: 15px;
  height: 15px;
  margin-left: 5px;
  animation: ${spin} 1s linear infinite;
`;

const LoadingButton = ({ children, disabled, loading, fullWidth }) => {
  return (
    <Button disabled={disabled} fullWidth={fullWidth}>
      {children}
      {loading && <Spinner />}
    </Button>
  );
};

export default LoadingButton;
