import { useQuery } from '@tanstack/react-query';
import { useAcademyFilterStore } from '@store/academyFilterStore';
import { useShallow } from 'zustand/react/shallow';
import axios from 'axios';

export const useAcademyInfoQuery = <TData = any>(pageNum: number) => {
  const { job, location, trainingCourse } = useAcademyFilterStore(
    useShallow((s) => ({
      job: s.job,
      location: s.location,
      trainingCourse: s.trainingCourse,
    }))
  );

  const BaseUrl = import.meta.env.VITE_BASE_URL;

  return useQuery<TData, Error>({
    queryKey: ['academyList', pageNum, job, location, trainingCourse],
    queryFn: async () => {
      const { data } = await axios.get(`${BaseUrl}/v1/training/list`, {
        params: {
          pageNum: String(pageNum),
          jobName: job || undefined,
          regionName: location || undefined,
          type: trainingCourse || undefined,
        },
      });
      return data.data;
    },
    enabled: true,
    staleTime: 1000 * 60 * 5,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    retry: 1,
  });
};
