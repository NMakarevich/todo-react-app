import { createContext, type Dispatch, type ReactElement, type SetStateAction } from 'react';

type ModalContextType = {
  isOpenModal: boolean;
  component: ReactElement | null;
  closeModal: () => void;
  setComponent: Dispatch<SetStateAction<ReactElement | null>>;
  setIsOpenModal: Dispatch<SetStateAction<boolean>>;
};

export const ModalContext = createContext<ModalContextType>({
  isOpenModal: false,
  component: null,
  closeModal: () => {},
  setComponent: () => {},
  setIsOpenModal: () => {},
});
