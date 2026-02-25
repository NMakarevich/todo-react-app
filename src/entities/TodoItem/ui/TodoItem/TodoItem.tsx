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
      <div className={item.isDone ? `${styles['is-done']} ${styles.todo}` : styles.todo}>
        <div className={styles['todo-checkbox']}>
          <Checkbox
            name="isDone"
            id={item.id}
            checked={item.isDone}
            onChange={handleCheckboxChange}
          />
        </div>
        <div className={styles['todo-info']}>
          <h2 className={styles['todo-title']}>{item.title}</h2>
          <p className={styles['todo-description']}>{item.description}</p>
        </div>
        <div className={styles['todo-controls']}>
          <Button type={'button'} icon={EditIcon()} onlyIcon={true} onClick={openModal} />
          <Button type={'button'} icon={DeleteIcon()} onlyIcon={true} onClick={handleDeleteClick} />
        </div>
      </div>
    </>
  );
};
