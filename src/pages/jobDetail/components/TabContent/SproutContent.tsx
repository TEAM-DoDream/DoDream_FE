import { JobTodoCategoryProps } from '@hook/jobinfo/useJobTodoCategory';
import { useState } from 'react';
import ToastModal from '@common/modal/ToastModal';
import Info from '@assets/icons/info.svg?react';
import { useAddMyTodoMutation } from '@hook/jobinfo/useAddMyTodoMutation.ts';
import { trackTodoImport } from '@utils/amplitude';

interface SproutContentProps {
  jobId: number;
  data?: JobTodoCategoryProps;
}

const SproutContent = ({ data }: SproutContentProps) => {
  const sproutData = data?.jobTodos ?? [];

  const { mutate, isPending } = useAddMyTodoMutation();
  const [clickedId, setClickedId] = useState<number | null>(null);
  const [completedId, setCompletedId] = useState<Set<number>>(new Set());
  const [showToast, setShowToast] = useState(false);

  const handleAdd = (jobTodoId: number, title: string) => {
    if (completedId.has(jobTodoId)) return;

    setClickedId(jobTodoId);
    trackTodoImport(title); // Amplitude 이벤트 트래킹
    mutate(jobTodoId, {
      onSuccess: () => {
        setCompletedId((prev) => new Set(prev).add(jobTodoId));
        setShowToast(true);
        setTimeout(() => setShowToast(false), 2000);
      },
      onSettled: () => setClickedId(null),
    });
  };

  if (!sproutData.length) {
    return (
      <p className="text-center text-gray-700">
        새싹 단계에 등록된 할 일이 없습니다.
      </p>
    );
  }

  return (
    <div className="gap-10 space-y-5">
      {sproutData.map((sprout) => {
        const isLoading = isPending && clickedId === sprout.JobTodoId;
        const isCompleted = completedId.has(sprout.JobTodoId);

        return (
          <div
            key={sprout.JobTodoId}
            className="flex items-center justify-between"
          >
            <div className="max-w-[516px] truncate text-gray-500 font-B01-M">
              {sprout.title}
            </div>

            <button
              className={`flex h-[34px] w-[120px] items-center justify-center rounded-[10px] p-2 font-B03-SB ${
                isCompleted
                  ? 'cursor-default bg-gray-200 text-gray-600'
                  : isLoading
                    ? 'bg-gray-300 text-gray-600'
                    : 'bg-purple-500 text-purple-100 hover:bg-purple-600'
              }`}
              disabled={isLoading || isCompleted}
              onClick={() => handleAdd(sprout.JobTodoId, sprout.title)}
            >
              {isCompleted
                ? '할일 추가 완료'
                : isLoading
                  ? '할일 추가 중'
                  : '내 할일에 추가'}
            </button>
          </div>
        );
      })}

      {showToast && (
        <div className="fixed top-[130px] z-50 flex w-full justify-center">
          <ToastModal
            icon={<Info className="h-6 w-6 text-white" />}
            text="내 할일 목록에 추가 되었습니다"
            width="w-[350px]"
          />
        </div>
      )}
    </div>
  );
};

export default SproutContent;
