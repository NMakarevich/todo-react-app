import { useEffect, useState } from 'react';
import type { CreateTodoItem, TodoItemModel } from '../../entities/TodoItem';
import { createTodo, deleteTodo, loadTodoList, updateTodo } from '../api/todo-api.ts';

export const useTodoApi = () => {
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState('');
  const [todos, setTodos] = useState<TodoItemModel[] | null>(null);

  useEffect(() => {
    const loadTodos = () => {
      setIsPending(true);
      setError('');
      loadTodoList()
        .then((data) => {
          if (data) {
            setTodos(data);
          } else setTodos([]);
        })
        .catch((error) => setError(error.message))
        .finally(() => setIsPending(false));
    };
    void loadTodos();
  }, []);

  function create(data: CreateTodoItem) {
    setIsPending(true);
    setError('');
    createTodo(data)
      .then((result) => {
        if (result) {
          setTodos((prevState) => (prevState ? [...prevState, result] : [result]));
        }
      })
      .catch((error) => setError(error.message))
      .finally(() => setIsPending(false));
  }

  function update(data: CreateTodoItem, id: string) {
    setIsPending(true);
    setError('');
    updateTodo(data, id)
      .then((response) => {
        if (response) {
          const todoIndex = todos!.findIndex((todoItem) => todoItem.id === response.id);
          todos![todoIndex] = response;
        }
      })
      .catch((error) => setError(error.message))
      .finally(() => setIsPending(false));
  }

  function remove(id: string) {
    setIsPending(true);
    setError('');
    deleteTodo(id)
      .then(() => {
        setTodos((prevState) => prevState!.filter((todo) => todo.id !== id));
        setIsPending(false);
      })
      .catch((error) => setError(error.message));
  }

  return { todos, isPending, error, create, update, remove } as const;
};
