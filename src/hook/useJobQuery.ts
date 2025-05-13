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

export interface JobDetailRequest {
  jobId: number;
  jobName: string;
  jobDescription: string;
  certification: string;
  certificationPeriod: string;
  salaryType: string;
  salaryCost: string;
  strong: {
    physical: string;
    stress: string;
    relationship: string;
  };
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

//직업 상세
const jobDetail = async (id: number): Promise<JobDetailRequest> => {
  const response = await api.get(`/v1/job/detail/${id}`);
  console.log('data', response.data);
  return response.data.data;
};

export const useJobDetailQuery = (id: number) => {
  return useQuery({
    queryKey: ['jobDetail', id],
    queryFn: () => jobDetail(id),
  });
};
