import { useMutation } from '@tanstack/react-query';
import api from '@hook/api.ts';

interface UpdatePasswordProps {
  newPassword: string;
  newPasswordCheck: string;
}
export const useUpdatePasswordMutation = (onClose: () => void) => {
  return useMutation({
    mutationFn: (payload: UpdatePasswordProps) =>
      api.put('/v1/member/password', payload),
    onSuccess: (response) => {
      if (response.data.success) {
        onClose();
      } else {
        alert('비밀번호 변경에 실패했습니다.');
      }
    },
    onError: (error) => {
      console.error('비밀번호 변경에 실패했습니다.', error);
    },
  });
};
