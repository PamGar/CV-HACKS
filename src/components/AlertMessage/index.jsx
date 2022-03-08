import styled from 'styled-components';

const Message = styled.div`
  color: ${(props) =>
    props.error
      ? '#D8000C'
      : props.success
      ? '#4F8A10'
      : props.warning
      ? '#9F6000'
      : props.info
      ? '#00529B'
      : 'none'};
  background-color: ${(props) =>
    props.error
      ? '#FFD2D2'
      : props.success
      ? '#DFF2BF'
      : props.warning
      ? '#FEEFB3'
      : props.info
      ? '#BDE5F8'
      : 'none'};
  display: ${(props) => (props.hide ? 'none' : 'block')};
  width: ${(props) => (props.fullWidth ? '100%' : 'auto')};
  padding: 9px;
  border-radius: 5px;
  text-align: center;
`;

const AlertMessage = ({
  children,
  success,
  error,
  info,
  warning,
  hide,
  fullWidth,
}) => {
  return (
    <Message
      error={error}
      success={success}
      warning={warning}
      info={info}
      hide={hide}
      fullWidth={fullWidth}
    >
      {children}
    </Message>
  );
};

export default AlertMessage;
