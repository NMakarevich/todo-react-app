import type { TodoItemModel } from '../../model';
import { type ReactElement, useState, type ChangeEvent, useEffect } from 'react';

import styles from './todo-item.module.scss';
import { Button, Checkbox, DeleteIcon } from '../../../../shared/ui';

export const TodoItem = ({ item }: { item: TodoItemModel }): ReactElement => {
  const [isDone, setIsDone] = useState(item.isDone);

  useEffect(() => {
    // console.log(isDone);
  }, [isDone]);

  const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { target } = event;
    setIsDone(target.checked);
  };

  const handleDeleteClick = () => {
    console.log(item.id);
  };

  return (
    <div className={isDone ? `${styles.isDone} ${styles.todo}` : styles.todo}>
      <Checkbox
        className={styles.todoCheckbox}
        type="checkbox"
        name="isDone"
        checked={isDone}
        onChange={handleCheckboxChange}
      />
      <div className={styles.todoInfo}>
        <h2 className={styles.todoTitle}>{item.title}</h2>
        <p className={styles.todoDescription}>{item.description}</p>
      </div>
      <Button
        type={'button'}
        icon={DeleteIcon()}
        onlyIcon={true}
        onClick={handleDeleteClick}
      ></Button>
    </div>
  );
};
