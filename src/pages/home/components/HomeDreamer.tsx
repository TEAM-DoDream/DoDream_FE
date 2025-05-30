import Arrow from '@assets/icons/arrow.svg?react';
import DreamerCard from './DreamerCard';
import { useNavigate } from 'react-router-dom';
import { useDreamerQuery } from '@hook/home/useDreamerQuery';
import { usePopularDreamer } from '@hook/home/useNoLoginDreamerQuery';
import { useMdTodoQuery } from '@hook/todo/useMdTodoQuery';
import { useNojobDreamer } from '@hook/home/useNojobQuery';

const HomeDreamer = () => {
  const navigate = useNavigate();
  const isLoggedIn = Boolean(localStorage.getItem('accessToken'));

  const { data: homeDreamer } = useDreamerQuery();
  const { data: popluarDreamer } = usePopularDreamer();
  const { data: NojobDreamer } = useNojobDreamer();
  const { data: hasnojob } = useMdTodoQuery();

  const title =
    !isLoggedIn || hasnojob?.todos?.length === 0
      ? '가장 열심히 도전 중인 드리머'
      : '나와 같은 꿈을 꾸는 드리머';

  const Dreamers = () => {
    if (!isLoggedIn) {
      return popluarDreamer;
    }

    if (hasnojob?.todos?.length === 0) {
      return NojobDreamer;
    }

    return homeDreamer;
  };

  const dreamersOption = Dreamers();

  return (
    <div>
      <div className="mb-[50px] flex items-center justify-between">
        <div className="text-gray-900 font-T02-B">{title}</div>
        <div
          className="flex cursor-pointer flex-row items-center text-gray-500 font-B02-SB"
          onClick={() => navigate('/jobfound')}
        >
          더 보러가기
          <Arrow />
        </div>
      </div>

      {dreamersOption && dreamersOption.length > 0 ? (
        <div className="grid cursor-pointer grid-cols-3 gap-6">
          {dreamersOption.map((dream) => (
            <DreamerCard
              key={dream.todoGroupId}
              todogroupId={dream.todoGroupId}
              regionName={dream.regionName}
              jobName={dream.jobName}
              memberNickname={dream.memberNickname}
              daysAgo={dream.daysAgo}
              todoCount={dream.todoCount}
              profileImage={dream.profileImage}
              todos={dream.todos}
            />
          ))}
        </div>
      ) : (
        <div className="mt-10 text-center text-gray-600 font-B02-M">
          아직 드리머가 없어요. 가장 먼저 도전해보세요!
        </div>
      )}
    </div>
  );
};

export default HomeDreamer;
