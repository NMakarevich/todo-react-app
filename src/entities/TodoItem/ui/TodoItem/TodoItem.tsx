import type { TodoItemModel } from '../../model';
import { type ReactElement, useState, type ChangeEvent, useContext, type MouseEvent } from 'react';

import styles from './todo-item.module.scss';
import { Button, Checkbox, DeleteIcon, EditIcon } from '../../../../shared/ui';
import { ModalContext, TodoContext } from '../../../../shared/context-api';
import { TodoForm } from '../../../../features';

export const TodoItem = ({ item }: { item: TodoItemModel }): ReactElement => {
  const [isDone, setIsDone] = useState(item.isDone);
  const { setComponent, setIsOpenModal } = useContext(ModalContext);
  const { update, remove } = useContext(TodoContext);

  const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { target } = event;
    setIsDone(target.checked);
    update({ ...item, isDone: target.checked }, item.id);
  };

  const handleDeleteClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    remove(item.id);
  };

  function openModal() {
    setIsOpenModal(true);
    setComponent(<TodoForm mode={'Update'} todo={item} onUpdate={update} />);
  }

  return (
    <>
      <div className={isDone ? `${styles.isDone} ${styles.todo}` : styles.todo}>
        <div className={styles.todoCheckbox}>
          <Checkbox name="isDone" id={item.id} checked={isDone} onChange={handleCheckboxChange} />
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
