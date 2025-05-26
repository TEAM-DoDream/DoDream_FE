import api from '@hook/api';
import { useQuery } from '@tanstack/react-query';

export interface PopularDreamer {
  todoGroupId: number;
  memberNickname: string;
  profileImage: string;
  regionName: string;
  daysAgo: number;
  jobName: string;
  todoCount: number;
  todos: [
    {
      todoId: number;
      title: string;
      completed: boolean;
    },
  ];
}

const PopularDreamer = async () => {
  try {
    const response = await api.get(`/v1/todo/other/public`);
    return response.data.data;
  } catch (error) {
    console.error(
      '타유저 투두 리스트 목록 조회하는데 에러가 발생했습니다.',
      error
    );
    throw error;
  }
};

export const usePoplularDreamer = () => {
  return useQuery<PopularDreamer[]>({
    queryKey: ['PopularDreamer'],
    queryFn: PopularDreamer,
  });
};
