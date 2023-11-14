import { useEffect, useState, useRef } from 'react';
import { updateChecked } from '@/api/TodoAPI';

export const useCheckboxState = initialTodo => {
  const [isChecked, setIsChecked] = useState(initialTodo.done);
  const throttleTimer = useRef<null | NodeJS.Timeout>(null);

  useEffect(() => {
    setIsChecked(initialTodo.done);
  }, [initialTodo.done]);

  const handleCheckboxChange = () => {
    if (!throttleTimer.current) {
      // 타이머가 없으면 즉시 실행하고 타이머 설정
      throttleTimer.current = setTimeout(() => {
        throttleTimer.current = null;
      }, 500);

      if (initialTodo._id !== undefined) {
        try {
          const updatedStatus = !isChecked;
          updateChecked(initialTodo._id, initialTodo.title, initialTodo.content, updatedStatus).then(() =>
            setIsChecked(updatedStatus),
          );
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
