import { useMutation } from '@tanstack/react-query';
import api from '@hook/api.ts';

export const useUploadImageMutation = () => {
  return useMutation({
    mutationFn: (file: File) => {
      const token = localStorage.getItem('accessToken');

      if (!token) {
        throw new Error('인증 토큰이 없습니다');
      }
      const formData = new FormData();
      formData.append('file', file);
      return api.post('/v1/member/profile', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });
    },

    onError: (err) => {
      console.error('업로드 에러:', err);
    },
  });
};
