import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { getTodoList, getTotalNum, updateChecked } from '@/api/TodoListAPI';

interface TodoItem {
  _id: string | number;
  title: string;
  content: string;
  done: boolean;
}

export default function TodoList() {
  const [todoListData, setTodoListData] = useState<TodoItem[]>([]);
  const [totalNum, setTotalNum] = useState<number>(0);
  const [limit, setLimit] = useState<number>(4);
  const navigate = useNavigate();

  const fetchTodoData = async () => {
    const data = await getTodoList();
    const total = await getTotalNum();
    setTodoListData(data);
    setTotalNum(total);
  };

  useEffect(() => {
    fetchTodoData();
  }, []);

  const getListData = () => {
    return todoListData.slice(0, limit).map(item => (
      <li key={item._id} className="todo-content">
        <div className="round">
          <input
            type="checkbox"
            id={`checkbox-${item._id}`}
            checked={item.done === true}
            onChange={e => handleCheckboxChange(e, item)}
          />
          <label htmlFor={`checkbox-${item._id}`}></label>
        </div>
        <div className="title-content-container">
          <Link to={`info?_id=${item._id}`}>{item.title}</Link>
          <p>{item.content}</p>
        </div>
        <button className="view-btn" onClick={() => navigate(`info?_id=${item._id}`)}>
          VIEW
        </button>
      </li>
    ));
  };

  const handleCheckboxChange = async (event: React.ChangeEvent<HTMLInputElement>, item: TodoItem) => {
    const newDoneValue = event.target.checked;
    await updateChecked(item._id, item.title, item.content, newDoneValue);
    const updatedTodoList = todoListData.map(todo => (todo._id === item._id ? { ...todo, done: newDoneValue } : todo));
    setTodoListData(updatedTodoList);
  };

  const handleViewMore = () => {
    setLimit(prev => prev + 4);
  };

  return (
    <div id="page">
      <h1>To Do List</h1>
      <div id="content">
        <ul className="todolist">{getListData()}</ul>
        {totalNum > 0 && (
          <button className="viewMore-btn" disabled={limit >= totalNum} onClick={handleViewMore}>
            View More...
          </button>
        )}
        <button className="regist-btn" onClick={() => navigate('regist')}>
          Add Todo
        </button>
      </div>
    </div>
  );
}
