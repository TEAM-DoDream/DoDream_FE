import api from '@hook/api';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';

export interface FloatingPopularProps {
  id: number;
  title: string;
}

const FloatingPopular = async () => {
  const token = localStorage.getItem('accessToken');

  if (!token) {
    throw new Error('토큰이 없습니다.');
  }

  try {
    const response = await api.get(`/v1/todo/floating/popular`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.data;
  } catch (error) {
    console.error(
      '실시간 플로팅 인기를 가져오는데 에러가 발생했습니다.',
      error
    );
    throw error;
  }
};

export const useFloatingPopular = (
  options?: UseQueryOptions<FloatingPopularProps>
) =>
  useQuery<FloatingPopularProps>({
    queryKey: ['FloatingPopular', 'login'],
    queryFn: FloatingPopular,
    ...options,
  });

const NoLoginFloatingPopular = async () => {
  try {
    const response = await api.get(`/v1/todo/floating/popular`);
    return response.data.data;
  } catch (error) {
    console.error(
      '실시간 플로팅 인기를 가져오는데 에러가 발생했습니다.',
      error
    );
    throw error;
  }
};

export const useNoLoginFloatingPopular = (
  options?: UseQueryOptions<FloatingPopularProps>
) =>
  useQuery<FloatingPopularProps>({
    queryKey: ['NoLoginFloatingPopular', 'guest'],
    queryFn: NoLoginFloatingPopular,
    ...options,
  });
