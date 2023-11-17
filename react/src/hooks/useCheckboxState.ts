import { useEffect, useState, useRef } from 'react';
import { updateChecked } from '@/store/asyncThunks/TodoAPIRedux';
import { AppThunkDispatch } from '@/store/store';
import { useDispatch } from 'react-redux';

export const useCheckboxState = initialTodo => {
  const { _id, title, content, done } = initialTodo;
  const dispatch: AppThunkDispatch = useDispatch();

  const [isChecked, setIsChecked] = useState(done);
  const throttleTimer = useRef<null | NodeJS.Timeout>(null);

  useEffect(() => {
    setIsChecked(done);
  }, [done]);

  const handleCheckboxChange = () => {
    if (!throttleTimer.current) {
      // 타이머가 없으면 즉시 실행하고 타이머 설정
      throttleTimer.current = setTimeout(() => {
        throttleTimer.current = null;
      }, 500);

      if (_id !== undefined) {
        try {
          const updatedStatus = !isChecked;
          dispatch(updateChecked({ _id, title, content, done: updatedStatus })).then(() => setIsChecked(updatedStatus));
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
