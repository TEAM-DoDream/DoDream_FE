import api from '@hook/api';
import { useQuery } from '@tanstack/react-query';

interface MdJobItem {
  jobName: string;
  todoGroupId: number;
}

interface MdJobsResponse {
  success: boolean;
  timestamp: string;
  data: MdJobItem[];
}

export const useMdJobsQuery = () => {
  return useQuery<MdJobItem[], Error>({
    queryKey: ['mdJobs'],
    queryFn: async () => {
      try {
        const response = await api.get<MdJobsResponse>('/v1/my-dream/todo/jobs');
        console.log('🎯 mdJobs 요청 URL: /v1/my-dream/todo/jobs');
        console.log('🎯 mdJobs 응답 데이터:', response.data.data);
        
        if (response.data && response.data.data && Array.isArray(response.data.data)) {
          return response.data.data;
        } else {
          console.error('mdJobs 응답이 배열이 아닙니다:', response.data);
          return [];
        }
      } catch (error) {
        console.error('mdJobs 요청 중 오류 발생:', error);
        return [];
      }
    },
  });
};
