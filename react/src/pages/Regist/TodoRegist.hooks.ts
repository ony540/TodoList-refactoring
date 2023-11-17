import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createTodo } from '@/store/asyncThunks/TodoAPIRedux';

export const useTodoForm = () => {
  const [titleInput, setTitleInput] = useState<string>('');
  const [contentInput, setContentInput] = useState<string>('');

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitleInput(e.target.value);
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContentInput(e.target.value);
  };

  return {
    titleInput,
    handleTitleChange,
    contentInput,
    handleContentChange,
  };
};

export const useTodoSubmit = () => {
  const navigate = useNavigate();

  const handleSubmit = async (title: string, content: string) => {
    if (!title || !content) {
      alert('제목과 내용을 모두 입력해주세요.');
      return;
    }

    try {
      await createTodo(title, content);
      alert('등록되었습니다.');
      navigate('/');
    } catch (error) {
      console.error(error);
    }
  };

  return handleSubmit;
};
