import { useMutation } from '@tanstack/react-query';
import api from '@hook/api.ts';

interface UpdateRegionProps {
  newRegionCode: string;
}
export const useUpdateRegionMutation = () => {
  return useMutation({
    mutationFn: (payload: UpdateRegionProps) =>
      api.put('/v1/member/region', payload),
    onSuccess: (response) => {
      if (response.data.success) {
        console.log('변경성공');
      } else {
        alert('거주지 변경에 실패했습니다.');
      }
    },
    onError: (error) => {
      alert(error);
    },
  });
};
