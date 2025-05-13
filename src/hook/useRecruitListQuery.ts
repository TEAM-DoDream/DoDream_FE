import { useQuery } from '@tanstack/react-query';
import api from '@hook/api';
import { useFilterStore } from '@store/filterStore';
import { useShallow } from 'zustand/react/shallow';
import { useDebouncedDateFilter } from '@hook/useDebouncedDateFilter.ts';
export const useRecruitListQuery = (pageNum: number) => {
  const { job, location } = useFilterStore(
    useShallow((state) => ({
      job: state.job,
      location: state.location,
    }))
  );

  const { debouncedStartDate, debouncedEndDate, isValid } =
    useDebouncedDateFilter();

  return useQuery({
    queryKey: [
      'recruitList',
      pageNum,
      job,
      location,
      debouncedStartDate,
      debouncedEndDate,
    ],
    queryFn: async () => {
      const { data } = await api.get('/v1/recruit/list', {
        params: {
          pageNum,
          keyWord: job || undefined,
          locationName: location || undefined,
          startDate: debouncedStartDate || undefined,
          endDate: debouncedEndDate || undefined,
        },
      });
      return data.data ?? { job: [], count: 0, total: 0, start: 0 };
    },
    enabled: isValid,
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });
};
