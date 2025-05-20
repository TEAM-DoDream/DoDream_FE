import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { useFilterStore } from '@store/filterStore';
import { useShallow } from 'zustand/react/shallow';
import axios from 'axios';

export const useRecruitListQuery = <TData = any>(
  pageNum: number
): UseQueryResult<TData, Error> => {
  const { job, location } = useFilterStore(
    useShallow((s) => ({
      job: s.job,
      location: s.location,
    }))
  );

  const BaseUrl = import.meta.env.VITE_BASE_URL;

  return useQuery<TData, Error>({
    queryKey: ['recruitList', pageNum, job, location],
    queryFn: async () => {
      const { data } = await axios.get(`${BaseUrl}/v1/recruit/list`, {
        params: {
          pageNum,
          keyWord: job || undefined,
          locationName: location || undefined,
        },
      });
      return data.data;
    },
    enabled: true,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    retry: 1,
  });
};
