import api from '@hook/api';
import { useMutation } from '@tanstack/react-query';

interface VerifyProps {
  email: string;
  loginId?: string;
  type: 'SIGN_UP' | 'FIND_ID' | 'FIND_PASSWORD';
}

const EmailVerify = async (payload: VerifyProps) => {
  try {
    const response = await api.post(
      `/v1/member/auth/email/verifications`,
      payload
    );
    return response.data.data;
  } catch (error) {
    console.error('이메일 전송 문자를 보내는데 실패했습니다.:', error);
    throw error;
  }
};

export const useVerifyMutation = () => {
  return useMutation({
    mutationFn: EmailVerify,
  });
};
