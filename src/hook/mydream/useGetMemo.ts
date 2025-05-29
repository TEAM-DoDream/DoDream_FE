import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import api from '@hook/api.ts';

export interface GetMemoProps {
  todoId: number;
  title: string;
  isPublic: boolean;
  memoText: string;
  link?: string;
  images: {
    imageId: number;
    imageUrl: string;
  }[];
}

const GetMemo = async (todoId: number): Promise<GetMemoProps> => {
  const token = localStorage.getItem('accessToken');

  if (!token) throw new Error('토큰이 없습니다.');

  const response = await api.get(`/v1/todo/${todoId}/memo`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data.data;
};

export const useMemoQuery = (
  todoId: number,
  options?: Omit<
    UseQueryOptions<GetMemoProps, Error, GetMemoProps, [string, number]>,
    'queryKey' | 'queryFn'
  >
) => {
  return useQuery<GetMemoProps, Error, GetMemoProps, [string, number]>({
    queryKey: ['GetMemo', todoId],
    queryFn: () => GetMemo(todoId),
    ...options,
  });
};
