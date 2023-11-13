import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { getTodoList, getTotalNum, updateChecked } from '@/api/TodoAPI';
import styled from 'styled-components';

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
      <ListItem key={item._id}>
        <CheckboxContainer>
          <input
            type="checkbox"
            id={`checkbox-${item._id}`}
            checked={item.done === true}
            onChange={e => handleCheckboxChange(e, item)}
          />
          <label htmlFor={`checkbox-${item._id}`}></label>
        </CheckboxContainer>
        <TitleContentContainer>
          <StyledLink to={`info?_id=${item._id}`}>{item.title}</StyledLink>
          <ContentParagraph>{item.content}</ContentParagraph>
        </TitleContentContainer>
        <Button className="view-btn" onClick={() => navigate(`info?_id=${item._id}`)}>
          VIEW
        </Button>
      </ListItem>
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
    <Page>
      <Title>To Do List</Title>
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

const ListItem = styled.li`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 40px;
  font-size: 16px;
  color: #000;
  background-color: #fff;
  margin: 0 auto 30px;
  width: 500px;
  max-width: calc(100% - 90px);
  border-radius: 20px;
  padding: 20px;
`;

const CheckboxContainer = styled.div`
  position: relative;
  width: 28px;
  height: 28px;
  flex-shrink: 0;

  input[type='checkbox'] {
    visibility: hidden;
  }

  label {
    background-color: #fff;
    border: 1px solid #ccc;
    border-radius: 50%;
    cursor: pointer;
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;

    &:after {
      content: '';
      position: absolute;
      left: 7px;
      top: 8px;
      width: 12px;
      height: 6px;
      border: 2px solid #fff;
      border-top: none;
      border-right: none;
      opacity: 0;
      transform: rotate(-45deg);
    }
  }

  input[type='checkbox']:checked + label {
    background-color: #16c248;
    border-color: #16c248;

    &:after {
      opacity: 1;
    }
  }
`;

const TitleContentContainer = styled.div`
  width: calc(100% - 110px);
`;

const StyledLink = styled(Link)`
  display: block;
  color: #000;
  font-size: 24px;
  margin-bottom: 8px;
  font-weight: 500;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const ContentParagraph = styled.p`
  padding: 0;
  margin: 0;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
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
