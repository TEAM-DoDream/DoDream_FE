import { useQuery } from '@tanstack/react-query';
import api from './api';

export interface HomeProps {
  'job-name': string;
  count: number;
}

const HomeBanner = async () => {
  const token = localStorage.getItem('accessToken');

  const response = await api.get(`/v1/recruit/popular`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data.data;
};

export const useBannerQuery = () => {
  return useQuery<HomeProps[]>({
    queryKey: ['homeBanner'],
    queryFn: HomeBanner,
  });
};
