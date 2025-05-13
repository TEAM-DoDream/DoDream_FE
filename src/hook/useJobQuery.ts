import { useQuery } from '@tanstack/react-query';
import api from './api';

export interface JobRequest {
  jobId: number;
  jobName: string;
  jobDescription: string;
  requiredCertification: string;
  workTimeInfo: string;
  physicalInfo: string;
  imageUrl: string;
}

const jobFoundList = async (pageNum: number) => {
  const response = await api.get(`/v1/job/list`, {
    params: { pageNum: pageNum - 1 },
  });
  return {
    content: response.data.data.content,
    totalPages: response.data.data.totalPages,
  };
};

export const useJobQuery = (pageNum: number) => {
  return useQuery({
    queryKey: ['jobList', pageNum],
    queryFn: () => jobFoundList(pageNum),
  });
};
