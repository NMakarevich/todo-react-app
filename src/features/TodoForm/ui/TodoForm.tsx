import { type ChangeEvent, type ReactElement, useContext, useState } from 'react';
import type { CreateTodoItem, TodoItemModel } from '../../../entities/TodoItem';
import * as z from 'zod';
import styles from './todo-form.module.scss';
import { Input } from '../../../shared/ui/input';
import { Button, Checkbox } from '../../../shared/ui';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { ModalContext, TodoContext } from '../../../shared/context-api';
import { Textarea } from '../../../shared/ui';

interface TodoFormProps {
  mode: 'Create' | 'Update';
  todo?: TodoItemModel;
  onCreate?: (data: CreateTodoItem) => void;
  onUpdate?: (data: CreateTodoItem, id: string) => void;
}

const MIN_TITLE_LENGTH = 3;
const MAX_TITLE_LENGTH = 128;
const MAX_DESCRIPTION_LENGTH = 255;

const schema = z.object({
  title: z
    .string()
    .min(MIN_TITLE_LENGTH, `Min title length is ${MIN_TITLE_LENGTH}`)
    .max(MAX_TITLE_LENGTH, `Max title length is ${MAX_TITLE_LENGTH}`),
  description: z
    .string()
    .max(MAX_DESCRIPTION_LENGTH, `Max description length is ${MAX_DESCRIPTION_LENGTH}`),
  isDone: z.boolean(),
});

export type TodoFormInterface = z.infer<typeof schema>;

export const TodoForm = ({ mode, todo, onCreate, onUpdate }: TodoFormProps): ReactElement => {
  const { closeModal } = useContext(ModalContext);
  const { isPending, error } = useContext(TodoContext);
  const [textareaValue, setTextareaValue] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<TodoFormInterface>({
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

  function onFormSubmit(data: TodoFormInterface) {
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
