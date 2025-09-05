import api from '@hook/api';
import { useInfiniteQuery } from '@tanstack/react-query';

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
  first: boolean;
  last: boolean;
  empty: boolean;
  numberOfElements: string;
  pageable: {
    pageNumber: number;
  };
  sort: { empty: boolean; sorted: boolean; unsorted: boolean };
}

type BaseParams = {
  jobName: string;
  level: string;
  sort: string;
  size: number;
};

const fetchCommunityPage = async ({
  jobName,
  level,
  sort,
  page,
  size,
}: BaseParams & { page: number }): Promise<CommunityGetTodoResponse> => {
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
    first: result.first,
    last: result.last,
    empty: result.empty,
    numberOfElements: result.numberOfElements,
    pageable: { pageNumber: result.pageable?.pageNumber ?? page },
    sort: result.sort,
  };
};

export const useCommunityGetTodo = (params: BaseParams) => {
  return useInfiniteQuery({
    queryKey: ['CommunityGetTodo', params],
    initialPageParam: 0,
    queryFn: ({ pageParam }) =>
      fetchCommunityPage({ ...params, page: pageParam as number }),

    getNextPageParam: (lastPage) => {
      if (lastPage.last) return undefined;
      return lastPage.number + 1;
    },

    retry: 0,
  });
};
