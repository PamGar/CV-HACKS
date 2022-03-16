import styled from 'styled-components';

const Button = styled.button`
  background-color: transparent;
  border: 1px solid #00b7b8;
  color: #00b7b8;
  border-radius: 5px;
  cursor: pointer;
  text-transform: uppercase;
  width: ${(props) => (props.fullWidth ? '100%' : 'max-content')};
  padding: 10px 16px;
  font-size: 0.875rem;
`;

const OutlinedButton = ({ children, onClick, fullWidth }) => {
  return (
    <Button onClick={onClick} fullWidth={fullWidth}>
      {children}
    </Button>
  );
};

export default OutlinedButton;
