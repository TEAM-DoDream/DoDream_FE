import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@hook/api.ts';

export interface ScrapRecruitResponse {
  success: boolean;
  timestamp: string;
  data: {
    userId: number;
    isScrap: boolean;
  };
}

interface ScrapRecruitParams {
  id: string;
  isScrap: boolean;
}

export const useScrapRecruitMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<ScrapRecruitResponse, Error, ScrapRecruitParams>({
    mutationFn: async ({ id, isScrap }) => {
      const token = localStorage.getItem('accessToken');
      if (!token) throw new Error('인증 토큰이 없습니다.');

      let res;

      if (isScrap) {
        res = await api.delete(`/v1/scrap/recruit/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
          data: {
            recruitId: id,
          },
        });
      } else {
        res = await api.post(`/v1/scrap/recruit/${id}`, null, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }

      return res.data as ScrapRecruitResponse;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['scrapRecruit'] });
      queryClient.invalidateQueries({ queryKey: ['scrapRecruits'] });
      queryClient.invalidateQueries({ queryKey: ['scrapCheck'] });
    },
    onError: (err) => {
      console.error('채용 스크랩 작업 실패:', err);
    },
  });
};
