import type { Dispatch, ReactElement, SetStateAction } from 'react';

export type ModalContextType = {
  isOpenModal: boolean;
  component: ReactElement | null;
  closeModal: () => void;
  setComponent: Dispatch<SetStateAction<ReactElement | null>>;
  setIsOpenModal: Dispatch<SetStateAction<boolean>>;
};
