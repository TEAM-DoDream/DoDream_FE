import { useQuery } from '@tanstack/react-query';
import api from '@hook/api';
import {
  TodoGroupSchema,
  TodoGroupData,
} from '@validation/mydream/todoGroupSchema';

export const useTodoGroupQuery = (todoGroupId?: number) => {
  return useQuery<TodoGroupData, Error>({
    queryKey: ['todoGroup', todoGroupId],
    queryFn: async () => {
      if (typeof todoGroupId !== 'number') {
        throw new Error('todoGroupId가 필요합니다.');
      }

      const { data } = await api.get(`/v1/my-dream/todo-group/${todoGroupId}`);

      return TodoGroupSchema.parse(data.data);
    },
    staleTime: 0,
    gcTime: 1000 * 60 * 5,
    enabled: typeof todoGroupId === 'number',
  });
};
