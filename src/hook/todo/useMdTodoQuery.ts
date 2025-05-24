import api from "@hook/api";
import { useQuery } from "@tanstack/react-query";
import { TodoData, TodoDataSchema } from "@validation/mydream/todoSchema";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export const useMdTodoQuery = () => {
  const navigate = useNavigate();
  
  const { data, isLoading, error } = useQuery<TodoData, Error>({
    queryKey: ['mdTodo'],
    queryFn: async () => {
      const { data } = await api.get('/v1/my-dream/todo');
      console.log(data.data);
      return TodoDataSchema.parse(data.data);
    },
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    retry: 1,
  });

  useEffect(() => {
    if (data && (!data.todos || data.todos.length === 0)) {
      navigate('/onboard');
    }
  }, [data, navigate]);

  return { data, isLoading, error };
};