import { useMutation } from '@tanstack/react-query';
import api from '@hook/api.ts';

export const useDeleteJob = () => {
  return useMutation({
    mutationFn: (jobIds: number[]) =>
      api.delete('/v1/member/job', { data: { jobIds } }),
    onSuccess: (response) => {
      if (!response.data.success) {
        alert('직업을 변경하는데 에러가 발생했습니다.');
      }
    },
    onError: (error) => {
      console.error('직업을 변경하는데 에러가 발생했습니다', error);
    },
  });
};
