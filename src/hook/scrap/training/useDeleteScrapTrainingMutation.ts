import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@hook/api.ts';

interface DeleteScrapTrainingParams {
  trprId: string;
}

const deleteScrapTraining = async ({ trprId }: DeleteScrapTrainingParams) => {
  const token = localStorage.getItem('accessToken');
  if (!token) {
    throw new Error('인증 토큰이 없습니다. 로그인 후 다시 시도해주세요.');
  }

  const response = await api.delete(`/v1/scrap/training/${trprId}`, {
    headers: { Authorization: `Bearer ${token}` },
    data: { trainingId: trprId },
  });

  return response.data;
};

export const useDeleteScrapTrainingMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteScrapTraining,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['scrapTrainings'] });
    },
    onError: (error) => {
      console.error('스크랩 삭제 중 오류 발생:', error);
    },
  });
};
