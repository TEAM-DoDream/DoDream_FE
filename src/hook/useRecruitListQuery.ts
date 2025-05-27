import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { useFilterStore } from '@store/filterStore';
import { useShallow } from 'zustand/react/shallow';
import axios from 'axios';

import {
  RecruitListResponse,
  RecruitListResponseSchema,
} from '@validation/recruit/recruitSchema';

export const useRecruitListQuery = (
  pageNum: number
): UseQueryResult<RecruitListResponse, Error> => {
  const { job, location, sortBy } = useFilterStore(
    useShallow((s) => ({
      job: s.job,
      location: s.location,
      sortBy: s.sortBy,
    }))
  );
  const BaseUrl = import.meta.env.VITE_BASE_URL;

  return useQuery<RecruitListResponse, Error>({
    queryKey: ['recruitList', pageNum, job, location, sortBy],
    queryFn: async () => {
      const res = await axios.get(`${BaseUrl}/v1/recruit/list`, {
        params: {
          pageNum,
          keyWord: job || undefined,
          locationName: location || undefined,
          sortBy: sortBy || undefined,
        },
      });

      const payload = res.data.data;

      return RecruitListResponseSchema.parse(payload);
    },

    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    retry: 1,
    enabled: true,
  });
};
