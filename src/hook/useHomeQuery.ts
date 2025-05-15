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

//홈-새로 올라온 구인

interface RecruitProps {
  count: number;
  title: string;
  companyName: string;
  id: number;
  active: number;
  'job-name': string;
  'expiration-date': string;
}
const NewRecruit = async (pageNum: number) => {
  const token = localStorage.getItem('accessToken');

  if (!token) {
    throw new Error('토큰이 없습니다.');
  }

  try {
    const response = await api.get(`/v1/recruit/list`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        pageNum: pageNum - 1,
      },
    });
    return response.data.data.job;
  } catch (error) {
    console.error('새로 올라온 구인글 오류 발생:', error);
    throw error;
  }
};

export const useNewRecruitQuery = (pageNum: number) => {
  return useQuery<RecruitProps[]>({
    queryKey: ['NewRecruit', pageNum],
    queryFn: () => NewRecruit(pageNum),
  });
};

const NoLoginNewRecruit = async (pageNum: number) => {
  try {
    const response = await api.get(`/v1/recruit/list`, {
      params: {
        pageNum: pageNum - 1,
      },
    });
    console.log('data', response.data);
    console.log('data2', response.data.data);
    return response.data.data.job;
  } catch (error) {
    console.error('새로 올라온 구인글 오류 발생:', error);
    throw error;
  }
};

export const useNoNewRecruitQuery = (pageNum: number) => {
  return useQuery<RecruitProps[]>({
    queryKey: ['NoLoginNewRecruit', pageNum],
    queryFn: () => NoLoginNewRecruit(pageNum),
  });
};
