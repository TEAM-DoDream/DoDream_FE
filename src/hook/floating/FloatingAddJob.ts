// import api from '@hook/api';
// import { useQuery } from '@tanstack/react-query';
//
// export interface FloatingAddJobprops {
//   jobName: string;
//   todoGroupId: number;
// }
// const FloatingAddJob = async () => {
//   const token = localStorage.getItem('accessToken');
//
//   if (!token) {
//     throw new Error('토큰이 없습니다.');
//   }
//
//   try {
//     const response = await api.get(`/v1/my-dream/todo/jobs`, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });
//
//     return response.data.data;
//   } catch (error) {
//     console.error('직업 목록을 가져오는데 에러가 발생했습니다.', error);
//     throw error;
//   }
// };
//
// export const useFloatingAddJob = () => {
//   return useQuery<FloatingAddJobprops[]>({
//     queryKey: ['FloatingAddJob'],
//     queryFn: FloatingAddJob,
//   });
// };
