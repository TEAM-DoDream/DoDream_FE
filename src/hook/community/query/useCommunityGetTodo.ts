import api from '@hook/api';
import { useQuery } from '@tanstack/react-query';

export interface CommunityItem {
  id: number;
  name: string;
  level: string;
  imageUrl?: string;
  dDay?: string;
  description: string;
  saveCount: number;
  isSaved: boolean;
}

export interface CommunityGetTodoResponse {
  content: CommunityItem[];
  number: number;
  size: number;
  numberOfElements: number;
  sort: { empty: boolean; sorted: boolean; unsorted: boolean }[];
}

type Params = {
  jobName: string;
  level: string;
  sort: string;
  page: number;
  size: number;
};

const CommunityGetTodo = async (
  params: Params
): Promise<CommunityGetTodoResponse> => {
  const { jobName, level, sort, page, size } = params;
  const token =
    typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;

  const res = await api.get('/v1/community/todos', {
    params: { jobName, level, sort, page, size },
    ...(token ? { headers: { Authorization: `Bearer ${token}` } } : {}),
  });

  const result = res.data?.data;
  return {
    content: result.content,
    number: result.number,
    size: result.size,
    numberOfElements: result.numberOfElements,
    sort: result.sort,
  };
};

export const useCommunityGetTodo = (params: Params) => {
  const token =
    typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;

  return useQuery({
    queryKey: ['CommunityGetTodo', params, !!token],
    queryFn: () => CommunityGetTodo(params),
  });
};
