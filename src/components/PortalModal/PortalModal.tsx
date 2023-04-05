import React from 'react';
import ReactDOM from 'react-dom';

interface IProps {
  isOpen: boolean
  isHover: boolean
}

const PortalModal: React.FC<IProps> = ({ isOpen, isHover }) => {
  if (!isHover && !isOpen) return null;

  const modalRoot = document.getElementById('modal-root');

  return ReactDOM.createPortal(
    <div className="portal__backgroung">
      МРОТ - минимальный размер оплаты труда. Разный для разных регионов.
    </div>,

    modalRoot || document.body,
  );
};

export default PortalModal;
