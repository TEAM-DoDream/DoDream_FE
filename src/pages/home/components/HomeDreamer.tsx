import Arrow from '@assets/icons/arrow.svg?react';
import DreamerCard from './DreamerCard';
import { useNavigate } from 'react-router-dom';
import { useDreamerQuery } from '@hook/home/useDreamerQuery';
import { usePopularDreamer } from '@hook/home/useNoLoginDreamerQuery';

const HomeDreamer = () => {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem('accessToken');

  const { data: homeDreamer } = useDreamerQuery();
  const { data: popluarDreamer } = usePopularDreamer();

  return (
    <div>
      <div className="mb-[50px] flex items-center justify-between">
        <div className="text-gray-900 font-T02-B">
          {isLoggedIn
            ? '나와 같은 꿈을 꾸는 드리머'
            : '가장 열심히 도전 중인 드리머'}
        </div>
        <div
          className="flex cursor-pointer flex-row items-center text-gray-500 font-B02-SB"
          onClick={() => navigate('/jobfound')}
        >
          더 보러가기
          <Arrow />
        </div>
      </div>

      <div className="grid cursor-pointer grid-cols-3 gap-6">
        {isLoggedIn
          ? homeDreamer?.map((dream) => (
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
            ))
          : popluarDreamer?.map((popluar) => (
              <DreamerCard
                key={popluar.todoGroupId}
                todogroupId={popluar.todoGroupId}
                regionName={popluar.regionName}
                jobName={popluar.jobName}
                memberNickname={popluar.memberNickname}
                daysAgo={popluar.daysAgo}
                todoCount={popluar.todoCount}
                profileImage={popluar.profileImage}
                todos={popluar.todos}
              />
            ))}
      </div>
    </div>
  );
};

export default HomeDreamer;
