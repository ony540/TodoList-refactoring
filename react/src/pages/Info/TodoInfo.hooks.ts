import { useState, useEffect, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router';
import { deleteTodo, getTodoItem, patchTodoList, updateChecked } from '@/api/TodoAPI';
import { TodoItem, defaultTodoItem } from '@/types/TodoTypes';

export const useTodoInfo = () => {
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
        const item = await getTodoItem(_id);
        setTodo(item);
        setIsChecked(item.done);
      } catch (err) {
        console.error('Error fetching todo:', err);
      }
    }
  }, [_id]);

  const updateTodo = async (updatedTodo: TodoItem) => {
    try {
      if (updatedTodo.title === '' || updatedTodo.content === '') {
        alert('제목과 내용을 입력해주세요');
        return;
      }

      await patchTodoList(updatedTodo);
      navigate('/');
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

  const handleDeleteClick = async e => {
    e.preventDefault();

    const res = confirm('정말 삭제하시겠습니까?');
    if (res) {
      await deleteTodo({ _id });
      alert('삭제되었습니다.');
      navigate('/');
    }
  };

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
