import type { InputHTMLAttributes } from 'react';

import styles from './checkbox.module.scss';

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export const Checkbox = (props: CheckboxProps) => {
  const { label, ...rest } = props;
  return (
    <div className={styles.checkbox}>
      {!!label && <label htmlFor={props.id}>{label}</label>}
      <input type={'checkbox'} {...rest} />
    </div>
  );
};
