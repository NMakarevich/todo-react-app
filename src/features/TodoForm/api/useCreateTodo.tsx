import { useCallback, useContext, useState } from 'react';
import type { CreateTodoItem } from '@entities/TodoItem';
import { createTodo } from '@shared/api/todoApi.ts';
import { TodoContext } from '@shared/context-api';
import type { TodoContextType } from '@shared/context-api/TodoContext/types.ts';

export const useCreateTodo = () => {
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const { setTodos } = useContext(TodoContext) as TodoContextType;

  const create = useCallback(
    (data: CreateTodoItem) => {
      setIsPending(true);
      setError(null);
      setIsSuccess(false);
      createTodo(data)
        .then((result) => {
          if (result) {
            setTodos((prevState) => (prevState ? [...prevState, result] : [result]));
            setIsSuccess(true);
          }
        })
        .catch((error) => {
          setError(error.message);
        })
        .finally(() => setIsPending(false));
    },
    [setTodos]
  );

  const resetErrors = useCallback(() => {
    setError(null);
  }, []);

  return { isPending, error, create, isSuccess, resetErrors } as const;
};
