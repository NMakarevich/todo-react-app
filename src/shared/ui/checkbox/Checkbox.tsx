import type { InputHTMLAttributes } from 'react';

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export const Checkbox = (props: CheckboxProps) => {
  const { label, ...rest } = props;
  return (
    <>
      {!!label && <label htmlFor={props.id}>{label}</label>}
      <input type={'checkbox'} {...rest} />
    </>
  );
};
