import { useMutation } from '@tanstack/react-query';
import api from '@hook/api.ts';
import { useNavigate } from 'react-router-dom';

interface OnboardAnswer {
  answers: {
    questionNum: number;
    responses: string[];
  }[];
}
export const useSubmitOnboardAnswers = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (payload: OnboardAnswer) =>
      api.post('/v1/job/recommend', payload),
    onSuccess: (res) => {
      if (res.data.success) {
        navigate('/jobrecommend', { state: res.data.data.recommendedJobs });
      } else {
        alert('추천 결과 생성에 실패했습니다.');
      }
    },
    onError: (error) => {
      alert(error);
    },
  });
};
