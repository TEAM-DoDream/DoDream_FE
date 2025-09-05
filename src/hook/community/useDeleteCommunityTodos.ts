import api from '@hook/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface DeleteCommunityTodo {
  id: number;
}

export const useDeleteCommunityTodosMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id }: DeleteCommunityTodo) => {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        throw new Error('인증 토큰이 없습니다. 로그인 후 다시 시도해주세요.');
      }

      const response = await api.delete(`/v1/community/todos/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
        data: { id },
      });
      return response.data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['CommunityGetTodo'],
      });
      queryClient.refetchQueries({
        queryKey: ['CommunityGetTodo'],
      });
    },

    onError: (error) => {
      console.error('내 할일 삭제 실패:', error);
    },
  });
};
