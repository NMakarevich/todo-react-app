import {
  type ChangeEvent,
  memo,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import styles from './todo-form.module.scss';
import { Input } from '@shared/ui/input';
import { Button, Checkbox } from '@shared/ui';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { ModalContext } from '@shared/context-api';
import { Textarea } from '@shared/ui';
import { type TodoFormProps, type TodoFormType, schema, MAX_DESCRIPTION_LENGTH } from '../model';
import { useCreateTodo } from '@features/TodoForm/api/useCreateTodo.tsx';
import { useUpdateTodo } from '@features/TodoForm/api/useUpdateTodo.tsx';

const TodoForm = ({ mode, todo }: TodoFormProps) => {
  const { closeModal } = useContext(ModalContext);
  const [textareaValue, setTextareaValue] = useState(todo?.description ?? '');
  const createHook = useCreateTodo();
  const updateHook = useUpdateTodo();

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

  const isSubmitDisabled = useMemo(() => {
    return (
      createHook.isPending ||
      updateHook.isPending ||
      !!createHook.error ||
      !!updateHook.error ||
      !isValid
    );
  }, [createHook.error, createHook.isPending, isValid, updateHook.error, updateHook.isPending]);

  const onFormSubmit = useCallback(
    (data: TodoFormType) => {
      if (mode === 'Create') {
        createHook.create(data);
      } else {
        updateHook.update(data, todo!.id);
      }
    },
    [createHook, mode, todo, updateHook]
  );

  useEffect(() => {
    if (createHook.isSuccess || updateHook.isSuccess) {
      closeModal();
    }
  }, [closeModal, createHook.isSuccess, updateHook.isSuccess]);

  const onFormChange = useCallback(() => {
    if (
      (!createHook.isSuccess && createHook.error) ||
      (!updateHook.isSuccess && updateHook.error)
    ) {
      createHook.resetErrors();
      updateHook.resetErrors();
    }
  }, [createHook, updateHook]);

  const apiError = useMemo(() => {
    return createHook.error || updateHook.error;
  }, [createHook.error, updateHook.error]);

  return (
    <>
      <h3>{`${mode} todo`}</h3>
      <form
        className={styles.todoForm}
        onSubmit={handleSubmit(onFormSubmit)}
        onChange={onFormChange}
      >
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
        <Button className={styles.submit} type={'submit'} disabled={isSubmitDisabled}>
          Submit
        </Button>
        <span className={styles.todoFormError}>{apiError}</span>
      </form>
    </>
  );
};

export default memo(TodoForm);
