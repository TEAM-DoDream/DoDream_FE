import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

const useLogout = () => {
  const navigate = useNavigate();

  const logout = useCallback(() => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('nickname');
    localStorage.removeItem('memberId');
    localStorage.removeItem('regionName');
    navigate('/');
  }, [navigate]);

  return logout;
};

export default useLogout;
