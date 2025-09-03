import Arrow from '@assets/icons/arrow.svg?react';
import DetailTab from './DetailTab';

const RecommendTodo = ({ jobId }: { jobId: number }) => {
  return (
    <div className="mt-6 flex w-[712px] flex-col items-start rounded-[30px] border border-gray-300 bg-white px-[30px] py-10">
      <div className="flex w-full flex-row items-center justify-between">
        <div className="text-gray-900 font-T03-B"> 추천 할 일 </div>
        <div className="flex cursor-pointer flex-row items-center">
          <div className="text-gray-500 font-B02-SB"> 더 많은 할 일 보기</div>
          <Arrow />
        </div>
      </div>

      <DetailTab jobId={jobId} />
    </div>
  );
};

export default RecommendTodo;
