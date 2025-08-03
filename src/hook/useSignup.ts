import { useMutation } from '@tanstack/react-query';
import api from './api';
import { useLocation, useNavigate } from 'react-router-dom';
import { ReactTagManager } from 'react-gtm-ts';

export interface SignupRequest {
  loginId: string;
  password: string;
  nickName: string;
  birthDate: string;
  gender: string | null;
  regionCode?: string | null;
  email: string;
}
const location = useLocation();

const signupUser = async (data: SignupRequest) => {
  const response = await api.post(`/v1/member/auth/sign-up`, data);
  return response.data;
};

const duplicateId = async (loginId: string) => {
  const response = await api.get(`/v1/member/auth/check-id`, {
    params: { loginId },
  });
  return response.data;
};

const duplicateNickname = async (nickname: string) => {
  const response = await api.get(`/v1/member/auth/check-nickname`, {
    params: { nickname },
  });
  return response.data;
};

export const useSignupMutation = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: signupUser,
    onSuccess: () => {
      ReactTagManager.action({
        event: 'signup_complete',
        category: 'Signup',
        clickText: '회원가입 완료',
        location: location.pathname,
      });

      navigate('/login');
    },
  });
};

export const useDuplicateIdMutation = () => {
  return useMutation({
    mutationFn: duplicateId,
  });
};

export const useDuplicateNicknameMutation = () => {
  return useMutation({
    mutationFn: duplicateNickname,
  });
};
