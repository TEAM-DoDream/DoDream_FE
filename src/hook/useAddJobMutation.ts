import { useMutation } from '@tanstack/react-query';
import api from './api';

const addJob = async (jobId: number) => {
  const token = localStorage.getItem('accessToken');
  if (!token) return;

  const response = await api.post(`/v1/my-dream/job/${jobId}`, null, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data.data;
};

export const useAddJobMutation = () => {
  return useMutation({
    mutationFn: addJob,
  });
};
