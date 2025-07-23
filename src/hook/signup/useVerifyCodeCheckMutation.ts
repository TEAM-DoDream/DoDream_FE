import api from '@hook/api';
import { useMutation } from '@tanstack/react-query';

interface VerifyCodeProps {
  email: string;
  type: 'SIGN_UP' | 'FIND_ID' | 'FIND_PASSWORD';
  code: string;
}

const EmailCodeVerify = async (payload: VerifyCodeProps) => {
  try {
    const response = await api.post(
      `/v1/member/auth/email/verifications/verify`,
      payload
    );
    return response.data.data;
  } catch (error) {
    console.error('코드 확인에 실패했습니다.:', error);
    throw error;
  }
};

export const useVerifyCodeCheckMutation = () => {
  return useMutation({
    mutationFn: EmailCodeVerify,
  });
};
