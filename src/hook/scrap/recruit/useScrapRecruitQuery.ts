import { useQuery } from '@tanstack/react-query';
import api from '@hook/api';
import {
  ScrapRecruitListResponse,
  ScrapRecruitListResponseSchema,
} from '@validation/scrap/scrapRecruitSchema';

interface ScrapRecruitQueryParams {
  pageNum: number;
  sortBy?: '최신 순' | '오래된 순';
  locName?: string;
}

export const useScrapRecruitQuery = (params: ScrapRecruitQueryParams) => {
  const { pageNum, sortBy = '최신 순', locName } = params;

  return useQuery<ScrapRecruitListResponse, Error>({
    queryKey: ['scrapRecruits', pageNum, sortBy, locName],
    queryFn: async () => {
      const token = localStorage.getItem('accessToken');
      if (!token)
        throw new Error('인증 토큰이 없습니다. 로그인 후 다시 시도해주세요.');

      const response = await api.get('/v1/scrap/recruit/list', {
        params: {
          pageNum,
          sortBy,
          ...(locName && { locName }),
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return ScrapRecruitListResponseSchema.parse(response.data);
    },
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
    retry: 1,
  });
};
