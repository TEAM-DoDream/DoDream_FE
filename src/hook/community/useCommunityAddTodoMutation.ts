import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@hook/api';

interface CommunityAddTodoRequest {
  id: number;
}

interface CommunityAddTodoResponse {
  success: boolean;
  data: {
    id: number;
    message: string;
  };
}

export const useCommunityAddTodoMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<
    CommunityAddTodoResponse,
    unknown,
    CommunityAddTodoRequest
  >({
    mutationFn: async ({ id }) => {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        throw new Error('인증 토큰이 없습니다. 로그인 후 다시 시도해주세요.');
      }

      const { data } = await api.post(
        `/v1/community/todos/${id}`,
        { id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['CommunityGetTodo', 'mdTodo', 'community'],
      });
    },
    onError: (error) => {
      console.error('할일 추가 실패:', error);
    },
  });
};
