import { LoginHomeCard } from './HomeImage';
import MyDreamArrow from '@assets/icons/myDreamarrow.svg?react';
import Arrow from '@assets/icons/arrow.svg?react';
import Bell from '@assets/images/bell.webp';
import { useBannerQuery } from '@hook/useHomeQuery';
import { useUserStore } from '@store/useUserStore';
import { useNavigate } from 'react-router-dom';
import { useFilterStore } from '@store/filterStore';
import CheckList from '@common/CheckList';
import { useMdTodoQuery } from '@hook/todo/useMdTodoQuery';
import { useMemo, useEffect, useState } from 'react';
import { useMdTodoCompleteMutation } from '@hook/mydream/useMdTodoCompleMutation';

const LoginBanner = () => {
  const { data: jobList } = useBannerQuery();
  const regionName = useUserStore((s) => s.regionName);
  const navigate = useNavigate();
  const setSelection = useFilterStore((s) => s.setSelection);
  const { data: todoData, isLoading } = useMdTodoQuery();
  const { mutate: completeTodo } = useMdTodoCompleteMutation();

  const [checkedIds, setCheckedIds] = useState<number[]>([]);

  const todoItems = useMemo(() => {
    return (
      todoData?.todos
        .filter((t) => !t.completed)
        .slice(0, 4)
        .map((t) => ({ id: t.todoId, text: t.title })) ?? []
    );
  }, [todoData]);

  useEffect(() => {
    setCheckedIds([]);
  }, [todoItems.length]);

  const handleCheckChange = (newIds: number[]) => {
    const added = newIds.filter((id) => !checkedIds.includes(id));
    added.forEach((todoId) => completeTodo({ todoId, completed: true }));
    setCheckedIds(newIds);
  };

  const displayedItems = todoItems.filter((i) => !checkedIds.includes(i.id!));

  return (
    <div className="flex h-[489px] w-full items-center justify-center gap-5 bg-purple-150 px-[120px] pb-[50px] pt-[60px]">
      <div className="relative flex gap-6">
        <LoginHomeCard />
        <div className="absolute right-0 flex cursor-pointer items-center gap-2 rounded-full bg-white py-[6px] pl-4 pr-1">
          <span
            className="text-gray-500 font-B02-SB"
            onClick={() => navigate('/mytodo')}
          >
            나의 할일 가기
          </span>
          <MyDreamArrow />
        </div>

        <div className="absolute left-[30px] top-10 flex flex-col">
          <span className="text-white font-B02-M">
            {todoData ? `${todoData.daysAgo}일째 꿈꾸는중` : '꿈꾸는중'}
          </span>
          <div className="mt-[10px] text-white font-T01-B">
            {todoData?.jobName ?? '직업 준비중'}
          </div>
        </div>

        <div className="absolute bottom-0 left-[30px] top-[135px] flex items-center justify-center">
          {isLoading ? (
            <div className="text-white">로딩중...</div>
          ) : (
            <CheckList
              lists={
                displayedItems.length
                  ? displayedItems
                  : [{ text: '할일을 추가해주세요' }]
              }
              checkedIds={checkedIds}
              onChange={handleCheckChange}
              className="flex w-[655px] flex-col gap-4 overflow-hidden text-ellipsis whitespace-nowrap"
            />
          )}
        </div>
      </div>

      <div className="flex h-[379px] w-[480px] flex-col gap-5 rounded-[30px] border bg-white p-8">
        <div className="flex w-full items-center justify-between">
          <img src={Bell} alt="Bell" className="h-[60px] w-[60px]" />
          <button
            className="flex items-center text-gray-500 font-B02-SB"
            onClick={() => {
              setSelection('location', regionName);
              navigate('/jobsearch');
            }}
          >
            채용 정보 보기 <Arrow />
          </button>
        </div>

        <span className="truncate text-gray-900 font-T01-B">
          {regionName} 채용 현황
        </span>
        <div className="flex flex-col gap-5">
          {jobList?.map((job) => (
            <div key={job['job-name']} className="flex items-center gap-4">
              <div className="rounded-[10px] bg-purple-100 p-2 text-purple-500 font-T05-SB">
                {job['job-name']}
              </div>
              <div className="text-gray-900 font-T05-SB">{job.count}건</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LoginBanner;
