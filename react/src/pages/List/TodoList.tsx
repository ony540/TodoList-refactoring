import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useTodoData } from '@pages/List/TodoList.hooks';
import TodoItemComponent from './TodoItem';
import useDebounce from '@/hooks/useDebounce';
import { TodoItem } from '@/types/TodoTypes';

export default function TodoList() {
  const navigate = useNavigate();
  const [limit, setLimit] = useState<number>(4);
  const { todoListData, totalNum } = useTodoData();

  const [searchKeyword, setSearchKeyword] = useState<string>('');
  const { debouncedValue: debouncedSearchKeyword, cancel } = useDebounce(searchKeyword, 500);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setSearchKeyword(e.target.value);
    if (searchKeyword === '') {
      cancel();
    }
  };

  const getListData = () => {
    if (debouncedSearchKeyword.length) {
      const filteredData: TodoItem[] = todoListData.filter(todo =>
        todo.title.toLowerCase().includes(debouncedSearchKeyword.toLowerCase()),
      );
      return filteredData && filteredData.map(item => <TodoItemComponent key={item._id} item={item} />);
    }
    return todoListData.slice(0, limit).map(item => <TodoItemComponent key={item._id} item={item} />);
  };

  const handleViewMore = () => {
    setLimit(prev => prev + 4);
  };

  return (
    <Page>
      <Title>TODO LIST</Title>
      <div id="content">
        <SearchInput type="text" value={searchKeyword} onChange={handleSearch} placeholder="search by title" />
        <List className="todolist">{getListData()}</List>
        {totalNum > 0 && (
          <Button
            className="viewMore-btn"
            disabled={!!debouncedSearchKeyword || limit >= totalNum}
            onClick={handleViewMore}>
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

const SearchInput = styled.input`
  padding: 16px 80px;
  font-size: 24px;
  margin: 0 auto 40px;
  border: none;
  text-align: center;
  width: 500px;
  max-width: calc(100% - 90px);
  background-color: unset;
  border-bottom: 2px solid white;
  color: #fff;
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
