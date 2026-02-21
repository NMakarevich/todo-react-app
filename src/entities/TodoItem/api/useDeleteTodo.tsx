import { useCallback, useContext, useState } from 'react';
import { deleteTodo } from '@shared/api/todoApi.ts';
import { TodoContext } from '@shared/context-api';
import type { TodoContextType } from '@shared/context-api/TodoContext/types.ts';

export const useDeleteTodo = () => {
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { setTodos } = useContext(TodoContext) as TodoContextType;

  const deleteTodoItem = useCallback(
    (id: string) => {
      setIsPending(true);
      setError(null);
      deleteTodo(id)
        .then(() => {
          setError(null);
          setTodos((prev) => prev!.filter((todo) => todo.id !== id));
        })
        .catch((error) => {
          setError(error.message);
        })
        .finally(() => setIsPending(false));
    },
    [setTodos]
  );

  return { isPending, error, deleteTodoItem } as const;
};
