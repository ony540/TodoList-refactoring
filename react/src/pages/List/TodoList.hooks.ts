import { useState, useEffect } from 'react';
import { getTodoList, getTotalNum } from '@/store/asyncThunks/TodoAPIRedux';
import { useDispatch, useSelector } from 'react-redux';
import { AppThunkDispatch, RootState } from '@/store/store';

export const useTodoData = () => {
  const dispatch: AppThunkDispatch = useDispatch();
  const [totalNum, setTotalNum] = useState(0);
  const todoListData = useSelector((state: RootState) => state.todoReducer.todoListData);

  useEffect(() => {
    const fetchTodoData = async () => {
      await dispatch(getTodoList());
      const total = await getTotalNum();
      setTotalNum(total);
    };
    fetchTodoData();
  }, [dispatch]);

  return { todoListData, totalNum };
};
