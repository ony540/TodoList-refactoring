import { useEffect, useState, useRef } from 'react';
import { getTodoList, updateChecked } from '@/store/asyncThunks/TodoAPIRedux';
import { AppThunkDispatch } from '@/store/store';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router';

export const useCheckboxState = initialTodo => {
  const { pathname } = useLocation();
  const { _id, title, content, done } = initialTodo;
  const dispatch: AppThunkDispatch = useDispatch();

  const [isChecked, setIsChecked] = useState(done);
  const throttleTimer = useRef<null | NodeJS.Timeout>(null);

  useEffect(() => {
    setIsChecked(done);
  }, [done]);

  const handleCheckboxChange = async () => {
    if (!throttleTimer.current) {
      // 타이머가 없으면 즉시 실행하고 타이머 설정
      throttleTimer.current = setTimeout(() => {
        throttleTimer.current = null;
      }, 500);

      if (_id !== undefined) {
        try {
          const updatedStatus = !isChecked;
          await dispatch(updateChecked({ _id, title, content, done: updatedStatus })).then(() => {
            setIsChecked(updatedStatus);
            if (pathname === '/') dispatch(getTodoList());
          });
        } catch (error) {
          console.error('Error updating checked state:', error);
        }
      }
    }
  };

  useEffect(() => {
    // 컴포넌트 언마운트 시 타이머 취소
    return () => {
      if (throttleTimer.current) {
        clearTimeout(throttleTimer.current);
      }
    };
  }, []);

  return { isChecked, handleCheckboxChange };
};
