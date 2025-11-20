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

const MAX_TITLE_LENGTH = 5;
const MAX_DESCRIPTION_LENGTH = 255;

const schema = z.object({
  title: z.string().max(MAX_TITLE_LENGTH, `Max title length is ${MAX_TITLE_LENGTH}`),
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
    formState: { errors },
  } = useForm<TodoFormInterface>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: data && data.title,
      description: data && data.description,
      isDone: data && data.isDone,
    },
  });

  function onFormSubmit(data: TodoFormInterface) {
    console.log(data);
    closeModal();
  }

  return (
    <>
      <h3 className={styles.todoFormTitle}>{`${mode} todo`}</h3>
      <form className={styles.todoForm} onSubmit={handleSubmit(onFormSubmit)}>
        <Input label={'Todo title'} {...register('title')} id={'todo-title'} />
        {!!errors.title && errors.title.message}
        <label htmlFor={'description'}>Todo description</label>
        <textarea id={'description'} cols={5} {...register('description')} />
        {!!errors.description && errors.description.message}
        <Checkbox label={'Is done'} {...register('isDone')} />
        <Button className={styles.submit} type={'submit'}>
          Submit
        </Button>
      </form>
    </>
  );
};
