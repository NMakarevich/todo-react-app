import { createContext } from 'react';
import type { ModalContextType } from './types.ts';

export const ModalContext = createContext<ModalContextType>({
  isOpenModal: false,
  component: null,
  closeModal: () => {},
  setComponent: () => {},
  setIsOpenModal: () => {},
});
