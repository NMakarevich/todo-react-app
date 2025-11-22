import { useContext } from 'react';
import { createPortal } from 'react-dom';
import { Modal } from '../modal';
import { ModalContext } from '../../context-api';

export const Portal = () => {
  const { isOpenModal, component } = useContext(ModalContext);

  return <>{isOpenModal && createPortal(<Modal>{component}</Modal>, document.body)}</>;
};
