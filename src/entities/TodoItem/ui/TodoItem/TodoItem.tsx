import type { TodoItemModel } from '../../model';
import { type ChangeEvent, useContext, type MouseEvent, lazy } from 'react';

import styles from './todo-item.module.scss';
import { Button, Checkbox, DeleteIcon, EditIcon } from '@shared/ui';
import { ModalContext } from '@shared/context-api';
import { useDeleteTodo } from '@entities/TodoItem/api/useDeleteTodo.tsx';
import { useUpdateTodo } from '@features/TodoForm/api/useUpdateTodo.tsx';

const TodoForm = lazy(() => import('../../../../features/TodoForm/ui/TodoForm.tsx'));

export const TodoItem = ({ item }: { item: TodoItemModel }) => {
  const { setComponent, setIsOpenModal } = useContext(ModalContext);
  const { deleteTodoItem } = useDeleteTodo();
  const { update } = useUpdateTodo();

  const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { target } = event;
    update({ ...item, isDone: target.checked }, item.id);
  };

  const handleDeleteClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    deleteTodoItem(item.id);
  };

  function openModal() {
    setIsOpenModal(true);
    setComponent(<TodoForm mode={'Update'} todo={item} />);
  }

  return (
    <>
      <div className={item.isDone ? `${styles.isDone} ${styles.todo}` : styles.todo}>
        <div className={styles.todoCheckbox}>
          <Checkbox
            name="isDone"
            id={item.id}
            checked={item.isDone}
            onChange={handleCheckboxChange}
          />
        </div>
        <div className={styles.todoInfo}>
          <h2 className={styles.todoTitle}>{item.title}</h2>
          <p className={styles.todoDescription}>{item.description}</p>
        </div>
        <div className={styles.todoControls}>
          <Button type={'button'} icon={EditIcon()} onlyIcon={true} onClick={openModal} />
          <Button type={'button'} icon={DeleteIcon()} onlyIcon={true} onClick={handleDeleteClick} />
        </div>
      </div>
    </>
  );
};
