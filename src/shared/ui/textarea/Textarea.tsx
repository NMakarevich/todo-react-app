import { type TextareaHTMLAttributes } from 'react';

import styles from './textarea.module.scss';
import { concatClasses } from '../../utils/concat-classes.ts';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  maxLength?: number;
  label: string;
}

export const Textarea = (props: TextareaProps) => {
  const { maxLength, label, ...rest } = props;

  return (
    <>
      <label htmlFor={props.id}>{label}</label>
      <div className={styles.textareaContainer}>
        <textarea className={styles.textarea} {...rest} />
        {!!maxLength && (
          <span
            className={concatClasses([
              styles.textareaLength,
              (props.value as string).length > maxLength ? styles.textareaError : '',
            ])}
          >{`${(props.value as string).length}/${maxLength}`}</span>
        )}
      </div>
    </>
  );
};
