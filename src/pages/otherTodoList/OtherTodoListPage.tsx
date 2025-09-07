import { useParams, useNavigate, useLocation } from 'react-router-dom';
import BackIcon from '@assets/icons/back.svg?react';
import { useEachTodosQuery } from '@hook/useJobQuery.ts';
import BaseImg from '@assets/images/profile.png';
import LoadingSpinner from '@common/LoadingSpinner';
import OtherTodoCard from '@pages/otherTodoList/components/OtherTodoCard.tsx';
import { ReactTagManager } from 'react-gtm-ts';
import { useEffect } from 'react';
import ShowView from '@assets/icons/show_pw.svg?react';
import ProfileCard from '@pages/jobDetail/components/ProfileCard';
import Footer from '@common/Footer';

const OtherTodoListPage = () => {
  const location = useLocation();
  useEffect(() => {
    ReactTagManager.action({
      event: 'others_todo_view',
      category: '할 일 목록',
      clickText: '타인의 할 일 페이지 진입 시',
      source_page: location.pathname,
    });
  }, [location.pathname]);
  const navigate = useNavigate();
  const { todoGroupId } = useParams<{ todoGroupId: string }>();
  const {
    data: eachTodos,
    isLoading,
    isError,
  } = useEachTodosQuery(Number(todoGroupId));

  // 404 등 조회 에러 발생 시 내 할일로 리다이렉트
  useEffect(() => {
    if (isError) {
      navigate('/mytodo/list', { replace: true });
    }
  }, [isError, navigate]);

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  // isError 시에는 상단 useEffect에서 리다이렉트 처리

  if (!eachTodos)
    return (
      <div className="flex h-full items-center justify-center text-gray-900">
        데이터가 없습니다.
      </div>
    );

  return (
    <>
      <div className="flex h-full w-full flex-row bg-gray-50 px-[120px]">
        <div className="flex w-full flex-col items-start">
          <div className="mt-10 flex flex-row items-start">
            <button
              className="rounded-full p-2 hover:bg-gray-100"
              onClick={() => navigate(-1)}
            >
              <BackIcon className="h-6 w-6 text-gray-500" />
            </button>
          </div>

          <div className="mt-[69px] w-full">
            <div className="flex flex-row items-start gap-5">
              <img
                src={eachTodos?.profileImage || BaseImg}
                alt="프로필"
                className="h-20 w-20 rounded-full object-cover"
              />

              <div className="flex w-full flex-col">
                <div className="flex flex-row items-center gap-[30px]">
                  <span className="text-gray-900 font-T02-B">
                    {eachTodos?.memberNickname}의 할일목록
                  </span>

                  <div className="flex items-center justify-center rounded-[10px] bg-purple-100 p-2 text-purple-500 font-B03-SB">
                    {eachTodos?.jobName}
                  </div>
                </div>

                <div className="mt-5 flex w-full flex-row items-center justify-between">
                  <div className="text-gray-900 font-B02-M">
                    {eachTodos?.regionName}
                  </div>
                  <div className="flex flex-row items-center gap-[6px]">
                    <ShowView />
                    <div className="text-gray-500 font-B03-M">
                      {' '}
                      조회수 {eachTodos?.totalView}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-20 flex w-full flex-col gap-6">
              {Array.isArray(eachTodos?.todos) && (
                <OtherTodoCard
                  title="할 일 목록"
                  todos={eachTodos.todos.map((todo) => ({
                    todoId: todo.todoId,
                    title: todo.title,
                    completed: todo.completed,
                    isPublic: todo.isPublic,
                    saveCount: todo.saveCount,
                    isSaved: todo.isSaved,
                  }))}
                />
              )}
            </div>
          </div>
          {eachTodos?.jobId && (
            <ProfileCard
              jobId={Number(eachTodos.jobId)}
              todoGroupId={eachTodos.todoGroupId}
              jobName={eachTodos.jobName}
            />
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default OtherTodoListPage;
