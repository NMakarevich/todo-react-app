import { type ReactNode } from 'react';
import { ModalContext } from './ModalContext.tsx';

export const ModalProvider = ({
  children,
  isOpenModal,
  openModal,
  closeModal,
}: {
  children: ReactNode;
  isOpenModal: boolean;
  openModal: () => void;
  closeModal: () => void;
}) => {
  return <ModalContext value={{ isOpenModal, openModal, closeModal }}>{children}</ModalContext>;
};
