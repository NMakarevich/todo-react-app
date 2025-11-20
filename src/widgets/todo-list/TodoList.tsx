import type { ReactElement } from 'react';
import type { TodoItemModel } from '../../entities/todo-item/model';
import { TodoItem } from '../../entities/todo-item/ui';

import styles from './todo-list.module.scss';

export const TodoList = ({ list }: { list: TodoItemModel[] }): ReactElement => {
  return (
    <ul className={styles.todoList}>
      {list.map((item) => (
        <TodoItem key={item.id} item={item} />
      ))}
    </ul>
  );
};
