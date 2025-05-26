import { useEffect, useState, useRef } from 'react';
import BackIcon from '@assets/icons/back.svg?react';
import Eye from '@assets/icons/show_pw.svg?react';
import CheckList from '@common/CheckList';
import Divider from '@common/Divider';
import Plus from '@assets/icons/plus.svg?react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useMdTodoQuery } from '@hook/todo/useMdTodoQuery';
import EmptyTodo from './EmptyTodo';
import { useMdTodoCompleteMutation } from '@hook/mydream/useMdTodoCompleMutation';
import { useQueryClient } from '@tanstack/react-query';

const jobOptions = ['간호 조무사', '바리스타', '요양보호사'];

const Todo = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryClient = useQueryClient();
  const alertShown = useRef(false);

  const { data: todoData, isLoading, isFetching } = useMdTodoQuery();
  const { mutate: completeTodo } = useMdTodoCompleteMutation();

  const [checkedIds, setCheckedIds] = useState<number[]>([]);

  useEffect(() => {
    if (todoData?.todos) {
      setCheckedIds(
        todoData.todos.filter((t) => t.completed).map((t) => t.todoId)
      );
    }
  }, [todoData]);

  useEffect(() => {
    if (location.pathname === '/mytodo/list') {
      queryClient.refetchQueries({ queryKey: ['mdTodo'], exact: true });
    }
  }, [queryClient, location.pathname]);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (!token && !alertShown.current) {
      alertShown.current = true;
      alert('로그인 후 이용해주세요');
      navigate('/');
    }
  }, [navigate]);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState('요양보호사');
  const toggleDropdown = () => setIsDropdownOpen((o) => !o);
  const handleSelect = (job: string) => {
    setSelectedJob(job);
    setIsDropdownOpen(false);
  };

  const hasTodos = !!todoData?.todos?.length;
  const todoItems =
    todoData?.todos.map((t) => ({
      id: t.todoId,
      text: t.title,
      hasMemo: t.isMemoExist,
    })) || [];

  // 체크 변경: ID 배열을 받아 추가/제거된 것만 mutation
  const handleCheckChange = (newIds: number[]) => {
    const added = newIds.filter((id) => !checkedIds.includes(id));
    const removed = checkedIds.filter((id) => !newIds.includes(id));

    added.forEach((todoId) => completeTodo({ todoId, completed: true }));
    removed.forEach((todoId) => completeTodo({ todoId, completed: false }));

    setCheckedIds(newIds);
  };

  // 추가하기
  const handleAddTodo = () => {
    if (todoData?.todoGroupId) {
      navigate(`/mytodo/add/${todoData.todoGroupId}`);
    }
  };

  // 렌더
  if (!isLoading && !hasTodos) {
    return <EmptyTodo onNavigate={() => navigate('/jobsearch')} />;
  }

  return (
    <div className="mb-[95px] mt-10 flex flex-col px-[120px]">
      {/* 상단: 직업 드롭다운 & 조회수 */}
      <div className="mb-6 flex items-center justify-between">
        <div className="relative">
          <div
            className="flex cursor-pointer items-center gap-2 text-gray-900 font-T02-B"
            onClick={toggleDropdown}
          >
            {todoData?.jobName || selectedJob}
            <BackIcon className="-rotate-90 transition-transform" />
          </div>
          {isDropdownOpen && (
            <div className="absolute top-full mt-2 w-[366px] rounded-2xl border bg-white p-2 shadow">
              {jobOptions.map((job) => (
                <div
                  key={job}
                  className={`cursor-pointer px-5 py-6 ${
                    job === selectedJob
                      ? 'text-purple-500 font-B01-SB'
                      : 'text-gray-400 font-B01-M'
                  }`}
                  onClick={() => handleSelect(job)}
                >
                  {job}
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="flex items-center gap-2 text-gray-500 font-B03-M">
          <Eye />
          조회수 {todoData?.totalView ?? 0}
        </div>
      </div>

      <div className="mt-[30px] flex w-full flex-col items-start rounded-[30px] border border-gray-300 bg-white p-[30px]">
        <div className="text-black font-T04-SB"> 할 일 목록</div>
        <Divider className="mb-4 mt-4" />

        {isLoading || isFetching ? (
          <div className="py-4 text-gray-500 font-B01-M">로딩 중...</div>
        ) : todoItems.length === 0 ? (
          <div className="py-4 text-gray-500 font-B01-M">
            아직 추가된 할 일이 없어요
          </div>
        ) : (
          <CheckList
            lists={todoItems}
            checkedIds={checkedIds}
            onChange={handleCheckChange}
            className="flex w-full flex-col items-center gap-8 py-4"
          />
        )}

        <button
          className="mt-[16px] flex w-full items-center justify-center gap-[6px] rounded-2xl bg-purple-500 py-[14px] text-white font-T05-SB hover:bg-purple-600"
          onClick={handleAddTodo}
        >
          <Plus className="h-6 w-6" />
          추가하기
        </button>
      </div>
    </div>
  );
};

export default Todo;
