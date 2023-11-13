import axios from 'axios';
import { TodoItem } from '@/types/TodoTypes';

axios.defaults.baseURL = 'http://localhost:33088/api/todolist';

export const getTodoList = async (): Promise<TodoItem[]> => {
  try {
    const res = await axios.get(``);
    return res.data.items.reverse() as TodoItem[];
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getTotalNum = async (): Promise<number> => {
  try {
    const res = await axios.get(`?page=1`);
    return res.data.pagination.total as number;
  } catch (error) {
    console.error(error);
    return 0;
  }
};

export const getTodoItem = async (_id: string): Promise<TodoItem> => {
  const res = await axios.get(`${_id}`);
  return res.data.item;
};

export const updateChecked = async (
  _id: string | number,
  title: string,
  content: string,
  done: boolean,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): Promise<any> => {
  try {
    const res = await axios.patch(`${_id}`, {
      title,
      content,
      done,
    });
    return res.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const patchTodoList = async ({ _id, title, content }) => {
  try {
    const res = await axios.patch(`http://localhost:33088/api/todolist/${_id}`, {
      title,
      content,
    });
    alert('수정이 완료되었습니다.');
    console.log(res.data);
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

export const deleteTodo = async ({ _id }) => {
  try {
    const res = await axios.delete(`http://localhost:33088/api/todolist/${_id}`);
    return res;
  } catch (error) {
    console.error(error);
  }
};

export const createTodo = async (title, content) => {
  try {
    const res = await axios.post(`http://localhost:33088/api/todolist`, {
      title,
      content,
      done: false,
    });
    return res.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
