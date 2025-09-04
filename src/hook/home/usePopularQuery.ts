import { useQuery } from '@tanstack/react-query';
import api from '@hook/api';
import {
  PopularResponseSchema,
  PopularTodo,
} from '@validation/home/popularSchema';

export const usePopularQuery = () => {
  return useQuery<PopularTodo[]>({
    queryKey: ['popular'],
    queryFn: async () => {
      const response = await api.get('v1/todo/popular');
      const validatedData = PopularResponseSchema.parse(response.data);
      return validatedData.data;
    },
  });
};
