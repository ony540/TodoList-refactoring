import { useEffect, useState } from 'react';
import { updateChecked } from '@/api/TodoAPI';

export const useCheckboxState = initialTodo => {
  const [isChecked, setIsChecked] = useState(initialTodo.done);

  useEffect(() => {
    setIsChecked(initialTodo.done);
  }, [initialTodo.done]);

  const handleCheckboxChange = async () => {
    if (initialTodo._id !== undefined) {
      try {
        const updatedStatus = !isChecked;
        await updateChecked(initialTodo._id, initialTodo.title, initialTodo.content, updatedStatus);
        setIsChecked(updatedStatus);
      } catch (error) {
        console.error('Error updating checked state:', error);
      }
    }
  };

  return { isChecked, handleCheckboxChange };
};
