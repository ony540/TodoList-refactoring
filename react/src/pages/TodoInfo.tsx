import { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router';
import styled from 'styled-components';
import { deleteTodo, getTodoItem, patchTodoList, updateChecked } from '@/api/TodoAPI';
import { TodoItem, defaultTodoItem } from '@/types/TodoTypes';
import { formatDate } from '@/util/dateUtils';

export default function TodoInfo() {
  const [todo, setTodo] = useState<TodoItem>(defaultTodoItem);
  const [isEditing, setIsEditing] = useState(false);
  const [updatedTitle, setUpdatedTitle] = useState('');
  const [updatedContent, setUpdatedContent] = useState('');
  const [isChecked, setIsChecked] = useState(false);

  const navigate = useNavigate();

  const { _id } = useParams();

  const fetchData = useCallback(async () => {
    if (_id) {
      try {
        const item = await getTodoItem(_id); // Assuming this returns an object of type TodoItem
        setTodo(item);
        setIsChecked(item.done);
      } catch (err) {
        console.error('Error fetching todo:', err);
      }
    }
  }, [_id]);

  const updateTodo = async ({ _id, title, content }: TodoItem) => {
    try {
      if (title === '' || content === '') {
        alert('제목과 내용을 입력해주세요');
        return;
      }

      await patchTodoList({ _id, title, content });
      navigate('/');
    } catch (err) {
      console.error('Error fetching todo:', err);
    }
  };

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // 수정 이벤트 함수
  const handleEditClick = () => {
    if (!isEditing) {
      setIsEditing(true);
      todo.title && setUpdatedTitle(todo.title);
      todo.content && setUpdatedContent(todo.content);
    } else {
      setIsEditing(false);
      // update완료시 수정
      updateTodo({ _id: _id as string, title: updatedTitle, content: updatedContent, done: isChecked });
    }
  };

  const handleDeleteClick = async e => {
    e.preventDefault();

    const res = confirm('정말 삭제하시겠습니까?');
    if (res) {
      await deleteTodo({ _id });
      alert('삭제되었습니다.');
      navigate('/');
      // 삭제후 리스트 페이지로 이동
    }
  };

  // 체크박스 기능
  const handleCheckboxChange = async () => {
    if (todo._id !== undefined) {
      try {
        await updateChecked(todo._id, todo.title, todo.content, !isChecked);
        setIsChecked(prevChecked => !prevChecked);
      } catch (error) {
        console.error('Error updating checked state:', error);
      }
    }
  };

  function handleToHome() {
    navigate('/');
  }

  return (
    <div>
      <div id="app">
        <div id="page">
          <h1>TODO DETAIL</h1>
          <button onClick={handleToHome} style={{ marginBottom: '50px', padding: '20px' }}>
            HOME
          </button>

          <TodoDetailWrap>
            <PatchBox>
              <CheckboxContainer>
                <input
                  type="checkbox"
                  id={`checkbox-${todo._id}`}
                  checked={isChecked}
                  onChange={handleCheckboxChange}
                />
                <label htmlFor={`checkbox-${todo._id}`}></label>
              </CheckboxContainer>
              <div>
                <span>
                  작성:{todo.createdAt && formatDate(todo.createdAt)}
                  <br />
                  수정:{todo.updatedAt && formatDate(todo.updatedAt)}
                </span>
              </div>
            </PatchBox>
            <Title>
              {isEditing ? (
                <TitleInput
                  type="text"
                  id="titleInput"
                  value={updatedTitle}
                  onChange={e => setUpdatedTitle(e.target.value)}
                />
              ) : (
                todo.title
              )}
            </Title>
            <Content>
              {isEditing ? (
                <ContentTextarea
                  id="contentInput"
                  maxLength={600}
                  value={updatedContent}
                  onChange={e => setUpdatedContent(e.target.value)}
                />
              ) : (
                todo.content
              )}
            </Content>
            <BtnsBox>
              <EditBtn onClick={handleEditClick}>{isEditing ? 'UPDATE' : 'EDIT'}</EditBtn>
              {isEditing ? (
                <CancelBtn
                  onClick={() => {
                    setIsEditing(false);
                  }}>
                  CANCEL
                </CancelBtn>
              ) : (
                <DeleteBtn onClick={handleDeleteClick}>DELETE</DeleteBtn>
              )}
            </BtnsBox>
          </TodoDetailWrap>
        </div>
      </div>
    </div>
  );
}
const TodoDetailWrap = styled.div`
  background-color: #fff;
  border-radius: 30px;
  padding: 30px;
  margin: 0 auto;
  text-align: center;
  position: relative;
  width: 500px;
  max-width: calc(100% - 110px);
`;

const PatchBox = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 10px 0;
  &:div {
    margin: 0 10px;
  }
`;

const Title = styled.h2`
  font-size: 32px;
  padding-top: 24px;
  padding-bottom: 24px;
  font-weight: bold;
  margin: 0;
`;

const Content = styled.p`
  font-size: 20px;
  min-height: 480px;
  max-height: 480px;
  overflow: scroll;
  margin-bottom: 30px;
  line-height: 28px;
`;

const BtnsBox = styled.div`
  display: flex;
  justify-content: space-evenly;
  box-sizing: border-box;
`;

const EditBtn = styled.button`
  font-size: 20px;
  padding: 10px 30px;
  border-radius: 10px;
  border: none;
  cursor: pointer;
  min-width: 140px;
  border: 1px solid #2d77af;
  background-color: #2d77af;
  color: #fff;
  border-radius: 8px;
  display: block;
  margin: 0 auto;
  &:hover {
    border: 1px solid #2d77af;
    background-color: white;
    color: #2d77af;
    box-sizing: border-box;
  }
`;

const DeleteBtn = styled.button`
  font-size: 20px;
  padding: 10px 30px;
  border-radius: 10px;
  border: none;
  min-width: 140px;
  border: 1px solid #d93d3d;
  background-color: #d93d3d;
  color: #fff;
  border-radius: 8px;
  cursor: pointer;
  display: block;
  margin: 0 auto;
  &:hover {
    border: 1px solid #d93d3d;
    background-color: white;
    color: #d93d3d;
    box-sizing: border-box;
  }
`;

const CancelBtn = styled.button`
  font-size: 20px;
  padding: 10px 30px;
  border-radius: 10px;
  border: none;
  min-width: 140px;
  border: 1px solid #2d77af;
  background-color: #2d77af;
  color: #fff;
  border-radius: 8px;
  cursor: pointer;
  display: block;
  margin: 0 auto;
  &:hover {
    border: 1px solid #2d77af;
    background-color: white;
    color: #2d77af;
    box-sizing: border-box;
  }
`;

const TitleInput = styled.input`
  width: 100%;
  padding: 20px 10px;
  border-radius: 10px;
  border-width: 1px;
  border-style: solid;
  font-size: 32px;
  font-weight: bold;
  text-align: center;
  &:focus {
    outline: none;
  }
`;

const ContentTextarea = styled.textarea<{ maxLength?: number }>`
  width: 100%;
  height: 400px;
  resize: none;
  padding: 10px;
  border-radius: 10px;
  font-size: 20px;
  &:focus {
    outline: none;
  }
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
