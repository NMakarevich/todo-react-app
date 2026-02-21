import { type ReactNode, useState } from 'react';
import { TodoContext } from './TodoContext.tsx';
import type { TodoItemModel } from '@entities/TodoItem';

export const TodoContextProvider = ({ children }: { children: ReactNode }) => {
  const [todos, setTodos] = useState<TodoItemModel[] | null>(null);

  return <TodoContext value={{ todos, setTodos }}>{children}</TodoContext>;
};
