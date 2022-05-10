import styled from 'styled-components';

const Message = styled.div`
  color: ${(props) =>
    props.error
      ? '#fff'
      : props.success
      ? '#62b30b'
      : props.warning
      ? '#9F6000'
      : props.info
      ? '#00529B'
      : 'none'};
  background-color: ${(props) =>
    props.error
      ? '#e37676'
      : props.success
      ? '#d3eea5'
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
  text-transform: uppercase;
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
