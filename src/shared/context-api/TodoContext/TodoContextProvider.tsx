import { useTodoApi } from '../../hooks';
import type { ReactNode } from 'react';
import { TodoContext } from './TodoContext.tsx';

export const TodoContextProvider = ({ children }: { children: ReactNode }) => {
  const { todos, isPending, error, create, load, update, remove } = useTodoApi();

  return (
    <TodoContext value={{ todos, isPending, error, create, load, update, remove }}>
      {children}
    </TodoContext>
  );
};
