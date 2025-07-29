import { useEffect, useState } from 'react';
import Eye from '@assets/icons/show_pw.svg?react';
import CheckList from '@common/CheckList';
import Divider from '@common/Divider';
import { useNavigate, useLocation } from 'react-router-dom';
import { useMdTodoQuery } from '@hook/todo/useMdTodoQuery';
import EmptyTodo from './EmptyTodo';
import { useMdTodoCompleteMutation } from '@hook/mydream/useMdTodoCompleMutation';
import { useQueryClient } from '@tanstack/react-query';
import { ReactTagManager } from 'react-gtm-ts';

const Todo = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryClient = useQueryClient();

  const [refreshCounter, _setRefreshCounter] = useState(0);

  const { data: todoData, isLoading: isTodoLoading } = useMdTodoQuery();
  const [selectedJobId, _setSelectedJobId] = useState<number | null>(null);

  const { mutate: completeTodo } = useMdTodoCompleteMutation();
  const [checkedIds, setCheckedIds] = useState<number[]>([]);

  useEffect(() => {
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
  }, [selectedJobId, queryClient, refreshCounter, location.pathname]);

  useEffect(() => {
    ReactTagManager.action({
      event: 'my_todo_page',
      category: '할 일 목록',
      clickText: '[나의 할일] 페이지 클릭 시 (진입)',
    });
  }, []);

  const handleCheckChange = (newIds: number[]) => {
    const added = newIds.filter((id) => !checkedIds.includes(id));
    const removed = checkedIds.filter((id) => !newIds.includes(id));

    added.forEach((todoId) => completeTodo({ todoId, completed: true }));
    removed.forEach((todoId) => completeTodo({ todoId, completed: false }));

    setCheckedIds(newIds);
  };

  // const handleAddTodo = () => {
  //   if (selectedJobId) {
  //     navigate(`/mytodo/add/${selectedJobId}`);
  //   } else if (todoData?.todoGroupId) {
  //     navigate(`/mytodo/add/${todoData.todoGroupId}`);
  //   }
  // };

  if (isTodoLoading && !todoData) {
    return (
      <div className="py-4 text-gray-500 font-B01-M">
        직업 목록을 불러오는 중...
      </div>
    );
  }

  if (todoData === null) {
    return (
      <div className="flex h-screen items-center justify-center">
        <EmptyTodo onNavigate={() => navigate('/jobselect')} />
      </div>
    );
  }
  const totalView = todoData?.totalView;
  const checklistItems = todoData?.todos.map((todo) => ({
    id: todo.todoId,
    text: todo.title,
    completed: todo.completed,
    todoId: todo.todoId,
    title: todo.title,
  }));

  return (
    <div className="mb-[95px] mt-10 flex flex-col px-[120px]">
      <div className="mb-6 flex items-center justify-between">
        <div className="relative">
          <div className="flex cursor-pointer items-center gap-2 text-gray-900 font-T02-B"></div>
          <div className="absolute top-full z-10 mt-2 w-[366px] rounded-2xl border bg-white p-2 shadow"></div>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 text-gray-500 font-B03-M">
            <Eye />
            조회수 {totalView}
          </div>
        </div>
      </div>

      <div className="mt-[30px] flex w-full flex-col items-start rounded-[30px] border border-gray-300 bg-white p-[30px]">
        <div className="text-black font-T04-SB"> 할 일 목록</div>
        <Divider className="mb-4 mt-4" />

        <CheckList
          lists={checklistItems ?? []}
          checkedIds={checkedIds}
          onChange={handleCheckChange}
          className="flex w-full flex-col items-center gap-8 py-4"
          showAddButton={true}
        />
      </div>
    </div>
  );
};

export default Todo;
