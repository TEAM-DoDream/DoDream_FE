import api from '@hook/api';
import { useMutation } from '@tanstack/react-query';

export interface FloatingSubmitProps {
  todoGroupId: number;
  todoTitle: string;
  isPublic: boolean;
}

const FloatingSubmit = async ({
  todoGroupId,
  todoTitle,
  isPublic,
}: FloatingSubmitProps) => {
  const token = localStorage.getItem('accessToken');
  if (!token) {
    throw new Error('인증 토큰이 없습니다. 로그인 후 다시 시도해주세요.');
  }

  const formData = new FormData();
  formData.append('todoTitle', todoTitle);
  formData.append('isPublic', String(isPublic));
  try {
    const response = await api.post(
      `/v1/my-dream/todo-group/${todoGroupId}`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data.data;
  } catch (error) {
    console.error('할일을 추가하는데 실패했습니다.', error);
    throw error;
  }
};

export const useFloatingSubmitMutation = () => {
  return useMutation({
    mutationFn: FloatingSubmit,
  });
};
