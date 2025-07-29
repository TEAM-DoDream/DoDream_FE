import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@hook/api.ts';
import type { AxiosError } from 'axios';

interface JobSelectIdProps {
  jobId: number;
}

export const useJobSelectIdMutation = () => {
  const queryClient = useQueryClient();
  return useMutation<JobSelectIdProps, AxiosError, number>({
    mutationFn: (jobId: number) =>
      api.post(`/v1/my-dream/job/${jobId}`).then(() => ({ jobId })),

    onSuccess: (data) => {
      const { jobId } = data;
      queryClient.setQueryData<number>(['selectedJobId'], jobId);
    },

    onError: (error: AxiosError) => {
      alert(error.message);
    },
  });
};
