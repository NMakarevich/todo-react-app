import styles from './textarea.module.scss';
import { concatClasses } from '../../utils/concat-classes.ts';
import type { TextareaProps } from './types.ts';

export const Textarea = (props: TextareaProps) => {
  const { maxLength, label, ...rest } = props;

  return (
    <>
      <label htmlFor={props.id}>{label}</label>
      <div className={styles['textarea-container']}>
        <textarea className={styles.textarea} {...rest} />
        {!!maxLength && (
          <span
            className={concatClasses([
              styles['textarea-length'],
              (props.value as string).length > maxLength ? styles['textarea-error'] : '',
            ])}
          >{`${(props.value as string).length}/${maxLength}`}</span>
        )}
      </div>
    </>
  );
};
