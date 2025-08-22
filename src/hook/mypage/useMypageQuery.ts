import { useQuery } from '@tanstack/react-query';
import api from '../api';

export interface GetInfoProps {
  memberId: number;
  profileImage: string;
  nickname: string;
  loginId: string;
  birthDate: string;
  regionName: string;
  job: {
    jobId: number;
    jobName: string;
  };
  level: string;
}
const Mypage = async () => {
  try {
    const token = localStorage.getItem('accessToken');

    if (!token) {
      throw new Error('인증 토큰이 없습니다');
    }

    const response = await api.get('/v1/member/info', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.data;
  } catch (error) {
    console.error('내 계정 정보를 불러오는 것에 실패했습니다.', error);
    throw error;
  }
};

export const useGetInfo = () => {
  return useQuery<GetInfoProps>({
    queryKey: ['Mypage'],
    queryFn: () => Mypage(),
  });
};
