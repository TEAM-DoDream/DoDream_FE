import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

export interface ScrapTrainingRequest {
  trprId: string;
  trprDegr: string;
  trainstCstId: string;
  traStartDate: string;
  traEndDate: string;
  type: '이론 위주' | '실습 위주';
}

export interface ScrapTrainingResponse {
  message: string;
  success: boolean;
}

const formatDateToSlash = (d: string) => d.replace(/-/g, '/');

export const useScrapTrainingMutation = () => {
  const queryClient = useQueryClient();
  const BaseUrl = import.meta.env.VITE_BASE_URL;

  return useMutation<ScrapTrainingResponse, Error, ScrapTrainingRequest>({
    mutationFn: async (params) => {
      const token = localStorage.getItem('accessToken');
      if (!token) throw new Error('인증 토큰이 없습니다.');

      const { type, ...body } = params;

      const formattedBody = {
        ...body,
        traStartDate: formatDateToSlash(body.traStartDate),
        traEndDate: formatDateToSlash(body.traEndDate),
      };

      const url = `${BaseUrl}/v1/scrap/training?type=${encodeURIComponent(type)}`;

      const res = await axios.post(url, formattedBody, {
        headers: { Authorization: `Bearer ${token}` },
      });

      return res.data as ScrapTrainingResponse;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['scrapTrainings'] });
    },
    onError: (err) => {
      console.error('트레이닝 스크랩 실패:', err);
    },
  });
};
