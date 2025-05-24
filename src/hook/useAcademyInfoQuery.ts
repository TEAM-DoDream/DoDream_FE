import { useQuery } from '@tanstack/react-query';
import { useAcademyFilterStore } from '@store/academyFilterStore';
import { useShallow } from 'zustand/react/shallow';
import { keepPreviousData } from '@tanstack/react-query';
import axios from 'axios';
import {
  AcademyListResponse,
  AcademyListResponseSchema,
} from '@validation/academy/academySchema';

export const useAcademyInfoQuery = (pageNum: number) => {
  const { job, location, trainingCourse, sortBy } = useAcademyFilterStore(
    useShallow((s) => ({
      job: s.job,
      location: s.location,
      trainingCourse: s.trainingCourse,
      sortBy: s.sortBy,
    }))
  );
  const BaseUrl = import.meta.env.VITE_BASE_URL;

  return useQuery<AcademyListResponse, Error>({
    queryKey: ['academyList', pageNum, job, location, trainingCourse, sortBy],

    queryFn: async () => {
      const res = await axios.get(`${BaseUrl}/v1/training/list`, {
        params: {
          pageNum: String(pageNum),
          jobName: job || undefined,
          regionName: location || undefined,
          type: trainingCourse || undefined,
          sortBy: sortBy || undefined,
        },
      });
      const payload = res.data.data;

      return AcademyListResponseSchema.parse(payload);
    },

    placeholderData: keepPreviousData,
    staleTime: 1000 * 60 * 5,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    retry: 1,
    enabled: true,
  });
};
