import api from '@hook/api';
import { useQuery } from '@tanstack/react-query';
import { TodoData, TodoDataSchema } from '@validation/mydream/todoSchema';

export const useMdTodoQuery = () => {
  const token = localStorage.getItem('accessToken');

  return useQuery<TodoData, Error>({
    queryKey: ['mdTodo'],
    enabled: !!token,
    queryFn: async () => {
      const { data } = await api.get('/v1/my-dream/todo', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return TodoDataSchema.parse(data.data);
    },
  });
};
