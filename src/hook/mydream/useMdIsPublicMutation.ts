import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@hook/api.ts';

interface TodoPublicResponse {
  todoGroupId: number;
  isPublic: boolean;
  message: string;
}

export const useMdIsPublicMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      todoGroupId,
      isPublic,
    }: {
      todoGroupId: number;
      isPublic: boolean;
    }) => {
      const { data } = await api.patch(
        `/v1/my-dream/todo/${todoGroupId}/public-state`,
        { isPublic }
      );

      return data.data as TodoPublicResponse;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['publicState'] });
    },
    onError: (error) => {
      console.error('뮤테이션 에러:', error);
    },
  });
};
