import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import BackIcon from '@assets/icons/back.svg?react';
import clapIcon from '@assets/images/clap.webp';
import Pagination from '@common/Pagination.tsx';
import ProfileCard from '@pages/otherTodo/components/ProfileCard.tsx';
import Footer from '@common/Footer.tsx';
import LoadingSpinner from '@common/LoadingSpinner.tsx';
import { useAllOtherTodoListQuery, OtherTodoAllList } from '@hook/useTodoQuery';

const OtherTodoPage = () => {
  const navigate = useNavigate();
  const { jobId } = useParams<{ jobId?: string }>();
  const [currentPage, setCurrentPage] = useState(0);

  const isValidJobId = jobId && !Number.isNaN(Number(jobId));
  const numericJobId = isValidJobId ? Number(jobId) : -1;

  const { data: todoList, isPending } = useAllOtherTodoListQuery(
    currentPage + 1,
    numericJobId
  );

  if (!isValidJobId) {
    navigate(-1);
    return null;
  }

  if (isPending || !todoList) {
    return (
      <div className="flex h-[300px] items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  const dreamers: OtherTodoAllList[] = todoList.content ?? [];
  const totalPages = todoList.totalPages ?? 1;

  return (
    <>
      <div className="mx-auto w-full max-w-screen-xl px-10 py-8">
        <div className="mb-6 cursor-pointer" onClick={() => navigate(-1)}>
          <BackIcon />
        </div>

        <div className="mb-6 flex flex-col items-start">
          <img src={clapIcon} alt="응원 아이콘" className="h-[76px] w-[76px]" />
          <div className="mt-[10px] text-gray-900 font-T05-SB">
            {dreamers[0]?.jobName}
          </div>
          <div className="mt-[10px] text-gray-900 font-T01-B">
            다른 드리머들은 이렇게 준비하고 있어요
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {dreamers.map((dreamer) => (
            <div
              key={dreamer.todoGroupId}
              className="cursor-pointer"
              onClick={() => navigate(`/otherslist/${dreamer.todoGroupId}`)}
            >
              <ProfileCard
                nickname={dreamer.memberNickname}
                regionName={dreamer.regionName}
                day={dreamer.daysAgo}
                profile={dreamer.profileImage}
                todo={dreamer.todoCount}
                todotext={dreamer.todos.map((t) => t.title)}
                doneList={dreamer.todos.map((t) => t.completed)}
                jobName={dreamer.jobName}
              />
            </div>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </div>
      </div>
      <div className="mt-8">
        <Footer />
      </div>
    </>
  );
};

export default OtherTodoPage;
