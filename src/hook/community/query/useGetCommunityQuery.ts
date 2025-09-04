import { useQuery } from '@tanstack/react-query';
import api from '@hook/api';

export const useGetCommunityQuery = () => {
  const isLoggedIn =
    typeof window !== 'undefined' && !!localStorage.getItem('accessToken');

  return useQuery({
    queryKey: ['community', isLoggedIn],
    queryFn: async () => {
      const token =
        typeof window !== 'undefined'
          ? localStorage.getItem('accessToken')
          : null;

      const res = await api.get(
        '/v1/community/job',
        token ? { headers: { Authorization: `Bearer ${token}` } } : undefined
      );

      return res.data;
    },
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });
};
