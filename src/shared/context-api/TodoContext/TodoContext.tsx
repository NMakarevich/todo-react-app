import { createContext } from 'react';
import type { TodoContextType } from './types.ts';

export const TodoContext = createContext<TodoContextType | null>(null);
