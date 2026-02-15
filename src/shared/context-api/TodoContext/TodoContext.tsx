import { createContext } from 'react';
import type { CreateTodoItem } from '@entities/TodoItem';
import type { TodoContextType } from './types.ts';

export const TodoContext = createContext<TodoContextType>({
  todos: null,
  isPending: false,
  error: '',
  create: (data: CreateTodoItem) => {},
  update: (data: CreateTodoItem, id: string) => {},
  remove: (id: string) => {},
});
