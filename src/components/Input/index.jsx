import { forwardRef } from 'react';
import styled from 'styled-components';

const StyledInput = styled.input`
  outline: 2px solid #b6b6b6;
  border-radius: 10px;
  padding: 10px;

  :focus-visible {
    outline-color: #565696;
  }
  :hover {
    outline-color: #757575;
  }
  :hover:focus-visible {
    outline-color: #565696;
  }
`;

const Input = forwardRef(
  ({ type, onChange, name, required, placeholder, value, min }, ref) => {
    return (
      <StyledInput
        ref={ref}
        type={type}
        onChange={onChange}
        name={name}
        required={required}
        placeholder={placeholder}
        value={value}
        min={min}
      />
    );
  }
);

export default Input;
