import { type ReactElement, useContext } from 'react';
import type { TodoItemModel } from '../../entities/todo-item/model';
import * as z from 'zod';
import styles from './todo-form.module.scss';
import { Input } from '../../shared/ui/input';
import { Button, Checkbox } from '../../shared/ui';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { ModalContext } from '../../shared/context-api';

interface TodoFormProps {
  mode: 'Create' | 'Update';
  data?: TodoItemModel;
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

export const TodoForm = ({ mode, data }: TodoFormProps): ReactElement => {
  const { closeModal } = useContext(ModalContext);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<TodoFormInterface>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: data && data.title,
      description: data && data.description,
      isDone: data && data.isDone,
    },
    mode: 'onChange',
  });

  function onFormSubmit(data: TodoFormInterface) {
    console.log(data);
    closeModal();
  }

  return (
    <>
      <h3>{`${mode} todo`}</h3>
      <form className={styles.todoForm} onSubmit={handleSubmit(onFormSubmit)}>
        <Input label={'Todo title'} {...register('title')} id={'todo-title'} />
        <span className={styles.todoFormError}>{!!errors.title && errors.title.message}</span>
        <label htmlFor={'description'}>Todo description</label>
        <textarea id={'description'} rows={5} {...register('description')} />
        <span className={styles.todoFormError}>
          {!!errors.description && errors.description.message}
        </span>
        <Checkbox label={'Is done'} {...register('isDone')} />
        <Button className={styles.submit} type={'submit'} disabled={!isValid}>
          Submit
        </Button>
      </form>
    </>
  );
};
