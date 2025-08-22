import { useMutation } from '@tanstack/react-query';
import api from '@hook/api.ts';

type LevelCode = 'SEED' | 'SPROUT' | 'TREE';

interface PostLevel {
  level: LevelCode;
}

const Level = async (level: PostLevel) => {
  const token = localStorage.getItem('accessToken');
  if (!token) {
    throw new Error('인증 토큰이 없습니다. 로그인 후 다시 시도해주세요.');
  }
  try {
    const response = await api.post(`/v1/member/level`, null, {
      params: level,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.data;
  } catch (error) {
    console.error('직업을 담는데 실패했습니다.:', error);
    throw error;
  }
};

export const useLevelMutation = () => {
  return useMutation({
    mutationFn: Level,
  });
};
