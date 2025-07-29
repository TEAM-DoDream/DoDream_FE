// import { useEffect, useState } from 'react';
// import Cancel from '@assets/icons/bigcancel.svg?react';
// import Divider from '@common/Divider';
// import Warning from '@assets/icons/warning.svg?react';
// import SmallCancel from '@assets/icons/purplecancel.svg?react';
// import Button from '@common/Button';
// import { useGetInfo } from '@hook/mypage/useMypageQuery';
// import { useDeleteJob } from '@hook/mypage/useRemoveJob';
//
// interface LikeJobModalProps {
//   onClose: () => void;
// }
//
// interface JobItem {
//   jobId: number;
//   jobName: string;
// }
//
// const LikeJobModal = ({ onClose }: LikeJobModalProps) => {
//   const { data: InfoData, refetch } = useGetInfo();
//   const deleteJob = useDeleteJob();
//
//   const [originalJobs, setOriginalJobs] = useState<JobItem[]>([]);
//   const [localJobs, setLocalJobs] = useState<JobItem[]>([]);
//
//   useEffect(() => {
//     if (InfoData?.jobs) {
//       setOriginalJobs(InfoData.jobs);
//       setLocalJobs(InfoData.jobs);
//     }
//   }, [InfoData]);
//
//   const handleCancel = () => {
//     setLocalJobs(originalJobs);
//     onClose();
//   };
//
//   const handleSave = () => {
//     const removedJobs = originalJobs.filter(
//       (job) => !localJobs.some((j) => j.jobId === job.jobId)
//     );
//     if (removedJobs.length > 0) {
//       const ids = removedJobs.map((j) => j.jobId);
//       deleteJob.mutate(ids, {
//         onSuccess: () => {
//           refetch();
//           onClose();
//         },
//       });
//     } else {
//       onClose();
//     }
//   };
//
//   return (
//     <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-[#121212]/[0.5]">
//       <div className="flex w-[420px] flex-col items-start rounded-[30px] bg-white px-[30px] py-10">
//         <div className="flex w-full justify-between">
//           <div className="text-black font-T03-B">관심직업</div>
//           <Cancel
//             className="cursor-pointer text-gray-500"
//             onClick={handleCancel}
//           />
//         </div>
//
//         <Divider className="mt-[30px]" />
//
//         <div className="mt-3 flex flex-row gap-[10px]">
//           <Warning className="h-7 w-7" />
//           <div className="text-gray-500 font-B02-M">
//             담은 직업을 삭제하시면 [나의 할 일]에 포함되어 있는 할 일 목록들이
//             모두 삭제됩니다
//           </div>
//         </div>
//
//         <div className="flex w-full flex-col items-end gap-10">
//           <div className="mt-6 grid w-full grid-cols-3 gap-x-4 gap-y-4">
//             {localJobs.map((tag) => (
//               <div
//                 key={tag.jobId}
//                 className="flex w-full cursor-pointer items-center justify-between whitespace-nowrap rounded-full border border-purple-500 bg-purple-100 px-3 py-2 text-purple-500 font-B03-M hover:bg-purple-150"
//               >
//                 <span>{tag.jobName}</span>
//                 <button
//                   type="button"
//                   onClick={() => {
//                     setLocalJobs((prev: JobItem[]) =>
//                       prev.filter((j) => j.jobId !== tag.jobId)
//                     );
//                   }}
//                 >
//                   <SmallCancel />
//                 </button>
//               </div>
//             ))}
//           </div>
//
//           <Button
//             text="저장"
//             color="primary"
//             onClick={handleSave}
//             className="flex items-center justify-end rounded-[14px] px-[30px] py-3"
//           />
//         </div>
//       </div>
//     </div>
//   );
// };
//
// export default LikeJobModal;
