import { createContext } from 'react';

export const ModalContext = createContext({
  isOpenModal: false,
  openModal: () => {},
  closeModal: () => {},
});
