import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@hook/api.ts';

interface UpdateMemoRequest {
  todoTitle: string;
  isPublic: boolean;
  memoText?: string;
  link?: string;
  images?: File[];
}

interface UpdateMemoResponse {
  todoId: number;
  message: string;
}

export const useUpdateMemoMutation = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ 
      todoId, 
      todoTitle, 
      isPublic, 
      memoText, 
      link,
      images 
    }: UpdateMemoRequest & { todoId: number }) => {
   
      const formData = new FormData();
      formData.append('todoTitle', todoTitle);
      formData.append('isPublic', String(isPublic));
      
      if (memoText) {
        formData.append('memoText', memoText);
      }
      
      if (link) {
        formData.append('link', link);
      }
      
      if (images && images.length > 0) {
        images.forEach((image) => {
          formData.append('images', image);
        });
      }
      
      const { data } = await api.put(
        `/v1/my-dream/todo/${todoId}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      return data.data as UpdateMemoResponse;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['mdTodo'] });
      queryClient.invalidateQueries({ queryKey: ['todoDetail'] });
    },
    onError: (error) => {
      console.error('메모 업데이트 중 오류 발생:', error);
    },
  });
}; 
