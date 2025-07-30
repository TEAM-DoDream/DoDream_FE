import { useEffect, useState } from 'react';
import Eye from '@assets/icons/show_pw.svg?react';
import CheckList from '@common/CheckList';
import Divider from '@common/Divider';
import { useNavigate } from 'react-router-dom';
import { useMdTodoQuery } from '@hook/todo/useMdTodoQuery';
import EmptyTodo from './EmptyTodo';
import { useMdTodoCompleteMutation } from '@hook/mydream/useMdTodoCompleMutation';
import { ReactTagManager } from 'react-gtm-ts';
import LoadingSpinner from '@common/LoadingSpinner.tsx';

const Todo = () => {
  const navigate = useNavigate();

  const {
    data: todoData,
    isLoading: isTodoLoading,
    refetch,
  } = useMdTodoQuery();
  const { mutate: completeTodo } = useMdTodoCompleteMutation();
  const [checkedIds, setCheckedIds] = useState<number[]>([]);

  useEffect(() => {
    if (todoData?.todos) {
      const completed = todoData.todos
        .filter((t) => t.completed)
        .map((t) => t.todoId);
      setCheckedIds(completed);
    }
  }, [todoData]);

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

    Promise.all([
      ...added.map(
        (todoId) =>
          new Promise((resolve) =>
            completeTodo({ todoId, completed: true }, { onSuccess: resolve })
          )
      ),
      ...removed.map(
        (todoId) =>
          new Promise((resolve) =>
            completeTodo({ todoId, completed: false }, { onSuccess: resolve })
          )
      ),
    ]).then(() => {
      refetch();
    });

    setCheckedIds(newIds);
  };

  if (isTodoLoading && !todoData) {
    return (
      <div className="flex h-screen items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (todoData?.todos.length === 0) {
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
      <div className="flex items-center justify-between">
        <div className="relative">
          <div className="flex cursor-pointer items-center text-gray-900 font-T02-B">
            {todoData?.jobName}
          </div>
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
