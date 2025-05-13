import { useQuery, UseQueryResult } from '@tanstack/react-query';
import api from '@hook/api';
import { useFilterStore } from '@store/filterStore';
import { useShallow } from 'zustand/react/shallow';
import { useDebouncedDateFilter } from '@hook/useDebouncedDateFilter';

export const useRecruitListQuery = <TData = any>(
  pageNum: number
): UseQueryResult<TData, unknown> => {
  const { job, location } = useFilterStore(
    useShallow((s) => ({
      job: s.job,
      location: s.location,
    }))
  );

  const {
    debouncedStartDate: startDate,
    debouncedEndDate: endDate,
    isValid,
  } = useDebouncedDateFilter();

  return useQuery<TData>({
    queryKey: ['recruitList', pageNum, job, location, startDate, endDate],
    queryFn: async () => {
      const { data } = await api.get('/v1/recruit/list', {
        params: {
          pageNum,
          keyWord: job || undefined,
          locationName: location || undefined,
          startDate: startDate || undefined,
          endDate: endDate || undefined,
        },
      });

      return data.data;
    },
    enabled: isValid,
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });
};
