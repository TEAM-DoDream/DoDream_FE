import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@hook/api';

interface AddTodoRequest {
  todoTitle: string;
}

interface AddTodoResponse {
  success: boolean;
  data: {
    todoGroupId: number;
    todoId: number;
    todoTitle: string;
    message: string;
  };
}

export const useAddTodoMutation = () => {
  const queryClient = useQueryClient();
  return useMutation<AddTodoResponse, unknown, AddTodoRequest>({
    mutationFn: async (body) => {
      const { data } = await api.post('/v1/my-dream/todo', body);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['addTodo'] });
    },
  });
};
