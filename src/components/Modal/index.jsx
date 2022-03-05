import { createPortal } from 'react-dom';

const Modal = ({ isOpen, element }) => {
  if (!isOpen) return null;
  return createPortal(element, document.body);
};

export default Modal;
