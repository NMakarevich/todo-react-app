import type { CreateTodoItem, TodoItemModel } from '../../../entities/TodoItem';
import * as z from 'zod';
import type { schema } from './schema.ts';

export type TodoFormProps = {
  mode: 'Create' | 'Update';
  todo?: TodoItemModel;
  onCreate?: (data: CreateTodoItem) => void;
  onUpdate?: (data: CreateTodoItem, id: string) => void;
};

export type TodoFormType = z.infer<typeof schema>;
