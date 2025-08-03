import { useParams, useNavigate, useLocation } from 'react-router-dom';
import BackIcon from '@assets/icons/back.svg?react';
import { useEachTodosQuery } from '@hook/useJobQuery.ts';
import BaseImg from '@assets/images/profile.png';
import LoadingSpinner from '@common/LoadingSpinner';
import OtherTodoCard from '@pages/otherTodoList/components/OtherTodoCard.tsx';
import { ReactTagManager } from 'react-gtm-ts';
import { useEffect } from 'react';

const OtherTodoListPage = () => {
  const location = useLocation();
  useEffect(() => {
    ReactTagManager.action({
      event: 'others_todo_view',
      category: '할 일 목록',
      clickText: '타인의 할 일 페이지 진입 시',
      source_page: location.pathname,
    });
  }, []);
  const navigate = useNavigate();
  const { todoGroupId } = useParams<{ todoGroupId: string }>();
  const {
    data: eachTodos,
    isLoading,
    isError,
  } = useEachTodosQuery(Number(todoGroupId));

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (isError) {
    return <div>에러가 발생했습니다.</div>;
  }

  if (!eachTodos)
    return (
      <div className="flex h-full items-center justify-center text-gray-900">
        데이터가 없습니다.
      </div>
    );

  return (
    <>
      <div className="flex w-full flex-row bg-gray-50 pl-[120px] pr-[220px]">
        <div className="flex flex-row items-start gap-16 pb-20">
          <div className="mt-10 flex flex-row items-start">
            <button
              className="ml-4 rounded-full p-2 hover:bg-gray-100"
              onClick={() => navigate(-1)}
            >
              <BackIcon className="h-6 w-6 text-gray-500" />
            </button>
          </div>

          <div className="mt-10 w-full">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-6">
                <img
                  src={eachTodos?.profileImage || BaseImg}
                  alt="프로필"
                  className="h-16 w-16 rounded-full object-cover"
                />
                <div className="flex flex-col">
                  <span className="text-2xl text-gray-900 font-T02-B">
                    {eachTodos?.memberNickname}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-[50px] flex w-[1000px] flex-col gap-6">
              {Array.isArray(eachTodos?.todos) && (
                <OtherTodoCard
                  title="할 일 목록"
                  todos={eachTodos.todos.map((todo) => ({
                    todoId: todo.todoId,
                    title: todo.title,
                    completed: todo.completed,
                    isPublic: todo.isPublic,
                  }))}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OtherTodoListPage;
