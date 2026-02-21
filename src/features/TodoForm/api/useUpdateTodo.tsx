import { useCallback, useContext, useState } from 'react';
import type { CreateTodoItem } from '@entities/TodoItem';
import { updateTodo } from '@shared/api/todoApi.ts';
import { TodoContext } from '@shared/context-api';
import type { TodoContextType } from '@shared/context-api/TodoContext/types.ts';

export const useUpdateTodo = () => {
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const { setTodos } = useContext(TodoContext) as TodoContextType;

  const update = useCallback(
    (data: CreateTodoItem, id: string) => {
      setIsPending(true);
      setError(null);
      setIsSuccess(false);
      updateTodo(data, id)
        .then((response) => {
          if (response) {
            setTodos((prevState) => {
              const todoIndex = prevState!.findIndex((todo) => todo.id === id);
              return [
                ...prevState!.slice(0, todoIndex),
                response,
                ...prevState!.slice(todoIndex + 1),
              ];
            });
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

  return { isPending, error, update, isSuccess, resetErrors } as const;
};
