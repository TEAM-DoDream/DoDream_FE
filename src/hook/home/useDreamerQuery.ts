import api from '@hook/api';
import { useQuery } from '@tanstack/react-query';

export interface HomeDreamer {
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

const Dreamer = async () => {
  const token = localStorage.getItem('accessToken');

  if (!token) {
    throw new Error('토큰이 없습니다.');
  }

  try {
    const response = await api.get(`/v1/todo/other`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.data;
  } catch (error) {
    console.error(
      '타유저 투두 리스트 목록 조회하는데 에러가 발생했습니다.',
      error
    );
    throw error;
  }
};

export const useDreamerQuery = () => {
  return useQuery<HomeDreamer[]>({
    queryKey: ['Dreamer'],
    queryFn: Dreamer,
  });
};
