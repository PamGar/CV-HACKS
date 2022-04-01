import styled from 'styled-components';

const Button = styled.button`
  background-color: ${(props) => props.bgColor || 'transparent'};
  border: 1px solid;
  color: ${(props) => (props.disabled ? '#888888' : '#00b7b8')};
  border-color: ${(props) => (props.disabled ? '#888888' : ' #00b7b8')};
  border-radius: 5px;
  cursor: ${(props) => (props.disabled ? 'auto' : 'pointer')};
  text-transform: uppercase;
  width: ${(props) => (props.fullWidth ? '100%' : 'max-content')};
  padding: 10px 16px;
  font-size: 0.875rem;
`;

const OutlinedButton = ({
  children,
  onClick,
  fullWidth,
  bgColor,
  disabled,
}) => {
  return (
    <Button
      onClick={onClick}
      fullWidth={fullWidth}
      bgColor={bgColor}
      disabled={disabled}
    >
      {children}
    </Button>
  );
};

export default OutlinedButton;
