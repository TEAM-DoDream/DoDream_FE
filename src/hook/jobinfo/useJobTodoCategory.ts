import api from '@hook/api';
import { useQuery } from '@tanstack/react-query';

export interface JobTodo {
  JobTodoId: number;
  title: string;
}
export interface JobTodoCategoryProps {
  jobId: number;
  jobName: string;
  todoCategory: string;
  jobTodos: JobTodo[];
}

const JobTodoCategory = async (id: number, todoCategory: string) => {
  try {
    const token = localStorage.getItem('accessToken');

    if (!token) {
      throw new Error('인증 토큰이 없습니다');
    }

    const response = await api.get('/v1/job/todo', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        id,
        todoCategory,
      },
    });
    return response.data.data;
  } catch (error) {
    console.error('카테고리 불러오는 것에 실패했습니다.', error);
    throw error;
  }
};

export const useJobTodoCategory = (jobId?: number, todoCategory?: string) => {
  return useQuery({
    queryKey: ['JobTodoCategory', jobId, todoCategory],
    queryFn: () => JobTodoCategory(jobId!, todoCategory!),
  });
};
