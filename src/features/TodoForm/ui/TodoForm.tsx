import { type ChangeEvent, type ReactElement, useContext, useState } from 'react';
import styles from './todo-form.module.scss';
import { Input } from '../../../shared/ui/input';
import { Button, Checkbox } from '../../../shared/ui';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { ModalContext, TodoContext } from '../../../shared/context-api';
import { Textarea } from '../../../shared/ui';
import { type TodoFormProps, type TodoFormType, schema, MAX_DESCRIPTION_LENGTH } from '../model';

export const TodoForm = ({ mode, todo, onCreate, onUpdate }: TodoFormProps): ReactElement => {
  const { closeModal } = useContext(ModalContext);
  const { isPending, error } = useContext(TodoContext);
  const [textareaValue, setTextareaValue] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<TodoFormType>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: todo && todo.title,
      description: todo && todo.description,
      isDone: todo && todo.isDone,
    },
    mode: 'onChange',
  });

  function onTextareaChange(event: ChangeEvent<HTMLTextAreaElement>) {
    const { target } = event;
    setTextareaValue(target.value);
  }

  function onFormSubmit(data: TodoFormType) {
    if (mode === 'Create') {
      onCreate!(data);
    } else {
      onUpdate!(data, todo!.id);
    }
    if (!isPending) {
      closeModal();
    }
  }

  return (
    <>
      <h3>{`${mode} todo`}</h3>
      <form className={styles.todoForm} onSubmit={handleSubmit(onFormSubmit)}>
        <Input label={'Todo title'} {...register('title')} id={'todo-title'} />
        <span className={styles.todoFormError}>{!!errors.title && errors.title.message}</span>
        <Textarea
          label={'Todo description'}
          id={'description'}
          value={textareaValue}
          rows={5}
          maxLength={MAX_DESCRIPTION_LENGTH}
          {...register('description', { onChange: onTextareaChange })}
        />
        <span className={styles.todoFormError}>
          {!!errors.description && errors.description.message}
        </span>
        <Checkbox label={'Is done'} id={'is-done'} {...register('isDone')} />
        <Button className={styles.submit} type={'submit'} disabled={!isValid || isPending}>
          Submit
        </Button>
        <span className={styles.todoFormError}>{error}</span>
      </form>
    </>
  );
};
