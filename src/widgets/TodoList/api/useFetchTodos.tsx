import { useContext, useEffect, useState } from 'react';
import { loadTodoList } from '@shared/api/todoApi.ts';
import { TodoContext } from '@shared/context-api';
import type { TodoContextType } from '@shared/context-api/TodoContext/types.ts';

export const useFetchTodos = () => {
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { setTodos } = useContext(TodoContext) as TodoContextType;

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    const loadTodos = () => {
      setIsPending(true);
      setError(null);
      loadTodoList(signal)
        .then((data) => {
          if (data) {
            setTodos(data);
            setError(null);
          }
        })
        .catch((error) => setError(error.message))
        .finally(() => setIsPending(false));
    };

    loadTodos();

    return () => {
      abortController.abort();
    };
  }, []);

  return { isPending, error } as const;
};
