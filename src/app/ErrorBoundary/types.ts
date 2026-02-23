import type { ReactNode } from 'react';

export type ErrorBoundaryState = {
  hasError: boolean;
  error: string;
};

export type ErrorBoundaryProps = {
  children: ReactNode;
};
