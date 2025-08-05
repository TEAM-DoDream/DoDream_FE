import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import api from './api';
import { useUserStore } from '@store/useUserStore';

const useLogout = () => {
  const navigate = useNavigate();
  const clearUser = useUserStore((state) => state.clearUser);

  return useCallback(async () => {
    try {
      await api.post('/v1/member/auth/logout');
    } catch (err) {
      console.warn('서버 로그아웃 실패', err);
    } finally {
      localStorage.clear();
      clearUser();
      delete api.defaults.headers.common['Authorization'];
      navigate('/');
    }
  }, [navigate, clearUser]);
};

export default useLogout;
