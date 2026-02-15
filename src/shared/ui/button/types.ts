import type { ButtonHTMLAttributes, ReactElement, ReactNode } from 'react';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  children?: ReactNode;
  icon?: ReactElement;
  onlyIcon?: boolean;
}
