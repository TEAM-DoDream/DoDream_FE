import { useMutation } from '@tanstack/react-query';
import api from '@hook/api.ts';

export const useDeleteJob = () => {
  return useMutation({
    mutationFn: (jobIds: number[]) =>
      api.delete('/v1/member/job', { data: { jobIds } }),
    onSuccess: (response) => {
      if (response.data.success) {
      } else {
        alert('삭제에 실패했습니다.');
      }
    },
    onError: (error) => {
      alert(error);
    },
  });
};
