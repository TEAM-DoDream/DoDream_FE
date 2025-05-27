import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import api from '@hook/api.ts';

export interface ScrapTrainingRequest {
  trprId: string;
  trprDegr: string;
  trainstCstId: string;
  traStartDate: string;
  traEndDate: string;
  type: '이론 위주' | '실습 위주';
  isScrap?: boolean;
}

export interface ScrapTrainingResponse {
  message?: string;
  success: boolean;
  data?: {
    isScrap: boolean;
  };
}

const formatDateToSlash = (d: string) => d.replace(/-/g, '/');

export const useScrapTrainingMutation = () => {
  const queryClient = useQueryClient();
  const BaseUrl = import.meta.env.VITE_BASE_URL;

  return useMutation<ScrapTrainingResponse, Error, ScrapTrainingRequest>({
    mutationFn: async (params) => {
      const token = localStorage.getItem('accessToken');
      if (!token) throw new Error('인증 토큰이 없습니다.');

      const { type, isScrap, trprId, ...body } = params;

      if (isScrap) {
        await api.delete(`/v1/scrap/training/${trprId}`, {
          headers: { Authorization: `Bearer ${token}` },
          data: { trainingId: trprId },
        });
      } else {
        const formattedBody = {
          ...body,
          trprId,
          traStartDate: formatDateToSlash(body.traStartDate),
          traEndDate: formatDateToSlash(body.traEndDate),
        };

        const url = `${BaseUrl}/v1/scrap/training?type=${encodeURIComponent(type)}`;

        await axios.post(url, formattedBody, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }

      return {
        success: true,
        data: {
          isScrap: !isScrap,
        },
      };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['scrapTrainings'] });
      queryClient.invalidateQueries({ queryKey: ['scrapCheck'] });
    },
    onError: (err) => {
      console.error('학원 스크랩 작업 실패:', err);
    },
  });
};
