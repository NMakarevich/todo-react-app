import { type MouseEvent, type ReactElement, useContext } from 'react';

import styles from './modal.module.scss';
import { Button } from '../button';
import { CloseIcon } from '../icons';
import { ModalContext } from '../../context-api';

interface ModalProps {
  component: ReactElement;
}

export const Modal = ({ props }: { props: ModalProps }) => {
  const { closeModal } = useContext(ModalContext);

  function modalClose(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (target.classList.contains(styles.overlay)) {
      closeModal();
    }
  }

  return (
    <>
      <div className={styles.overlay} onClick={modalClose}>
        <div className={styles.modal}>
          <Button
            className={styles.modalClose}
            type={'button'}
            icon={CloseIcon()}
            onlyIcon={true}
            onClick={closeModal}
          />
          {props.component}
        </div>
      </div>
    </>
  );
};
