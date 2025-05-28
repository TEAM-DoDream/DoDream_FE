import api from '@hook/api';
import { useQuery } from '@tanstack/react-query';
import { TodoData, TodoDataSchema } from '@validation/mydream/todoSchema';

export const useMdTodoQuery = () => {
  return useQuery<TodoData, Error>({
    queryKey: ['mdTodo'],
    queryFn: async () => {
      const { data } = await api.get('/v1/my-dream/todo');
      return TodoDataSchema.parse(data.data);
    },
  });
};
