import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useTodoData } from '@pages/List/TodoList.hooks';
import TodoItemComponent from './TodoItem';

export default function TodoList() {
  const navigate = useNavigate();
  const [limit, setLimit] = useState<number>(4);
  const { todoListData, totalNum } = useTodoData();

  const getListData = () => {
    return todoListData.slice(0, limit).map(item => <TodoItemComponent key={item._id} item={item} />);
  };

  const handleViewMore = () => {
    setLimit(prev => prev + 4);
  };

  return (
    <Page>
      <Title>TODO LIST</Title>
      <div id="content">
        <List className="todolist">{getListData()}</List>
        {totalNum > 0 && (
          <Button className="viewMore-btn" disabled={limit >= totalNum} onClick={handleViewMore}>
            View More...
          </Button>
        )}
        <Button className="regist-btn" onClick={() => navigate('regist')}>
          Add Todo
        </Button>
      </div>
    </Page>
  );
}

const Page = styled.div`
  background-color: #2d2d2d;
`;

const Title = styled.h1`
  text-align: center;
  font-weight: bold;
  font-size: 48px;
  margin: 40px auto 50px;
  color: #0f64a3;
`;

const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const Button = styled.button`
  border: none;
  background-color: #2d77af;
  color: #fff;
  border-radius: 8px;
  cursor: pointer;
  display: block;
  margin: 0 auto;

  &.view-btn {
    padding: 10px 20px;
    width: 70px;
    font-size: 12px;

    &:hover {
      border: 1px solid #2d77af;
      background-color: white;
      color: #2d77af;
    }
  }

  &.viewMore-btn {
    font-size: 20px;
    background-color: transparent;
    text-decoration: underline;
    margin-bottom: 20px;

    &:disabled {
      color: gray;
      cursor: default;
    }
  }

  &.regist-btn {
    padding: 20px 80px;
    font-size: 20px;
    margin: 0 auto 80px;
  }
`;
