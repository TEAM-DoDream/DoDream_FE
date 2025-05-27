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

export const useScrapRecruitMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<ScrapRecruitResponse, Error, string>({
    mutationFn: async (recruitId: string) => {
      const token = localStorage.getItem('accessToken');
      if (!token) throw new Error('인증 토큰이 없습니다.');

      const res = await api.post(`/v1/scrap/recruit/${recruitId}`, null, {
        headers: { Authorization: `Bearer ${token}` },
      });

      return res.data as ScrapRecruitResponse;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['scrapRecruit'] });
    },
    onError: (err) => {
      console.error('채용 스크랩 실패:', err);
    },
  });
};
