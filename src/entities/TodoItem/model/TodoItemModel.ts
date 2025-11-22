export interface TodoItemModel {
  id: string;
  title: string;
  description: string;
  isDone: boolean;
}

export type CreateTodoItem = Omit<TodoItemModel, 'id'>;
