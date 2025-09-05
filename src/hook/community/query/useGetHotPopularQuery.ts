import { useQuery } from '@tanstack/react-query';
import api from '@hook/api';
import { useCommunityStore } from '@store/useCommunityStore';

export interface HotPopularItem {
  id: number;
  name: string;
  level: string;
  imageUrl: string;
  dDay: string;
  description: string;
  saveCount: number;
  isSaved: boolean;
}

interface HotPopularApiResponse {
  success: boolean;
  timestamp: string;
  data: HotPopularItem[];
}

export const useGetHotPopularQuery = () => {
  const { selectedJobName } = useCommunityStore();

  return useQuery<HotPopularItem[]>({
    queryKey: ['hotPopular', selectedJobName],
    enabled: !!selectedJobName,
    queryFn: async () => {
      const res = await api.get('/v1/community/todos/popular', {
        params: { jobName: selectedJobName },
      });
      console.log(res.data);
      const body = res.data as HotPopularApiResponse;
      return Array.isArray(body?.data) ? body.data : [];
    },
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });
};
