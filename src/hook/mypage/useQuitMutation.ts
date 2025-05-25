import api from '@hook/api';
import useLogout from '@hook/useLogout';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

const Quit = async () => {
  const token = localStorage.getItem('accessToken');
  if (!token) {
    throw new Error('인증 토큰이 없습니다. 로그인 후 다시 시도해주세요.');
  }
  try {
    const response = await api.post(`/v1/member/auth/withdraw`, null, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.data;
  } catch (error) {
    console.error('탈퇴 실패', error);
  }
};

export const useQuitMuataion = (onClose: () => void) => {
  const logout = useLogout();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: Quit,
    onSuccess: () => {
      onClose();
      logout();
      navigate('/');
    },
    onError: (error) => {
      console.error('탈퇴 실패', error);
      alert('탈퇴에 실패했습니다. 다시 시도해주세요.');
    },
  });
};
