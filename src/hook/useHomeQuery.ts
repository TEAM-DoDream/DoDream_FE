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
  jobName: string;
  postDate: string;
}
const NewRecruit = async (pageNum: number, postDate: string) => {
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
        sortBy: postDate,
      },
    });
    return response.data.data.job;
  } catch (error) {
    console.error('새로 올라온 구인글 오류 발생:', error);
    throw error;
  }
};

const NoLoginNewRecruit = async (pageNum: number, postDate: string) => {
  try {
    const response = await api.get(`/v1/recruit/list`, {
      params: {
        pageNum: pageNum - 1,
        sortBy: postDate,
      },
    });
    return response.data.data.job;
  } catch (error) {
    console.error('새로 올라온 구인글 오류 발생:', error);
    throw error;
  }
};

export const useRecruitQuery = (pageNum: number, postDate: string) => {
  const isLoggedIn = Boolean(localStorage.getItem('accessToken'));

  const loginQuery = useQuery<RecruitProps[]>({
    queryKey: ['NewRecruit', pageNum, postDate],
    queryFn: () => NewRecruit(pageNum, postDate),
    enabled: isLoggedIn,
  });

  const noLoginQuery = useQuery<RecruitProps[]>({
    queryKey: ['NoLoginNewRecruit', pageNum, postDate],
    queryFn: () => NoLoginNewRecruit(pageNum, postDate),
    enabled: !isLoggedIn,
  });

  const data = isLoggedIn ? loginQuery.data : noLoginQuery.data;
  const isLoading = isLoggedIn ? loginQuery.isLoading : noLoginQuery.isLoading;
  const error = isLoggedIn ? loginQuery.error : noLoginQuery.error;

  return { data, isLoading, error };
};
