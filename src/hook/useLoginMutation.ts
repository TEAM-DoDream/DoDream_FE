import { AxiosError } from 'axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { LoginInput, LoginResponse, ErrorResponse } from '@type/login/mutation';
import api from './api';
import { useUserStore } from '@store/useUserStore';
import { TodoDataSchema } from '@validation/mydream/todoSchema.ts';

export const useLoginMutation = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { setUser } = useUserStore();
  const login = async (data: LoginInput): Promise<LoginResponse> => {
    const response = await api.post(`/v1/member/auth/login`, data);
    return response.data;
  };

  return useMutation({
    mutationFn: login,
    onSuccess: async (res) => {
      if (res.success) {
        localStorage.setItem('accessToken', res.data.accessToken);
        localStorage.setItem('refreshToken', res.data.refreshToken);
        localStorage.setItem('nickname', res.data.nickname);
        localStorage.setItem('memberId', res.data.memberId);
        setUser({
          nickname: res.data?.nickname || '',
          regionName: res.data?.regionName || '',
          userImage: '',
        });
        try {
          const { data: todoResp } = await api.get('/v1/my-dream/todo', {
            headers: { Authorization: `Bearer ${res.data.accessToken}` },
          });
          const todoData = TodoDataSchema.parse(todoResp.data);
          if (todoData.todos.length === 0) {
            alert('직업을 선택해주세요!');
            navigate('/jobselect');
          }
          queryClient.setQueryData(['mdTodo'], todoData);
        } catch (err) {
          console.error('Todo 조회 중 에러:', err);
          navigate('/');
        }
      } else {
        alert('로그인에 실패했습니다. 다시 시도해주세요.');
      }
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      const errorMsg = error.response?.data.message;
      alert(errorMsg);
    },
  });
};
