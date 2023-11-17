import { useState, useEffect, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router';
import { getTodoList, getTodoItem, patchTodoItem, deleteTodo, updateChecked } from '@/store/asyncThunks/TodoAPIRedux';
import { TodoItem } from '@/types/TodoTypes';
import { useDispatch, useSelector } from 'react-redux';
import { AppThunkDispatch, RootState } from '@/store/store';

export const useTodoInfo = () => {
  const dispatch: AppThunkDispatch = useDispatch();
  const todo = useSelector((state: RootState) => state.todoReducer.selectedTodo);
  const [isEditing, setIsEditing] = useState(false);
  const [updatedTitle, setUpdatedTitle] = useState('');
  const [updatedContent, setUpdatedContent] = useState('');
  const [isChecked, setIsChecked] = useState(todo.done);

  const navigate = useNavigate();
  const { _id } = useParams();

  const fetchData = useCallback(async () => {
    if (_id) {
      try {
        dispatch(getTodoItem({ _id }));
      } catch (err) {
        console.error('Error fetching todo:', err);
      }
    }
  }, [_id, dispatch]);

  const updateTodo = async (updatedTodo: TodoItem) => {
    try {
      if (updatedTodo.title === '' || updatedTodo.content === '') {
        alert('제목과 내용을 입력해주세요');
        return;
      }
      dispatch(patchTodoItem(updatedTodo));
    } catch (err) {
      console.error('Error updating todo:', err);
    }
  };

  const handleEditClick = () => {
    if (!isEditing) {
      setIsEditing(true);
      setUpdatedTitle(todo.title);
      setUpdatedContent(todo.content);
    } else {
      if (todo.title === updatedTitle && todo.content === updatedContent) {
        alert('수정된 내용이 없습니다.');
        return;
      }
      setIsEditing(false);
      updateTodo({ ...todo, title: updatedTitle, content: updatedContent });
    }
  };

  const handleDeleteClick = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();

    const res = confirm('정말 삭제하시겠습니까?');
    if (res) {
      await deleteTodo(_id!);
      await dispatch(getTodoList());
      navigate('/');
    }
  };

  const handleCheckboxChange = async () => {
    if (todo._id !== undefined) {
      try {
        dispatch(updateChecked({ _id: todo._id, title: todo.title, content: todo.content, done: !isChecked }));
        setIsChecked(prevChecked => !prevChecked);
      } catch (error) {
        console.error('Error updating checked state:', error);
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    todo,
    isEditing,
    updatedTitle,
    updatedContent,
    isChecked,
    setIsEditing,
    setUpdatedTitle,
    setUpdatedContent,
    setIsChecked,
    handleEditClick,
    handleDeleteClick,
    handleCheckboxChange,
  };
};
