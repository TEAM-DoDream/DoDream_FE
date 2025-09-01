import api from '@hook/api';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';

const AddMyTodo = async (jobTodoId: number) => {
  try {
    const response = await api.post(
      `/v1/my-dream/todo/${jobTodoId}`,
      jobTodoId
    );
    return response.data.data;
  } catch (error) {
    const axiosError = error as AxiosError<{ message?: string }>;
    throw new Error(
      axiosError.response?.data?.message ||
        '내 할일 추가 하는데에 오류가 발생했습니다.'
    );
  }
};

export const useAddMyTodoMutation = () => {
  return useMutation({
    mutationFn: AddMyTodo,
  });
};
