import { concatClasses } from '../../utils/concat-classes.ts';

import styles from './button.module.scss';
import type { ButtonProps } from './types.ts';

export const Button = (props: ButtonProps) => {
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
