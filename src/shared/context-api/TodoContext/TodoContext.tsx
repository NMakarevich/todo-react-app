import { createContext } from 'react';
import type { CreateTodoItem, TodoItemModel } from '../../../entities/TodoItem';

export type TodoContextType = {
  todos: TodoItemModel[] | null;
  isPending: boolean;
  error: string;
  load: () => void;
  create: (data: CreateTodoItem) => void;
  update: (data: CreateTodoItem, id: string) => void;
  remove: (id: string) => void;
};

export const TodoContext = createContext<TodoContextType>({
  todos: null,
  isPending: false,
  error: '',
  load: () => {},
  create: (data: CreateTodoItem) => {},
  update: (data: CreateTodoItem, id: string) => {},
  remove: (id: string) => {},
});
