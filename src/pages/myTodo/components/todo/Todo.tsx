import { useEffect, useState, useRef, useCallback } from 'react';
import BackIcon from '@assets/icons/back.svg?react';
import Eye from '@assets/icons/show_pw.svg?react';
import CheckList from '@common/CheckList';
import Divider from '@common/Divider';
import Plus from '@assets/icons/plus.svg?react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useMdTodoQuery } from '@hook/todo/useMdTodoQuery.ts';
import EmptyTodo from './EmptyTodo';
import { useMdTodoCompleteMutation } from '@hook/mydream/useMdTodoCompleMutation.ts';
import { useQueryClient } from '@tanstack/react-query';

const jobOptions = ['간호 조무사', '바리스타', '요양보호사'];

const Todo = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryClient = useQueryClient();
  const alertShown = useRef(false);
  const didMount = useRef(false);

  const { data: todoData, isLoading, isFetching } = useMdTodoQuery();

  const { mutate: completeTodo } = useMdTodoCompleteMutation();

  useEffect(() => {
    if (didMount.current) return;
    didMount.current = true;

    if (location.pathname === '/mytodo/list') {
      console.log('Todo 컴포넌트 최초 마운트 - refetch 실행');
      queryClient.refetchQueries({ queryKey: ['mdTodo'], exact: true });
    }
  }, [queryClient, location.pathname]);

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');

    if (!accessToken && !alertShown.current) {
      alertShown.current = true;
      alert('로그인 후 이용해주세요');
      navigate('/');
    }
  }, [navigate]);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState('요양보호사');

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const handleSelect = (job: string) => {
    setSelectedJob(job);
    setIsDropdownOpen(false);
  };

  const hasTodos = todoData && todoData.todos && todoData.todos.length > 0;

  const handleCheckChange = useCallback(
    (checkedList: boolean[]) => {
      if (!todoData || !todoData.todos) return;

      checkedList.forEach((isChecked, index) => {
        if (index >= todoData.todos.length) return;

        const todo = todoData.todos[index];

        if (todo.completed !== isChecked) {
          completeTodo({
            todoId: todo.todoId,
            completed: isChecked,
          });
        }
      });
    },
    [todoData, completeTodo]
  );

  if (!isLoading && !hasTodos) {
    return <EmptyTodo onNavigate={() => navigate('/jobsearch')} />;
  }

  const todoItems = hasTodos
    ? todoData.todos.map((todo) => ({
        id: todo.todoId,
        text: todo.title,
        hasMemo: todo.isMemoExist,
      }))
    : [];

  const defaultCheckedList = hasTodos
    ? todoData.todos.map((todo) => todo.completed)
    : [];

  const handleAddTodo = () => {
    if (todoData && todoData.todoGroupId) {
      navigate(`/mytodo/add/${todoData.todoGroupId}`);
    }
  };

  return (
    <div className="mb-[95px] mt-10 flex flex-col px-[120px]">
      <div className="flex flex-row justify-between">
        <div className="relative flex flex-col items-start">
          <div
            className="flex cursor-pointer flex-row items-center gap-[10px]"
            onClick={toggleDropdown}
          >
            <div className="text-gray-900 font-T02-B">
              {todoData?.jobName || selectedJob}
            </div>
            <BackIcon
              className={`transition-transform duration-200 ${
                isDropdownOpen ? '-rotate-90' : '-rotate-90'
              }`}
            />
          </div>

          {isDropdownOpen && (
            <div className="absolute top-[100%] z-10 mt-[14px] w-[366px] rounded-2xl border-[1.4px] bg-white p-2 shadow-shadow4">
              {jobOptions.map((job) => (
                <div
                  key={job}
                  className={`cursor-pointer gap-[10px] px-5 py-6 ${
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

        <div className="flex flex-row items-center gap-[6px]">
          <Eye />
          <div className="text-gray-500 font-B03-M">
            조회수 {todoData?.totalView || 0}
          </div>
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
            lists={todoItems.length > 0 ? todoItems : ['할일을 추가해주세요']}
            defaultCheckedList={defaultCheckedList}
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
