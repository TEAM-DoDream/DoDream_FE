import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import {
  ScrapTrainingListResponseSchema,
  ScrapTrainingListResponse,
} from '@validation/scrap/scrapSchema.ts';

interface ScrapTrainingQueryParams {
  pageNum: number;
  sortBy?: '최신 순' | '오래된 순';
  locName?: string;
}

export const useScrapTrainingQuery = (params: ScrapTrainingQueryParams) => {
  const { pageNum, sortBy = '최신 순', locName } = params;
  const BaseUrl = import.meta.env.VITE_BASE_URL;

  return useQuery<ScrapTrainingListResponse, Error>({
    queryKey: ['scrapTrainings', pageNum, sortBy, locName],
    queryFn: async () => {
      const token = localStorage.getItem('accessToken');
      if (!token)
        throw new Error('인증 토큰이 없습니다. 로그인 후 다시 시도해주세요.');

      let url = `${BaseUrl}/v1/scrap/training/list?pageNum=${pageNum}`;
      url += `&sortBy=${encodeURIComponent(sortBy)}`;
      if (locName) {
        url += `&locName=${encodeURIComponent(locName)}`;
      }

      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      try {
        return ScrapTrainingListResponseSchema.parse(response.data);
      } catch (error) {
        console.error('API 응답 데이터 검증 실패:', error);

        throw new Error('API 응답 데이터 형식이 올바르지 않습니다.');
      }
    },
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
    retry: 1,
    enabled: true,
  });
};
