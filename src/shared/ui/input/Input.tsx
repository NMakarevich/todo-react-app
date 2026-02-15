import type { HTMLAttributes } from 'react';
import { concatClasses } from '../../utils/concat-classes.ts';

import styles from './input.module.scss';

interface InputProps extends HTMLAttributes<HTMLInputElement> {
  label?: string;
  className?: string;
}

export const Input = (props: InputProps) => {
  const { label, className, ...rest } = props;

  return (
    <>
      {label && <label htmlFor={props.id}>{label}</label>}
      <input className={concatClasses([styles.input, className ?? ''])} {...rest} />
    </>
  );
};
