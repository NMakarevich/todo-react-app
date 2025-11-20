import { type ReactElement, useContext } from 'react';
import { createPortal } from 'react-dom';
import { Modal } from '../modal';
import { ModalContext } from '../../context-api';

interface PortalProps {
  children: ReactElement;
}

export const Portal = ({ children }: PortalProps) => {
  const { isOpenModal } = useContext(ModalContext);

  return (
    <>
      {isOpenModal &&
        createPortal(
          <Modal
            props={{
              component: children,
            }}
          />,
          document.body
        )}
    </>
  );
};
