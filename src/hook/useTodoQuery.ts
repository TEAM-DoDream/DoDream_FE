import { useQuery } from '@tanstack/react-query';
import api from './api';

export interface OtherTodoAllList {
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

const AllOtherTodoList = async (page: number, jobId: number) => {
  try {
    const response = await api.get(`/v1/todo/other/${jobId}`, {
      params: {
        page: page - 1,
      },
    });
    return {
      content: response.data.data.content,
      totalPages: response.data.data.totalPages,
    };
  } catch (error) {
    console.error('타유저 투두 리스트 목록 조회 실패', error);
    throw new Error('타유저 투두 리스트 목록 조회하는데 실패했습니다');
  }
};
export const useAllOtherTodoListQuery = (page: number, jobId: number) => {
  return useQuery({
    queryKey: ['AllOtherTodoList', page, jobId],
    queryFn: () => AllOtherTodoList(page, jobId),
  });
};
