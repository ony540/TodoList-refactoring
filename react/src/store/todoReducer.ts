import { createSlice } from '@reduxjs/toolkit';
import { getTodoList, getTodoItem, patchTodoItem, updateChecked } from '@/store/asyncThunks/TodoAPIRedux';
import { MyState } from './MyState';
import { defaultTodoItem } from '@/types/TodoTypes';

const initialState: MyState = {
  todoListData: [],
  selectedTodo: defaultTodoItem,
};

const toDoListSlice = createSlice({
  name: 'toDo',
  initialState,
  reducers: {},
  extraReducers: builder => {
    // todo get
    builder.addCase(getTodoList.fulfilled, (state, action) => {
      state.todoListData = action.payload;
    });
    builder.addCase(getTodoItem.fulfilled, (state, action) => {
      state.selectedTodo = action.payload;
    });
    //todo 수정
    builder.addCase(patchTodoItem.fulfilled, (state, action) => {
      state.selectedTodo = action.payload;
    });
    builder.addCase(updateChecked.fulfilled, (state, action) => {
      state.selectedTodo = action.payload;
    });
  },
});

// action을 export해야 dispatch를 사용가능
export const toDoActions = toDoListSlice.actions;

export type ReducerType = ReturnType<typeof toDoListSlice.reducer>;
export default toDoListSlice.reducer;
