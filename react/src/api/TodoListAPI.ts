import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:33088/api/todolist';

export interface TodoItem {
  _id: string;
  title: string;
  content: string;
  done: boolean;
}

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

export const getTodo = async (_id: string): Promise<string> => {
  try {
    const res = await axios.get(`${_id}`);
    return res.data.item.content as string;
  } catch (error) {
    console.error(error);
    return '';
  }
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
