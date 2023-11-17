import axios from 'axios';
import { TodoItem } from '@/types/TodoTypes';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { MyState } from '@/store/MyState';

axios.defaults.baseURL = 'http://localhost:33088/api/todolist';

// 비동기 액션에서 반환하는 타입 정의
type AsyncThunkConfig = {
  state: MyState;
  rejectValue: string;
};

export const getTodoList = createAsyncThunk<TodoItem[], void, AsyncThunkConfig>(
  'todoData/getTodoList',
  async (_, thunkAPI) => {
    try {
      const res = await axios.get(``);

      const sortedItems = res.data.items.sort((a: TodoItem, b: TodoItem) => {
        return new Date(b.updatedAt!).getTime() - new Date(a.updatedAt!).getTime();
      });

      return sortedItems;
    } catch (error) {
      console.error('Error fetching todo list:', error);
      return thunkAPI.rejectWithValue('Error fetching todo list');
    }
  },
);

export const getTodoItem = createAsyncThunk<TodoItem, { _id: string }, AsyncThunkConfig>(
  'todoData/getTodoItem',
  async ({ _id }, thunkAPI) => {
    try {
      const res = await axios.get(`${_id}`);
      return res.data.item;
    } catch (error) {
      console.error('Error fetching todo item:', error);
      return thunkAPI.rejectWithValue('Error fetching todo item');
    }
  },
);

// 체크 업데이트
export const updateChecked = createAsyncThunk<
  TodoItem,
  { _id: string | number; title: string; content: string; done: boolean },
  AsyncThunkConfig
>('todoData/updateChecked', async ({ _id, title, content, done }, thunkAPI) => {
  try {
    const res = await axios.patch(`${_id}`, {
      title,
      content,
      done,
    });
    return res.data.item;
  } catch (error) {
    console.error('Error updating checked:', error);
    return thunkAPI.rejectWithValue('Error updating checked');
  }
});

// 투두 수정
export const patchTodoItem = createAsyncThunk<
  TodoItem,
  { _id: string | number; title: string; content: string },
  AsyncThunkConfig
>('todoData/patchTodoItem', async ({ _id, title, content }, thunkAPI) => {
  try {
    const res = await axios.patch(`${_id}`, {
      title,
      content,
    });
    return res.data.item;
  } catch (error) {
    console.error('Error updating checked:', error);
    return thunkAPI.rejectWithValue('Error updating checked');
  }
});

//----------------

export const getTotalNum = async (): Promise<number> => {
  try {
    const res = await axios.get(`?page=1`);
    return res.data.pagination.total as number;
  } catch (error) {
    console.error(error);
    return 0;
  }
};

export const deleteTodo = async (_id: string) => {
  try {
    const res = await axios.delete(`http://localhost:33088/api/todolist/${_id}`);
    return res;
  } catch (error) {
    console.error(error);
  }
};

export const createTodo = async (title: string, content: string) => {
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
