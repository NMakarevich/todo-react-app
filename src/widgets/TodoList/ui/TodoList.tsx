import { useContext } from 'react';
import { TodoForm } from '@features/TodoForm';
import { TodoItem } from '@entities/TodoItem';
import { ModalContext, TodoContext } from '@shared/context-api';
import { AddIcon, Button } from '@shared/ui';

import styles from './todo-list.module.scss';
import type { TodoContextType } from '@shared/context-api/TodoContext/types.ts';

export const TodoList = () => {
  const { setIsOpenModal, setComponent } = useContext(ModalContext);
  const { todos, create, isPending, error } = useContext(TodoContext) as TodoContextType;

  function openModal() {
    setIsOpenModal(true);
    setComponent(<TodoForm mode={'Create'} onCreate={create} />);
  }

  return isPending ? (
    <span>Loading...</span>
  ) : error ? (
    <span>{error}</span>
  ) : (
    <>
      <Button className={styles.addButton} type={'button'} icon={AddIcon()} onClick={openModal}>
        Add todo
      </Button>
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
