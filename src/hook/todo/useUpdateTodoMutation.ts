import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@hook/api';

interface UpdateTodoRequest {
  todoId: number;
  todoTitle: string;
}

interface UpdateTodoResponse {
  todoGroupId: number;
  todoId: number;
  todoTitle: string;
  message: string;
}

export const useUpdateTodoMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ todoId, todoTitle }: UpdateTodoRequest) => {
      const { data } = await api.put(`/v1/my-dream/todo/${todoId}`, {
        todoTitle,
      });
      return data.data as UpdateTodoResponse;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['mdTodo'] });
    },
    onError: (error) => {
      console.error('할 일 수정 중 오류 발생:', error);
    },
  });
};
