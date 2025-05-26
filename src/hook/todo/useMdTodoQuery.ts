import api from '@hook/api';
import { useQuery } from '@tanstack/react-query';
import { TodoData, TodoDataSchema } from '@validation/mydream/todoSchema';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export const useMdTodoQuery = () => {
  const navigate = useNavigate();

  const result = useQuery<TodoData, Error>({
    queryKey: ['mdTodo'],
    queryFn: async () => {
      const { data } = await api.get('/v1/my-dream/todo');
      return TodoDataSchema.parse(data.data);
    },
  });

  useEffect(() => {
    if (!result.data || result.isLoading || result.isFetching) {
      return;
    }

    const todos = result.data.todos;

    if (
      Array.isArray(todos) &&
      todos.length === 0 &&
      !result.data.todoGroupId
    ) {
      alert('온보딩 페이지에서 직업을 추천받아 보세요!');
      navigate('/onboard');
    }
  }, [
    result.data,
    result.isFetched,
    result.isFetching,
    result.isLoading,
    navigate,
  ]);

  return result;
};
