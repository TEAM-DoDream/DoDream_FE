import DetailTab from './DetailTab';

const RecommendTodo = ({ jobId }: { jobId: number }) => {
  return (
    <div className="mt-6 flex w-[712px] flex-col items-start rounded-[30px] border border-gray-300 bg-white px-[30px] py-10">
      <div className="flex w-full flex-row items-center justify-between">
        <div className="text-gray-900 font-T03-B"> 추천 할 일 </div>
      </div>

      <DetailTab jobId={jobId} />
    </div>
  );
};

export default RecommendTodo;
