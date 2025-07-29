import api from '@hook/api';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';

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
    const axiosError = error as AxiosError<{ message?: string }>;
    throw new Error(axiosError.response?.data?.message || '오류 발생');
  }
};

export const useVerifyMutation = () => {
  return useMutation({
    mutationFn: EmailVerify,
  });
};
