import { useMutation } from '@tanstack/react-query';
import api from '@hook/api.ts';

interface NicknameProps {
  newNickName: string;
}
export const useEditNicknameMutation = () => {
  return useMutation({
    mutationFn: (payload: NicknameProps) =>
      api.put('/v1/member/nickname', payload),
    onSuccess: (response) => {
      if (response.data.success) {
      } else {
        alert('닉네임 변경에 실패했습니다.');
      }
    },
    onError: (error) => {
      alert(error);
    },
  });
};
