import type { TodoItemModel } from '@entities/TodoItem';
import * as z from 'zod';
import type { schema } from './schema.ts';

export type TodoFormProps = {
  mode: 'Create' | 'Update';
  todo?: TodoItemModel;
};

export type TodoFormType = z.infer<typeof schema>;
