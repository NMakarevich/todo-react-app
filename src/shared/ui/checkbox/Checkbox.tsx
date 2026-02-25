import styles from './checkbox.module.scss';
import type { CheckboxProps } from './types.ts';

export const Checkbox = (props: CheckboxProps) => {
  const { label, ...rest } = props;
  return (
    <div className={styles['checkbox-container']}>
      {!!label && (
        <label className={styles['checkbox-label']} htmlFor={props.id}>
          {label}
        </label>
      )}
      <input className={styles.checkbox} type={'checkbox'} {...rest} />
    </div>
  );
};
