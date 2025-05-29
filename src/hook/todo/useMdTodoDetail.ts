import api from '@hook/api';
import {
  TodoDetailData,
  TodoDetailSchema,
} from '@validation/mydream/todoDetailSchema';
import axios, { AxiosError } from 'axios';
import { ZodError } from 'zod';

export const useMdTodoDetail = () => {
  return async (todoId: number): Promise<TodoDetailData> => {
    try {
      const { data } = await api.get(`/v1/my-dream/todo/${todoId}`);

      return TodoDetailSchema.parse(data.data);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<{ code?: string }>;
        const status = axiosError.response?.status;
        const code = axiosError.response?.data?.code;

        if (status === 400 && code === 'TODO_MEMO_NOT_PUBLIC') {
          throw new Error('공개되지 않은 투두 메모입니다.');
        }
        if (status === 404 && code === 'TODO_NOT_FOUND') {
          throw new Error('투두 데이터를 찾을 수 없습니다.');
        }

        console.error('Network/API error:', axiosError);
        throw new Error(
          '투두 상세 정보를 불러오는 중 네트워크 오류가 발생했습니다.'
        );
      }

      if (error instanceof ZodError) {
        console.error('Response schema validation failed:', error.errors);
        throw new Error('서버 응답 데이터 형식이 올바르지 않습니다.');
      }

      console.error('Unknown error:', error);
      throw new Error(
        '투두 상세 정보를 불러오는 중 알 수 없는 오류가 발생했습니다.'
      );
    }
  };
};
