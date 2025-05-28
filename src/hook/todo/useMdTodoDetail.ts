import api from '@hook/api';
import {
  TodoDetailData,
  TodoDetailSchema,
} from '@validation/mydream/todoDetailSchema';
import { AxiosError } from 'axios';

export const useMdTodoDetail = () => {
  return async (todoId: number): Promise<TodoDetailData> => {
    try {
      const { data } = await api.get(`/v1/my-dream/todo/${todoId}`);

      return TodoDetailSchema.parse(data.data);
    } catch (error: unknown) {
      const axiosError = error as AxiosError<{ code?: string }>;
      const status = axiosError.response?.status;
      const code = axiosError.response?.data?.code;

      if (status === 400 && code === 'TODO_MEMO_NOT_PUBLIC') {
        throw new Error('공개되지 않은 투두 메모입니다.');
      }

      if (status === 404 && code === 'TODO_NOT_FOUND') {
        throw new Error('투두 데이터를 찾을 수 없습니다.');
      }

      throw new Error('투두 상세 정보를 불러오는 중 오류가 발생했습니다.');
    }
  };
};
