import { useContext } from 'react';
import { TodoItem } from '@entities/TodoItem';
import { TodoContext } from '@shared/context-api';

import styles from './todo-list.module.scss';
import type { TodoContextType } from '@shared/context-api/TodoContext/types.ts';

export const TodoList = () => {
  const { todos, create, isPending, error } = useContext(TodoContext) as TodoContextType;
  const { todos } = useContext(TodoContext) as TodoContextType;

  return isPending ? (
    <span>Loading...</span>
  ) : error ? (
    <span>{error}</span>
  ) : (
    <>
      {todos && todos.length > 0 ? (
        <div className={styles.todoListContainer}>
          <ul className={styles.todoList}>
            {todos.map((item) => (
              <TodoItem key={item.id} item={item} />
            ))}
          </ul>
        </div>
      ) : (
        <span>No todos in list</span>
      )}
    </>
  );
};
