import type { TodoItemModel } from '@entities/TodoItem';
import type { Dispatch, SetStateAction } from 'react';

export type TodoContextType = {
  todos: TodoItemModel[] | null;
  setTodos: Dispatch<SetStateAction<TodoItemModel[] | null>>;
};
