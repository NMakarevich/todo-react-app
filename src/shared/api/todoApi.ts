import type { TodoItemModel } from '@entities/TodoItem';
import { BASE_URL } from './constants.ts';
import type { CreateTodoItem } from '@entities/TodoItem';

export async function loadTodoList(signal: AbortSignal): Promise<TodoItemModel[] | null> {
  try {
    const response = await fetch(BASE_URL, { signal });
    if (response.ok) {
      return await response.json();
    } else {
      return null;
    }
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else throw new Error('Unknown error');
  }
}

export async function createTodo(data: CreateTodoItem): Promise<TodoItemModel | null> {
  try {
    const response = await fetch(BASE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (response.ok) {
      return await response.json();
    } else {
      return null;
    }
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else throw new Error('Unknown error');
  }
}

export async function updateTodo(data: CreateTodoItem, id: string): Promise<TodoItemModel | null> {
  try {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (response.ok) {
      return await response.json();
    } else {
      return null;
    }
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else throw new Error('Unknown error');
  }
}

export async function deleteTodo(id: string): Promise<void> {
  try {
    await fetch(`${BASE_URL}/${id}`, {
      method: 'DELETE',
    });
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else throw new Error('Unknown error');
  }
}
