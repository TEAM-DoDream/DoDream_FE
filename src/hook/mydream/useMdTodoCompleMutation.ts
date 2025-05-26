import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@hook/api';

interface TodoCompleteResponse {
  todoId: number;
  completed: boolean;
  message: string;
}

export const useMdTodoCompleteMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ todoId, completed }: { todoId: number; completed: boolean }) => {
      const { data } = await api.patch(`/v1/my-dream/todo/${todoId}/complete-state`, {
        completed
      });
      return data.data as TodoCompleteResponse;
    },
    onSuccess: () => {
     
      queryClient.invalidateQueries({ queryKey: ['mdTodo'] });
    },
  });
};
