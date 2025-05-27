import { useQuery } from '@tanstack/react-query';
import api from '@hook/api';
import { ScrapCheckResponse, ScrapCheckResponseSchema } from '@validation/scrap/scrapCheckSchema';

interface ScrapCheckQueryParams {
  category: 'RECRUIT' | 'TRAINING';
  idList: string[];
}

export const useScrapCheckQuery = (params: ScrapCheckQueryParams) => {
  const { category, idList } = params;

  return useQuery<ScrapCheckResponse, Error>({
    queryKey: ['scrapCheck', category, idList],
    queryFn: async () => {
      const token = localStorage.getItem('accessToken');
      if (!token)
        throw new Error('인증 토큰이 없습니다. 로그인 후 다시 시도해주세요.');

      const idListString = idList.join(',');

      const response = await api.get('/v1/scrap/checked', {
        params: {
          category,
          idList: idListString
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return ScrapCheckResponseSchema.parse(response.data);
    },
    enabled: idList.length > 0 && !!localStorage.getItem('accessToken'),
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false
  });
}; 