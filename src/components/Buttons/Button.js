import styled from 'styled-components';

const Button = styled.button`
  padding: 10px 16px;
  border: none;
  background-color: #00b7b8;
  color: white;
  border-radius: 5px;
  width: ${(props) => (props.fullWidth ? '100%' : 'auto')};
  box-shadow: 0 1px 4px #888888;
  font-size: 0.875rem;
  position: relative;

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
    box-shadow: 0 2px 12px #888888;
    opacity: 0;
    transition: opacity 250ms ease;
    border-radius: 5px;
  }

  &:hover::after {
    opacity: 1;
  }

  &:active::before {
    opacity: 1;
  }

  &:hover {
    background-color: #00acad;
    cursor: pointer;
  }

  &:active {
    background-color: #00a2a3;
  }
`;

export default Button;
