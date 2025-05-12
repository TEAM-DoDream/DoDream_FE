import { useQuery } from '@tanstack/react-query';
import api from '@hook/api';
import { useFilterStore } from '@store/filterStore';
import { useShallow } from 'zustand/react/shallow';

export const useRecruitListQuery = () => {
  const { job, location, startDate, endDate } = useFilterStore(
    useShallow((state) => ({
      job: state.job,
      location: state.location,
      startDate: state.startDate,
      endDate: state.endDate,
    }))
  );

  return useQuery({
    queryKey: ['recruitList', job, location, startDate, endDate],
    queryFn: async () => {
      const { data } = await api.get('/v1/recruit/list', {
        params: {
          pageNum: 0,
          keyWord: job || undefined,
          locationName: location || undefined,
          startDate: startDate || undefined,
          endDate: endDate || undefined,
        },
      });
      return data.data?.job ?? [];
    },
    staleTime: 1000 * 60 * 5,
    retry: 1,
    enabled: true,
  });
};
