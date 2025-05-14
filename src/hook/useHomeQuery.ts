import { useQuery } from '@tanstack/react-query';
import api from './api';

export interface HomeProps {
  'job-name': string;
  count: number;
}

const HomeBanner = async () => {
  const token = localStorage.getItem('accessToken');

  if (!token) {
    throw new Error('토큰이 없습니다.');
  }

  try {
    const response = await api.get(`/v1/recruit/popular`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.data;
  } catch (error) {
    console.error('인기 채용 정보를 가져오는 중 오류 발생:', error);
    throw error;
  }
};

export const useBannerQuery = () => {
  return useQuery<HomeProps[]>({
    queryKey: ['homeBanner'],
    queryFn: HomeBanner,
  });
};

const HomeNoLoginBanner = async () => {
  const response = await api.get(`/v1/recruit/popular`);
  return response.data.data;
};

export const useNoBannerQuery = () => {
  return useQuery<HomeProps[]>({
    queryKey: ['HomeNoLoginBanner'],
    queryFn: HomeNoLoginBanner,
  });
};
