import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@hook/api.ts';

interface DeleteScrapRecruitParams {
  id: string;
}

const deleteScrapRecruit = async ({ id }: DeleteScrapRecruitParams) => {
  const token = localStorage.getItem('accessToken');
  if (!token) {
    throw new Error('인증 토큰이 없습니다. 로그인 후 다시 시도해주세요.');
  }

  const response = await api.delete(`/v1/scrap/training/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: {
      recruitId: id,
    },
  });

  return response.data;
};

export const useDeleteScrapRecruitMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteScrapRecruit,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['scrapRecruit'] });
    },
    onError: (error) => {
      console.error('스크랩 삭제 중 오류 발생:', error);
    },
  });
};
