import { useState, useEffect } from 'react';
import { getTodoList, getTotalNum } from '@/api/TodoAPI';
import { TodoItem } from '@/types/TodoTypes';

export const useTodoData = () => {
  const [todoListData, setTodoListData] = useState<TodoItem[]>([]);
  const [totalNum, setTotalNum] = useState(0);

  useEffect(() => {
    const fetchTodoData = async () => {
      const data = await getTodoList();
      const total = await getTotalNum();
      setTodoListData(data);
      setTotalNum(total);
    };

    fetchTodoData();
  }, []);

  return { todoListData, setTodoListData, totalNum };
};
