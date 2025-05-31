import { useParams, useNavigate } from 'react-router-dom';
import BackIcon from '@assets/icons/back.svg?react';
import TodoCard from '@pages/otherTodoList/components/TodoCard.tsx';
import { useEachTodosQuery } from '@hook/useJobQuery.ts';
import BaseImg from '@assets/images/profile.png';
import LoadingSpinner from '@common/LoadingSpinner';

const OtherTodoListPage = () => {
  const navigate = useNavigate();
  const { todoGroupId } = useParams<{ todoGroupId: string }>();
  const {
    data: eachTodos,
    isLoading,
    isError,
  } = useEachTodosQuery(Number(todoGroupId));

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError) {
    <div>에러가 발생했습니다.</div>;
  }

  if (!eachTodos) return <div>데이터가 없습니다.</div>;

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
                <TodoCard
                  title="할 일 목록"
                  todos={eachTodos.todos.map((todo) => ({
                    todoId: todo.todoId,
                    title: todo.title,
                    completed: todo.completed,
                    isMemoExist: todo.isMemoExist,
                    isPublic: todo.isPublic,
                  }))}
                  showAddButton={false}
                  disableHover={true}
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
