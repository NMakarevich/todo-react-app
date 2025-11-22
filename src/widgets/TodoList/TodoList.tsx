import { type ReactElement, useContext } from 'react';
import { TodoItem } from '../../entities/TodoItem';

import styles from './todo-list.module.scss';
import { ModalContext, TodoContext } from '../../shared/context-api';
import { AddIcon, Button } from '../../shared/ui';
import { TodoForm } from '../../features';

export const TodoList = (): ReactElement => {
  const { setIsOpenModal, setComponent } = useContext(ModalContext);
  const { todos, create, isPending, error } = useContext(TodoContext);

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
