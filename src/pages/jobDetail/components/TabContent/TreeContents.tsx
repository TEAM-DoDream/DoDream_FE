import { JobTodoCategoryProps } from '@hook/jobinfo/useJobTodoCategory';

interface TreeContentsProps {
  jobId: number;
  data?: JobTodoCategoryProps;
}

const TreeContents = ({ jobId, data }: TreeContentsProps) => {
  const treeData = data?.jobTodos ?? [];

  if (!treeData.length) {
    return (
      <p className="text-center text-gray-700">
        꿈나무 단계에 등록된 할 일이 없습니다.
      </p>
    );
  }

  return (
    <div className="gap-10 space-y-5">
      {treeData.map((tree) => (
        <div key={tree.JobTodoId} className="flex items-center justify-between">
          <div className="max-w-[516px] truncate text-gray-500 font-B01-M">
            {tree.title}
          </div>

          <button
            className="flex h-[34px] w-[96px] items-center justify-center rounded-[10px] bg-purple-500 p-2 text-purple-100 font-B03-SB hover:bg-purple-600"
            onClick={() => {
              console.log('Tree 할일 추가:', jobId, tree.JobTodoId);
            }}
          >
            내 할일에 추가
          </button>
        </div>
      ))}
    </div>
  );
};

export default TreeContents;
