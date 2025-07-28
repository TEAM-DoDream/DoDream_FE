import api from '@hook/api';
import { useQuery } from '@tanstack/react-query';

export interface JobSelectProps {
  jobId: number;
  jobName: string;
  jobDescription: string;
  imageUrl: string;
}

const jobSelect = async () => {
  const token = localStorage.getItem('accessToken');
  try {
    const response = await api.get('/v1/job/add', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.data;
  } catch (error) {
    console.error('직업을 불러오는데 에러가 발생했습니다', error);
    throw error;
  }
};

export const useJobSelect = () => {
  return useQuery<JobSelectProps[]>({
    queryKey: ['jobSelect'],
    queryFn: jobSelect,
  });
};
