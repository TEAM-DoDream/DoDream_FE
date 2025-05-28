import { useEffect, useState } from 'react';
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
import { useMdJobsQuery } from '@hook/todo/useTdJobsQuery';
import { useTodoGroupQuery } from '@hook/todo/useTodoGroupQuery';

const Todo = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryClient = useQueryClient();

  const [refreshCounter, setRefreshCounter] = useState(0);

  const { data: todoData, isLoading: isTodoLoading } = useMdTodoQuery();
  const { data: jobsData, isLoading: isJobsLoading } = useMdJobsQuery();
  const [selectedJobId, setSelectedJobId] = useState<number | null>(null);

  const {
    data: selectedTodoGroup,
    isLoading: isGroupLoading,
    refetch: refetchTodoGroup,
  } = useTodoGroupQuery(selectedJobId || undefined);

  const { mutate: completeTodo } = useMdTodoCompleteMutation();
  const [checkedIds, setCheckedIds] = useState<number[]>([]);

  useEffect(() => {
    if (todoData?.todoGroupId && selectedJobId === null) {
      setSelectedJobId(todoData.todoGroupId);
    } else if (
      jobsData &&
      Array.isArray(jobsData) &&
      jobsData.length > 0 &&
      selectedJobId === null
    ) {
      setSelectedJobId(jobsData[0].todoGroupId);
    }
  }, [todoData, jobsData, selectedJobId, navigate]);

  useEffect(() => {
    if (selectedTodoGroup?.todos) {
      setCheckedIds(
        selectedTodoGroup.todos.filter((t) => t.completed).map((t) => t.todoId)
      );
    } else if (todoData?.todos) {
      setCheckedIds(
        todoData.todos.filter((t) => t.completed).map((t) => t.todoId)
      );
    }
  }, [selectedTodoGroup, todoData]);

  useEffect(() => {
    if (selectedJobId) {
      queryClient.invalidateQueries({ queryKey: ['todoGroup', selectedJobId] });
      refetchTodoGroup();
    }

    if (location.pathname === '/mytodo/list') {
      if (selectedJobId) {
        queryClient.refetchQueries({
          queryKey: ['todoGroup', selectedJobId],
          exact: true,
        });
      } else {
        queryClient.refetchQueries({ queryKey: ['mdTodo'], exact: true });
      }
    }
  }, [
    selectedJobId,
    queryClient,
    refetchTodoGroup,
    refreshCounter,
    location.pathname,
  ]);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const toggleDropdown = () => setIsDropdownOpen((o) => !o);

  const handleSelect = (jobId: number) => {
    if (jobId === selectedJobId) {
      setRefreshCounter((prev) => prev + 1);
      queryClient.invalidateQueries({ queryKey: ['todoGroup', jobId] });
      refetchTodoGroup();
    } else {
      if (selectedJobId) {
        queryClient.removeQueries({ queryKey: ['todoGroup', selectedJobId] });
      }
      setSelectedJobId(jobId);
    }
    setIsDropdownOpen(false);
  };

  const todoItems = selectedTodoGroup?.todos
    ? selectedTodoGroup.todos.map((t) => ({
        id: t.todoId,
        text: t.title,
        hasMemo: t.isMemoExist,
      }))
    : todoData?.todos.map((t) => ({
        id: t.todoId,
        text: t.title,
        hasMemo: t.isMemoExist,
      })) || [];

  const handleCheckChange = (newIds: number[]) => {
    const added = newIds.filter((id) => !checkedIds.includes(id));
    const removed = checkedIds.filter((id) => !newIds.includes(id));

    added.forEach((todoId) => completeTodo({ todoId, completed: true }));
    removed.forEach((todoId) => completeTodo({ todoId, completed: false }));

    setCheckedIds(newIds);
  };

  const handleAddTodo = () => {
    if (selectedJobId) {
      navigate(`/mytodo/add/${selectedJobId}`);
    } else if (todoData?.todoGroupId) {
      navigate(`/mytodo/add/${todoData.todoGroupId}`);
    }
  };

  const handleRefresh = () => {
    setRefreshCounter((prev) => prev + 1);

    if (selectedJobId) {
      queryClient.invalidateQueries({ queryKey: ['todoGroup', selectedJobId] });
      refetchTodoGroup();
    } else {
      queryClient.refetchQueries({ queryKey: ['mdTodo'], exact: true });
    }
  };

  if (isJobsLoading || (isTodoLoading && !todoData)) {
    return (
      <div className="py-4 text-gray-500 font-B01-M">
        직업 목록을 불러오는 중...
      </div>
    );
  }

  if (!jobsData || !Array.isArray(jobsData) || jobsData.length === 0) {
    return <EmptyTodo onNavigate={() => navigate('/jobsearch')} />;
  }

  const selectedJobName = Array.isArray(jobsData)
    ? jobsData.find((job) => job.todoGroupId === selectedJobId)?.jobName ||
      todoData?.jobName ||
      ''
    : todoData?.jobName || '';

  const totalView = selectedTodoGroup?.totalView ?? todoData?.totalView ?? 0;

  return (
    <div className="mb-[95px] mt-10 flex flex-col px-[120px]">
      <div className="mb-6 flex items-center justify-between">
        <div className="relative">
          <div
            className="flex cursor-pointer items-center gap-2 text-gray-900 font-T02-B"
            onClick={toggleDropdown}
          >
            {selectedJobName}
            <BackIcon
              className={`transition-transform ${isDropdownOpen ? 'rotate-90' : '-rotate-90'}`}
            />
          </div>
          {isDropdownOpen && Array.isArray(jobsData) && jobsData.length > 0 && (
            <div className="absolute top-full z-10 mt-2 w-[366px] rounded-2xl border bg-white p-2 shadow">
              {jobsData.map((job) => (
                <div
                  key={job.todoGroupId}
                  className={`cursor-pointer px-5 py-6 ${
                    job.todoGroupId === selectedJobId
                      ? 'text-purple-500 font-B01-SB'
                      : 'text-gray-400 font-B01-M'
                  }`}
                  onClick={() => handleSelect(job.todoGroupId)}
                >
                  {job.jobName}
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleRefresh}
            className="mr-2 text-gray-500 font-B03-M hover:text-purple-500"
          >
            새로고침
          </button>
          <div className="flex items-center gap-2 text-gray-500 font-B03-M">
            <Eye />
            조회수 {totalView}
          </div>
        </div>
      </div>

      <div className="mt-[30px] flex w-full flex-col items-start rounded-[30px] border border-gray-300 bg-white p-[30px]">
        <div className="text-black font-T04-SB"> 할 일 목록</div>
        <Divider className="mb-4 mt-4" />

        {isGroupLoading ? (
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
