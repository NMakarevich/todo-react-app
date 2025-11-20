import type { ButtonHTMLAttributes, ReactElement, ReactNode } from 'react';
import { concatClasses } from '../../utils/concat-classes.ts';

import styles from './button.module.scss';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  children?: ReactNode;
  icon?: ReactElement;
  onlyIcon?: boolean;
}

export const Button = (props: ButtonProps): ReactElement => {
  const { className, children, icon, onlyIcon, ...rest } = props;

  return (
    <>
      <button
        className={concatClasses([onlyIcon ? styles.buttonIcon : styles.button, className ?? ''])}
        {...rest}
      >
        {!!icon && icon}
        {children}
      </button>
    </>
  );
};
