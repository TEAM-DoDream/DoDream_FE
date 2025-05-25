import api from "@hook/api";
import { useQuery } from "@tanstack/react-query";
import { TodoData, TodoDataSchema } from "@validation/mydream/todoSchema";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

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
    if (result.data && (!result.data.todos || result.data.todos.length === 0)) {
      navigate('/onboard');
    }
  }, [result.data, navigate]);

  return result;
};