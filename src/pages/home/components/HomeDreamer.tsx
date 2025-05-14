import Arrow from '@assets/icons/arrow.svg?react';
import DreamerCard from './DreamerCard';
import Dreamer from '@utils/data/home/DreamerDummy';
import { useNavigate } from 'react-router-dom';

const HomeDreamer = () => {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem('accessToken');
  return (
    <div>
      <div className="mb-[50px] flex items-center justify-between">
        <div className="text-gray-900 font-T02-B">
          {isLoggedIn
            ? '나와 같은 꿈을 꾸는 드리머예요!'
            : '인기 급상승 드리머 모아보기'}
        </div>
        <div
          className="flex cursor-pointer flex-row items-center text-gray-500 font-B02-SB"
          onClick={() => navigate('/jobfound')}
        >
          더 보러가기
          <Arrow />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {Dreamer.map((dream, index) => (
          <DreamerCard
            key={index}
            regionName={dream.regionName}
            job={dream.job}
            nickname={dream.nickname}
            day={dream.day}
            todo={dream.todo}
            profile={dream.profile}
            todotext={dream.todotext}
            doneList={dream.doneList}
          />
        ))}
      </div>
    </div>
  );
};

export default HomeDreamer;
