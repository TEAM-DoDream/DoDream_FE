import { useQuery } from '@tanstack/react-query';
import api from '@hook/api';

export const useRecruitDetailQuery = (id: string) =>
  useQuery({
    queryKey: ['recruitDetail', id],
    queryFn: async () => {
      const { data } = await api.get('/v1/recruit/detail', { params: { id } });
      return data.data.job[0];
    },
    enabled: !!id,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
