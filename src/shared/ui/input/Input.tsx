import type { HTMLAttributes, ReactNode } from 'react';
import { concatClasses } from '../../utils/concat-classes.ts';

interface InputProps extends HTMLAttributes<HTMLInputElement> {
  label?: string;
  className?: string;
}

export const Input = (props: InputProps): ReactNode => {
  const { label, className, ...rest } = props;

  return (
    <>
      {label && <label htmlFor={props.id}>{label}</label>}
      <input className={concatClasses(['input', className ?? ''])} {...rest} />
    </>
  );
};
