import { Action, ThunkDispatch, configureStore } from '@reduxjs/toolkit';
import todoReducer, { ReducerType } from './todoReducer';

// 스토어 생성
export const store = configureStore({
  reducer: {
    todoReducer,
  },
});

// useSelector의 state 타입 지정
export type RootState = ReturnType<typeof store.getState>;

// useDispatch 타입 지정
export type AppThunkDispatch = ThunkDispatch<ReducerType, unknown, Action<string>>;
export type AppDispatch = typeof store.dispatch;
