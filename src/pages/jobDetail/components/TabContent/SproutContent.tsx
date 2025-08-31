import { JobTodoCategoryProps } from '@hook/jobinfo/useJobTodoCategory';

interface SproutContentProps {
  jobId: number;
  data?: JobTodoCategoryProps;
}

const SproutContent = ({ jobId, data }: SproutContentProps) => {
  const sproutData = data?.jobTodos ?? [];

  if (!sproutData.length) {
    return (
      <p className="text-center text-gray-700">
        새싹 단계에 등록된 할 일이 없습니다.
      </p>
    );
  }

  return (
    <div className="gap-10 space-y-5">
      {sproutData.map((sprout) => (
        <div
          key={sprout.JobTodoId}
          className="flex items-center justify-between"
        >
          <div className="max-w-[516px] truncate text-gray-500 font-B01-M">
            {sprout.title}
          </div>

          <button
            className="flex h-[34px] w-[96px] items-center justify-center rounded-[10px] bg-purple-500 p-2 text-purple-100 font-B03-SB hover:bg-purple-600"
            onClick={() => {
              console.log('Sprout 할일 추가:', jobId, sprout.JobTodoId);
            }}
          >
            내 할일에 추가
          </button>
        </div>
      ))}
    </div>
  );
};

export default SproutContent;
