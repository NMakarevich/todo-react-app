import type { InputHTMLAttributes } from 'react';

import styles from './checkbox.module.scss';

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  class?: string;
}

export const Checkbox = (props: CheckboxProps) => {
  const { label, ...rest } = props;
  return (
    <div className={styles.checkboxContainer}>
      {!!label && (
        <label className={styles.checkboxLabel} htmlFor={props.id}>
          {label}
        </label>
      )}
      <input className={styles.checkbox} type={'checkbox'} {...rest} />
    </div>
  );
};
