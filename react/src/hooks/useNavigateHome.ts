import { useNavigate } from 'react-router-dom';

export const useNavigateHome = () => {
  const navigate = useNavigate();
  const handleNavigateHome = () => {
    navigate('/');
  };
  return handleNavigateHome;
};
