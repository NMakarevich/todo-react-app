import { useTodoApi } from '../../hooks';
import type { ReactNode } from 'react';
import { TodoContext } from './TodoContext.tsx';

export const TodoContextProvider = ({ children }: { children: ReactNode }) => {
  const { todos, isPending, error, create, update, remove } = useTodoApi();

  return (
    <TodoContext value={{ todos, isPending, error, create, update, remove }}>
      {children}
    </TodoContext>
  );
};
