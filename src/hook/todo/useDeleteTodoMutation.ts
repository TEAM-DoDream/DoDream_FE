import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@hook/api';

interface DeleteTodoResponse {
  message: string;
}

export const useDeleteTodoMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ todoId }: { todoId: number }) => {
      const { data } = await api.delete(`/v1/my-dream/todo/${todoId}`);
      return data.data as DeleteTodoResponse;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['mdTodo'] });
    },
    onError: (error) => {
      console.error('할 일 삭제 중 오류 발생:', error);
    },
  });
};
