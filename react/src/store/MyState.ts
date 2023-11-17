import { TodoItem } from '@/types/TodoTypes';

export type MyState = {
  todoListData: TodoItem[];
  selectedTodo: TodoItem;
};
