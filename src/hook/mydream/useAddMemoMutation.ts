import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@hook/api.ts';

interface AddMemoRequest {
  todoTitle: string;
  isPublic: boolean;
  memoText?: string;
  link?: string;
  images?: File[];
}

interface AddMemoResponse {
  todoId: number;
  message: string;
}

export const useAddMemoMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      todoGroupId,
      todoTitle,
      isPublic,
      memoText,
      link,
      images,
    }: AddMemoRequest & { todoGroupId: number }) => {
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

      const { data } = await api.post(
        `/v1/my-dream/todo-group/${todoGroupId}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      return data.data as AddMemoResponse;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['mdTodo'] });
    },
    onError: (error) => {
      console.error('메모 추가 중 오류 발생:', error);
    },
  });
};
