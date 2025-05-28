import { useMutation } from '@tanstack/react-query';
import api from '@hook/api.ts';

export const useDeleteProfile = () => {
  return useMutation({
    mutationFn: () => api.delete('/v1/member/profile'),
    onSuccess: (response) => {
      if (!response.data.success) {
        alert('이미지 삭제에 에러가 발생했습니다.');
      }
    },
    onError: (error) => {
      console.error('이미지 삭제에 에러가 발생했습니다', error);
    },
  });
};
