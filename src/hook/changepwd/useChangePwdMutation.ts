import { useMutation } from '@tanstack/react-query';
import api from '@hook/api';

interface ChangePwdFormData {
  email: string;
  loginId: string;
  newPassword: string;
}

const useChangePwdMutation = () => {
  return useMutation({
    mutationFn: (data: ChangePwdFormData) => api.post('/v1/member/auth/email/password', data),
  });
};

export default useChangePwdMutation;    