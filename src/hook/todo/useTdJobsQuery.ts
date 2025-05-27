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
        
        if (response.data && response.data.data && Array.isArray(response.data.data)) {
          return response.data.data;
        } else {
          return [];
        }
      } catch {
        return [];
      }
    },
  });
};
